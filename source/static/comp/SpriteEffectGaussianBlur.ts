import { _decorator, Enum, lerp, Material, UITransform, Vec2 } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';
const { ccclass, property } = _decorator;

export enum BlurQualityMode {
    LOW,
    MEDIUM,
    HIGH,
}

export enum BlurDirectionMode {
    USE_Y_DIRECTION,
    USE_X_DIRECTION,
    USE_BOTH_DIRECTION
}

@ccclass('SpriteEffectGaussianBlur')
export class SpriteEffectGaussianBlur extends SpriteEffectBase {
    //#region blurQualityMode
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Enum(BlurQualityMode), tooltip: "模糊品質" })
    public set blurQualityMode(val: BlurQualityMode) {
        this._blurQualityMode = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        } else {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
    }

    public get blurQualityMode(): BlurQualityMode {
        return this._blurQualityMode;
    }

    @property({ type: Enum(BlurQualityMode) })
    private _blurQualityMode = BlurQualityMode.LOW;
    //#endregion


    //#region blurMode
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Enum(BlurDirectionMode), tooltip: "模糊模式" })
    public set blurDirectionMode(val: BlurDirectionMode) {
        this._blurDirectionMode = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        } else {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
    }

    public get blurDirectionMode(): BlurDirectionMode {
        return this._blurDirectionMode;
    }

    @property({ type: Enum(BlurDirectionMode) })
    private _blurDirectionMode = BlurDirectionMode.USE_BOTH_DIRECTION;
    //#endregion


    //#region blur
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '模糊程度' })
    public set blurFactor(val: number) {
        this._blurFactor = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }

    public get blurFactor(): number {
        return this._blurFactor;
    }

    @property
    private _blurFactor: number = 0.5;
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
    protected override getEffectUnionKey(): string {
        return `${this.constructor.name}_${this._is2Din3D}_${this._blurQualityMode}_${this._blurDirectionMode}`;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override updateParams(idx: number, textureWidth: number, propBuffer: Float32Array): void {
        const baseUV = this.getUV(this.spriteFrame!.uv);

        let blurTextureSize = new Vec2(100, 100);
        if (this.spriteFrame) {
            blurTextureSize.x = Math.floor(this.spriteFrame.width * baseUV.z);
            blurTextureSize.y = Math.floor(this.spriteFrame.height * baseUV.w);
        }
        else {
            blurTextureSize.x = this.node.getComponent(UITransform)!.contentSize.width;
            blurTextureSize.y = this.node.getComponent(UITransform)!.contentSize.height;
        }

        let index = this.calBufferIndex(idx, 0, textureWidth);
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;

        index = this.calBufferIndex(idx, 1, textureWidth);
        propBuffer[index + 4] = baseUV.x;
        propBuffer[index + 5] = baseUV.y;
        propBuffer[index + 6] = baseUV.z;
        propBuffer[index + 7] = baseUV.w;

        index = this.calBufferIndex(idx, 2, textureWidth);
        propBuffer[index + 8] = blurTextureSize.x;
        propBuffer[index + 9] = blurTextureSize.y;
        propBuffer[index + 10] = lerp(0.0, 3.0, this._blurFactor);
        propBuffer[index + 11] = 1.0;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override initMaterial(): Material {
        let mat = new Material();
        let define_macro = {
            HIGH: false,
            MEDIUM: false,
            USE_Y_DIRECTION: false,
            USE_X_DIRECTION: false,
        };

        switch (this._blurQualityMode) {
            case BlurQualityMode.HIGH:
                define_macro.HIGH = true;
                break;
            case BlurQualityMode.MEDIUM:
                define_macro.MEDIUM = true;
                break;
        }

        switch (this._blurDirectionMode) {
            case BlurDirectionMode.USE_Y_DIRECTION:
                define_macro.USE_Y_DIRECTION = true;
                break;
            case BlurDirectionMode.USE_X_DIRECTION:
                define_macro.USE_X_DIRECTION = true;
                break;
        }

        mat.initialize({
            effectAsset: this.effectAsset,
            defines: define_macro,
            technique: this._is2Din3D ? 1 : 0
        });
        return mat;
    }
}