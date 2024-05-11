import { _decorator } from 'cc';
import { EffectBase } from './EffectBase';
import { Color } from 'cc';
import { Texture2D } from 'cc';
import { Material } from 'cc';
import { CCFloat } from 'cc';
import { tween } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('EffectDissolve')
export class EffectDissolve extends EffectBase {
    @property({ type: Texture2D, tooltip: "指定噪聲貼圖" })
    public noiseTexture: Texture2D | null = null;

    //#region dissolveColor
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: "溶解顏色" })
    public get dissolveColor(): Color {
        return this._dissolveColor;
    }

    public set dissolveColor(val: Color) {
        this._dissolveColor.set(val);
        this._setParamsDirty('_dissolveColor');
    }

    @property({ group: { name: "Private Props", id: "1" }, tooltip: "溶解顏色", visible: true })
    private _dissolveColor: Color = new Color(0, 0, 0, 1);
    //#endregion


    //#region effectFactor
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "溶解程度" })
    public get factor(): number {
        return this._factor;
    }

    public set factor(val: number) {
        this._factor = val;
        this._setParamsDirty('_factor');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "溶解程度", visible: true })
    private _factor: number = 0.5;
    //#endregion


    //#region softness
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "柔邊程度" })
    public get softness(): number {
        return this._softness;
    }

    public set softness(val: number) {
        this._softness = val;
        this._setParamsDirty('_softness');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "柔邊程度", visible: true })
    private _softness: number = 0.1;
    //#endregion


    //#region width
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "溶解寬度" })
    public get width(): number {
        return this._width;
    }

    public set width(val: number) {
        this._width = val;
        this._setParamsDirty('_width');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "溶解寬度", visible: true })
    private _width: number = 0.1;
    //#endregion


    @property({ group: { name: "Anim", id: "2" }, tooltip: '是否自動撥放' })
    public play: boolean = true;

    @property({ group: { name: "Anim", id: "2" }, type: CCFloat, slide: true, range: [0.01, 10, 0.01], tooltip: '持续时间' })
    public duration: number = 1.0;

    @property({ group: { name: "Anim", id: "2" }, tooltip: '是否循环' })
    public loop: boolean = true;

    @property({ group: { name: "Anim", id: "2" }, type: CCFloat, slide: true, range: [0, 10, 0.1], tooltip: '循环间隔' })
    public loop_delay: number = 0.0;


    protected _instMaterial(): void {
        if (this.effectAsset) {
            let mat = new Material();
            mat.initialize({ 
                effectAsset: this.effectAsset,
                technique: this._is2Din3D ? 1 : 0
            });
            mat.setProperty('_noisetex', this.noiseTexture);

            this._setParams('_dissolveColor', mat.passes[0].getHandle('_dissolveColor'));
            this._setParams('_factor', mat.passes[0].getHandle('_factor'));
            this._setParams('_softness', mat.passes[0].getHandle('_softness'));
            this._setParams('_width', mat.passes[0].getHandle('_width'));

            this._sprite!.customMaterial = mat;

            if (this.play) {
                setTimeout(() => {
                    this._play();
                }, 10);
            }
        }
    }

    protected _updateParams(key: string, idx: number): void {
        if (key === '_dissolveColor') {
            this._sprite!.material?.passes[0].setUniform(idx, this._dissolveColor);
        }
        else if (key === '_factor') {
            this._sprite!.material?.passes[0].setUniform(idx, this._factor);
        }
        else if (key === '_softness') {
            this._sprite!.material?.passes[0].setUniform(idx, this._softness);
        }
        else if (key === '_width') {
            this._sprite!.material?.passes[0].setUniform(idx, this._width);
        }
    }

    private _play(): void {
        let tweenTarget = { factor: 0.0 };

        tween(tweenTarget).to(this.duration, { factor: 1.0 }, {
            onUpdate: () => {
                this.factor = tweenTarget.factor;
            },
            onComplete: () => {
                if (this.loop) {
                    this.scheduleOnce(() => {
                        this._play();
                    }, this.loop_delay);
                }
            }
        }).start();
    }
}


