import { _decorator, lerp, log, Material, Texture2D } from 'cc';
import { EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';
const { ccclass, property } = _decorator;


@ccclass('SpriteEffectDistort')
export class SpriteEffectDistort extends SpriteEffectBase {
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Texture2D, tooltip: '指定噪声貼圖' })
    public noiseTexture: Texture2D | null = null;

    //#region speed
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '扭曲速度' })
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
    private _speed: number = 0.05;
    //#endregion


    //#region strength
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '扭曲强度' })
    public set strength(val: number) {
        this._strength = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }

    public get strength(): number {
        return this._strength;
    }

    @property
    private _strength: number = 0.05;
    //#endregion


    //#region override
    /**
     * @override SpriteEffectBase
     */
    protected override get floatUsage(): number {
        // return 10; // 手機上非2次幂的紋理會報錯
        return 16;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override getEffectUnionKey(): string {
        return `${this.constructor.name}_${this._is2Din3D}_${this._sampleFromRT}`;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override updateParams(idx: number, textureWidth: number, propBuffer: Float32Array): void {
        const baseUV = this.getUV(this.spriteFrame!.uv);

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
        propBuffer[index + 8] = lerp(0.0, 0.2, this._speed);
        propBuffer[index + 9] = lerp(0.0, 0.2, this._strength);
        propBuffer[index + 10] = 0.0;
        propBuffer[index + 11] = 1.0;
    }

    /**
     * @override SpriteEffectBase
     */
    protected override initMaterial(): Material {
        let mat = new Material();
        mat.initialize(
            {
                effectAsset: this.effectAsset,
                defines: {
                    SAMPLE_FROM_RT: this._sampleFromRT,
                },
                technique: this._is2Din3D ? 1 : 0
            }
        );

        mat.setProperty('noiseTexture', this.noiseTexture);
        return mat;
    }
}

