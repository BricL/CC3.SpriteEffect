import { Material, log } from 'cc';
import { _decorator } from 'cc';
import { EffectBase } from '../script/EffectBase';
import { error } from 'cc';
import { Enum } from 'cc';
import { EDITOR, PREVIEW } from 'cc/env'
import { Vec2 } from 'cc';
import { math } from 'cc';
import { UITransform } from 'cc';

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

@ccclass('EffectColor')
export class EffectColor extends EffectBase {
    //#region toneMode
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Enum(ToneMode), tooltip: "色調模式" })
    public get toneMode(): ToneMode {
        return this._toneMode;
    }

    public set toneMode(val: ToneMode) {
        this._toneMode = val;
        this._setParamsDirty('_toneMode');
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
        this._setParamsDirty('_toneFactor');
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
        this._setParamsDirty('_colorMode');
    }

    @property({ group: { name: "Private Props", id: "1" }, type: Enum(ColorMode), tooltip: "顏色模式", visible: true })
    private _colorMode: ColorMode = ColorMode.MULT;
    //#endregion


    //#region colorFactor
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "顏色程度"})
    public get colorFactor(): number {
        return this._colorFactor;
    }

    public set colorFactor(val: number) {
        this._colorFactor = val;
        this._setParamsDirty('_colorFactor');
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
        this._setParamsDirty('_blurMode');
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
        this._setParamsDirty('_blurFactor');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: "模糊程度", visible: true })
    private _blurFactor: number = 1.0;
    //#endregion

    private _blurTextureSize: Vec2 = new Vec2(100, 100);
    private _contentSize: math.Size = new math.Size(100, 100);
    
    private _define_macro = {
        USE_COLOR_TONE_TRANSFORM: true,
        USE_NORMALIZE_UV: true,
        USE_BLUR: false,

        IS_GRAY: false,
        IS_NEGA: false,
        IS_SEPIA: false,
        IS_ADD: false,
        IS_SUB: false,
        IS_FILL: false,
        IS_MULT: false
    };

    protected _instMaterial(): void {
        this._contentSize = this._sprite.getComponent(UITransform).contentSize;

        if (this.effectAsset) {
            switch (this._toneMode) {
                case ToneMode.GRAY:
                    this._define_macro.IS_GRAY = true;
                    break;
                case ToneMode.NEGA:
                    this._define_macro.IS_NEGA = true;
                    break;
                case ToneMode.SEPIA:
                    this._define_macro.IS_SEPIA = true;
                    break;
                case ToneMode.NORMAL:
                    break;
            };

            switch (this._colorMode) {
                case ColorMode.ADD:
                    this._define_macro.IS_ADD = true;
                    break;
                case ColorMode.SUB:
                    this._define_macro.IS_SUB = true;
                    break;
                case ColorMode.FILL:
                    this._define_macro.IS_FILL = true;
                    break;
                case ColorMode.MULT:
                    this._define_macro.IS_MULT = true;
                    break;
            }

            switch (this._blurMode) {
                case BlurMode.NONE:
                    this._define_macro.USE_BLUR = false;
                    break;
                case BlurMode.GAUSSIAN:
                    this._define_macro.USE_BLUR = true;
                    break;
            }

            this._reflashMaterial();
        }
        else {
            error('EffectColor._instMaterial: effectAsset is null');
        }
    }

    private _reflashMaterial(): void {
        let mat: Material = new Material();
        mat.initialize({
            effectAsset: this.effectAsset,
            defines: this._define_macro,
            technique: this._is2Din3D ? 1 : 0
        });

        this._setParams('_toneMode', -1);
        this._setParams('_colorMode', -1);
        this._setParams('_blurMode', -1);
        this._setParams('_baseUV', mat.passes[0].getHandle('baseUV'));
        this._setParams('_toneFactor', mat.passes[0].getHandle('toneFactor'));
        this._setParams('_colorFactor', mat.passes[0].getHandle('colorFactor'));
        this._setParams('_blurTextureSize', mat.passes[0].getHandle('blurTextureSize'));
        this._setParams('_blurFactor', mat.passes[0].getHandle('blurFactor'));

        this._sprite.customMaterial = mat;
    }

    protected _updateParams(key: string, idx: number): void {
        if (key === '_baseUV') {
            this._sprite.material?.passes[0].setUniform(idx, this._getUV(this._sprite.spriteFrame.uv));
        }
        else if (key === '_toneFactor') {
            this._sprite.material?.passes[0].setUniform(idx, this._toneFactor);
        }
        else if (key === '_colorFactor') {
            this._sprite.material?.passes[0].setUniform(idx, this._colorFactor);
        }
        else if (key === '_blurTextureSize') {
            const baseUV = this._getUV(this._sprite.spriteFrame.uv);

            if (this._sprite.spriteFrame) {
                this._blurTextureSize.x = Math.floor(this._sprite.spriteFrame.width * baseUV.z);
                this._blurTextureSize.y = Math.floor(this._sprite.spriteFrame.height * baseUV.w);
            }
            else {
                this._blurTextureSize.x = this._contentSize.width;
                this._blurTextureSize.y = this._contentSize.height;
            }

            this._sprite.material?.passes[0].setUniform(idx, this._blurTextureSize);
        }
        else if (key === '_blurFactor') {
            this._sprite.material?.passes[0].setUniform(idx, math.lerp(0.0, 1.0, this._blurFactor));
        }
        else if (key === '_toneMode') {
            this._define_macro.IS_GRAY = false;
            this._define_macro.IS_NEGA = false;
            this._define_macro.IS_SEPIA = false;

            switch (this._toneMode) {
                case ToneMode.GRAY:
                    this._define_macro.IS_GRAY = true;
                    break;
                case ToneMode.NEGA:
                    this._define_macro.IS_NEGA = true;
                    break;
                case ToneMode.SEPIA:
                    this._define_macro.IS_SEPIA = true;
                    break;
                case ToneMode.NORMAL:
                    break;
            };

            this._reflashMaterial();
        }
        else if (key === '_colorMode') {
            this._define_macro.IS_ADD = false;
            this._define_macro.IS_SUB = false;
            this._define_macro.IS_FILL = false;
            this._define_macro.IS_MULT = false;

            switch (this._colorMode) {
                case ColorMode.ADD:
                    this._define_macro.IS_ADD = true;
                    break;
                case ColorMode.SUB:
                    this._define_macro.IS_SUB = true;
                    break;
                case ColorMode.FILL:
                    this._define_macro.IS_FILL = true;
                    break;
                case ColorMode.MULT:
                    this._define_macro.IS_MULT = true;
                    break;
            }

            this._reflashMaterial();
        }
        else if (key === '_blurMode') {
            switch (this._blurMode) {
                case BlurMode.NONE:
                    this._define_macro.USE_BLUR = false;
                    break;
                case BlurMode.GAUSSIAN:
                    this._define_macro.USE_BLUR = true;
                    break;
            }

            this._reflashMaterial();
        }
    }

    protected _is2Din3DChanged(enable: boolean) {
        this._reflashMaterial();
    }
}


