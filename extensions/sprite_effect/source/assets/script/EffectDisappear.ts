import { Enum, Texture2D, _decorator } from 'cc';
import { EffectBase } from './EffectBase';
import { error } from 'cc';
import { Material } from 'cc';
import { EDITOR, PREVIEW } from 'cc/env'

const { ccclass, property } = _decorator;

export enum Direction {
    HORIZONTAL,
    VERTICAL
}

@ccclass('EffectDisappear')
export class EffectDisappear extends EffectBase {
    @property({ type: Texture2D, tooltip: '指定噪声貼圖' })
    public secondSprite: Texture2D | null = null;

    //#region toneMode
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Enum(Direction),  tooltip: '指定方向' })
    public get dirMode(): Direction {
        return this._dirMode;
    }

    public set dirMode(val: Direction) {
        this._dirMode = val;
        this._setParamsDirty('_dirMode');
    }

    @property({ group: { name: "Private Props", id: "1" }, type: Enum(Direction),  tooltip: '指定方向', visible: true })
    private _dirMode: Direction = Direction.VERTICAL;
    //#endregion

    //#region disappearOffset
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '消失偏移' })
    public get offset(): number {
        return this._offset;
    }

    public set offset(val: number) {
        this._offset = val;
        this._setParamsDirty('_offset');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '消失偏移', visible: true })
    private _offset: number = 0.0;
    //#endregion


    //#region translucentOffset
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 0.5, 0.01], tooltip: '柔邊程度' })
    public get soft(): number {
        return this._soft;
    }

    public set soft(val: number) {
        this._soft = val;
        this._setParamsDirty('_soft');
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 0.5, 0.01], tooltip: '柔邊程度', visible: true })
    private _soft: number = 0.0;
    //#endregion

    private _define_macro = {
        USE_TEXTURE: true,
        DIR_VERTICAL: true
    };

    public setSecondSprite(sprite: Texture2D) {
        this.secondSprite = sprite;
        this._sprite!.material!.setProperty('_secondSprite', this.secondSprite);
    }

    protected _instMaterial(): void {
        if (this.effectAsset) {
            let mat: Material = new Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                defines: this._define_macro,
                technique: this._is2Din3D ? 1 : 0
            });
            mat.setProperty('_secondSprite', this.secondSprite);

            this._setParams('_dirMode', -1);
            this._setParams('_offset', mat.passes[0].getHandle('_offset'));
            this._setParams('_soft', mat.passes[0].getHandle('_soft'));

            this._sprite!.customMaterial = mat;
        }
        else {
            error('EffectDisappear._instMaterial: effectAsset is null');
        }
    }

    protected _updateParams(key: string, idx: number): void {
        if (key === '_offset') {
            this._sprite!.material?.passes[0].setUniform(idx, this._offset);
        }
        else if (key === '_soft') {
            this._sprite!.material?.passes[0].setUniform(idx, this._soft);
        }
        else if (key === '_dirMode') {
            switch (this._dirMode) {
                case Direction.HORIZONTAL:
                    this._define_macro.DIR_VERTICAL = false;
                    break;
                case Direction.VERTICAL:
                    this._define_macro.DIR_VERTICAL = true;
                    break;
            }
            this._instMaterial();
        }
    }
}


