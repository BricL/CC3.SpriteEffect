export async function autoAssignEffectAsset(effectCompName: string) {
    try {
        console.log('Effect自動掛載啟動')

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