import { _decorator, Enum, log, Material, Texture2D, UITransform, Vec2 } from 'cc';
import { EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';

const { ccclass, property } = _decorator;

export enum ToneMode {
    GRAY,
    NEGA,
    SEPIA,
    NORMAL
}

export enum ColorMode {
    ADD,
    SUB,
    FILL,
    MULT
}

export enum BlurMode {
    NONE,
    GAUSSIAN
}

@ccclass('SpriteEffectColor')
export class SpriteEffectColor extends SpriteEffectBase {
    //#region toneMode
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Enum(ToneMode), tooltip: "色調模式" })
    public set toneMode(val: ToneMode) {
        this._toneMode = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get toneMode(): ToneMode {
        return this._toneMode;
    }

    @property({ type: Enum(ToneMode) })
    private _toneMode: ToneMode = ToneMode.NORMAL;
    //#endregion

    //#region toneFactor
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "色調程度" })
    public set toneFactor(val: number) {
        this._toneFactor = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get toneFactor(): number {
        return this._toneFactor;
    }

    @property
    private _toneFactor: number = 1.0;
    //#endregion

    //#region colorMode
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Enum(ColorMode), tooltip: "顏色模式" })
    public set colorMode(val: ColorMode) {
        this._colorMode = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get colorMode(): ColorMode {
        return this._colorMode;
    }

    @property({ type: Enum(ColorMode) })
    private _colorMode: ColorMode = ColorMode.MULT;
    //#endregion

    //#region colorFactor
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "顏色程度" })
    public set colorFactor(val: number) {
        this._colorFactor = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get colorFactor(): number {
        return this._colorFactor;
    }

    @property
    private _colorFactor: number = 1.0;
    //#endregion

    //#region blurMode
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Enum(BlurMode), tooltip: "模糊模式" })
    public set blurMode(val: BlurMode) {
        this._blurMode = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get blurMode(): BlurMode {
        return this._blurMode;
    }

    @property({ type: Enum(BlurMode) })
    private _blurMode: BlurMode = BlurMode.NONE;
    //#endregion

    //#region blurFactor
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: "模糊程度" })
    public set blurFactor(val: number) {
        this._blurFactor = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get blurFactor(): number {
        return this._blurFactor;
    }

    @property
    private _blurFactor: number = 1.0;
    //#endregion


    //#region override
    protected get floatUsage(): number {
        return 13;
    }

    protected getEffectUnionKey(): string {
        const unionKey = `${this.constructor.name}_${this._is2Din3D}_${this._toneMode}_${this._colorMode}_${this._blurMode}`;
        return unionKey;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override updateParams(idx: number, textureWidth: number, propBuffer: Float32Array): void {
        const baseUV = this.getUV(this.spriteFrame!.uv);

        let blurTextureSize = new Vec2(100, 100);
        if (this.spriteFrame) {
            blurTextureSize.x = Math.floor(this.spriteFrame.width * baseUV.z);
            blurTextureSize.y = Math.floor(this.spriteFrame.height * baseUV.w);
        }
        else {
            blurTextureSize.x = this.node.getComponent(UITransform)!.contentSize.width;
            blurTextureSize.y = this.node.getComponent(UITransform)!.contentSize.height;
        }

        let index = this.calBufferIndex(idx, 0, textureWidth);
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;

        index = this.calBufferIndex(idx, 1, textureWidth);
        propBuffer[index + 4] = baseUV.x;
        propBuffer[index + 5] = baseUV.y;
        propBuffer[index + 6] = baseUV.z;
        propBuffer[index + 7] = baseUV.w;

        index = this.calBufferIndex(idx, 2, textureWidth);
        propBuffer[index + 8] = blurTextureSize.x;
        propBuffer[index + 9] = blurTextureSize.y;
        propBuffer[index + 10] = 0.0;
        propBuffer[index + 11] = 1.0;

        index = this.calBufferIndex(idx, 3, textureWidth);
        propBuffer[index + 12] = this.toneFactor;
        propBuffer[index + 13] = this.colorFactor;
        propBuffer[index + 14] = this.blurFactor;
        propBuffer[index + 15] = 1.0;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override initMaterial(): Material {
        let mat = new Material();
        let define_macro = {
            SAMPLE_FROM_RT: this._sampleFromRT,
            USE_BLUR: false,
            IS_GRAY: false,
            IS_NEGA: false,
            IS_SEPIA: false,
            IS_ADD: false,
            IS_SUB: false,
            IS_FILL: false,
            IS_MULT: true,
        };

        switch (this._toneMode) {
            case ToneMode.GRAY:
                define_macro.IS_GRAY = true;
                break;
            case ToneMode.NEGA:
                define_macro.IS_NEGA = true;
                break;
            case ToneMode.SEPIA:
                define_macro.IS_SEPIA = true;
                break;
        };

        switch (this._colorMode) {
            case ColorMode.ADD:
                define_macro.IS_ADD = true;
                break;
            case ColorMode.SUB:
                define_macro.IS_SUB = true;
                break;
            case ColorMode.FILL:
                define_macro.IS_FILL = true;
                break;
            case ColorMode.MULT:
                define_macro.IS_MULT = true;
                break;
        }

        switch (this._blurMode) {
            case BlurMode.NONE:
                define_macro.USE_BLUR = false;
                break;
            case BlurMode.GAUSSIAN:
                define_macro.USE_BLUR = true;
                break;
        }

        mat.initialize({
            effectAsset: this.effectAsset,
            defines: define_macro,
            technique: this._is2Din3D ? 1 : 0
        });

        return mat;
    }
}