import { _decorator, Material } from 'cc';
import { EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';
const { ccclass, property } = _decorator;


@ccclass('SpriteEffectColorizing')
export class SpriteEffectColorizing extends SpriteEffectBase {
    // #region rChannel
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定R通道Remap顏色最小值' })
    public set rChannelMin(val: number) {
        this._rChannelMin = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }

    public get rChannelMin(): number {
        return this._rChannelMin;
    }

    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定R通道Remap顏色最大值' })
    public set rChannelMax(val: number) {
        this._rChannelMax = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }

    public get rChannelMax(): number {
        return this._rChannelMax;
    }

    @property
    private _rChannelMin: number = 0;
    @property
    private _rChannelMax: number = 1;
    // #endregion


    // #region gChannel
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定G通道Remap顏色最小值' })
    public set gChannelMin(val: number) {
        this._gChannelMin = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }
    
    public get gChannelMin(): number {
        return this._gChannelMin;
    }

    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定G通道填Remap顏色最大值' })
    public set gChannelMax(val: number) {
        this._gChannelMax = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }
    
    public get gChannelMax(): number {
        return this._gChannelMax;
    }

    @property
    private _gChannelMin: number = 0;
    @property
    private _gChannelMax: number = 1;
    // #endregion


    // #region bChannel
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定B通道Remap顏色最小值' })
    public set bChannelMin(val: number) {
        this._bChannelMin = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }
    
    public get bChannelMin(): number {
        return this._bChannelMin;
    }

    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定B通道Remap顏色最大值' })
    public set bChannelMax(val: number) {
        this._bChannelMax = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }
    
    public get bChannelMax(): number {
        return this._bChannelMax;
    }

    @property
    private _bChannelMin: number = 0;
    @property
    private _bChannelMax: number = 1;
    // #endregion


    //#region override
    /**
     * @override SpriteEffectBase
     */
    protected get countOfUsedFloats(): number {
        return 10;
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
    protected updateParams(index: number, propBuffer: Float32Array): void {
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;

        propBuffer[index + 4] = this._rChannelMin;
        propBuffer[index + 5] = this._rChannelMax;
        propBuffer[index + 6] = this._gChannelMin;
        propBuffer[index + 7] = this._gChannelMax;

        propBuffer[index + 8] = this._bChannelMin;
        propBuffer[index + 9] = this._bChannelMax;
    }

    /**
     * @override SpriteEffectgftf55rfrrftfgt6gyredtBase
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

