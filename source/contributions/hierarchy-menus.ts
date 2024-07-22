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
                {
                    label: 'SpriteEffectColorizing',
                    async click() {
                        Editor.Message.request('scene', 'execute-scene-script', {
                            name: 'sprite_effect',
                            method: 'addEffect',
                            args: ['SpriteEffectColorizing']
                        });
                    }
                },
                {
                    label: 'SpriteEffectTransition',
                    async click() {
                        Editor.Message.request('scene', 'execute-scene-script', {
                            name: 'sprite_effect',
                            method: 'addEffect',
                            args: ['SpriteEffectTransition']
                        });
                    }
                },
                {
                    label: 'SpriteEffectDissolve',
                    async click() {
                        Editor.Message.request('scene', 'execute-scene-script', {
                            name: 'sprite_effect',
                            method: 'addEffect',
                            args: ['SpriteEffectDissolve']
                        });
                    }
                },
                {
                    label: 'SpriteEffectDistort',
                    async click() {
                        Editor.Message.request('scene', 'execute-scene-script', {
                            name: 'sprite_effect',
                            method: 'addEffect',
                            args: ['SpriteEffectDistort']
                        });
                    }
                },
                {
                    label: 'SpriteEffectFlowLight',
                    async click() {
                        Editor.Message.request('scene', 'execute-scene-script', {
                            name: 'sprite_effect',
                            method: 'addEffect',
                            args: ['SpriteEffectFlowLight']
                        });
                    }
                },
                {
                    label: 'SpriteEffectGaussianBlur',
                    async click() {
                        Editor.Message.request('scene', 'execute-scene-script', {
                            name: 'sprite_effect',
                            method: 'addEffect',
                            args: ['SpriteEffectGaussianBlur']
                        });
                    }
                },
                {
                    label: 'SpriteEffectShadow',
                    async click() {
                        Editor.Message.request('scene', 'execute-scene-script', {
                            name: 'sprite_effect',
                            method: 'addEffect',
                            args: ['SpriteEffectShadow']
                        });
                    }
                },
                {
                    label: 'SpriteEffectTest',
                    async click() {
                        Editor.Message.request('scene', 'execute-scene-script', {
                            name: 'sprite_effect',
                            method: 'addEffect',
                            args: ['SpriteEffectTest']
                        });
                    }
                },
                {
                    label: 'SpriteEffectWaterFlow',
                    async click() {
                        Editor.Message.request('scene', 'execute-scene-script', {
                            name: 'sprite_effect',
                            method: 'addEffect',
                            args: ['SpriteEffectWaterFlow']
                        });
                    }
                },
                {
                    label: 'SpriteEffectWaterRipple',
                    async click() {
                        Editor.Message.request('scene', 'execute-scene-script', {
                            name: 'sprite_effect',
                            method: 'addEffect',
                            args: ['SpriteEffectWaterRipple']
                        });
                    }
                },
                {
                    label: 'SpriteEffectWaterWave',
                    async click() {
                        Editor.Message.request('scene', 'execute-scene-script', {
                            name: 'sprite_effect',
                            method: 'addEffect',
                            args: ['SpriteEffectWaterWave']
                        });
                    }
                },
            ]
        },
    ];
};