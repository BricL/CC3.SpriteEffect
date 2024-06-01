import { _decorator, Color, Material, Texture2D } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';
const { ccclass, property } = _decorator;


@ccclass('SpriteEffectDissolve')
export class SpriteEffectDissolve extends SpriteEffectBase {
    @property({ type: Texture2D, tooltip: "指定噪聲貼圖" })
    public noiseTexture: Texture2D | null = null;

    //#region dissolveColor
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: "溶解顏色" })
    public set dissolveColor(val: Color) {
        this._dissolveColor.set(val);

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }

    public get dissolveColor(): Color {
        return this._dissolveColor;
    }

    @property
    private _dissolveColor: Color = new Color(0, 0, 0, 1);
    //#endregion


    //#region effectFactor
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "溶解程度" })
    public set factor(val: number) {
        this._factor = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }

    public get factor(): number {
        return this._factor;
    }

    @property
    private _factor: number = 0.5;
    //#endregion


    //#region softness
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "柔邊程度" })
    public set softness(val: number) {
        this._softness = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }

    public get softness(): number {
        return this._softness;
    }

    @property
    private _softness: number = 0.1;
    //#endregion


    //#region width
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "溶解寬度" })
    public set width(val: number) {
        this._width = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }

    public get width(): number {
        return this._width;
    }

    @property
    private _width: number = 0.1;
    //#endregion

    //#region override
    /**
     * @override SpriteEffectBase
     */
    protected get countOfUsedFloats(): number {
        return 16;
    }

    /**
     * @override SpriteEffectBase
     */
    protected getPropsUnionKey(): string {
        return `${this.constructor.name}_${this._is2Din3D}`;
    }

    /**
     * @override SpriteEffectBase
     */
    protected updateParams(index: number, propBuffer: Float32Array): void {
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;

        propBuffer[index + 4] = this._dissolveColor.r / 255;
        propBuffer[index + 5] = this._dissolveColor.g / 255;
        propBuffer[index + 6] = this._dissolveColor.b / 255;
        propBuffer[index + 7] = this._dissolveColor.a / 255;

        propBuffer[index + 8] = this._factor;
        propBuffer[index + 9] = this._softness;
        propBuffer[index + 10] = this._width;
    }

    /**
     * @override SpriteEffectBase
     */
    protected initMaterial(): Material {
        let mat = new Material();
        mat.initialize(
            {
                effectAsset: this.effectAsset,
                defines: {},
                technique: this._is2Din3D ? 1 : 0
            }
        );

        mat.setProperty('noiseTexture', this.noiseTexture);
        return mat;
    }
}

