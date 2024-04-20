import { _decorator } from 'cc';
import { EffectBase } from './EffectBase';
import { error } from 'cc';
import { Material } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('EffectWaterWave')
export class EffectWaterWave extends EffectBase {
    //#region offset
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '偏移量' })
    public get offset(): number {
        return this._offset;
    }

    public set offset(val: number) {
        this._offset = val;
        this._setParamsDirty('_offset');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '偏移量', visible: true })
    private _offset: number = 0.5;
    //#endregion


    //#region waveWidth
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '水波寬' })
    public get waveWidth(): number {
        return this._waveWidth;
    }

    public set waveWidth(val: number) {
        this._waveWidth = val;
        this._setParamsDirty('_waveWidth');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '水波寬', visible: true })
    private _waveWidth: number = 20.0;
    //#endregion


    //#region waveHeight
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '水波高' })
    public get waveHeight(): number {
        return this._waveHeight;
    }

    public set waveHeight(val: number) {
        this._waveHeight = val;
        this._setParamsDirty('_waveHeight');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '水波高', visible: true })
    private _waveHeight: number = 0.01;
    //#endregion


    //#region waveSpeed
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '速度' })
    public get waveSpeed(): number {
        return this._waveSpeed;
    }

    public set waveSpeed(val: number) {
        this._waveSpeed = val;
        this._setParamsDirty('_waveSpeed');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '速度', visible: true })
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

            this._setParams('_offset', mat.passes[0].getHandle('_offset'));
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
        if (key === '_offset') {
            this._sprite.customMaterial?.passes[0].setUniform(idx, 1.0 - this._offset);
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


