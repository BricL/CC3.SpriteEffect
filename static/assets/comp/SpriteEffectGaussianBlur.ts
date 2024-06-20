import { _decorator, Color, Material, UITransform, Vec2 } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';
const { ccclass, property } = _decorator;


@ccclass('SpriteEffectGaussianBlur')
export class SpriteEffectGaussianBlur extends SpriteEffectBase {
    private static _isPropDirty: boolean[] = [false, false, false];

    protected isDirty(idx: number): boolean {
        return SpriteEffectGaussianBlur._isPropDirty[idx];
    }
    
    protected setDirty(idx: number, val: boolean): void {
        SpriteEffectGaussianBlur._isPropDirty[idx] = val;
    }


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
    protected override getPropsUnionKey(): string {
        return `${this.constructor.name}_${this._is2Din3D}`;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override updateParams(index: number, propBuffer: Float32Array): void {
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

        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;

        propBuffer[index + 4] = baseUV.x;
        propBuffer[index + 5] = baseUV.y;
        propBuffer[index + 6] = baseUV.z;
        propBuffer[index + 7] = baseUV.w;

        propBuffer[index + 8] = blurTextureSize.x;
        propBuffer[index + 9] = blurTextureSize.y;
        propBuffer[index + 10] = this._blurFactor;
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
        return mat;
    }
}

