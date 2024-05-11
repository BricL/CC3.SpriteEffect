import { _decorator, Component, Node } from 'cc';
import { EffectBase } from './EffectBase';
import { Material } from 'cc';
import { Texture2D } from 'cc';
import { error } from 'cc';
import { Vec2 } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('EffectWaterFlow')
export class EffectWaterFlow extends EffectBase {
    @property({ type: Texture2D, tooltip: '指定噪声貼圖' })
    public noiseTexture: Texture2D | null = null;

    //#region frequency
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 10, 0.01], tooltip: '扭曲频率' })
    public get frequency(): number {
        return this._frequency;
    }

    public set frequency(val: number) {
        this._frequency = val;
        this._setParamsDirty('_frequency');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 10, 0.01], tooltip: '扭曲频率', visible: true })
    private _frequency: number = 0.1;
    //#endregion


    //#region amplitude
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲幅度' })
    public get amplitude(): number {
        return this._amplitude;
    }

    public set amplitude(val: number) {
        this._amplitude = val;
        this._setParamsDirty('_amplitude');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲幅度', visible: true })
    private _amplitude: number = 0.02;
    //#endregion


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


    //#region flowDirection
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '流动方向' })
    public get flowDirection(): Vec2 {
        return this._flowDirection;
    }

    public set flowDirection(val: Vec2) {
        this._flowDirection.set(val);
        this._setParamsDirty('_flowDirection');
    }

    @property({ group: { name: "Private Props", id: "1" }, tooltip: '流动方向' })
    private _flowDirection: Vec2 = new Vec2(1, 0);
    //#endregion


    protected _instMaterial(): void {
        if (this.effectAsset && this.noiseTexture) {
            let mat = new Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                defines: { USE_TEXTURE: true },
                technique: this._is2Din3D ? 1 : 0
            });

            mat.setProperty('_noticeTex', this.noiseTexture);

            this._setParams('_frequency', mat.passes[0].getHandle('_frequency'));
            this._setParams('_amplitude', mat.passes[0].getHandle('_amplitude'));
            this._setParams('_speed', mat.passes[0].getHandle('_speed'));
            this._setParams('_flowDirection', mat.passes[0].getHandle('_flowDir'));

            this._sprite!.customMaterial = mat;
        }
        else {
            error('EffectWaterFlow: effectAsset or noise texture is null');
        }
    }

    protected _updateParams(key: string, idx: number): void {
        if (key === '_frequency') {
            this._sprite!.material?.passes[0].setUniform(idx, this._frequency);
        }
        else if (key === '_amplitude') {
            this._sprite!.material?.passes[0].setUniform(idx, this._amplitude);
        }
        else if (key === '_speed') {
            this._sprite!.material?.passes[0].setUniform(idx, this._speed);
        }
        else if (key === '_flowDirection') {
            this._sprite!.material?.passes[0].setUniform(idx, this._flowDirection);
        }
    }
}


