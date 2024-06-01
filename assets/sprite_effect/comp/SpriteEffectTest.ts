import { _decorator, Color, Material } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';
const { ccclass, property } = _decorator;


@ccclass('SpriteEffectTest')
export class SpriteEffectTest extends SpriteEffectBase {
    //#region override
    /**
     * @override SpriteEffectBase
     */
    protected get countOfUsedFloats(): number {
        return 4;
    }

    /**
     * @override SpriteEffectBase
     */
    protected getPropsUnionKey(): string {
        return `${this.constructor.name}_${this._is2Din3D}`;
    }

    /**
     * @override SpriteEffectBase
     */
    protected updateParams(): void {
        const index = this.getBufferIndex();
        const effectProps = SpriteEffectBase._s_effectProps.get(this.getPropsUnionKey())![this.propGroupIdx];

        effectProps.propBuffer[index + 0] = this._effectColor.r / 255;
        effectProps.propBuffer[index + 1] = this._effectColor.g / 255;
        effectProps.propBuffer[index + 2] = this._effectColor.b / 255;
        effectProps.propBuffer[index + 3] = this._effectColor.a / 255;
        effectProps.propTexture.uploadData(effectProps.propBuffer);
    }

    /**
     * @override SpriteEffectBase
     */
    protected initMaterial(): Material {
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

