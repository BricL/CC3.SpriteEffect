import { _decorator, Material } from 'cc';
import { EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';
const { ccclass, property } = _decorator;


@ccclass('SpriteEffectWaterWave')
export class SpriteEffectWaterWave extends SpriteEffectBase {
    //#region offset
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '偏移量' })
    public set offset(val: number) {
        this._offset = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get offset(): number {
        return this._offset;
    }

    @property
    private _offset: number = 0.5;
    //#endregion


    //#region waveWidth
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '水波寬' })
    public set waveWidth(val: number) {
        this._waveWidth = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get waveWidth(): number {
        return this._waveWidth;
    }

    @property
    private _waveWidth: number = 20.0;
    //#endregion


    //#region waveHeight
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '水波高' })
    public set waveHeight(val: number) {
        this._waveHeight = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get waveHeight(): number {
        return this._waveHeight;
    }

    @property
    private _waveHeight: number = 0.01;
    //#endregion


    //#region waveSpeed
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '速度' })
    public set waveSpeed(val: number) {
        this._waveSpeed = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get waveSpeed(): number {
        return this._waveSpeed;
    }

    @property
    private _waveSpeed: number = 10.0;
    //#endregion


    //#region override
    /**
     * @override SpriteEffectBase
     */
    protected override get floatUsage(): number {
        return 8;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override getEffectUnionKey(): string {
        return `${this.constructor.name}_${this._is2Din3D}`;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override updateParams(idx: number, textureWidth: number, propBuffer: Float32Array): void {
        let index = this.calBufferIndex(idx, 0, textureWidth);
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;

        index = this.calBufferIndex(idx, 1, textureWidth);
        propBuffer[index + 4] = this._offset;
        propBuffer[index + 5] = this._waveWidth;
        propBuffer[index + 6] = this._waveHeight;
        propBuffer[index + 7] = this._waveSpeed;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override initMaterial(): Material {
        let mat = new Material();
        mat.initialize(
            {
                effectAsset: this.effectAsset,
                defines: {
                    SAMPLE_FROM_RT: this._sampleFromRT,
                },
                technique: this._is2Din3D ? 1 : 0
            }
        );
        return mat;
    }
}

