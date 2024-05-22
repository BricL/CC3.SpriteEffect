import { _decorator, Color, EffectAsset, error, log, Material, Sprite, Texture2D, Vec4 } from "cc";
const { ccclass, property } = _decorator;

export type EffectPropsType = {
    mat: Material | null;
    propBuffer: Float32Array | null;
    propTexture: Texture2D | null;
}

@ccclass('SpriteEffectBase')
export abstract class SpriteEffectBase extends Sprite {
    protected static _s_effectMap = new Map<string, string[]>();
    protected static _s_effectProps = new Map<string, EffectPropsType>();

    @property({ type: EffectAsset, tooltip: '指定效果EffectAsset' })
    public effectAsset: EffectAsset | null = null;

    protected _effectIndex: number = -1;
    protected _isPropDirty: boolean = false;

    /**
     * @abstract
     * Size of the prop texture.
     */
    protected abstract get sizeOfPropTexture(): number;

    /**
     * @abstract 
     * Generate a Union key for the effect.
     */
    protected abstract getPropsUnionKey(): string;

    /**
     * @abstract
     * Update the effect parameters.
     */
    protected abstract updateParams(): void;

    /**
     * @abstract
     * Initialize the material.
     * @returns Material
    */
    protected abstract initMaterial(): Material;

    protected init(sizeOfPropTexture: number): void {
        const unionKey = this.getPropsUnionKey();

        if (!SpriteEffectBase._s_effectMap.has(unionKey)) {
            const temp = new Array(1024).fill("");
            SpriteEffectBase._s_effectMap.set(unionKey, temp);
        }

        let idx = SpriteEffectBase._s_effectMap.get(unionKey)!.findIndex((v) => v === this.node.uuid);
        if (idx === -1) {
            idx = SpriteEffectBase._s_effectMap.get(unionKey)!.findIndex((v) => v === "");
            if (idx === -1) {
                error("Effect map is full!");
                return;
            }
        }

        // Get the effect index
        this._effectIndex = idx;

        SpriteEffectBase._s_effectMap.get(unionKey)![this._effectIndex] = this.node.uuid;
        this.color = new Color(this._effectIndex, 0, 0, 255);
        console.log("Effect index in the map is:", this._effectIndex);

        if (!SpriteEffectBase._s_effectProps.has(unionKey)) {
            let propBuffer = new Float32Array(sizeOfPropTexture * sizeOfPropTexture * 4);
            for (let y = 0; y < sizeOfPropTexture; y++) {
                for (let x = 0; x < sizeOfPropTexture; x++) {
                    const index = (y * sizeOfPropTexture + x) * 4;
                    propBuffer[index] = 0;
                    propBuffer[index + 1] = 0;
                    propBuffer[index + 2] = 0;
                    propBuffer[index + 3] = 0;
                }
            }

            let propTexture = new Texture2D();
            propTexture.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
            propTexture.reset({
                width: sizeOfPropTexture,
                height: sizeOfPropTexture,
                format: Texture2D.PixelFormat.RGBA32F,
                mipmapLevel: 0
            });

            propTexture!.uploadData(propBuffer);

            let mat = this.initMaterial();
            mat.setProperty('_propTexture', propTexture);

            SpriteEffectBase._s_effectProps.set(unionKey, {
                mat: mat,
                propBuffer: propBuffer,
                propTexture: propTexture
            });
        }

        this.customMaterial = SpriteEffectBase._s_effectProps.get(unionKey)!.mat;
    }

    protected getUV(uv: number[]): Vec4 {
        let minU = Math.min(uv[0], uv[2], uv[4], uv[6]);
        let minV = Math.min(uv[1], uv[3], uv[5], uv[7]);

        let maxU = Math.max(uv[0], uv[2], uv[4], uv[6]);
        let maxV = Math.max(uv[1], uv[3], uv[5], uv[7]);

        let width = maxU - minU;
        let height = maxV - minV;

        return new Vec4(minU, minV, width, height);
    }

    onLoad(): void {
        this.init(this.sizeOfPropTexture);
    }

    start() {
        this.updateParams();
    }

    onDestroy(): void {
        const unionKey = this.getPropsUnionKey();

        if (SpriteEffectBase._s_effectMap.has(unionKey)) {
            const index = SpriteEffectBase._s_effectMap.get(unionKey)!.findIndex((v) => v === this.node.uuid);
            if (index === this._effectIndex) {
                SpriteEffectBase._s_effectMap.get(unionKey)![this._effectIndex] = "";
            } else {
                error("Effect index is not correct!");
                SpriteEffectBase._s_effectMap.get(unionKey)![index] = "";
            }
        }
    }

    lateUpdate(dt: number): void {
        if (this._isPropDirty) {
            log(`${this.constructor.name} is DIRTY`);
            this.updateParams();
            this._isPropDirty = false;
        }
    }
}