import { _decorator, Color, EffectAsset, error, log, Material, Sprite, Texture2D, Vec4 } from "cc";
const { ccclass, property } = _decorator;

export type EffectProps = {
    mat: Material | null;
    propBuffer: Float32Array | null;
    propTexture: Texture2D | null;
}

@ccclass('SpriteEffectBase')
export abstract class SpriteEffectBase extends Sprite {
    protected static _s_effectMap = new Map<string, string[]>();
    protected static _s_effectProps = new Map<string, EffectProps[]>();

    @property({ type: EffectAsset, tooltip: '指定效果EffectAsset' })
    public effectAsset: EffectAsset | null = null;

    protected _effectIndex: number = -1;
    protected _isPropDirty: boolean = false;

    /**
     * @abstract
     * Size of the prop texture.
     */
    protected abstract get countOfProps(): number;

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

    protected init(countOfProps: number): void {
        const unionKey = this.getPropsUnionKey();

        // Step1: 取的當前的effectIndex
        if (!SpriteEffectBase._s_effectMap.has(unionKey)) {
            const temp = new Array(768).fill("");  // R/G/B (0~255) => 256 * 3 = 768
            SpriteEffectBase._s_effectMap.set(unionKey, temp);
        }

        this._effectIndex = SpriteEffectBase._s_effectMap.get(unionKey)!.findIndex((v) => v === this.node.uuid);
        if (this._effectIndex === -1) {
            this._effectIndex = SpriteEffectBase._s_effectMap.get(unionKey)!.findIndex((v) => v === "");
            if (this._effectIndex === -1) {
                error("Effect map is full!");
                return;
            }
        }
        log(`Effect index is:${this._effectIndex}`);

        SpriteEffectBase._s_effectMap.get(unionKey)![this._effectIndex] = this.node.uuid;

        if (this.propGroupIdx === 0) {
            this.color = new Color(this._effectIndex, 0, 0, 255);
        } else if (this.propGroupIdx === 1) {
            this.color = new Color(0, this._effectIndex - 256, 0, 255);
        } else if (this.propGroupIdx === 2) {
            this.color = new Color(0, 0, this._effectIndex - 256 - 256, 255);
        } else {
            error(`The prop group index, ${this.propGroupIdx}, is out of range!`);
            return;
        }

        // Step2: 初始化Effect props
        if (!SpriteEffectBase._s_effectProps.has(unionKey)) {
            const temp = new Array(3).fill(null);
            SpriteEffectBase._s_effectProps.set(unionKey, temp);
        }

        if (SpriteEffectBase._s_effectProps.get(unionKey)![this.propGroupIdx] === null) {
            let propBuffer = new Float32Array((256 * countOfProps) * 1 * 4);

            for (let y = 0; y < 1; y++) {
                for (let x = 0; x < (256 * countOfProps); x++) {
                    const index = (y * (256 * countOfProps) + x) * 4;
                    propBuffer[index] = 0;
                    propBuffer[index + 1] = 0;
                    propBuffer[index + 2] = 0;
                    propBuffer[index + 3] = 0;
                }
            }

            let propTexture = new Texture2D();
            propTexture.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
            propTexture.reset({
                width: (256 * countOfProps),
                height: 1,
                format: Texture2D.PixelFormat.RGBA32F,
                mipmapLevel: 0
            });
            propTexture!.uploadData(propBuffer);

            let mat = this.initMaterial();
            mat.setProperty('_propTexture', propTexture);

            SpriteEffectBase._s_effectProps.get(unionKey)![this.propGroupIdx] = {
                mat: mat,
                propBuffer: propBuffer,
                propTexture: propTexture
            };
        }

        this.customMaterial = SpriteEffectBase._s_effectProps.get(unionKey)![this.propGroupIdx].mat;
    }

    protected get propGroupIdx(): number {
        return Math.floor(this._effectIndex / 256);
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
        this.init(this.countOfProps);
    }

    start() {
        this.updateParams();
    }

    onDestroy(): void {
        const unionKey = this.getPropsUnionKey();

        if (SpriteEffectBase._s_effectMap.has(unionKey)) {
            const index = SpriteEffectBase._s_effectMap.get(unionKey)!.findIndex((v) => v === this.node.uuid);
            if (index === -1) {
                error("Effect index is not found!");
                return;
            }

            SpriteEffectBase._s_effectMap.get(unionKey)![index] = "";
        } else {
            error(`The effect map of ${unionKey} is not found!`);
        }
    }

    lateUpdate(dt: number): void {
        if (this._isPropDirty) {
            log(`${this.constructor.name}'s effect props is DIRTY!`);
            this.updateParams();
            this._isPropDirty = false;
        }
    }
}