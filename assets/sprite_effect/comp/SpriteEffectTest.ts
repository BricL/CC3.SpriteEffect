import { _decorator, Color, Material } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';
const { ccclass, property } = _decorator;


@ccclass('SpriteEffectTest')
export class SpriteEffectTest extends SpriteEffectBase {
    //##region myColor
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
    //##endregion


    //#region is2Din3D
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '當使用RenderRoot2D時使用' })
    public get is2Din3D(): boolean {
        return this._is2Din3D;
    }

    public set is2Din3D(val: boolean) {
        this._is2Din3D = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.sizeOfPropTexture);
            this.updateParams();
        }
        else {
            this._isPropDirty = true;
        }
    }

    @property({ group: { name: "Private Props", id: "1" }, visible: true, tooltip: '當使用RenderRoot2D時使用' })
    protected _is2Din3D: boolean = false;
    //#endregion


    /**
     * @override SpriteEffectBase
     */
    protected get sizeOfPropTexture(): number {
        return 512;
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
        let y = this._effectIndex;
        let x = 0;
        const index = (y * this.sizeOfPropTexture + x) * 4;

        let propBuffer = SpriteEffectBase._s_effectProps.get(this.getPropsUnionKey())!.propBuffer;
        propBuffer[index] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;
        SpriteEffectBase._s_effectProps.get(this.getPropsUnionKey())!.propTexture.uploadData(propBuffer);
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

