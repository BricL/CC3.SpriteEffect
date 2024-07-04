import { _decorator, Color, EffectAsset, error, log, Material, Sprite, Texture2D, Vec4 } from "cc";
import { EDITOR_NOT_IN_PREVIEW } from "cc/env";
const { ccclass, property } = _decorator;

type EffectProps = {
    mat: Material | null;
    propBuffer: Float32Array | null;
    propTexture: Texture2D | null;
    isDirty: boolean;
}

type EffectData = {
    data: EffectProps[];
    uuids: string[];
}

@ccclass('SpriteEffectBase')
export abstract class SpriteEffectBase extends Sprite {
    protected static _s_effectMap = new Map<string, EffectData>();
    // protected static _s_effectProps = new Map<string, EffectProps[]>();

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
    protected abstract getEffectUnionKey(): string;

    /**
     * @abstract
     * Update the effect parameters.
     */
    // protected abstract updateParams(index: number, propBuffer: Float32Array): void;
    protected abstract updateParams(index: number, textureWidth: number, propBuffer: Float32Array): void;

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
        return Math.pow(2, Math.ceil(Math.log(this.floatUsage) / Math.log(2))) / 4;
    }

    protected calBufferIndex(x: number, y: number, w: number): number {
        return (x + (y * w)) * 4;
    }

    protected init(pixelsUsage: number): void {
        const unionKey = this.getEffectUnionKey();
        log(`init: ${unionKey}`);

        // Step1: 取的當前的effectIndex
        if (!SpriteEffectBase._s_effectMap.has(unionKey)) {
            let effectData: EffectData = {
                data: [],
                uuids: []
            };

            effectData.data.push({
                mat: null,
                propBuffer: null,
                propTexture: null,
                isDirty: false,
            });

            SpriteEffectBase._s_effectMap.set(unionKey, effectData);
            // const temp = new Array(768).fill("");  // R/G/B (0~255) => 256 * 3 = 768
            // SpriteEffectBase._s_effectMap.set(unionKey, temp);
        }

        const effectData = SpriteEffectBase._s_effectMap.get(unionKey)!;

        this._instanceID = effectData.uuids.findIndex((v) => v === this.node.uuid);
        if (this._instanceID === -1) {
            this._instanceID = effectData.uuids.findIndex((v) => v === "");
            if (this._instanceID === -1) {
                this._instanceID = effectData.uuids.push(this.node.uuid) - 1;

                if (effectData.data.length < Math.floor(this._instanceID / 256) + 1) {
                    effectData.data.push({
                        mat: null,
                        propBuffer: null,
                        propTexture: null,
                        isDirty: false,
                    });
                }
            } else {
                effectData.uuids[this._instanceID] = this.node.uuid;
            }
        }

        const idx = Math.floor(this._instanceID / 256);
        this.color = new Color(this._instanceID % 256, pixelsUsage, 0, 255);

        // SpriteEffectBase._s_effectMap.get(unionKey)![this._instanceID] = this.node.uuid;

        // if (this.instanceGroupIdx === 0) {
        //     this.color = new Color(this._instanceID, 0, 0, 255);
        // } else if (this.instanceGroupIdx === 1) {
        //     this.color = new Color(255, (this._instanceID - 255), 0, 255);
        // } else if (this.instanceGroupIdx === 2) {
        //     this.color = new Color(255, 255, (this._instanceID - 510), 255);
        // } else {
        //     error(`The prop group index, ${this.instanceGroupIdx}, is out of range!`);
        //     return;
        // }

        // Step2: 初始化Effect props
        if (effectData.data[idx].mat === null) {
            const w = 256;
            const h = pixelsUsage;

            let propBuffer = new Float32Array(w * h * 4);
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const index = (x + (y * w)) * 4;
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

            effectData.data[idx] = {
                mat: mat,
                propBuffer: propBuffer,
                propTexture: propsTexture,
                isDirty: false
            };
        }

        this.customMaterial = effectData.data[idx].mat;

        // if (!SpriteEffectBase._s_effectProps.has(unionKey)) {
        //     const temp = new Array(3).fill(null); // Only use R/G/B 3 channels
        //     SpriteEffectBase._s_effectProps.set(unionKey, temp);
        // }

        // if (SpriteEffectBase._s_effectProps.get(unionKey)![this.instanceGroupIdx] === null) {
        //     const w = 256 * countOfProps;
        //     const h = 1;

        //     let propBuffer = new Float32Array(w * h * 4);
        //     for (let y = 0; y < h; y++) {
        //         for (let x = 0; x < w; x++) {
        //             const index = (y * w + x) * 4;
        //             propBuffer[index] = 1;
        //             propBuffer[index + 1] = 0;
        //             propBuffer[index + 2] = 1;
        //             propBuffer[index + 3] = 1;
        //         }
        //     }

        //     let propsTexture = new Texture2D();
        //     propsTexture.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
        //     propsTexture.reset({
        //         width: w,
        //         height: h,
        //         format: Texture2D.PixelFormat.RGBA32F,
        //         mipmapLevel: 0
        //     });
        //     propsTexture.uploadData(propBuffer);

        //     let mat = this.initMaterial();
        //     mat.setProperty('propsTexture', propsTexture);

        //     SpriteEffectBase._s_effectProps.get(unionKey)![this.instanceGroupIdx] = {
        //         mat: mat,
        //         propBuffer: propBuffer,
        //         propTexture: propsTexture,
        //         isDirty: false
        //     };
        // }

        // this.customMaterial = SpriteEffectBase._s_effectProps.get(unionKey)![this.instanceGroupIdx].mat;
    }

    protected reflashParams(): void {
        const unionKey = this.getEffectUnionKey();
        const idx = Math.floor(this._instanceID / 256);
        const effectProps = SpriteEffectBase._s_effectMap.get(unionKey)!.data[idx];

        // Update the effect parameters from the DERIVED class.
        this.updateParams(this._instanceID % 256, 255, effectProps.propBuffer!);

        if (EDITOR_NOT_IN_PREVIEW) {
            // In Editor mode, upload the data directly.
            effectProps.propTexture!.uploadData(effectProps.propBuffer!);
        }
        else {
            // In Preview mode, wait for the lateUpdate to upload the data.
            effectProps.isDirty = true;
        }

        // const index = this.getBufferIndex();
        // const effectProps = SpriteEffectBase._s_effectProps.get(unionKey)![this.instanceGroupIdx];

        // // Update the effect parameters from the DERIVED class.
        // this.updateParams(index, effectProps.propBuffer!);

        // if (EDITOR_NOT_IN_PREVIEW) {
        //     // In Editor mode, upload the data directly.
        //     effectProps.propTexture!.uploadData(effectProps.propBuffer!);
        // }
        // else {
        //     // In Preview mode, wait for the lateUpdate to upload the data.
        //     effectProps.isDirty = true;
        // }
    }

    /**
     * 每256個為一組
     */
    protected get instanceGroupIdx(): number {
        return Math.floor(this._instanceID / 256);
    }

    protected getBufferIndex(): number {
        const offset = this._instanceID - (this.instanceGroupIdx * 256);
        return offset * (this.pixelsUsage * 4);
    }

    /**
     * 取得 Sprite 的 UV 最小、最大值及寬高
     * @param uv 
     * @returns vec4 (minU, minV, width, height)
     */
    protected getUV(uv: number[]): Vec4 {
        let minU = Math.min(uv[0], uv[2], uv[4], uv[6]);
        let minV = Math.min(uv[1], uv[3], uv[5], uv[7]);

        let maxU = Math.max(uv[0], uv[2], uv[4], uv[6]);
        let maxV = Math.max(uv[1], uv[3], uv[5], uv[7]);

        let width = maxU - minU;
        let height = maxV - minV;

        return new Vec4(minU, minV, width, height);
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
        const unionKey = this.getEffectUnionKey();
        const effectData = SpriteEffectBase._s_effectMap.get(unionKey)!;
        const idx = effectData.uuids.findIndex((v) => v === this.node.uuid);

        if (idx === -1) {
            error("Effect index is not found!");
        } else {
            this._instanceID = -1;
            effectData!.uuids[idx] = "";
        }

        // if (SpriteEffectBase._s_effectMap.has(unionKey)) {
        //     const index = SpriteEffectBase._s_effectMap.get(unionKey)!.findIndex((v) => v === this.node.uuid);
        //     if (index === -1) {
        //         error("Effect index is not found!");
        //         return;
        //     }

        //     SpriteEffectBase._s_effectMap.get(unionKey)![index] = "";
        // } else {
        //     error(`The effect map of ${unionKey} is not found!`);
        // }
    }

    lateUpdate(dt: number): void {
        const unionKey = this.getEffectUnionKey();
        const effectData = SpriteEffectBase._s_effectMap.get(unionKey)!;

        const idx = Math.floor(this._instanceID / 256);
        const effectProps = effectData.data[idx];

        if (effectProps.isDirty) {
            effectProps.propTexture!.uploadData(effectProps.propBuffer!);
            effectProps.isDirty = false;
        }

        // const effectProps = SpriteEffectBase._s_effectProps.get(unionKey)![this.instanceGroupIdx];
        // if (effectProps.isDirty) {
        //     // log(`${this.constructor.name}'s effect props is DIRTY!`);
        //     effectProps.propTexture!.uploadData(effectProps.propBuffer!);
        //     effectProps.isDirty = false;
        // }
    }
}