import { _decorator, Color, Material } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';
const { ccclass, property } = _decorator;


@ccclass('SpriteEffectWaterRipple')
export class SpriteEffectWaterRipple extends SpriteEffectBase {
    //#region speed
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲速度' })
    public set speed(val: number) {
        this._speed = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get speed(): number {
        return this._speed;
    }

    @property
    private _speed: number = 0.1;
    //#endregion


    //#region density
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [1, 100, 0.01], tooltip: '水波密度' })
    public set density(val: number) {
        this._density = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get density(): number {
        return this._density;
    }

    @property
    private _density: number = 6.12;
    //#endregion


    //#region override
    /**
     * @override SpriteEffectBase
     */
    protected override get floatUsage(): number {
        return 6;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override getEffectUnionKey(): string {
        return `SpriteEffectWaterRipple_${this._is2Din3D}_${this._sampleFromRT}`;
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
        propBuffer[index + 4] = this._speed;
        propBuffer[index + 5] = this._density;
        propBuffer[index + 6] = 0.0;
        propBuffer[index + 7] = 1.0;
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

