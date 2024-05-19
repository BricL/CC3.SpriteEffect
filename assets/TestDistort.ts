import { _decorator, CCBoolean, Color, Component, EffectAsset, log, Material, Node, Sprite, Texture2D, Vec4 } from 'cc';
import { EDITOR_NOT_IN_PREVIEW } from 'cc/env';
const { ccclass, property } = _decorator;

const sizeOfPropTexture = 512;

@ccclass('TestDistort')
export class TestDistort extends Sprite {
    //##region Static Props
    private static _effectMap = new Map<string, Node>();
    private static _mat: Material | null = null;
    private static _propBuffer: Float32Array | null = null;
    private static _propTexture: Texture2D | null = null;
    //##endregion


    @property({ group: { name: "Setter/Getter", id: "1" }, type: Texture2D, tooltip: '指定噪声貼圖' })
    public noiseTexture: Texture2D | null = null;

    @property({ group: { name: "Setter/Getter", id: "1" }, type: EffectAsset, tooltip: "My Effect" })
    public effectAsset: EffectAsset | null = null;


    //#region speed
    @property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲速度' })
    public get speed(): number {
        return this._speed;
    }

    public set speed(val: number) {
        this._speed = val;

        if (EDITOR_NOT_IN_PREVIEW)
            this._updateParams();
        else
            this._isPropDirty = true;
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

        if (EDITOR_NOT_IN_PREVIEW)
            this._updateParams();
        else
            this._isPropDirty = true;
    }

    @property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲强度', visible: true })
    private _strength: number = 0.05;
    //#endregion


    //#region reloadEffect
    @property({ group: { name: "Setter/Getter", id: "1" }, type: CCBoolean, tooltip: '手動刷新，當效果在Editor沒有顯示時' })
    private get reloadEffect() {
        return this._reload;
    }

    private set reloadEffect(val: boolean) {
        this._reload = val;
        this.reloadTsFile();
    }
    //##endregion

    private _myIndex: number = -1;
    private _isPropDirty: boolean = false;
    private _reload: boolean = false;

    onLoad(): void {
        this._instMaterial();
    }

    start() {
        if (!TestDistort._mat) {
            TestDistort._mat = new Material();
            TestDistort._mat.initialize(
                {
                    effectAsset: this.effectAsset,
                    defines: {},
                }
            );
            TestDistort._mat.setProperty('_propTexture', TestDistort._propTexture);
            TestDistort._mat.setProperty('_noiseTexture', this.noiseTexture);
        }

        const effectArray = Array.from(TestDistort._effectMap.values());
        this._myIndex = effectArray.findIndex((node) => node === this.node);

        console.log("My index in the map is:", this._myIndex);
        this.color = new Color(this._myIndex, 0, 0, 255);
        this.customMaterial = TestDistort._mat;

        this._updateParams();
    }

    onDestroy(): void {
        if (TestDistort._effectMap.has(this.node.uuid)) {
            TestDistort._effectMap.delete(this.node.uuid);
        }
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

        if (!TestDistort._effectMap.has(this.node.uuid)) {
            TestDistort._effectMap.set(this.node.uuid, this.node);
        }

        if (!TestDistort._propBuffer) {
            TestDistort._propBuffer = new Float32Array(sizeOfPropTexture * sizeOfPropTexture * 4);

            for (let y = 0; y < sizeOfPropTexture; y++) {
                for (let x = 0; x < sizeOfPropTexture; x++) {
                    const index = (y * sizeOfPropTexture + x) * 4;
                    TestDistort._propBuffer[index] = 0;
                    TestDistort._propBuffer[index + 1] = 0;
                    TestDistort._propBuffer[index + 2] = 0;
                    TestDistort._propBuffer[index + 3] = 0;
                }
            }
        }

        if (!TestDistort._propTexture) {
            TestDistort._propTexture = new Texture2D();
            TestDistort._propTexture.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
            TestDistort._propTexture.reset({
                width: sizeOfPropTexture,
                height: sizeOfPropTexture,
                format: Texture2D.PixelFormat.RGBA32F,
                mipmapLevel: 0
            });

            TestDistort._propTexture!.uploadData(TestDistort._propBuffer);
        }
    }

    protected _updateParams(): void {
        let y = this._myIndex;

        // Init prop texture
        let baseUV = this._getUV(this.spriteFrame!.uv);

        let x = 0;
        let index = (y * sizeOfPropTexture + x) * 4;
        TestDistort._propBuffer[index] = baseUV.x;
        TestDistort._propBuffer[index + 1] = baseUV.y;
        TestDistort._propBuffer[index + 2] = baseUV.z;
        TestDistort._propBuffer[index + 3] = baseUV.w;

        x = 1;
        index = (y * sizeOfPropTexture + x) * 4;
        TestDistort._propBuffer[index] = this._speed;
        TestDistort._propBuffer[index + 1] = this._strength;
        TestDistort._propBuffer[index + 2] = 0;
        TestDistort._propBuffer[index + 3] = 0;

        // Upload prop texture
        TestDistort._propTexture!.uploadData(TestDistort._propBuffer);
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

    private _getUV(uv: number[]): Vec4 {
        let minU = Math.min(uv[0], uv[2], uv[4], uv[6]);
        let minV = Math.min(uv[1], uv[3], uv[5], uv[7]);

        let maxU = Math.max(uv[0], uv[2], uv[4], uv[6]);
        let maxV = Math.max(uv[1], uv[3], uv[5], uv[7]);

        let width = maxU - minU;
        let height = maxV - minV;

        return new Vec4(minU, minV, width, height);
    }

    private async reloadTsFile() {
        if (EDITOR_NOT_IN_PREVIEW) {
            const reloadTsFile_000 = await Editor.Message.request("asset-db", "reimport-asset", "853e8fbf-9769-49a8-b2d2-0016390b6953");
        }
    };
}

