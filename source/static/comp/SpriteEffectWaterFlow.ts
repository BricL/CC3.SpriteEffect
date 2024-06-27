import { _decorator, Color, Material, Texture2D, Vec2 } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';

const { ccclass, property } = _decorator;

@ccclass('SpriteEffectWaterFlow')
export class SpriteEffectWaterFlow extends SpriteEffectBase {
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Texture2D, tooltip: '指定噪声貼圖' })
    public noiseTexture: Texture2D | null = null;

    //#region frequency
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 10, 0.01], tooltip: '扭曲频率' })
    public set frequency(val: number) {
        this._frequency = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    
    public get frequency(): number {
        return this._frequency;
    }

    @property
    private _frequency: number = 0.1;
    //#endregion


    //#region amplitude
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲幅度' })
    public set amplitude(val: number) {
        this._amplitude = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    
    public get amplitude(): number {
        return this._amplitude;
    }

    @property
    private _amplitude: number = 0.02;
    //#endregion


    //#region speed
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲速度' })
    public set speed(val: number) {
        this._speed = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    
    public get speed(): number {
        return this._speed;
    }

    @property
    private _speed: number = 0.1;
    //#endregion


    //#region flowDirection
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '流动方向' })
    public set flowDirection(val: Vec2) {
        this._flowDirection.set(val);

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    
    public get flowDirection(): Vec2 {
        return this._flowDirection;
    }

    @property
    private _flowDirection: Vec2 = new Vec2(1, 0);
    //#endregion


    //#region override
    /**
     * @override SpriteEffectBase
     */
    protected override get floatUsage(): number {
        return 16;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override getPropsUnionKey(): string {
        return `${this.constructor.name}_${this._is2Din3D}`;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override updateParams(index: number, propBuffer: Float32Array): void {
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;

        propBuffer[index + 4] = this._flowDirection.x;
        propBuffer[index + 5] = this._flowDirection.y;
        propBuffer[index + 6] = this._frequency;
        propBuffer[index + 7] = this._amplitude;

        propBuffer[index + 8] = this._speed;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override initMaterial(): Material {
        let mat = new Material();
        mat.initialize(
            {
                effectAsset: this.effectAsset,
                defines: {},
                technique: this._is2Din3D ? 1 : 0
            }
        );

        mat.setProperty('noiseTexture', this.noiseTexture);
        return mat;
    }
}

