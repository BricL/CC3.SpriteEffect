import { _decorator } from 'cc';
import { EffectBase } from './EffectBase';
import { Material } from 'cc';
import { error } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('EffectWaterRipple')
export class EffectWaterRipple extends EffectBase {
    //#region speed
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲速度' })
    public get speed(): number {
        return this._speed;
    }

    public set speed(val: number) {
        this._speed = val;
        this._setParamsDirty('_speed');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲速度', visible: true })
    private _speed: number = 0.1;
    //#endregion

    
    protected _instMaterial(): void {
        if (this.effectAsset) {
            let mat = new Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                defines: { USE_Brightness: true },
                technique: this._is2Din3D ? 1 : 0
            });

            this._setParams('_speed', mat.passes[0].getHandle('_speed'));

            this._sprite.customMaterial = mat;
        }
        else {
            error('EffectWaterRipple: effectAsset is null');
        }
    }

    protected _updateParams(key: string, idx: number): void {
        if (key === '_speed') {
            this._sprite.material?.passes[0].setUniform(idx, this._speed);
        }
    }
}


