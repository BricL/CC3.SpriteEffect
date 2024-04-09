import { _decorator, Component, error, Material, Node, Vec2 } from 'cc';
import { EffectBase } from './EffectBase';
const { ccclass, property } = _decorator;

@ccclass('EffectColorizing')
export class EffectColorizing extends EffectBase {
    // #region rChannel
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定R通道Remap顏色最小值' })
    public get rChannelMin(): number {
        return this._rChannelMin;
    }

    public set rChannelMin(val: number) {
        this._rChannelMin = val;
        this._setParamsDirty('rChannel');
    }

    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定R通道Remap顏色最大值' })
    public get rChannelMax(): number {
        return this._rChannelMax;
    }

    public set rChannelMax(val: number) {
        this._rChannelMax = val;
        this._setParamsDirty('rChannel');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定R通道Remap顏色最小值', visible: true })
    private _rChannelMin: number = 0;
    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定R通道Remap顏色最大值', visible: true })
    private _rChannelMax: number = 1;
    // #endregion

    // #region gChannel
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定G通道Remap顏色最小值' })
    public get gChannelMin(): number {
        return this._gChannelMin;
    }

    public set gChannelMin(val: number) {
        this._gChannelMin = val;
        this._setParamsDirty('gChannel');
    }

    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定G通道填Remap顏色最大值' })
    public get gChannelMax(): number {
        return this._gChannelMax;
    }

    public set gChannelMax(val: number) {
        this._gChannelMax = val;
        this._setParamsDirty('gChannel');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定G通道Remap顏色最小值', visible: true })
    private _gChannelMin: number = 0;
    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定G通道Remap顏色最大值', visible: true })
    private _gChannelMax: number = 1;
    // #endregion

    // #region bChannel
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定B通道Remap顏色最小值' })
    public get bChannelMin(): number {
        return this._bChannelMin;
    }

    public set bChannelMin(val: number) {
        this._bChannelMin = val;
        this._setParamsDirty('bChannel');
    }

    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定B通道Remap顏色最大值' })
    public get bChannelMax(): number {
        return this._bChannelMax;
    }

    public set bChannelMax(val: number) {
        this._bChannelMax = val;
        this._setParamsDirty('bChannel');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定B通道Remap顏色最小值', visible: true })
    private _bChannelMin: number = 0;
    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定B通道Remap顏色最大值', visible: true })
    private _bChannelMax: number = 1;
    // #endregion

    protected _instMaterial(): void {
        if (this.effectAsset) {
            let mat = new Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                technique: this._is2Din3D ? 1 : 0
            });

            this._setParams('rChannel', mat.passes[0].getHandle('rChannel'));
            this._setParams('gChannel', mat.passes[0].getHandle('gChannel'));
            this._setParams('bChannel', mat.passes[0].getHandle('bChannel'));

            this._sprite.customMaterial = mat;
        }
        else {
            error(`${this.constructor.name}: effectAsset or noise texture is null`);
        }
    }

    protected _updateParams(key: string, idx: number): void {
        if (key === 'rChannel') {
            this._sprite.material?.passes[0].setUniform(idx, new Vec2(this._rChannelMin, this._rChannelMax));
        }
        else if (key === 'gChannel') {
            this._sprite.material?.passes[0].setUniform(idx, new Vec2(this._gChannelMin, this._gChannelMax));
        }
        else if (key === 'bChannel') {
            this._sprite.material?.passes[0].setUniform(idx, new Vec2(this._bChannelMin, this._bChannelMax));
        }
    }
}

