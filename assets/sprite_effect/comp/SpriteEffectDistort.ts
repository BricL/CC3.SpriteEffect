import { _decorator, log, Material, Texture2D } from 'cc';
import { EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';
const { ccclass, property } = _decorator;


@ccclass('SpriteEffectDistort')
export class SpriteEffectDistort extends SpriteEffectBase {
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Texture2D, tooltip: '指定噪声貼圖' })
    public noiseTexture: Texture2D | null = null;

    //#region speed
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲速度' })
    public get speed(): number {
        return this._speed;
    }

    public set speed(val: number) {
        this._speed = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.updateParams();
        }
        else {
            this._isPropDirty = true;
        }
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲速度', visible: true })
    private _speed: number = 0.05;
    //#endregion


    //#region strength
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲强度' })
    public get strength(): number {
        return this._strength;
    }

    public set strength(val: number) {
        this._strength = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.updateParams();
        }
        else {
            this._isPropDirty = true;
        }
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲强度', visible: true })
    private _strength: number = 0.05;
    //#endregion

    
    //#region override
    /**
     * @override SpriteEffectBase
     */
    protected get countOfProps(): number {
        return 3;
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
        const baseUV = this.getUV(this.spriteFrame!.uv);

        effectProps.propBuffer[index + 0] = this._effectColor.r / 255;
        effectProps.propBuffer[index + 1] = this._effectColor.g / 255;
        effectProps.propBuffer[index + 2] = this._effectColor.b / 255;
        effectProps.propBuffer[index + 3] = this._effectColor.a / 255;
        
        effectProps.propBuffer[index + 4] = baseUV.x;
        effectProps.propBuffer[index + 5] = baseUV.y;
        effectProps.propBuffer[index + 6] = baseUV.z;
        effectProps.propBuffer[index + 7] = baseUV.w;

        effectProps.propBuffer[index + 8] = this._speed;
        effectProps.propBuffer[index + 9] = this._strength;
        // effectProps.propBuffer[index + 10] = 0;
        // effectProps.propBuffer[index + 11] = 0;
        effectProps.propTexture.uploadData(effectProps.propBuffer)
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

        mat.setProperty('noiseTexture', this.noiseTexture);
        return mat;
    }
}

