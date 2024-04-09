import { _decorator } from 'cc';
import { EffectBase } from './EffectBase';
import { error } from 'cc';
import { Material } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('EffectWaterWave')
export class EffectWaterWave extends EffectBase {
    //#region horizontalPlane
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '水平面' })
    public get horizontalPlane(): number {
        return this._horizontalPlane;
    }

    public set horizontalPlane(val: number) {
        this._horizontalPlane = val;
        this._setParamsDirty('_horizontalPlane');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '水平面', visible: true })
    private _horizontalPlane: number = 0.5;
    //#endregion


    //#region waveWidth
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '波宽' })
    public get waveWidth(): number {
        return this._waveWidth;
    }

    public set waveWidth(val: number) {
        this._waveWidth = val;
        this._setParamsDirty('_waveWidth');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '波宽', visible: true })
    private _waveWidth: number = 20.0;
    //#endregion


    //#region waveHeight
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '波高' })
    public get waveHeight(): number {
        return this._waveHeight;
    }

    public set waveHeight(val: number) {
        this._waveHeight = val;
        this._setParamsDirty('_waveHeight');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '波高', visible: true })
    private _waveHeight: number = 0.01;
    //#endregion


    //#region waveSpeed
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '波速' })
    public get waveSpeed(): number {
        return this._waveSpeed;
    }

    public set waveSpeed(val: number) {
        this._waveSpeed = val;
        this._setParamsDirty('_waveSpeed');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '波速', visible: true })
    private _waveSpeed: number = 10.0;
    //#endregion


    protected _instMaterial(): void {
        if (this.effectAsset) {
            let mat: Material = new Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                defines: { USE_TEXTURE: true },
                technique: this._is2Din3D ? 1 : 0
            });

            this._setParams('_horizontalPlane', mat.passes[0].getHandle('_horizontalPlane'));
            this._setParams('_waveWidth', mat.passes[0].getHandle('_waveWidth'));
            this._setParams('_waveHeight', mat.passes[0].getHandle('_waveHeight'));
            this._setParams('_waveSpeed', mat.passes[0].getHandle('_waveSpeed'));

            this._sprite.customMaterial = mat;
        }
        else {
            error('EffectWaterWave._instMaterial: effectAsset is null');
        }
    }

    protected _updateParams(key: string, idx: number): void {
        if (key === '_horizontalPlane') {
            this._sprite.customMaterial?.passes[0].setUniform(idx, 1.0 - this._horizontalPlane);
        }
        else if (key === '_waveWidth') {
            this._sprite.customMaterial?.passes[0].setUniform(idx, this._waveWidth);
        }
        else if (key === '_waveHeight') {
            this._sprite.customMaterial?.passes[0].setUniform(idx, this._waveHeight);
        }
        else if (key === '_waveSpeed') {
            this._sprite.customMaterial?.passes[0].setUniform(idx, this._waveSpeed);
        }
    }
}


