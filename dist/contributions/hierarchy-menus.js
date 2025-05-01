"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCreateMenu = void 0;
function onCreateMenu(assetInfo) {
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
}
exports.onCreateMenu = onCreateMenu;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LW1lbnVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL2NvbnRyaWJ1dGlvbnMvaGllcmFyY2h5LW1lbnVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLFNBQWdCLFlBQVksQ0FBQyxTQUFvQjtJQUM3QyxPQUFPO1FBQ0g7WUFDSSxLQUFLLEVBQUUsY0FBYztZQUNyQixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUIsS0FBSyxDQUFDLEtBQUs7d0JBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFOzRCQUNwRCxJQUFJLEVBQUUsZUFBZTs0QkFDckIsTUFBTSxFQUFFLFdBQVc7NEJBQ25CLElBQUksRUFBRSxDQUFDLG1CQUFtQixDQUFDO3lCQUM5QixDQUFDLENBQUM7b0JBQ1AsQ0FBQztpQkFDSjtnQkFDRDtvQkFDSSxLQUFLLEVBQUUsd0JBQXdCO29CQUMvQixLQUFLLENBQUMsS0FBSzt3QkFDUCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUU7NEJBQ3BELElBQUksRUFBRSxlQUFlOzRCQUNyQixNQUFNLEVBQUUsV0FBVzs0QkFDbkIsSUFBSSxFQUFFLENBQUMsd0JBQXdCLENBQUM7eUJBQ25DLENBQUMsQ0FBQztvQkFDUCxDQUFDO2lCQUNKO2dCQUNEO29CQUNJLEtBQUssRUFBRSx3QkFBd0I7b0JBQy9CLEtBQUssQ0FBQyxLQUFLO3dCQUNQLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRTs0QkFDcEQsSUFBSSxFQUFFLGVBQWU7NEJBQ3JCLE1BQU0sRUFBRSxXQUFXOzRCQUNuQixJQUFJLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQzt5QkFDbkMsQ0FBQyxDQUFDO29CQUNQLENBQUM7aUJBQ0o7Z0JBQ0Q7b0JBQ0ksS0FB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QUFLO3dCQUNQLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRTs0QkFDcEQsSUFBSSxFQUFFLGVBQWU7NEJBQ3JCLE1BQU0sRUFBRSxXQUFXOzRCQUNuQixJQUFJLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzt5QkFDbEMsQ0FBQyxDQUFDO29CQUNQLENBQUM7aUJBQ0o7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFoSUQsb0NBZ0lDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2V0SW5mbyB9IGZyb20gXCJAY29jb3MvY3JlYXRvci10eXBlcy9lZGl0b3IvcGFja2FnZXMvYXNzZXQtZGIvQHR5cGVzL3B1YmxpY1wiO1xyXG5pbXBvcnQgeyBFeGVjdXRlU2NlbmVTY3JpcHRNZXRob2RPcHRpb25zIH0gZnJvbSBcIkBjb2Nvcy9jcmVhdG9yLXR5cGVzL2VkaXRvci9wYWNrYWdlcy9zY2VuZS9AdHlwZXMvcHVibGljXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25DcmVhdGVNZW51KGFzc2V0SW5mbzogQXNzZXRJbmZvKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdTcHJpdGVFZmZlY3QnLFxyXG4gICAgICAgICAgICBzdWJtZW51OiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTcHJpdGVFZmZlY3RDb2xvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMgY2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Nwcml0ZV9lZmZlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnYWRkRWZmZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFsnU3ByaXRlRWZmZWN0Q29sb3InXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnU3ByaXRlRWZmZWN0Q29sb3JpemluZycsXHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMgY2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Nwcml0ZV9lZmZlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnYWRkRWZmZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFsnU3ByaXRlRWZmZWN0Q29sb3JpemluZyddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTcHJpdGVFZmZlY3RUcmFuc2l0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICBhc3luYyBjbGljaygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnZXhlY3V0ZS1zY2VuZS1zY3JpcHQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc3ByaXRlX2VmZmVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdhZGRFZmZlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogWydTcHJpdGVFZmZlY3RUcmFuc2l0aW9uJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdERpc3NvbHZlJyxcclxuICAgICAgICAgICAgICAgICAgICBhc3luYyBjbGljaygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnZXhlY3V0ZS1zY2VuZS1zY3JpcHQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc3ByaXRlX2VmZmVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdhZGRFZmZlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogWydTcHJpdGVFZmZlY3REaXNzb2x2ZSddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTcHJpdGVFZmZlY3REaXN0b3J0JyxcclxuICAgICAgICAgICAgICAgICAgICBhc3luYyBjbGljaygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnZXhlY3V0ZS1zY2VuZS1zY3JpcHQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc3ByaXRlX2VmZmVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdhZGRFZmZlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogWydTcHJpdGVFZmZlY3REaXN0b3J0J11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdEZsb3dMaWdodCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMgY2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Nwcml0ZV9lZmZlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnYWRkRWZmZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFsnU3ByaXRlRWZmZWN0Rmxvd0xpZ2h0J11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdEdhdXNzaWFuQmx1cicsXHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMgY2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Nwcml0ZV9lZmZlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnYWRkRWZmZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFsnU3ByaXRlRWZmZWN0R2F1c3NpYW5CbHVyJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdFNoYWRvdycsXHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMgY2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Nwcml0ZV9lZmZlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnYWRkRWZmZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFsnU3ByaXRlRWZmZWN0U2hhZG93J11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdFRlc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jIGNsaWNrKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdzY2VuZScsICdleGVjdXRlLXNjZW5lLXNjcmlwdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzcHJpdGVfZWZmZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2FkZEVmZmVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBbJ1Nwcml0ZUVmZmVjdFRlc3QnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnU3ByaXRlRWZmZWN0V2F0ZXJGbG93JyxcclxuICAgICAgICAgICAgICAgICAgICBhc3luYyBjbGljaygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnZXhlY3V0ZS1zY2VuZS1zY3JpcHQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc3ByaXRlX2VmZmVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdhZGRFZmZlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogWydTcHJpdGVFZmZlY3RXYXRlckZsb3cnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnU3ByaXRlRWZmZWN0V2F0ZXJSaXBwbGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jIGNsaWNrKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdzY2VuZScsICdleGVjdXRlLXNjZW5lLXNjcmlwdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzcHJpdGVfZWZmZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2FkZEVmZmVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBbJ1Nwcml0ZUVmZmVjdFdhdGVyUmlwcGxlJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdFdhdGVyV2F2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMgY2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Nwcml0ZV9lZmZlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnYWRkRWZmZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFsnU3ByaXRlRWZmZWN0V2F0ZXJXYXZlJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICBdO1xyXG59OyJdfQ==