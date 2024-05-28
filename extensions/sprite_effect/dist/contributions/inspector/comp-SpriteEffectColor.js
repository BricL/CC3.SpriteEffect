'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = exports.update = exports.$ = exports.template = void 0;
const util_1 = require("../../util");
exports.template = `
<ui-prop type="dump" class="spriteAtlas"></ui-prop>
<ui-prop type="dump" class="spriteFrame"></ui-prop>
<ui-prop type="dump" class="sizeMode"></ui-prop>
<ui-prop type="dump" class="type"></ui-prop>
<ui-prop type="dump" class="trim"></ui-prop>

<ui-section class="config" header="Effect Props" expand>
    <ui-prop type="dump" class="effectColor"></ui-prop>
    <ui-prop type="dump" class="is2Din3D"></ui-prop>
    <ui-prop type="dump" class="toneMode"></ui-prop>
    <ui-prop type="dump" class="toneFactor"></ui-prop>
    <ui-prop type="dump" class="colorMode"></ui-prop>
    <ui-prop type="dump" class="colorFactor"></ui-prop>
    <ui-prop type="dump" class="blurMode"></ui-prop>
    <ui-prop type="dump" class="blurFactor"></ui-prop>
    <ui-button class="reload" style="height:24px;margin:16px 0;">Reload Asset</ui-button>
</ui-section>
`;
exports.$ = {
    spriteAtlas: '.spriteAtlas',
    spriteFrame: '.spriteFrame',
    sizeMode: '.sizeMode',
    type: '.type',
    trim: '.trim',
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    toneMode: '.toneMode',
    toneFactor: '.toneFactor',
    colorMode: '.colorMode',
    colorFactor: '.colorFactor',
    blurMode: '.blurMode',
    blurFactor: '.blurFactor',
    reload: '.reload',
};
function update(dump) {
    // 使用 ui-porp 自动渲染，设置 prop 的 type 为 dump
    // render 传入一个 dump 数据，能够自动渲染出对应的界面
    // 自动渲染的界面修改后，能够自动提交数据
    this.$.spriteAtlas.render(dump.value.spriteAtlas);
    this.$.spriteFrame.render(dump.value.spriteFrame);
    this.$.sizeMode.render(dump.value.sizeMode);
    this.$.type.render(dump.value.type);
    this.$.trim.render(dump.value.trim);
    this.$.effectColor.render(dump.value.effectColor);
    this.$.is2Din3D.render(dump.value.is2Din3D);
    this.$.toneMode.render(dump.value.toneMode);
    this.$.toneFactor.render(dump.value.toneFactor);
    this.$.colorMode.render(dump.value.colorMode);
    this.$.colorFactor.render(dump.value.colorFactor);
    this.$.blurMode.render(dump.value.blurMode);
    this.$.blurFactor.render(dump.value.blurFactor);
    if (typeof this.$.reload.render === "function") {
        this.$.reload.render(dump.value.label);
    }
}
exports.update = update;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        const reloadTsFile_000 = await Editor.Message.request("asset-db", "reimport-asset", "853e8fbf-9769-49a8-b2d2-0016390b6953");
        // const effectCompName = 'SpriteEffectColor';
        // const uuids = Editor.Selection.getSelected('node');
        // const node = await Editor.Message.request('scene', 'query-node', uuids[0]);
        // if (!node) {
        //     console.warn(`未選中節點`);
        //     return;
        // }
        // const index = node.__comps__.findIndex((v: any) => v.type === effectCompName);
        // if (index === -1) {
        //     console.warn(`節點未掛載${effectCompName}組件`);
        //     return;
        // }
        // const effectFileName = effectCompName.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
        // const url = `db://assets/sprite_effect/effect/${effectFileName}.effect`;
        // console.log(`url: ${url}`);
        // const res = await Editor.Message.request('asset-db', 'query-asset-info', url);
        // await Editor.Message.request("asset-db", "reimport-asset", res!.uuid);
    });
    await util_1.autoAssignEffectAsset('SpriteEffectColor');
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3RDb2xvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9jb250cmlidXRpb25zL2luc3BlY3Rvci9jb21wLVNwcml0ZUVmZmVjdENvbG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7O0FBRWIscUNBQTJFO0FBSTlELFFBQUEsUUFBUSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FrQnZCLENBQUM7QUFFVyxRQUFBLENBQUMsR0FBRztJQUNiLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFFBQVEsRUFBQyxXQUFXO0lBQ3BCLElBQUksRUFBQyxPQUFPO0lBQ1osSUFBSSxFQUFDLE9BQU87SUFFWixXQUFXLEVBQUUsY0FBYztJQUMzQixRQUFRLEVBQUUsV0FBVztJQUNyQixRQUFRLEVBQUUsV0FBVztJQUNyQixVQUFVLEVBQUUsYUFBYTtJQUN6QixTQUFTLEVBQUUsWUFBWTtJQUN2QixXQUFXLEVBQUUsY0FBYztJQUMzQixRQUFRLEVBQUUsV0FBVztJQUNyQixVQUFVLEVBQUUsYUFBYTtJQUN6QixNQUFNLEVBQUUsU0FBUztDQUNwQixDQUFDO0FBRUYsU0FBZ0IsTUFBTSxDQUEyQixJQUFTO0lBQ3RELHdDQUF3QztJQUN4QyxtQ0FBbUM7SUFDbkMsc0JBQXNCO0lBQ3RCLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBR3BDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFDO0FBQ0wsQ0FBQztBQXRCRCx3QkFzQkM7QUFFTSxLQUFLLFVBQVUsS0FBSztJQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDakQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxzQ0FBc0MsQ0FBQyxDQUFDO1FBRTVILDhDQUE4QztRQUM5QyxzREFBc0Q7UUFDdEQsOEVBQThFO1FBQzlFLGVBQWU7UUFDZiw2QkFBNkI7UUFDN0IsY0FBYztRQUNkLElBQUk7UUFFSixpRkFBaUY7UUFDakYsc0JBQXNCO1FBQ3RCLGdEQUFnRDtRQUNoRCxjQUFjO1FBQ2QsSUFBSTtRQUVKLDJGQUEyRjtRQUMzRiwyRUFBMkU7UUFDM0UsOEJBQThCO1FBRTlCLGlGQUFpRjtRQUNqRix5RUFBeUU7SUFDN0UsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLDRCQUFxQixDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDckQsQ0FBQztBQTNCRCxzQkEyQkMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGF1dG9Bc3NpZ25FZmZlY3RBc3NldCwgYXV0b0Fzc2lnblRleHR1cmVBc3NldCB9IGZyb20gXCIuLi8uLi91dGlsXCI7XG5cbnR5cGUgU2VsZWN0b3I8JD4gPSB7ICQ6IFJlY29yZDxrZXlvZiAkLCBhbnkgfCBudWxsPiB9XG5cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IGBcbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzcHJpdGVBdGxhc1wiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzcHJpdGVGcmFtZVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzaXplTW9kZVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJ0eXBlXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInRyaW1cIj48L3VpLXByb3A+XG5cbjx1aS1zZWN0aW9uIGNsYXNzPVwiY29uZmlnXCIgaGVhZGVyPVwiRWZmZWN0IFByb3BzXCIgZXhwYW5kPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJlZmZlY3RDb2xvclwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiaXMyRGluM0RcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInRvbmVNb2RlXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJ0b25lRmFjdG9yXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJjb2xvck1vZGVcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImNvbG9yRmFjdG9yXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJibHVyTW9kZVwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiYmx1ckZhY3RvclwiPjwvdWktcHJvcD5cbiAgICA8dWktYnV0dG9uIGNsYXNzPVwicmVsb2FkXCIgc3R5bGU9XCJoZWlnaHQ6MjRweDttYXJnaW46MTZweCAwO1wiPlJlbG9hZCBBc3NldDwvdWktYnV0dG9uPlxuPC91aS1zZWN0aW9uPlxuYDtcblxuZXhwb3J0IGNvbnN0ICQgPSB7XG4gICAgc3ByaXRlQXRsYXM6ICcuc3ByaXRlQXRsYXMnLFxuICAgIHNwcml0ZUZyYW1lOiAnLnNwcml0ZUZyYW1lJyxcbiAgICBzaXplTW9kZTonLnNpemVNb2RlJyxcbiAgICB0eXBlOicudHlwZScsXG4gICAgdHJpbTonLnRyaW0nLFxuXG4gICAgZWZmZWN0Q29sb3I6ICcuZWZmZWN0Q29sb3InLFxuICAgIGlzMkRpbjNEOiAnLmlzMkRpbjNEJyxcbiAgICB0b25lTW9kZTogJy50b25lTW9kZScsXG4gICAgdG9uZUZhY3RvcjogJy50b25lRmFjdG9yJyxcbiAgICBjb2xvck1vZGU6ICcuY29sb3JNb2RlJyxcbiAgICBjb2xvckZhY3RvcjogJy5jb2xvckZhY3RvcicsXG4gICAgYmx1ck1vZGU6ICcuYmx1ck1vZGUnLFxuICAgIGJsdXJGYWN0b3I6ICcuYmx1ckZhY3RvcicsXG4gICAgcmVsb2FkOiAnLnJlbG9hZCcsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPiwgZHVtcDogYW55KSB7XG4gICAgLy8g5L2/55SoIHVpLXBvcnAg6Ieq5Yqo5riy5p+T77yM6K6+572uIHByb3Ag55qEIHR5cGUg5Li6IGR1bXBcbiAgICAvLyByZW5kZXIg5Lyg5YWl5LiA5LiqIGR1bXAg5pWw5o2u77yM6IO95aSf6Ieq5Yqo5riy5p+T5Ye65a+55bqU55qE55WM6Z2iXG4gICAgLy8g6Ieq5Yqo5riy5p+T55qE55WM6Z2i5L+u5pS55ZCO77yM6IO95aSf6Ieq5Yqo5o+Q5Lqk5pWw5o2uXG4gICAgdGhpcy4kLnNwcml0ZUF0bGFzLnJlbmRlcihkdW1wLnZhbHVlLnNwcml0ZUF0bGFzKTtcbiAgICB0aGlzLiQuc3ByaXRlRnJhbWUucmVuZGVyKGR1bXAudmFsdWUuc3ByaXRlRnJhbWUpO1xuICAgIHRoaXMuJC5zaXplTW9kZS5yZW5kZXIoZHVtcC52YWx1ZS5zaXplTW9kZSk7XG4gICAgdGhpcy4kLnR5cGUucmVuZGVyKGR1bXAudmFsdWUudHlwZSk7XG4gICAgdGhpcy4kLnRyaW0ucmVuZGVyKGR1bXAudmFsdWUudHJpbSk7XG5cblxuICAgIHRoaXMuJC5lZmZlY3RDb2xvci5yZW5kZXIoZHVtcC52YWx1ZS5lZmZlY3RDb2xvcik7XG4gICAgdGhpcy4kLmlzMkRpbjNELnJlbmRlcihkdW1wLnZhbHVlLmlzMkRpbjNEKTtcbiAgICB0aGlzLiQudG9uZU1vZGUucmVuZGVyKGR1bXAudmFsdWUudG9uZU1vZGUpO1xuICAgIHRoaXMuJC50b25lRmFjdG9yLnJlbmRlcihkdW1wLnZhbHVlLnRvbmVGYWN0b3IpO1xuICAgIHRoaXMuJC5jb2xvck1vZGUucmVuZGVyKGR1bXAudmFsdWUuY29sb3JNb2RlKTtcbiAgICB0aGlzLiQuY29sb3JGYWN0b3IucmVuZGVyKGR1bXAudmFsdWUuY29sb3JGYWN0b3IpO1xuICAgIHRoaXMuJC5ibHVyTW9kZS5yZW5kZXIoZHVtcC52YWx1ZS5ibHVyTW9kZSk7XG4gICAgdGhpcy4kLmJsdXJGYWN0b3IucmVuZGVyKGR1bXAudmFsdWUuYmx1ckZhY3Rvcik7XG4gICAgaWYgKHR5cGVvZiB0aGlzLiQucmVsb2FkLnJlbmRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXMuJC5yZWxvYWQucmVuZGVyKGR1bXAudmFsdWUubGFiZWwpO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWR5KHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPikge1xuICAgIHRoaXMuJC5yZWxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbmZpcm1cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCByZWxvYWRUc0ZpbGVfMDAwID0gYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdChcImFzc2V0LWRiXCIsIFwicmVpbXBvcnQtYXNzZXRcIiwgXCI4NTNlOGZiZi05NzY5LTQ5YTgtYjJkMi0wMDE2MzkwYjY5NTNcIik7XG4gICAgICAgIFxuICAgICAgICAvLyBjb25zdCBlZmZlY3RDb21wTmFtZSA9ICdTcHJpdGVFZmZlY3RDb2xvcic7XG4gICAgICAgIC8vIGNvbnN0IHV1aWRzID0gRWRpdG9yLlNlbGVjdGlvbi5nZXRTZWxlY3RlZCgnbm9kZScpO1xuICAgICAgICAvLyBjb25zdCBub2RlID0gYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAncXVlcnktbm9kZScsIHV1aWRzWzBdKTtcbiAgICAgICAgLy8gaWYgKCFub2RlKSB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLndhcm4oYOacqumBuOS4reevgOm7nmApO1xuICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG4gICAgXG4gICAgICAgIC8vIGNvbnN0IGluZGV4ID0gbm9kZS5fX2NvbXBzX18uZmluZEluZGV4KCh2OiBhbnkpID0+IHYudHlwZSA9PT0gZWZmZWN0Q29tcE5hbWUpO1xuICAgICAgICAvLyBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLndhcm4oYOevgOm7nuacquaOm+i8iSR7ZWZmZWN0Q29tcE5hbWV957WE5Lu2YCk7XG4gICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgIC8vIH1cbiAgICBcbiAgICAgICAgLy8gY29uc3QgZWZmZWN0RmlsZU5hbWUgPSBlZmZlY3RDb21wTmFtZS5yZXBsYWNlKC8oW0EtWl0pL2csICdfJDEnKS50b0xvd2VyQ2FzZSgpLnNsaWNlKDEpO1xuICAgICAgICAvLyBjb25zdCB1cmwgPSBgZGI6Ly9hc3NldHMvc3ByaXRlX2VmZmVjdC9lZmZlY3QvJHtlZmZlY3RGaWxlTmFtZX0uZWZmZWN0YDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYHVybDogJHt1cmx9YCk7XG4gICAgXG4gICAgICAgIC8vIGNvbnN0IHJlcyA9IGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ2Fzc2V0LWRiJywgJ3F1ZXJ5LWFzc2V0LWluZm8nLCB1cmwpO1xuICAgICAgICAvLyBhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KFwiYXNzZXQtZGJcIiwgXCJyZWltcG9ydC1hc3NldFwiLCByZXMhLnV1aWQpO1xuICAgIH0pO1xuXG4gICAgYXdhaXQgYXV0b0Fzc2lnbkVmZmVjdEFzc2V0KCdTcHJpdGVFZmZlY3RDb2xvcicpO1xufSJdfQ==