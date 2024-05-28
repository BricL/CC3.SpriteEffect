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
    public get toneMode(): ToneMode {
        return this._toneMode;
    }

    public set toneMode(val: ToneMode) {
        this._toneMode = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.countOfProps);
            this.updateParams();
        } else {
            this._isPropDirty = true;
        }
    }

    @property({ group: { name: "Private Props", id: "1" }, type: Enum(ToneMode), tooltip: "色調模式", visible: true })
    private _toneMode: ToneMode = ToneMode.NORMAL;
    //#endregion

    //#region toneFactor
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "色調程度" })
    public get toneFactor(): number {
        return this._toneFactor;
    }

    public set toneFactor(val: number) {
        this._toneFactor = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.updateParams();
        } else {
            this._isPropDirty = true;
        }
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "色調程度", visible: true })
    private _toneFactor: number = 1.0;
    //#endregion

    //#region colorMode
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Enum(ColorMode), tooltip: "顏色模式" })
    public get colorMode(): ColorMode {
        return this._colorMode;
    }

    public set colorMode(val: ColorMode) {
        this._colorMode = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.countOfProps);
            this.updateParams();
        } else {
            this._isPropDirty = true;
        }
    }

    @property({ group: { name: "Private Props", id: "1" }, type: Enum(ColorMode), tooltip: "顏色模式", visible: true })
    private _colorMode: ColorMode = ColorMode.MULT;
    //#endregion

    //#region colorFactor
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "顏色程度" })
    public get colorFactor(): number {
        return this._colorFactor;
    }

    public set colorFactor(val: number) {
        this._colorFactor = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.updateParams();
        } else {
            this._isPropDirty = true;
        }
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "顏色程度", visible: true })
    private _colorFactor: number = 1.0;
    //#endregion

    //#region blurMode
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Enum(BlurMode), tooltip: "模糊模式" })
    public get blurMode(): BlurMode {
        return this._blurMode;
    }

    public set blurMode(val: BlurMode) {
        this._blurMode = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.countOfProps);
            this.updateParams();
        } else {
            this._isPropDirty = true;
        }
    }

    @property({ group: { name: "Private Props", id: "1" }, type: Enum(BlurMode), tooltip: "模糊模式", visible: true })
    private _blurMode: BlurMode = BlurMode.NONE;
    //#endregion

    //#region blurFactor
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: "模糊程度" })
    public get blurFactor(): number {
        return this._blurFactor;
    }

    public set blurFactor(val: number) {
        this._blurFactor = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.updateParams();
        } else {
            this._isPropDirty = true;
        }
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: "模糊程度", visible: true })
    private _blurFactor: number = 1.0;
    //#endregion

    protected get countOfProps(): number {
        return 4;
    }

    protected getPropsUnionKey(): string {
        const unionKey = `${this.constructor.name}_${this._is2Din3D}_${this._toneMode}_${this._colorMode}_${this._blurMode}`;
        return unionKey;
    }

    protected updateParams(): void {
        const index = this.getBufferIndex();
        const effectProps = SpriteEffectBase._s_effectProps.get(this.getPropsUnionKey())![this.propGroupIdx];
        const baseUV = this.getUV(this.spriteFrame!.uv);

        effectProps.propBuffer[index + 0] = this._effectColor.r / 255;
        effectProps.propBuffer[index + 1] = this._effectColor.g / 255;
        effectProps.propBuffer[index + 2] = this._effectColor.b / 255;
        effectProps.propBuffer[index + 3] = this._effectColor.a / 255;

        let blurTextureSize = new Vec2(100, 100);
        if (this.spriteFrame) {
            blurTextureSize.x = Math.floor(this.spriteFrame.width * baseUV.z);
            blurTextureSize.y = Math.floor(this.spriteFrame.height * baseUV.w);
        }
        else {
            blurTextureSize.x = this.node.getComponent(UITransform)!.contentSize.width;
            blurTextureSize.y = this.node.getComponent(UITransform)!.contentSize.height;
        }

        effectProps.propBuffer[index + 4] = baseUV.x;
        effectProps.propBuffer[index + 5] = baseUV.y;
        effectProps.propBuffer[index + 6] = baseUV.z;
        effectProps.propBuffer[index + 7] = baseUV.w;

        effectProps.propBuffer[index + 8] = blurTextureSize.x;
        effectProps.propBuffer[index + 9] = blurTextureSize.y;
        effectProps.propBuffer[index + 10] = 0.0;
        effectProps.propBuffer[index + 11] = 1.0;

        effectProps.propBuffer[index + 12] = this.toneFactor;
        effectProps.propBuffer[index + 13] = this.colorFactor;
        effectProps.propBuffer[index + 14] = this.blurFactor;
        effectProps.propBuffer[index + 15] = 1.0;
        effectProps.propTexture.uploadData(effectProps.propBuffer);
    }

    protected initMaterial(): Material {
        let mat = new Material();
        let define_macro = {
            USE_BLUR: false,
            IS_GRAY: false,
            IS_NEGA: false,
            IS_SEPIA: false,
            IS_ADD: false,
            IS_SUB: false,
            IS_FILL: false,
            IS_MULT: true
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