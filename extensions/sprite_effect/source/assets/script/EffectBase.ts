import { EffectAsset, game, log } from 'cc';
import { CCBoolean } from 'cc';
import { Vec4 } from 'cc';
import { Sprite } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { DEV, EDITOR, EDITOR_NOT_IN_PREVIEW } from 'cc/env';

const { ccclass, requireComponent, executeInEditMode, property } = _decorator;

@ccclass('EffectBase')
@requireComponent(Sprite)
@executeInEditMode(true)
export abstract class EffectBase extends Component {
    @property({ type: EffectAsset, tooltip: '指定效果EffectAsset' })
    public effectAsset: EffectAsset | null = null;

    //#region is2Din3D
    @property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '當使用RenderRoot2D時使用' })
    public get is2Din3D(): boolean {
        return this._is2Din3D;
    }

    public set is2Din3D(val: boolean) {
        this._is2Din3D = val;
        this._is2Din3DChanged(this._is2Din3D);
    }

    @property({ group: { name: "Private Props", id: "1" }, visible: true, tooltip: '當使用RenderRoot2D時使用' })
    protected _is2Din3D: boolean = false;
    //#endregion


    //#region reloadEffect
    @property({ type: CCBoolean, tooltip: '手動刷新，當效果在Editor沒有顯示時' })
    private get reloadEffect() {
        return this._reload;
    }

    private set reloadEffect(val: boolean) {
        this._reload = val;
        this.reloadTsFile();
    }

    private async reloadTsFile() {
        if (EDITOR_NOT_IN_PREVIEW) {
            const reloadTsFile_000 = await Editor.Message.request("asset-db", "reimport-asset", "853e8fbf-9769-49a8-b2d2-0016390b6953");
        }
    };

    private autoAssignEffectAsset() {
        if (EDITOR_NOT_IN_PREVIEW && this.effectAsset === null) {
            setTimeout(async () => {
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
                    const url = `db://sprite_effect/effect/${effectFileName}.effect`;
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
                        await this.reloadTsFile();
                    }
                    else {
                        console.log(`Effect自動掛載失敗`);
                    }
                } catch (ex) {
                    console.error(`autoAssignEffectAsset: ${ex}`);
                }
            }, 100);
        }
    }
    //#endregion

    protected _sprite: Sprite | null = null;
    protected _isDirty: boolean = false;
    private _reload: boolean = false;
    private _params: Map<string, { key: string, idx: number, is_dirty: boolean }> = new Map();
    private _isParamsDirty: boolean = false;

    protected onLoad(): void {
        this._sprite = this.getComponent(Sprite);
        this._instMaterial();
    }

    protected start(): void {
        this.autoAssignEffectAsset();
    }

    protected update(dt: number): void {
        if (this._isParamsDirty) {
            this._params.forEach((val, key) => {
                if (val.is_dirty) {
                    this._updateParams(val.key, val.idx);
                    val.is_dirty = false;
                }
            });
            this._isParamsDirty = false;
        }
    }

    /**
     * @virtual
     * @description: 实例化材质
     */
    protected abstract _instMaterial(): void;

    /**
     * @virtual
     * @description: 更新材质参数
     */
    protected abstract _updateParams(key: string, idx: number): void;

    /**
     * @virtual
     * @description: 當Sprite被用在3D時(掛載RenderRoot2D時)，需要開啟深度測試才能正確顯示深度
     */
    protected _is2Din3DChanged(enable: boolean) {
        this._instMaterial();
    }

    protected _setParams(key: string, idx: number) {
        this._params.set(key, { key: key, idx: idx, is_dirty: true });
        this._isParamsDirty = true;
    }

    protected _setParamsDirty(key: string) {
        if (this._params.has(key)) {
            this._params.get(key)!.is_dirty = true;
            this._isParamsDirty = true;
        }
        else {
            log(`EffectBase._setParamsDirty: key ${key} not found`);
        }
    }

    protected _getUV(uv: number[]): Vec4 {
        let minU = Math.min(uv[0], uv[2], uv[4], uv[6]);
        let minV = Math.min(uv[1], uv[3], uv[5], uv[7]);

        let maxU = Math.max(uv[0], uv[2], uv[4], uv[6]);
        let maxV = Math.max(uv[1], uv[3], uv[5], uv[7]);

        let width = maxU - minU;
        let height = maxV - minV;

        return new Vec4(minU, minV, width, height);
    }
}


