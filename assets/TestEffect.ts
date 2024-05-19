import { _decorator, CCBoolean, Color, Component, EffectAsset, Input, input, KeyCode, log, Material, Node, Sprite, Texture2D } from 'cc';
import { DEV, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
const { ccclass, property } = _decorator;

const sizeOfPropTexture = 512;

@ccclass('TestEffect')
export class TestEffect extends Sprite {
    //##region Static Props
    private static _effectMap = new Map<string, string[]>();
    private static _mat: Material | null = null;
    private static _propBuffer: Float32Array | null = null;
    private static _propTexture: Texture2D | null = null;
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

        if (EDITOR_NOT_IN_PREVIEW)
            this._updateParams();
        else
            this._isPropDirty = true;
    }

    @property({ group: { name: "Private Props", id: "1" }, visible: true })
    private _effectColor: Color = new Color(255, 255, 255, 255);
    //##endregion


    private _myIndex: number = -1;
    private _isPropDirty: boolean = false;

    onLoad(): void {
        this._instMaterial();
    }

    start() {
        if (!TestEffect._mat) {
            TestEffect._mat = new Material();
            TestEffect._mat.initialize(
                {
                    effectAsset: this.effectAsset,
                    effectName: 'sprite'
                }
            );
            TestEffect._mat.setProperty('_propTexture', TestEffect._propTexture);
        }

        this._myIndex = TestEffect._effectMap.get(this.constructor.name)!.findIndex((v) => v === this.node.uuid);
        // const effectArray = Array.from(TestEffect._effectMap.values());
        // this._myIndex = effectArray.findIndex((node) => node === this.node);

        console.log("My index in the map is:", this._myIndex);
        this.color = new Color(this._myIndex, 0, 0, 255);
        this.customMaterial = TestEffect._mat;

        this._updateParams();
    }

    onDestroy(): void {
        if (TestEffect._effectMap.has(this.constructor.name)) {
            const index = TestEffect._effectMap.get(this.constructor.name)!.findIndex((v) => v === this.node.uuid);
            TestEffect._effectMap.get(this.constructor.name)!.splice(index, 1);
        }

        // if (TestEffect._effectMap.has(this.node.uuid)) {
        //     TestEffect._effectMap.delete(this.node.uuid);
        // }
    }

    lateUpdate(dt: number): void {
        if (this._isPropDirty) {
            log(`I AM DIRTY`)
            this._isPropDirty = false;
            this._updateParams();
        }
    }

    protected _instMaterial(): void {
        this.autoAssignEffectAsset();

        if (!TestEffect._effectMap.has(this.constructor.name)) {
            TestEffect._effectMap.set(this.constructor.name, []);
        }

        if (TestEffect._effectMap.get(this.constructor.name)!.findIndex((v) => v === this.node.uuid) === -1) {
            TestEffect._effectMap.get(this.constructor.name)!.push(this.node.uuid);
        }

        // if (!TestEffect._effectMap.has(this.node.uuid)) {
        //     TestEffect._effectMap.set(this.constructor.name, 
        //     TestEffect._effectMap.set(this.node.uuid, this.node);
        // }

        if (!TestEffect._propBuffer) {
            TestEffect._propBuffer = new Float32Array(sizeOfPropTexture * sizeOfPropTexture * 4);

            for (let y = 0; y < sizeOfPropTexture; y++) {
                for (let x = 0; x < sizeOfPropTexture; x++) {
                    const index = (y * sizeOfPropTexture + x) * 4;
                    TestEffect._propBuffer[index] = 0;
                    TestEffect._propBuffer[index + 1] = 0;
                    TestEffect._propBuffer[index + 2] = 0;
                    TestEffect._propBuffer[index + 3] = 0;
                }
            }
        }

        if (!TestEffect._propTexture) {
            TestEffect._propTexture = new Texture2D();
            TestEffect._propTexture.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
            TestEffect._propTexture.reset({
                width: sizeOfPropTexture,
                height: sizeOfPropTexture,
                format: Texture2D.PixelFormat.RGBA32F,
                mipmapLevel: 0
            });

            TestEffect._propTexture!.uploadData(TestEffect._propBuffer);
        }
    }

    protected _updateParams(): void {
        let y = this._myIndex;
        let x = 0;
        const index = (y * sizeOfPropTexture + x) * 4;
        TestEffect._propBuffer[index] = this._effectColor.r / 255;
        TestEffect._propBuffer[index + 1] = this._effectColor.g / 255;
        TestEffect._propBuffer[index + 2] = this._effectColor.b / 255;
        TestEffect._propBuffer[index + 3] = this._effectColor.a / 255;

        TestEffect._propTexture!.uploadData(TestEffect._propBuffer);
    }

    private async autoAssignEffectAsset() {
        if (EDITOR_NOT_IN_PREVIEW && this.effectAsset === null) {
            try {
                const uuids = Editor.Selection.getSelected('node');
                const node = await Editor.Message.request('scene', 'query-node', uuids[0]);
                if (!node) {
                    console.warn(`未選中節點`);
                    return;
                }

                const effectCompName = this.constructor.name;
                const index = node.__comps__.findIndex((v: any) => v.type === effectCompName);
                if (index === -1) {
                    console.warn(`節點未掛載${effectCompName}組件`);
                    return;
                }

                const effectFileName = effectCompName.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
                const url = `db://assets/${effectFileName}.effect`;
                const res = await Editor.Message.request('asset-db', 'query-asset-info', url);

                const uuid = res!.uuid;
                const success = await Editor.Message.request('scene', 'set-property', {
                    uuid: node.uuid.value as string,
                    path: `__comps__.${index}.effectAsset`,
                    dump: {
                        type: 'cc.EffectAsset',
                        value: {
                            uuid,
                        },
                    },
                });

                if (success) {
                    console.log(`Effect自動掛載成功`);
                }
                else {
                    console.log(`Effect自動掛載失敗`);
                }
            } catch (ex) {
                console.error(`autoAssignEffectAsset: ${ex}`);
            }
        }
    }
}

