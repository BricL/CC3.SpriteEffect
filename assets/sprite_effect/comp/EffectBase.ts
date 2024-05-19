import { _decorator, Color, EffectAsset, log, Material, Sprite, Texture2D } from "cc";
const { ccclass, property } = _decorator;

export type EffectPropsType = {
    mat: Material | null;
    propBuffer: Float32Array | null;
    propTexture: Texture2D | null;
}

@ccclass('EffectBase')
export abstract class EffectBase extends Sprite {
    protected static _s_effectMap = new Map<string, string[]>();
    protected static _s_effectProps = new Map<string, EffectPropsType>();

    @property({ type: EffectAsset, tooltip: '指定效果EffectAsset' })
    public effectAsset: EffectAsset | null = null;

    protected _effectIndex: number = -1;
    protected _isPropDirty: boolean = false;

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
        if (!EffectBase._s_effectMap.has(this.getPropsUnionKey())) {
            EffectBase._s_effectMap.set(this.getPropsUnionKey(), []);
        }

        if (EffectBase._s_effectMap.get(this.getPropsUnionKey())!.findIndex((v) => v === this.node.uuid) === -1) {
            EffectBase._s_effectMap.get(this.getPropsUnionKey())!.push(this.node.uuid);
        }

        if (!EffectBase._s_effectProps.has(this.getPropsUnionKey())) {
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

            EffectBase._s_effectProps.set(this.getPropsUnionKey(), {
                mat: mat,
                propBuffer: propBuffer,
                propTexture: propTexture
            });
        }

        // Get the effect index in the map and map this index to color.
        this._effectIndex = EffectBase._s_effectMap.get(this.getPropsUnionKey())!.findIndex((v) => v === this.node.uuid);
        console.log("Effect index in the map is:", this._effectIndex);

        this.color = new Color(this._effectIndex, 0, 0, 255);
        this.customMaterial = EffectBase._s_effectProps.get(this.getPropsUnionKey())!.mat;
    }

    onDestroy(): void {
        const unionKey = this.getPropsUnionKey();

        if (EffectBase._s_effectMap.has(unionKey)) {
            const index = EffectBase._s_effectMap.get(unionKey)!.findIndex((v) => v === this.node.uuid);
            EffectBase._s_effectMap.get(unionKey)!.splice(index, 1);
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