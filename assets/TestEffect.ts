import { _decorator, CCBoolean, Color, Component, EffectAsset, Input, input, KeyCode, log, Material, Node, Sprite, Texture2D } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
import { EffectPropsType } from './sprite_effect/comp/EffectBase';
const { ccclass, property } = _decorator;

const sizeOfPropTexture = 512;

@ccclass('TestEffect')
export class TestEffect extends Sprite {
    //##region Static Props
    private static _s_effectMap = new Map<string, string[]>();
    private static _s_effectProps = new Map<string, EffectPropsType>();
    //##endregion

    @property({ group: { name: "Setter/Getter", id: "1" }, type: EffectAsset, tooltip: "My Effect" })
    public effectAsset: EffectAsset | null = null;

    //##region myColor
    @property({ group: { name: "Setter/Getter", id: "1" }, type: Color, tooltip: "My Color" })
    public get effectColor(): Color {
        return this._effectColor;
    }

    public set effectColor(val: Color) {
        this._effectColor = val;

        if (EDITOR_NOT_IN_PREVIEW) {
            this.updateParams();
        }
        else {
            this._isPropDirty = true;
        }
    }

    @property({ group: { name: "Private Props", id: "1" }, visible: true })
    private _effectColor: Color = new Color(255, 255, 255, 255);
    //##endregion

    private _effectIndex: number = -1;
    private _isPropDirty: boolean = false;

    protected getUnionKey(): string {
        return this.constructor.name;
    }

    protected updateParams(): void {
        // TestEffect only use one effect prop, index 0.
        let y = this._effectIndex;
        let x = 0;
        const index = (y * sizeOfPropTexture + x) * 4;

        let propBuffer = TestEffect._s_effectProps.get(this.getUnionKey())!.propBuffer;
        propBuffer[index] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;
        TestEffect._s_effectProps.get(this.getUnionKey())!.propTexture.uploadData(propBuffer);
    }

    onLoad(): void {
        if (!TestEffect._s_effectMap.has(this.getUnionKey())) {
            TestEffect._s_effectMap.set(this.getUnionKey(), []);
        }

        if (TestEffect._s_effectMap.get(this.getUnionKey())!.findIndex((v) => v === this.node.uuid) === -1) {
            TestEffect._s_effectMap.get(this.getUnionKey())!.push(this.node.uuid);
        }

        if (!TestEffect._s_effectProps.has(this.getUnionKey())) {
            let propBuffer = new Float32Array(sizeOfPropTexture * sizeOfPropTexture * 4);
            for (let y = 0; y < sizeOfPropTexture; y++) {
                for (let x = 0; x < sizeOfPropTexture; x++) {
                    const index = (y * sizeOfPropTexture + x) * 4;
                    propBuffer[index] = 0;
                    propBuffer[index + 1] = 0;
                    propBuffer[index + 2] = 0;
                    propBuffer[index + 3] = 0;
                }
            }

            let propTexture = new Texture2D();
            propTexture.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
            propTexture.reset({
                width: sizeOfPropTexture,
                height: sizeOfPropTexture,
                format: Texture2D.PixelFormat.RGBA32F,
                mipmapLevel: 0
            });

            propTexture!.uploadData(propBuffer);

            let mat = new Material();
            mat.initialize(
                {
                    effectAsset: this.effectAsset,
                    effectName: 'sprite'
                }
            );
            mat.setProperty('_propTexture', propTexture);

            TestEffect._s_effectProps.set(this.getUnionKey(), {
                mat: mat,
                propBuffer: propBuffer,
                propTexture: propTexture
            });
        }
    }

    start() {
        this._effectIndex = TestEffect._s_effectMap.get(this.constructor.name)!.findIndex((v) => v === this.node.uuid);
        console.log("Effect index in the map is:", this._effectIndex);

        this.color = new Color(this._effectIndex, 0, 0, 255);
        this.customMaterial = TestEffect._s_effectProps.get(this.getUnionKey())!.mat;

        this.updateParams();
    }

    onDestroy(): void {
        if (TestEffect._s_effectMap.has(this.constructor.name)) {
            const index = TestEffect._s_effectMap.get(this.constructor.name)!.findIndex((v) => v === this.node.uuid);
            TestEffect._s_effectMap.get(this.constructor.name)!.splice(index, 1);
        }
    }

    lateUpdate(dt: number): void {
        if (this._isPropDirty) {
            log(`${this.constructor.name} is DIRTY`);
            this.updateParams();
            this._isPropDirty = false;
        }
    }
}

