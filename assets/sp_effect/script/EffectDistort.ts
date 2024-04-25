import { Material } from 'cc';
import { error } from 'cc';
import { Texture2D } from 'cc';
import { _decorator } from 'cc';
import { EDITOR, PREVIEW } from 'cc/env'
import { EffectBase } from './EffectBase';

const { ccclass, requireComponent, executeInEditMode, property } = _decorator;

@ccclass('EffectDistort')
export class EffectDistort extends EffectBase {
    @property({ type: Texture2D, tooltip: '指定噪声貼圖' })
    public noiseTexture: Texture2D | null = null;

    //#region speed
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲速度' })
    public get speed(): number {
        return this._speed;
    }

    public set speed(val: number) {
        this._speed = val;
        this._setParamsDirty('_speed');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲速度', visible: true })
    private _speed: number = 0.05;
    //#endregion


    //#region strength
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲强度' })
    public get strength(): number {
        return this._strength;
    }

    public set strength(val: number) {
        this._strength = val;
        this._setParamsDirty('_strength');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲强度', visible: true })
    private _strength: number = 0.05;
    //#endregion


    protected _instMaterial(): void {
        if (this.effectAsset && this.noiseTexture) {
            let mat: Material = new Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                defines: {},
                technique: this._is2Din3D ? 1 : 0
            });

            mat.setProperty('_noiseTexture', this.noiseTexture);

            this._setParams('_baseUV', mat.passes[0].getHandle('_baseUV'));
            this._setParams('_speed', mat.passes[0].getHandle('_speed'));
            this._setParams('_strength', mat.passes[0].getHandle('_strength'));

            this._sprite.customMaterial = mat;
        }
        else {
            error('EffectDistort: effectAsset or noise texture is null');
        }
    }

    protected _updateParams(key: string, idx: number): void {
        if (key === '_baseUV') {
            this._sprite.material?.passes[0].setUniform(idx, this._getUV(this._sprite.spriteFrame.uv));
        }
        else if (key === '_speed') {
            this._sprite.material?.passes[0].setUniform(idx, this._speed);
        }
        else if (key === '_strength') {
            this._sprite.material?.passes[0].setUniform(idx, this._strength);
        }
    }
}


