import { _decorator, CCBoolean, Color, Component, EffectAsset, Input, input, KeyCode, log, Material, Node, Sprite, Texture2D } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { EffectBase, EffectPropsType } from './EffectBase';
const { ccclass, property } = _decorator;

const sizeOfPropTexture = 512;

@ccclass('EffectTest')
export class EffectTest extends EffectBase {
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

    /**
     * @override EffectBase
     */
    protected getPropsUnionKey(): string {
        return this.constructor.name;
    }

    /**
     * @override EffectBase
     */
    protected updateParams(): void {
        // TestEffect only use one effect prop, index 0.
        let y = this._effectIndex;
        let x = 0;
        const index = (y * sizeOfPropTexture + x) * 4;

        let propBuffer = EffectBase._s_effectProps.get(this.getPropsUnionKey())!.propBuffer;
        propBuffer[index] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;
        EffectBase._s_effectProps.get(this.getPropsUnionKey())!.propTexture.uploadData(propBuffer);
    }

    /**
     * @override EffectBase
     */
    protected initMaterial(): Material {
        let mat = new Material();
        mat.initialize(
            {
                effectAsset: this.effectAsset,
                effectName: 'sprite'
            }
        );
        return mat;
    }

    onLoad(): void {
        this.init(sizeOfPropTexture);
    }

    start() {
        this.updateParams();
    }
}

