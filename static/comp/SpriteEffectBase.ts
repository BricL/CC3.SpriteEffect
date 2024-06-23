import { _decorator, Color, EffectAsset, error, log, Material, Sprite, Texture2D, Vec4 } from "cc";
import { EDITOR_NOT_IN_PREVIEW } from "cc/env";
const { ccclass, property } = _decorator;

export type EffectProps = {
    mat: Material | null;
    propBuffer: Float32Array | null;
    propTexture: Texture2D | null;
    isDirty: boolean;
}

@ccclass('SpriteEffectBase')
export abstract class SpriteEffectBase extends Sprite {
    protected static _s_effectMap = new Map<string, string[]>();
    protected static _s_effectProps = new Map<string, EffectProps[]>();

    @property({ type: EffectAsset, tooltip: '指定效果EffectAsset' })
    public effectAsset: EffectAsset | null = null;

    protected _instanceID: number = -1;

    //#region effectColor
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Color, tooltip: "My Color" })
    public set effectColor(val: Color) {
        this._effectColor = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }

    public get effectColor(): Color {
        return this._effectColor;
    }

    @property
    protected _effectColor: Color = new Color(255, 255, 255, 255);
    //#endregion


    //#region is2Din3D
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '當使用RenderRoot2D時使用' })
    public set is2Din3D(val: boolean) {
        this._is2Din3D = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }

    public get is2Din3D(): boolean {
        return this._is2Din3D;
    }

    @property
    protected _is2Din3D: boolean = false;
    //#endregion


    //#region abstract methods
    /**
     * @abstract
     * Return the count of used floats of the effect.
     */
    protected abstract get floatUsage(): number;

    /**
     * @abstract 
     * Generate a Union key for the effect.
     */
    protected abstract getPropsUnionKey(): string;

    /**
     * @abstract
     * Update the effect parameters.
     */
    protected abstract updateParams(index: number, propBuffer: Float32Array): void;

    /**
     * @abstract
     * Initialize the material.
     * @returns Material
    */
    protected abstract initMaterial(): Material;
    //#endregion


    //#region methods
    /**
     * 4個float為一個pixel，需使用幾個pixel數量
     */
    protected get pixelsUsage(): number {
        const num = Math.ceil(this.floatUsage / 4.0);
        return num;
    }

    protected init(countOfProps: number): void {
        const unionKey = this.getPropsUnionKey();
        log(`init: ${unionKey}`);

        // Step1: 取的當前的effectIndex
        if (!SpriteEffectBase._s_effectMap.has(unionKey)) {
            const temp = new Array(768).fill("");  // R/G/B (0~255) => 256 * 3 = 768
            // temp[256] = temp[512] = "skip";
            SpriteEffectBase._s_effectMap.set(unionKey, temp);
        }

        let instanceID = SpriteEffectBase._s_effectMap.get(unionKey)!.findIndex((v) => v === this.node.uuid);
        if (instanceID === -1) {
            instanceID = SpriteEffectBase._s_effectMap.get(unionKey)!.findIndex((v) => v === "");
            if (instanceID === -1) {
                error("Effect map is full!");
                return;
            }
        }
        this._instanceID = instanceID;

        SpriteEffectBase._s_effectMap.get(unionKey)![this._instanceID] = this.node.uuid;

        if (this.instanceGroupIdx === 0) {
            this.color = new Color(this._instanceID, 0, 0, 255);
        } else if (this.instanceGroupIdx === 1) {
            this.color = new Color(255, (this._instanceID - 255), 0, 255);
        } else if (this.instanceGroupIdx === 2) {
            this.color = new Color(255, 255, (this._instanceID - 510), 255);
        } else {
            error(`The prop group index, ${this.instanceGroupIdx}, is out of range!`);
            return;
        }

        // Step2: 初始化Effect props
        if (!SpriteEffectBase._s_effectProps.has(unionKey)) {
            const temp = new Array(3).fill(null); // Only use R/G/B 3 channels
            SpriteEffectBase._s_effectProps.set(unionKey, temp);
        }

        if (SpriteEffectBase._s_effectProps.get(unionKey)![this.instanceGroupIdx] === null) {
            const w = 256 * countOfProps;
            const h = 1;

            let propBuffer = new Float32Array(w * h * 4);
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const index = (y * w + x) * 4;
                    propBuffer[index] = 1;
                    propBuffer[index + 1] = 0;
                    propBuffer[index + 2] = 1;
                    propBuffer[index + 3] = 1;
                }
            }

            let propsTexture = new Texture2D();
            propsTexture.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
            propsTexture.reset({
                width: w,
                height: h,
                format: Texture2D.PixelFormat.RGBA32F,
                mipmapLevel: 0
            });
            propsTexture.uploadData(propBuffer);

            let mat = this.initMaterial();
            mat.setProperty('propsTexture', propsTexture);

            SpriteEffectBase._s_effectProps.get(unionKey)![this.instanceGroupIdx] = {
                mat: mat,
                propBuffer: propBuffer,
                propTexture: propsTexture,
                isDirty: false
            };
        }

        this.customMaterial = SpriteEffectBase._s_effectProps.get(unionKey)![this.instanceGroupIdx].mat;
    }

    protected reflashParams(): void {
        const unionKey = this.getPropsUnionKey();
        const index = this.getBufferIndex();
        const effectProps = SpriteEffectBase._s_effectProps.get(unionKey)![this.instanceGroupIdx];

        // Update the effect parameters from the derived class.
        this.updateParams(index, effectProps.propBuffer!);

        if (EDITOR_NOT_IN_PREVIEW) {
            effectProps.propTexture!.uploadData(effectProps.propBuffer!);
        }
        else {
            effectProps.isDirty = true;
        }
    }

    /**
     * 每256個為一組
     */
    protected get instanceGroupIdx(): number {
        return Math.floor(this._instanceID / 256);
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
        const offset = this._instanceID - (this.instanceGroupIdx * 256);
        return offset * (this.pixelsUsage * 4);
    }
    //#endregion


    //#region life cycle
    onLoad(): void {
        this.init(this.pixelsUsage);
    }

    start() {
        this.reflashParams();
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
        const unionKey = this.getPropsUnionKey();
        const effectProps = SpriteEffectBase._s_effectProps.get(unionKey)![this.instanceGroupIdx];
        if (effectProps.isDirty) {
            log(`${this.constructor.name}'s effect props is DIRTY!`);
            effectProps.propTexture!.uploadData(effectProps.propBuffer!);
            effectProps.isDirty = false;
        }
    }
}