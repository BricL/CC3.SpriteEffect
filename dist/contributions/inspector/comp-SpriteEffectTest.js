'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = exports.update = exports.$ = exports.template = void 0;
const util_1 = require("../../util");
const comp_Sprite_1 = require("./comp-Sprite");
exports.template = `
${comp_Sprite_1.sprite_template}

<ui-section class="config" header="Effect Props" expand>
    <ui-prop type="dump" class="effectColor"></ui-prop>
    <ui-prop type="dump" class="is2Din3D"></ui-prop>
    <ui-button class="reload" style="height:24px;margin:16px 0;">Reload Asset</ui-button>
</ui-section>
`;
const effectConst = {
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    reload: '.reload',
};
exports.$ = Object.assign(Object.assign({}, comp_Sprite_1.spriteConst), effectConst);
function update(dump) {
    comp_Sprite_1.base_sprite_update.call(this, dump);
    // effect props
    this.$.effectColor.render(dump.value.effectColor);
    this.$.is2Din3D.render(dump.value.is2Din3D);
    if (typeof this.$.reload.render === "function") {
        this.$.reload.render(dump.value.label);
    }
}
exports.update = update;
let isInit = false;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        await util_1.autoAssignEffectAsset('SpriteEffectTest');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        await util_1.autoAssignEffectAsset('SpriteEffectTest');
        await util_1.reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3RUZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2NvbnRyaWJ1dGlvbnMvaW5zcGVjdG9yL2NvbXAtU3ByaXRlRWZmZWN0VGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7OztBQUViLHFDQUFrRTtBQUNsRSwrQ0FBMkY7QUFFOUUsUUFBQSxRQUFRLEdBQUc7RUFDdEIsNkJBQWU7Ozs7Ozs7Q0FPaEIsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHO0lBQ2hCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLE1BQU0sRUFBRSxTQUFTO0NBQ3BCLENBQUE7QUFFWSxRQUFBLENBQUMsbUNBQVEseUJBQVcsR0FBSyxXQUFXLEVBQUc7QUFFcEQsU0FBZ0IsTUFBTSxDQUEyQixJQUFTO0lBQ3RELGdDQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFcEMsZUFBZTtJQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFDO0FBQ0wsQ0FBQztBQVRELHdCQVNDO0FBRUQsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBRVosS0FBSyxVQUFVLEtBQUs7SUFDdkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2pELE1BQU0sNEJBQXFCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoRCxNQUFNLG9CQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDVCxNQUFNLDRCQUFxQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEQsTUFBTSxvQkFBYSxFQUFFLENBQUM7UUFDdEIsTUFBTSxHQUFHLElBQUksQ0FBQztLQUNqQjtBQUNMLENBQUM7QUFYRCxzQkFXQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgYXV0b0Fzc2lnbkVmZmVjdEFzc2V0LCByZWltcG9ydEFzc2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxcIjtcbmltcG9ydCB7IFNlbGVjdG9yLCBiYXNlX3Nwcml0ZV91cGRhdGUsIHNwcml0ZUNvbnN0LCBzcHJpdGVfdGVtcGxhdGUgfSBmcm9tIFwiLi9jb21wLVNwcml0ZVwiO1xuXG5leHBvcnQgY29uc3QgdGVtcGxhdGUgPSBgXG4ke3Nwcml0ZV90ZW1wbGF0ZX1cblxuPHVpLXNlY3Rpb24gY2xhc3M9XCJjb25maWdcIiBoZWFkZXI9XCJFZmZlY3QgUHJvcHNcIiBleHBhbmQ+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImVmZmVjdENvbG9yXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJpczJEaW4zRFwiPjwvdWktcHJvcD5cbiAgICA8dWktYnV0dG9uIGNsYXNzPVwicmVsb2FkXCIgc3R5bGU9XCJoZWlnaHQ6MjRweDttYXJnaW46MTZweCAwO1wiPlJlbG9hZCBBc3NldDwvdWktYnV0dG9uPlxuPC91aS1zZWN0aW9uPlxuYDtcblxuY29uc3QgZWZmZWN0Q29uc3QgPSB7XG4gICAgZWZmZWN0Q29sb3I6ICcuZWZmZWN0Q29sb3InLFxuICAgIGlzMkRpbjNEOiAnLmlzMkRpbjNEJyxcbiAgICByZWxvYWQ6ICcucmVsb2FkJyxcbn1cblxuZXhwb3J0IGNvbnN0ICQgPSB7IC4uLnNwcml0ZUNvbnN0LCAuLi5lZmZlY3RDb25zdCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPiwgZHVtcDogYW55KSB7XG4gICAgYmFzZV9zcHJpdGVfdXBkYXRlLmNhbGwodGhpcywgZHVtcCk7XG5cbiAgICAvLyBlZmZlY3QgcHJvcHNcbiAgICB0aGlzLiQuZWZmZWN0Q29sb3IucmVuZGVyKGR1bXAudmFsdWUuZWZmZWN0Q29sb3IpO1xuICAgIHRoaXMuJC5pczJEaW4zRC5yZW5kZXIoZHVtcC52YWx1ZS5pczJEaW4zRCk7XG4gICAgaWYgKHR5cGVvZiB0aGlzLiQucmVsb2FkLnJlbmRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXMuJC5yZWxvYWQucmVuZGVyKGR1bXAudmFsdWUubGFiZWwpO1xuICAgIH1cbn1cblxubGV0IGlzSW5pdCA9IGZhbHNlO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZHkodGhpczogU2VsZWN0b3I8dHlwZW9mICQ+KSB7XG4gICAgdGhpcy4kLnJlbG9hZC5hZGRFdmVudExpc3RlbmVyKFwiY29uZmlybVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGF1dG9Bc3NpZ25FZmZlY3RBc3NldCgnU3ByaXRlRWZmZWN0VGVzdCcpO1xuICAgICAgICBhd2FpdCByZWltcG9ydEFzc2V0KCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzSW5pdCkge1xuICAgICAgICBhd2FpdCBhdXRvQXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdFRlc3QnKTtcbiAgICAgICAgYXdhaXQgcmVpbXBvcnRBc3NldCgpO1xuICAgICAgICBpc0luaXQgPSB0cnVlO1xuICAgIH1cbn0iXX0=