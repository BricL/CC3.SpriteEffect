import { _decorator, Color, Material } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';
const { ccclass, property } = _decorator;


@ccclass('SpriteEffectTest')
export class SpriteEffectTest extends SpriteEffectBase {
    private static _isPropDirty: boolean[] = [false, false, false];

    protected isDirty(idx: number): boolean {
        return SpriteEffectTest._isPropDirty[idx];
    }
    
    protected setDirty(idx: number, val: boolean): void {
        SpriteEffectTest._isPropDirty[idx] = val;
    }


    //#region override
    /**
     * @override SpriteEffectBase
     */
    protected override get countOfUsedFloats(): number {
        return 4;
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

