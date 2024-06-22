import { AssetInfo } from "@cocos/creator-types/editor/packages/asset-db/@types/public";
import { ExecuteSceneScriptMethodOptions } from "@cocos/creator-types/editor/packages/scene/@types/public";

export function onCreateMenu(assetInfo: AssetInfo) {
    return [
        {
            label: 'SpriteEffect',
            submenu: [
                {
                    label: 'SpriteEffectColor',
                    async click() {
                        Editor.Message.request('scene', 'execute-scene-script', {
                            name: 'sprite_effect',
                            method: 'addEffect',
                            args: ['SpriteEffectColor']
                        });
                    }
                },
            ]
        },
    ];
};