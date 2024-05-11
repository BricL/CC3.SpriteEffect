import { _decorator } from 'cc';
import { EffectBase } from './EffectBase';
import { error } from 'cc';
import { Material } from 'cc';
import { Vec2 } from 'cc';
import { UITransform } from 'cc';
import { math } from 'cc';
import { EDITOR, PREVIEW } from 'cc/env'

const { ccclass, property } = _decorator;

@ccclass('EffectGaussianBlur')
export class EffectGaussianBlur extends EffectBase {
    //#region blur
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '模糊程度' })
    public get blur(): number {
        return this._blur;
    }

    public set blur(val: number) {
        this._blur = val;
        this._setParamsDirty('_blur');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '模糊程度', visible: true })
    private _blur: number = 0.5;
    //#endregion


    private _blurTextureSize: Vec2 = new Vec2(100, 100);
    private _contentSize: math.Size = new math.Size(100, 100);

    protected _instMaterial(): void {
        if (this.effectAsset) {
            let mat: Material = new Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                technique: this._is2Din3D ? 1 : 0
            });

            this._contentSize = this._sprite!.getComponent(UITransform)!.contentSize;

            this._setParams('_baseUV', mat.passes[0].getHandle('_baseUV'));
            this._setParams('_textureSize', mat.passes[0].getHandle('_textureSize'));
            this._setParams('_blur', mat.passes[0].getHandle('_blur'));

            this._sprite!.customMaterial = mat;
        }
        else {
            error('EffectDistort: effectAsset is null');
        }
    }

    protected _updateParams(key: string, idx: number): void {
        if (key === '_baseUV') {
            this._sprite!.material?.passes[0].setUniform(idx, this._getUV(this._sprite!.spriteFrame!.uv));
        }
        else if (key === '_textureSize') {
            const baseUV = this._getUV(this._sprite!.spriteFrame!.uv);

            if (this._sprite!.spriteFrame) {
                this._blurTextureSize.x = Math.floor(this._sprite!.spriteFrame.width * baseUV.z);
                this._blurTextureSize.y = Math.floor(this._sprite!.spriteFrame.height * baseUV.w);
            }
            else {
                this._blurTextureSize.x = this._contentSize.width;
                this._blurTextureSize.y = this._contentSize.height;
            }

            this._sprite!.material?.passes[0].setUniform(idx, this._blurTextureSize);
        }
        else if (key === '_blur') {
            this._sprite!.material?.passes[0].setUniform(idx, this._blur);
        }
    }
}


