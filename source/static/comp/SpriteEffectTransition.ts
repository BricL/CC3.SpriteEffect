import { _decorator, Enum, Material, Texture2D } from 'cc';
import { EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';

const { ccclass, property } = _decorator;

export enum Direction {
    HORIZONTAL,
    VERTICAL
}

@ccclass('SpriteEffectTransition')
export class SpriteEffectTransition extends SpriteEffectBase {
    @property({ type: Texture2D, tooltip: '指定貼圖' })
    public spriteFrame2: Texture2D | null = null;

    //#region toneMode
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Enum(Direction), tooltip: '指定方向' })
    public set dirMode(val: Direction) {
        this._dirMode = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        } else {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
    }

    public get dirMode(): Direction {
        return this._dirMode;
    }

    @property
    private _dirMode: Direction = Direction.VERTICAL;
    //#endregion

    //#region disappearOffset
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '消失偏移' })
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
    private _offset: number = 0.0;
    //#endregion


    //#region translucentOffset
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 0.5, 0.01], tooltip: '柔邊程度' })
    public set soft(val: number) {
        this._soft = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }

    public get soft(): number {
        return this._soft;
    }

    @property
    private _soft: number = 0.0;
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
        return `SpriteEffectTransition_${this._is2Din3D}_${this._sampleFromRT}_${this._dirMode}`;
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
        propBuffer[index + 5] = this._soft;
        propBuffer[index + 6] = 0.0;
        propBuffer[index + 7] = 1.0;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override initMaterial(): Material {
        let define_macro = {
            SAMPLE_FROM_RT: this._sampleFromRT,
            DIR_VERTICAL: true
        };

        switch (this._dirMode) {
            case Direction.HORIZONTAL:
                define_macro.DIR_VERTICAL = false;
                break;
            case Direction.VERTICAL:
                define_macro.DIR_VERTICAL = true;
                break;
        }

        let mat = new Material();
        mat.initialize(
            {
                effectAsset: this.effectAsset,
                defines: define_macro,
                technique: this._is2Din3D ? 1 : 0
            }
        );

        mat.setProperty('spriteFrame2', this.spriteFrame2);
        return mat;
    }
}

