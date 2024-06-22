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
            ]
        },
    ];
}
exports.onCreateMenu = onCreateMenu;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LW1lbnVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL2NvbnRyaWJ1dGlvbnMvaGllcmFyY2h5LW1lbnVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLFNBQWdCLFlBQVksQ0FBQyxTQUFvQjtJQUM3QyxPQUFPO1FBQ0g7WUFDSSxLQUFLLEVBQUUsY0FBYztZQUNyQixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUIsS0FBSyxDQUFDLEtBQUs7d0JBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFOzRCQUNwRCxJQUFJLEVBQUUsZUFBZTs0QkFDckIsTUFBTSxFQUFFLFdBQVc7NEJBQ25CLElBQUksRUFBRSxDQUFDLG1CQUFtQixDQUFDO3lCQUM5QixDQUFDLENBQUM7b0JBQ1AsQ0FBQztpQkFDSjthQUNKO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQWxCRCxvQ0FrQkM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzZXRJbmZvIH0gZnJvbSBcIkBjb2Nvcy9jcmVhdG9yLXR5cGVzL2VkaXRvci9wYWNrYWdlcy9hc3NldC1kYi9AdHlwZXMvcHVibGljXCI7XG5pbXBvcnQgeyBFeGVjdXRlU2NlbmVTY3JpcHRNZXRob2RPcHRpb25zIH0gZnJvbSBcIkBjb2Nvcy9jcmVhdG9yLXR5cGVzL2VkaXRvci9wYWNrYWdlcy9zY2VuZS9AdHlwZXMvcHVibGljXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNyZWF0ZU1lbnUoYXNzZXRJbmZvOiBBc3NldEluZm8pIHtcbiAgICByZXR1cm4gW1xuICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdCcsXG4gICAgICAgICAgICBzdWJtZW51OiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwcml0ZUVmZmVjdENvbG9yJyxcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMgY2xpY2soKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdzY2VuZScsICdleGVjdXRlLXNjZW5lLXNjcmlwdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc3ByaXRlX2VmZmVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnYWRkRWZmZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBbJ1Nwcml0ZUVmZmVjdENvbG9yJ11cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICBdO1xufTsiXX0=