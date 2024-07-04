import { _decorator, Color, Material } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { SpriteEffectBase } from './SpriteEffectBase';

const { ccclass, property } = _decorator;

@ccclass('SpriteEffectFlowLight')
export class SpriteEffectFlowLight extends SpriteEffectBase {
    //#region lightColor
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '流光颜色' })
    public set lightColor(val: Color) {
        this._lightColor.set(val);

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }
    
    public get lightColor(): Color {
        return this._lightColor;
    }

    @property
    private _lightColor: Color = new Color(1, 1, 1, 1);
    //#endregion


    //#region lightWidth
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.1, 2.0, 0.001], tooltip: '流光寬度' })
    public set lightWidth(val: number) {
        this._lightWidth = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }
    
    public get lightWidth(): number {
        return this._lightWidth;
    }

    @property
    private _lightWidth: number = 0.5;
    //#endregion


    //#region soft
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 10.0, 0.001], tooltip: '柔邊程度' })
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
    private _soft: number = 0.7;
    //#endregion


    //#region offset
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [-3.0, 3.0, 0.001], tooltip: '偏移量' })
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
    private _offset: number = -8.0;
    //#endregion


    //#region rotation
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 6.28, 0.1], tooltip: '流光角度' })
    public set rotation(val: number) {
        this._rotation = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        } else {
            this.reflashParams();
        }
    }
    
    public get rotation(): number {
        return this._rotation;
    }

    @property
    private _rotation: number = 2.4;
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
        return `${this.constructor.name}_${this._is2Din3D}`;
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
        propBuffer[index + 8] = this._lightColor.r / 255;
        propBuffer[index + 9] = this._lightColor.g / 255;
        propBuffer[index + 10] = this._lightColor.b / 255;
        propBuffer[index + 11] = this._lightColor.a / 255;

        index = this.calBufferIndex(idx, 3, textureWidth);
        propBuffer[index + 12] = this._lightWidth;
        propBuffer[index + 13] = this._soft;
        propBuffer[index + 14] = this._offset;
        propBuffer[index + 15] = this._rotation;
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

