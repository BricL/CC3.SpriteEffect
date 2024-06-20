import { AssetInfo } from "@cocos/creator-types/editor/packages/asset-db/@types/public";

export function onCreateMenu(assetInfo: AssetInfo) {
    return [
        {
            label: 'SpriteEffect',
            submenu: [
                {
                    label: 'SpriteEffectColor',
                    click() {
                        console.log(Editor.Selection.getLastSelectedType());
                        let selected = Editor.Selection.getSelected('node');
                        console.log(selected);
                        // if (assetInfo) {
                        //     console.log(`${assetInfo.uuid}`);
                        // }
                        // else {
                        //     console.log('SpriteEffectColor');
                        // }
                    }
                },
            ]
        },
    ];
};