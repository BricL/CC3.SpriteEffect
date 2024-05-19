'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = exports.update = exports.$ = exports.template = void 0;
exports.template = `
<ui-prop type="dump" class="spriteAtlas"></ui-prop>
<ui-prop type="dump" class="spriteFrame"></ui-prop>
<ui-prop type="dump" class="sizeMode"></ui-prop>
<ui-prop type="dump" class="type"></ui-prop>
<ui-prop type="dump" class="trim"></ui-prop>

<ui-section class="config" header="Effect Props" expand>
    <ui-prop type="dump" class="effectAsset"></ui-prop>
    <ui-prop type="dump" class="effectColor"></ui-prop>
    <ui-button class="reload" style="height:24px;margin:16px 0;">Reload Asset</ui-button>
</ui-section>
`;
exports.$ = {
    spriteAtlas: '.spriteAtlas',
    spriteFrame: '.spriteFrame',
    sizeMode: '.sizeMode',
    type: '.type',
    trim: '.trim',
    effectAsset: '.effectAsset',
    effectColor: '.effectColor',
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
    this.$.effectAsset.render(dump.value.effectAsset);
    this.$.effectColor.render(dump.value.effectColor);
    if (typeof this.$.reload.render === "function") {
        this.$.reload.render(dump.value.label);
    }
}
exports.update = update;
function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        const reloadTsFile_000 = await Editor.Message.request("asset-db", "reimport-asset", "853e8fbf-9769-49a8-b2d2-0016390b6953");
    });
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1UZXN0RWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2NvbnRyaWJ1dGlvbnMvaW5zcGVjdG9yL2NvbXAtVGVzdEVmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7OztBQUlBLFFBQUEsUUFBUSxHQUFHOzs7Ozs7Ozs7Ozs7Q0FZdkIsQ0FBQztBQUVXLFFBQUEsQ0FBQyxHQUFHO0lBQ2IsV0FBVyxFQUFFLGNBQWM7SUFDM0IsV0FBVyxFQUFFLGNBQWM7SUFDM0IsUUFBUSxFQUFDLFdBQVc7SUFDcEIsSUFBSSxFQUFDLE9BQU87SUFDWixJQUFJLEVBQUMsT0FBTztJQUNaLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLE1BQU0sRUFBRSxTQUFTO0NBQ3BCLENBQUM7QUFFRixTQUFnQixNQUFNLENBQTJCLElBQVM7SUFDdEQsd0NBQXdDO0lBQ3hDLG1DQUFtQztJQUNuQyxzQkFBc0I7SUFDdEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFbEQsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7UUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUM7QUFDTCxDQUFDO0FBZkQsd0JBZUM7QUFFRCxTQUFnQixLQUFLO0lBQ2pCLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNqRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFFLHNDQUFzQyxDQUFDLENBQUM7SUFDaEksQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBSkQsc0JBSUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnR5cGUgU2VsZWN0b3I8JD4gPSB7ICQ6IFJlY29yZDxrZXlvZiAkLCBhbnkgfCBudWxsPiB9XG5cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IGBcbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzcHJpdGVBdGxhc1wiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzcHJpdGVGcmFtZVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzaXplTW9kZVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJ0eXBlXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInRyaW1cIj48L3VpLXByb3A+XG5cbjx1aS1zZWN0aW9uIGNsYXNzPVwiY29uZmlnXCIgaGVhZGVyPVwiRWZmZWN0IFByb3BzXCIgZXhwYW5kPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJlZmZlY3RBc3NldFwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZWZmZWN0Q29sb3JcIj48L3VpLXByb3A+XG4gICAgPHVpLWJ1dHRvbiBjbGFzcz1cInJlbG9hZFwiIHN0eWxlPVwiaGVpZ2h0OjI0cHg7bWFyZ2luOjE2cHggMDtcIj5SZWxvYWQgQXNzZXQ8L3VpLWJ1dHRvbj5cbjwvdWktc2VjdGlvbj5cbmA7XG5cbmV4cG9ydCBjb25zdCAkID0ge1xuICAgIHNwcml0ZUF0bGFzOiAnLnNwcml0ZUF0bGFzJyxcbiAgICBzcHJpdGVGcmFtZTogJy5zcHJpdGVGcmFtZScsXG4gICAgc2l6ZU1vZGU6Jy5zaXplTW9kZScsXG4gICAgdHlwZTonLnR5cGUnLFxuICAgIHRyaW06Jy50cmltJyxcbiAgICBlZmZlY3RBc3NldDogJy5lZmZlY3RBc3NldCcsXG4gICAgZWZmZWN0Q29sb3I6ICcuZWZmZWN0Q29sb3InLFxuICAgIHJlbG9hZDogJy5yZWxvYWQnLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZSh0aGlzOiBTZWxlY3Rvcjx0eXBlb2YgJD4sIGR1bXA6IGFueSkge1xuICAgIC8vIOS9v+eUqCB1aS1wb3JwIOiHquWKqOa4suafk++8jOiuvue9riBwcm9wIOeahCB0eXBlIOS4uiBkdW1wXG4gICAgLy8gcmVuZGVyIOS8oOWFpeS4gOS4qiBkdW1wIOaVsOaNru+8jOiDveWkn+iHquWKqOa4suafk+WHuuWvueW6lOeahOeVjOmdolxuICAgIC8vIOiHquWKqOa4suafk+eahOeVjOmdouS/ruaUueWQju+8jOiDveWkn+iHquWKqOaPkOS6pOaVsOaNrlxuICAgIHRoaXMuJC5zcHJpdGVBdGxhcy5yZW5kZXIoZHVtcC52YWx1ZS5zcHJpdGVBdGxhcyk7XG4gICAgdGhpcy4kLnNwcml0ZUZyYW1lLnJlbmRlcihkdW1wLnZhbHVlLnNwcml0ZUZyYW1lKTtcbiAgICB0aGlzLiQuc2l6ZU1vZGUucmVuZGVyKGR1bXAudmFsdWUuc2l6ZU1vZGUpO1xuICAgIHRoaXMuJC50eXBlLnJlbmRlcihkdW1wLnZhbHVlLnR5cGUpO1xuICAgIHRoaXMuJC50cmltLnJlbmRlcihkdW1wLnZhbHVlLnRyaW0pO1xuICAgIHRoaXMuJC5lZmZlY3RBc3NldC5yZW5kZXIoZHVtcC52YWx1ZS5lZmZlY3RBc3NldCk7XG4gICAgdGhpcy4kLmVmZmVjdENvbG9yLnJlbmRlcihkdW1wLnZhbHVlLmVmZmVjdENvbG9yKTtcblxuICAgIGlmICh0eXBlb2YgdGhpcy4kLnJlbG9hZC5yZW5kZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aGlzLiQucmVsb2FkLnJlbmRlcihkdW1wLnZhbHVlLmxhYmVsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkeSh0aGlzOiBTZWxlY3Rvcjx0eXBlb2YgJD4pIHtcbiAgICB0aGlzLiQucmVsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJjb25maXJtXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVsb2FkVHNGaWxlXzAwMCA9IGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoXCJhc3NldC1kYlwiLCBcInJlaW1wb3J0LWFzc2V0XCIsIFwiODUzZThmYmYtOTc2OS00OWE4LWIyZDItMDAxNjM5MGI2OTUzXCIpO1xuICAgIH0pO1xufSJdfQ==