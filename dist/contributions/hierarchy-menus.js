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
                    label: 'SpriteEffectDisappear',
                    async click() {
                        Editor.Message.request('scene', 'execute-scene-script', {
                            name: 'sprite_effect',
                            method: 'addEffect',
                            args: ['SpriteEffectDisappear']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LW1lbnVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL2NvbnRyaWJ1dGlvbnMvaGllcmFyY2h5LW1lbnVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLFNBQWdCLFlBQVksQ0FBQyxTQUFvQjtJQUM3QyxPQUFPO1FBQ0g7WUFDSSxLQUFLLEVBQUUsY0FBYztZQUNyQixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUIsS0FBSyxDQUFDLEtBQUs7d0JBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFOzRCQUNwRCxJQUFJLEVBQUUsZUFBZTs0QkFDckIsTUFBTSxFQUFFLFdBQVc7NEJBQ25CLElBQUksRUFBRSxDQUFDLG1CQUFtQixDQUFDO3lCQUM5QixDQUFDLENBQUM7b0JBQ1AsQ0FBQztpQkFDSjtnQkFDRDtvQkFDSSxLQUFLLEVBQUUsd0JBQXdCO29CQUMvQixLQUFLLENBQUMsS0FBSzt3QkFDUCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUU7NEJBQ3BELElBQUksRUFBRSxlQUFlOzRCQUNyQixNQUFNLEVBQUUsV0FBVzs0QkFDbkIsSUFBSSxFQUFFLENBQUMsd0JBQXdCLENBQUM7eUJBQ25DLENBQUMsQ0FBQztvQkFDUCxDQUFDO2lCQUNKO2dCQUNEO29CQUNJLEtBQUssRUFBRSx1QkFBdUI7b0JBQzlCLEtBQUssQ0FBQyxLQUFLO3dCQUNQLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRTs0QkFDcEQsSUFBSSxFQUFFLGVBQWU7NEJBQ3JCLE1BQU0sRUFBRSxXQUFXOzRCQUNuQixJQUFJLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzt5QkFDbEMsQ0FBQyxDQUFDO29CQUNQLENBQUM7aUJBQ0o7Z0JBQ0Q7b0JBQ0ksS0FB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QUFLO3dCQUNQLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRTs0QkFDcEQsSUFBSSxFQUFFLGVBQWU7NEJBQ3JCLE1BQU0sRUFBRSxXQUFXOzRCQUNuQixJQUFJLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzt5QkFDbEMsQ0FBQyxDQUFDO29CQUNQLENBQUM7aUJBQ0o7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFoSUQsb0NBZ0lDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2V0SW5mbyB9IGZyb20gXCJAY29jb3MvY3JlYXRvci10eXBlcy9lZGl0b3IvcGFja2FnZXMvYXNzZXQtZGIvQHR5cGVzL3B1YmxpY1wiO1xuaW1wb3J0IHsgRXhlY3V0ZVNjZW5lU2NyaXB0TWV0aG9kT3B0aW9ucyB9IGZyb20gXCJAY29jb3MvY3JlYXRvci10eXBlcy9lZGl0b3IvcGFja2FnZXMvc2NlbmUvQHR5cGVzL3B1YmxpY1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gb25DcmVhdGVNZW51KGFzc2V0SW5mbzogQXNzZXRJbmZvKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICdTcHJpdGVFZmZlY3QnLFxuICAgICAgICAgICAgc3VibWVudTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTcHJpdGVFZmZlY3RDb2xvcicsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jIGNsaWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnZXhlY3V0ZS1zY2VuZS1zY3JpcHQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Nwcml0ZV9lZmZlY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2FkZEVmZmVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogWydTcHJpdGVFZmZlY3RDb2xvciddXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdENvbG9yaXppbmcnLFxuICAgICAgICAgICAgICAgICAgICBhc3luYyBjbGljaygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzcHJpdGVfZWZmZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdhZGRFZmZlY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFsnU3ByaXRlRWZmZWN0Q29sb3JpemluZyddXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdERpc2FwcGVhcicsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jIGNsaWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnZXhlY3V0ZS1zY2VuZS1zY3JpcHQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Nwcml0ZV9lZmZlY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2FkZEVmZmVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogWydTcHJpdGVFZmZlY3REaXNhcHBlYXInXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTcHJpdGVFZmZlY3REaXNzb2x2ZScsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jIGNsaWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnZXhlY3V0ZS1zY2VuZS1zY3JpcHQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Nwcml0ZV9lZmZlY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2FkZEVmZmVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogWydTcHJpdGVFZmZlY3REaXNzb2x2ZSddXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdERpc3RvcnQnLFxuICAgICAgICAgICAgICAgICAgICBhc3luYyBjbGljaygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzcHJpdGVfZWZmZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdhZGRFZmZlY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFsnU3ByaXRlRWZmZWN0RGlzdG9ydCddXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdEZsb3dMaWdodCcsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jIGNsaWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnZXhlY3V0ZS1zY2VuZS1zY3JpcHQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Nwcml0ZV9lZmZlY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2FkZEVmZmVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogWydTcHJpdGVFZmZlY3RGbG93TGlnaHQnXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTcHJpdGVFZmZlY3RHYXVzc2lhbkJsdXInLFxuICAgICAgICAgICAgICAgICAgICBhc3luYyBjbGljaygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzcHJpdGVfZWZmZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdhZGRFZmZlY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFsnU3ByaXRlRWZmZWN0R2F1c3NpYW5CbHVyJ11cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnU3ByaXRlRWZmZWN0U2hhZG93JyxcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMgY2xpY2soKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdzY2VuZScsICdleGVjdXRlLXNjZW5lLXNjcmlwdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc3ByaXRlX2VmZmVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnYWRkRWZmZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBbJ1Nwcml0ZUVmZmVjdFNoYWRvdyddXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdFRlc3QnLFxuICAgICAgICAgICAgICAgICAgICBhc3luYyBjbGljaygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzcHJpdGVfZWZmZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdhZGRFZmZlY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFsnU3ByaXRlRWZmZWN0VGVzdCddXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdFdhdGVyRmxvdycsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jIGNsaWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnZXhlY3V0ZS1zY2VuZS1zY3JpcHQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Nwcml0ZV9lZmZlY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2FkZEVmZmVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogWydTcHJpdGVFZmZlY3RXYXRlckZsb3cnXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTcHJpdGVFZmZlY3RXYXRlclJpcHBsZScsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jIGNsaWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnZXhlY3V0ZS1zY2VuZS1zY3JpcHQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Nwcml0ZV9lZmZlY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2FkZEVmZmVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogWydTcHJpdGVFZmZlY3RXYXRlclJpcHBsZSddXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdFdhdGVyV2F2ZScsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jIGNsaWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnZXhlY3V0ZS1zY2VuZS1zY3JpcHQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Nwcml0ZV9lZmZlY3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2FkZEVmZmVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogWydTcHJpdGVFZmZlY3RXYXRlcldhdmUnXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgIF07XG59OyJdfQ==