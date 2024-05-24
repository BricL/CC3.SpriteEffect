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


    //#region is2Din3D
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '當使用RenderRoot2D時使用' })
    public get is2Din3D(): boolean {
        return this._is2Din3D;
    }

    public set is2Din3D(val: boolean) {
        this._is2Din3D = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.init(this.countOfProps);
            this.updateParams();
        }
        else {
            this._isPropDirty = true;
        }
    }

    @property({ group: { name: "Private Props", id: "1" }, visible: true, tooltip: '當使用RenderRoot2D時使用' })
    protected _is2Din3D: boolean = false;
    //#endregion


    /**
     * @override SpriteEffectBase
     */
    protected get countOfProps(): number {
        return 2;
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

        log(`index: ${index}`)

        const effectProps = SpriteEffectBase._s_effectProps.get(this.getPropsUnionKey())![this.propGroupIdx];
        let baseUV = this.getUV(this.spriteFrame!.uv);

        effectProps.propBuffer[index + 0] = baseUV.x;
        effectProps.propBuffer[index + 1] = baseUV.y;
        effectProps.propBuffer[index + 2] = baseUV.z;
        effectProps.propBuffer[index + 3] = baseUV.w;
        effectProps.propBuffer[index + 4] = this._speed;
        effectProps.propBuffer[index + 5] = this._strength;
        // effectProps.propBuffer[index + 6] = 0;
        // effectProps.propBuffer[index + 7] = 0;
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

        mat.setProperty('_noiseTexture', this.noiseTexture);
        return mat;
    }
}

