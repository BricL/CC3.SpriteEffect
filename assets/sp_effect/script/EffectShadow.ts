import { Enum, _decorator } from 'cc';
import { EffectBase } from './EffectBase';
import { error } from 'cc';
import { Color } from 'cc';
import { Vec2 } from 'cc';
import { Material } from 'cc';

const { ccclass, property } = _decorator;

export enum ShadowType {
    LIMITED_BOUND,
    NORMAL
}

@ccclass('EffectShadow')
export class EffectShadow extends EffectBase {
    //#region ShadowType
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Enum(ShadowType), tooltip: "陰影模式" })
    public get shadowType(): ShadowType {
        return this._shadowType;
    }

    public set shadowType(val: ShadowType) {
        this._shadowType = val;
        this._setParamsDirty('_shadowType');
    }

    @property({ group: { name: "Private Props", id: "1" }, tooltip: "陰影模式", visible: true })
    private _shadowType: ShadowType = ShadowType.LIMITED_BOUND;
    //#endregion


    //#region ShadowColor
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: "陰影顏色" })
    public get shadowColor(): Color {
        return this._shadowColor;
    }

    public set shadowColor(val: Color) {
        this._shadowColor.set(val);
        this._setParamsDirty('_shadowColor');
    }

    @property({ group: { name: "Private Props", id: "1" }, tooltip: "陰影顏色", visible: true })
    private _shadowColor: Color = new Color(0, 0, 0, 1.0);
    //#endregion


    //#region Offset
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: "偏移量" })
    public get offset(): Vec2 {
        return this._offset;
    }

    public set offset(val: Vec2) {
        this._offset.set(val);
        this._setParamsDirty('_offset');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "偏移量", visible: true })
    private _offset: Vec2 = new Vec2(0.1, 0.1);
    //#endregion

    
    protected _instMaterial(): void {
        if (!this._sprite.customMaterial) {
            if (this.effectAsset) {
                let mat: Material = new Material();
                mat.initialize({
                    effectAsset: this.effectAsset,
                    defines: { USE_TEXTURE: true }
                });

                this._setParams('_shadowType', -1);
                this._setParams('_shadowColor', mat.passes[0].getHandle('_shadowColor'));
                this._setParams('_offset', mat.passes[0].getHandle('_offset'));

                this._sprite.customMaterial = mat;
            }
            else {
                error('EffectShadow._instMaterial: effectAsset is null');
            }
        }
    }

    protected _updateParams(key: string, idx: number): void {
        if (key === '_shadowColor') {
            this._sprite.material?.passes[0].setUniform(idx, this._shadowColor);
        }
        else if (key === '_offset') {
            this._sprite.material?.passes[0].setUniform(idx, this._offset);
        }
        else if (key === '_shadowType') {
            let mat: Material = new Material();
            switch(this._shadowType) {
                case ShadowType.LIMITED_BOUND:
                    mat.initialize({
                        effectAsset: this.effectAsset,
                        defines: { USE_TEXTURE: true },
                        technique: 0
                    });
                    break;
                case ShadowType.NORMAL:
                    mat.initialize({
                        effectAsset: this.effectAsset,
                        defines: { USE_TEXTURE: true },
                        technique: 1
                    });
                    break;
            }

            this._setParams('_shadowType', -1);
            this._setParams('_shadowColor', mat.passes[0].getHandle('_shadowColor'));
            this._setParams('_offset', mat.passes[0].getHandle('_offset'));

            this._sprite.customMaterial = mat;
        }
    }
}


