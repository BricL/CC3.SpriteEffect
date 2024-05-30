import { _decorator, Color, EffectAsset, error, log, Material, Sprite, Texture2D, Vec4 } from "cc";
import { EDITOR_NOT_IN_PREVIEW } from "cc/env";
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

    //#region effectColor
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Color, tooltip: "My Color" })
    public get effectColor(): Color {
        return this._effectColor;
    }

    public set effectColor(val: Color) {
        this._effectColor = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.updateParams();
        }
        else {
            this._isPropDirty = true;
        }
    }

    @property
    protected _effectColor: Color = new Color(255, 255, 255, 255);
    //#endregion

    
    //#region is2Din3D
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '當使用RenderRoot2D時使用' })
    public get is2Din3D(): boolean {
        return this._is2Din3D;
    }

    public set is2Din3D(val: boolean) {
        this._is2Din3D = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.countOfProps);
            this.updateParams();
        }
        else {
            this._isPropDirty = true;
        }
    }

    @property
    protected _is2Din3D: boolean = false;
    //#endregion


    //#region abstract methods
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
    //#endregion

    //#region methods
    protected init(countOfProps: number): void {
        const unionKey = this.getPropsUnionKey();
        log(`init: ${unionKey}`);

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
                    propBuffer[index] = 1;
                    propBuffer[index + 1] = 0;
                    propBuffer[index + 2] = 1;
                    propBuffer[index + 3] = 1;
                }
            }

            let propsTexture = new Texture2D();
            propsTexture.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
            propsTexture.reset({
                width: (256 * countOfProps),
                height: 1,
                format: Texture2D.PixelFormat.RGBA32F,
                mipmapLevel: 0
            });
            propsTexture.uploadData(propBuffer);

            let mat = this.initMaterial();
            mat.setProperty('propsTexture', propsTexture);

            SpriteEffectBase._s_effectProps.get(unionKey)![this.propGroupIdx] = {
                mat: mat,
                propBuffer: propBuffer,
                propTexture: propsTexture
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

    protected getBufferIndex(): number {
        let quotient = this._effectIndex / 256;
        let fractional = quotient - Math.floor(quotient);
        let x = Math.floor(fractional * (256 * this.countOfProps));
        const index = x * 4;
        return index;
    }
    //#endregion

    //#region life cycle
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