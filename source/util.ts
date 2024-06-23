export async function assignEffectAsset(nameOfEffect: string, uuidOfNode?: string) {
    try {
        console.log('Effect掛載啟動');

        if (!uuidOfNode) {
            const uuids = Editor.Selection.getSelected('node');
            uuidOfNode = uuids[0];
        }

        const nodeInfo = await Editor.Message.request('scene', 'query-node', uuidOfNode);
        if (!nodeInfo) {
            console.error(`未選中節點`);
            return false;
        }

        const index = nodeInfo.__comps__.findIndex((v: any) => v.type === nameOfEffect);
        if (index === -1) {
            console.error(`節點未掛載${nameOfEffect}組件`);
            return false;
        }

        const effectFileName = nameOfEffect.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
        const url = `db://sprite_effect/effect/${effectFileName}.effect`;

        const res = await Editor.Message.request('asset-db', 'query-asset-info', url);
        const success = await Editor.Message.request('scene', 'set-property', {
            uuid: uuidOfNode,
            path: `__comps__.${index}.effectAsset`,
            dump: {
                type: res!.type,
                value: {
                    uuid: res!.uuid,
                },
            },
        });

        return success;
    } catch (ex) {
        console.error(`assignEffectAsset: ${ex}`);
    }
}

export async function autoAssignTextureAsset(effectCompName: string, propOfName: string, nameOfAsset: string) {
    try {
        console.log('Asset自動掛載啟動');

        const uuids = Editor.Selection.getSelected('node');
        const node = await Editor.Message.request('scene', 'query-node', uuids[0]);
        if (!node) {
            console.warn(`未選中節點`);
            return;
        }

        const index = node.__comps__.findIndex((v: any) => v.type === effectCompName);
        if (index === -1) {
            console.warn(`節點未掛載${effectCompName}組件`);
            return;
        }

        const url = `db://sprite_effect/texture/${nameOfAsset}`;
        console.log(`url: ${url}`);

        const res = await Editor.Message.request('asset-db', 'query-asset-info', url);
        const success = await Editor.Message.request('scene', 'set-property', {
            uuid: node.uuid.value as string,
            path: `__comps__.${index}.${propOfName}`,
            dump: {
                type: res!.type,
                value: {
                    uuid: res!.uuid,
                },
            },
        });

        if (success) {
            console.log(`Texture自動掛載成功`);
        }
        else {
            console.log(`Texture自動掛載失敗`);
        }
    } catch (ex) {
        console.error(`autoAssignTextureAsset: ${ex}`);
    }
}

export async function reimportAsset() {
    Editor.Message.request("asset-db", "reimport-asset", "db29d15f-52ac-4502-bf5f-9ffb600ef784");
}