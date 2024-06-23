import { _decorator, Color, Enum, Material, Vec2 } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';

const { ccclass, property } = _decorator;
export enum ShadowType {
    LIMITED_BOUND,
    NORMAL
}

@ccclass('SpriteEffectShadow')
export class SpriteEffectShadow extends SpriteEffectBase {
    //#region ShadowType
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Enum(ShadowType), tooltip: "陰影模式" })
    public set shadowType(val: ShadowType) {
        this._shadowType = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get shadowType(): ShadowType {
        return this._shadowType;
    }

    @property
    private _shadowType: ShadowType = ShadowType.LIMITED_BOUND;
    //#endregion


    //#region ShadowColor
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: "陰影顏色" })
    public set shadowColor(val: Color) {
        this._shadowColor.set(val);

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }

    public get shadowColor(): Color {
        return this._shadowColor;
    }

    @property
    private _shadowColor: Color = new Color(0, 0, 0, 1.0);
    //#endregion


    //#region Offset
    @property({ group: { name: "Setter/Getter", id: "1" }, range: [-1, 1, 0.01], tooltip: "偏移量" })
    public set offset(val: Vec2) {
        this._offset.set(val);

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }

    public get offset(): Vec2 {
        return this._offset;
    }

    @property
    private _offset: Vec2 = new Vec2(0.1, 0.1);
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
        return `${this.constructor.name}_${this._shadowType}`;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override updateParams(index: number, propBuffer: Float32Array): void {
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;

        propBuffer[index + 4] = this._shadowColor.r / 255;
        propBuffer[index + 5] = this._shadowColor.g / 255;
        propBuffer[index + 6] = this._shadowColor.b / 255;
        propBuffer[index + 7] = this._shadowColor.a / 255;

        propBuffer[index + 8] = this._offset.x;
        propBuffer[index + 9] = this._offset.y;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override initMaterial(): Material {
        let technique = 0;
        switch (this._shadowType) {
            case ShadowType.LIMITED_BOUND:
                technique = 0;
                break;
            case ShadowType.NORMAL:
                technique = 1;
                break;
        }

        let mat = new Material();
        mat.initialize(
            {
                effectAsset: this.effectAsset,
                defines: {},
                technique: technique
            }
        );
        return mat;
    }
}

