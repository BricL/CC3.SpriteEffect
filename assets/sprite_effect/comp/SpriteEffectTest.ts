import { _decorator, Color, Material } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';
const { ccclass, property } = _decorator;


@ccclass('SpriteEffectTest')
export class SpriteEffectTest extends SpriteEffectBase {
    //#region myColor
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

    @property({ group: { name: "Private Props", id: "1" }, visible: true })
    private _effectColor: Color = new Color(255, 255, 255, 255);
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

    @property({ group: { name: "Private Props", id: "1" }, visible: true, tooltip: '當使用RenderRoot2D時使用' })
    protected _is2Din3D: boolean = false;
    //#endregion

     //#region override
    /**
     * @override SpriteEffectBase
     */
    protected get countOfProps(): number {
        return 1;
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
    protected updateParams(): void {
        // TestEffect only use one effect prop, index 0.
        let quotient = this._effectIndex / 256;
        let fractional = quotient - Math.floor(quotient);
        let x = Math.floor(fractional * (256 * this.countOfProps));
        const index = x * 4;

        const effectProps = SpriteEffectBase._s_effectProps.get(this.getPropsUnionKey())![this.propGroupIdx];
        effectProps.propBuffer[index] = this._effectColor.r / 255;
        effectProps.propBuffer[index + 1] = this._effectColor.g / 255;
        effectProps.propBuffer[index + 2] = this._effectColor.b / 255;
        effectProps.propBuffer[index + 3] = this._effectColor.a / 255;
        effectProps.propTexture.uploadData(effectProps.propBuffer);
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
        return mat;
    }
}

