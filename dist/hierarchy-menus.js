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
}
exports.onCreateMenu = onCreateMenu;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGllcmFyY2h5LW1lbnVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc291cmNlL2hpZXJhcmNoeS1tZW51cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxTQUFnQixZQUFZLENBQUMsU0FBb0I7SUFDN0MsT0FBTztRQUNIO1lBQ0ksS0FBSyxFQUFFLGNBQWM7WUFDckIsT0FBTyxFQUFFO2dCQUNMO29CQUNJLEtBQUssRUFBRSxtQkFBbUI7b0JBQzFCLEtBQUs7d0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQzt3QkFDcEQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3RCLG1CQUFtQjt3QkFDbkIsd0NBQXdDO3dCQUN4QyxJQUFJO3dCQUNKLFNBQVM7d0JBQ1Qsd0NBQXdDO3dCQUN4QyxJQUFJO29CQUNSLENBQUM7aUJBQ0o7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUF0QkQsb0NBc0JDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2V0SW5mbyB9IGZyb20gXCJAY29jb3MvY3JlYXRvci10eXBlcy9lZGl0b3IvcGFja2FnZXMvYXNzZXQtZGIvQHR5cGVzL3B1YmxpY1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gb25DcmVhdGVNZW51KGFzc2V0SW5mbzogQXNzZXRJbmZvKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICdTcHJpdGVFZmZlY3QnLFxuICAgICAgICAgICAgc3VibWVudTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTcHJpdGVFZmZlY3RDb2xvcicsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coRWRpdG9yLlNlbGVjdGlvbi5nZXRMYXN0U2VsZWN0ZWRUeXBlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gRWRpdG9yLlNlbGVjdGlvbi5nZXRTZWxlY3RlZCgnbm9kZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGFzc2V0SW5mbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGAke2Fzc2V0SW5mby51dWlkfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ1Nwcml0ZUVmZmVjdENvbG9yJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgIF07XG59OyJdfQ==