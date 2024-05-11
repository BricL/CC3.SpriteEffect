import { tween } from 'cc';
import { Color } from 'cc';
import { error } from 'cc';
import { Material } from 'cc';
import { CCFloat } from 'cc';
import { Sprite } from 'cc';
import { _decorator, Vec4 } from 'cc';
import { EDITOR, PREVIEW } from 'cc/env'
import { EffectBase } from './EffectBase';

const { ccclass, property, requireComponent, executeInEditMode } = _decorator;

@ccclass('EffectFlowLight')
@requireComponent(Sprite)
@executeInEditMode(true)
export class EffectFlowLight extends EffectBase {
    //#region lightColor
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '流光颜色' })
    public get lightColor(): Color {
        return this._lightColor;
    }

    public set lightColor(val: Color) {
        this._lightColor.set(val);
        this._setParamsDirty('_lightColor');
    }

    @property({ group: { name: "Private Props", id: "1" }, tooltip: '流光颜色', visible: true })
    private _lightColor: Color = new Color(1, 1, 1, 1);
    //#endregion


    //#region lightWidth
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.1, 2.0, 0.001], tooltip: '流光寬度' })
    public get lightWidth(): number {
        return this._lightWidth;
    }

    public set lightWidth(val: number) {
        this._lightWidth = val;
        this._setParamsDirty('_lightProp');
    }

    @property({ group: { name: "Private Props", id: "1" }, type: CCFloat, slide: true, range: [0.1, 2.0, 0.001], tooltip: '流光寬度', visible: true })
    private _lightWidth: number = 0.5;
    //#endregion


    //#region soft
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 10.0, 0.001], tooltip: '柔邊程度' })
    public get soft(): number {
        return this._soft;
    }

    public set soft(val: number) {
        this._soft = val;
        this._setParamsDirty('_lightProp');
    }

    @property({ group: { name: "Private Props", id: "1" }, type: CCFloat, slide: true, range: [0.0, 10.0, 0.001], tooltip: '柔邊程度', visible: true })
    private _soft: number = 0.7;
    //#endregion


    //#region offset
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [-3.0, 3.0, 0.001], tooltip: '偏移量' })
    public get offset(): number {
        return this._offset;
    }

    public set offset(val: number) {
        this._offset = val;
        this._setParamsDirty('_lightProp');
    }

    @property({ group: { name: "Private Props", id: "1" }, type: CCFloat, slide: true, range: [-3.0, 3.0, 0.001], tooltip: '偏移量', visible: true })
    private _offset: number = -8.0;
    //#endregion


    //#region rotation
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 6.28, 0.1], tooltip: '流光角度' })
    public get rotation(): number {
        return this._rotation;
    }

    public set rotation(val: number) {
        this._rotation = val;
        this._setParamsDirty('_lightProp');
    }

    @property({ group: { name: "Private Props", id: "1" }, type: CCFloat, slide: true, range: [0.0, 6.28, 0.1], tooltip: '流光角度', visible: true })
    private _rotation: number = 2.4;
    //#endregion


    @property({ group:{ name: "Anim", id: "2" }, tooltip: '是否自動撥放' })
    public play: boolean = true;

    @property({ group:{ name: "Anim", id: "2" }, type: CCFloat, slide: true, range: [0.01, 10, 0.01], tooltip: '持续时间' })
    public duration: number = 1.0;

    @property({ group:{ name: "Anim", id: "2" }, tooltip: '是否循环' })
    public loop: boolean = true;

    @property({ group:{ name: "Anim", id: "2" }, type: CCFloat, slide: true, range: [0, 10, 0.1], tooltip: '循环间隔' })
    public loop_delay: number = 0.0;

    private propsVec4: Vec4 = new Vec4();

    protected onLoad(): void {
        if (!EDITOR && this.play) {
            this._offset = -3.0;
        }
        super.onLoad();
    }

    protected _instMaterial(): void {
        if (this.effectAsset) {
            let mat: Material = new Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                defines: {  },
                technique: this._is2Din3D ? 1 : 0
            });

            this._setParams('_baseUV', mat.passes[0].getHandle('_baseUV'));
            this._setParams('_lightColor', mat.passes[0].getHandle('_lightColor'));
            this._setParams('_lightProp', mat.passes[0].getHandle('_lightProp'));

            this._sprite!.customMaterial = mat;

            if (this.play) {
                setTimeout(() => {
                    this._play();
                }, 10);
            }
        }
        else {
            error('EffectFlowLight: effectAsset is null');
        }
    }

    protected _updateParams(key: string, idx: number): void {
        if (key === '_baseUV') {
            this._sprite!.material?.passes[0].setUniform(idx, this._getUV(this._sprite!.spriteFrame!.uv));
        }
        else if (key === '_lightColor') {
            this._sprite!.material?.passes[0].setUniform(idx, this._lightColor);
        }
        else if (key === '_lightProp') {
            this.propsVec4.x = this._lightWidth;
            this.propsVec4.y = this._soft;
            this.propsVec4.z = this._offset;
            this.propsVec4.w = this._rotation;

            this._sprite!.material?.passes[0].setUniform(idx, this.propsVec4);
        }
    }

    private _play(): void {
        let tweenTarget = { offset: -3.0 }; // Wrap the number in an object
        tween(tweenTarget).to(this.duration, { offset: 3.0 }, {
            onUpdate: () => {
                this.offset = tweenTarget.offset;
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


