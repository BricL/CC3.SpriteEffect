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

    <ui-prop type="dump" class="noiseTexture"></ui-prop>
    <ui-prop type="dump" class="dissolveColor"></ui-prop>
    <ui-prop type="dump" class="factor"></ui-prop>
    <ui-prop type="dump" class="softness"></ui-prop>
    <ui-prop type="dump" class="width"></ui-prop>
</ui-section>
`;
const effectConst = {
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    reload: '.reload',
    noiseTexture: '.noiseTexture',
    dissolveColor: '.dissolveColor',
    factor: '.factor',
    softness: '.softness',
    width: '.width',
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
    this.$.noiseTexture.render(dump.value.noiseTexture);
    this.$.dissolveColor.render(dump.value.dissolveColor);
    this.$.factor.render(dump.value.factor);
    this.$.softness.render(dump.value.softness);
    this.$.width.render(dump.value.width);
}
exports.update = update;
let isInit = false;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        await util_1.assignEffectAsset('SpriteEffectDissolve');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        await util_1.assignEffectAsset('SpriteEffectDissolve');
        await util_1.reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3REaXNzb2x2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9jb250cmlidXRpb25zL2luc3BlY3Rvci9jb21wLVNwcml0ZUVmZmVjdERpc3NvbHZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7O0FBRWIscUNBQThEO0FBQzlELCtDQUFpRjtBQUlwRSxRQUFBLFFBQVEsR0FBRztFQUN0Qiw2QkFBZTs7Ozs7Ozs7Ozs7OztDQWFoQixDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUc7SUFDaEIsV0FBVyxFQUFFLGNBQWM7SUFDM0IsUUFBUSxFQUFFLFdBQVc7SUFDckIsTUFBTSxFQUFFLFNBQVM7SUFFakIsWUFBWSxFQUFFLGVBQWU7SUFDN0IsYUFBYSxFQUFFLGdCQUFnQjtJQUMvQixNQUFNLEVBQUUsU0FBUztJQUNqQixRQUFRLEVBQUUsV0FBVztJQUNyQixLQUFLLEVBQUUsUUFBUTtDQUNsQixDQUFBO0FBRVksUUFBQSxDQUFDLG1DQUFRLHlCQUFXLEdBQUssV0FBVyxFQUFHO0FBRXBELFNBQWdCLE1BQU0sQ0FBMkIsSUFBUztJQUN0RCxnQ0FBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRXBDLGVBQWU7SUFDZixJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtRQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMxQztJQUNELElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BELElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RELElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFkRCx3QkFjQztBQUVELElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztBQUVaLEtBQUssVUFBVSxLQUFLO0lBQ3ZCLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNqRCxNQUFNLHdCQUFpQixDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDaEQsTUFBTSxvQkFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1QsTUFBTSx3QkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sb0JBQWEsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sR0FBRyxJQUFJLENBQUM7S0FDakI7QUFDTCxDQUFDO0FBWEQsc0JBV0MiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGFzc2lnbkVmZmVjdEFzc2V0LCByZWltcG9ydEFzc2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxcIjtcbmltcG9ydCB7IGJhc2Vfc3ByaXRlX3VwZGF0ZSwgc3ByaXRlQ29uc3QsIHNwcml0ZV90ZW1wbGF0ZSB9IGZyb20gXCIuL2NvbXAtU3ByaXRlXCI7XG5cbnR5cGUgU2VsZWN0b3I8VD4gPSB7ICQ6IFJlY29yZDxrZXlvZiBULCBhbnkgfCBudWxsPiB9XG5cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IGBcbiR7c3ByaXRlX3RlbXBsYXRlfVxuXG48dWktc2VjdGlvbiBjbGFzcz1cImNvbmZpZ1wiIGhlYWRlcj1cIkVmZmVjdCBQcm9wc1wiIGV4cGFuZD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZWZmZWN0Q29sb3JcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImlzMkRpbjNEXCI+PC91aS1wcm9wPlxuICAgIDx1aS1idXR0b24gY2xhc3M9XCJyZWxvYWRcIiBzdHlsZT1cImhlaWdodDoyNHB4O21hcmdpbjoxNnB4IDA7XCI+UmVsb2FkIEFzc2V0PC91aS1idXR0b24+XG5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwibm9pc2VUZXh0dXJlXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJkaXNzb2x2ZUNvbG9yXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmYWN0b3JcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNvZnRuZXNzXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJ3aWR0aFwiPjwvdWktcHJvcD5cbjwvdWktc2VjdGlvbj5cbmA7XG5cbmNvbnN0IGVmZmVjdENvbnN0ID0ge1xuICAgIGVmZmVjdENvbG9yOiAnLmVmZmVjdENvbG9yJyxcbiAgICBpczJEaW4zRDogJy5pczJEaW4zRCcsXG4gICAgcmVsb2FkOiAnLnJlbG9hZCcsXG5cbiAgICBub2lzZVRleHR1cmU6ICcubm9pc2VUZXh0dXJlJyxcbiAgICBkaXNzb2x2ZUNvbG9yOiAnLmRpc3NvbHZlQ29sb3InLFxuICAgIGZhY3RvcjogJy5mYWN0b3InLFxuICAgIHNvZnRuZXNzOiAnLnNvZnRuZXNzJyxcbiAgICB3aWR0aDogJy53aWR0aCcsXG59XG5cbmV4cG9ydCBjb25zdCAkID0geyAuLi5zcHJpdGVDb25zdCwgLi4uZWZmZWN0Q29uc3QgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZSh0aGlzOiBTZWxlY3Rvcjx0eXBlb2YgJD4sIGR1bXA6IGFueSkge1xuICAgIGJhc2Vfc3ByaXRlX3VwZGF0ZS5jYWxsKHRoaXMsIGR1bXApO1xuXG4gICAgLy8gZWZmZWN0IHByb3BzXG4gICAgdGhpcy4kLmVmZmVjdENvbG9yLnJlbmRlcihkdW1wLnZhbHVlLmVmZmVjdENvbG9yKTtcbiAgICB0aGlzLiQuaXMyRGluM0QucmVuZGVyKGR1bXAudmFsdWUuaXMyRGluM0QpO1xuICAgIGlmICh0eXBlb2YgdGhpcy4kLnJlbG9hZC5yZW5kZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aGlzLiQucmVsb2FkLnJlbmRlcihkdW1wLnZhbHVlLmxhYmVsKTtcbiAgICB9XG4gICAgdGhpcy4kLm5vaXNlVGV4dHVyZS5yZW5kZXIoZHVtcC52YWx1ZS5ub2lzZVRleHR1cmUpO1xuICAgIHRoaXMuJC5kaXNzb2x2ZUNvbG9yLnJlbmRlcihkdW1wLnZhbHVlLmRpc3NvbHZlQ29sb3IpO1xuICAgIHRoaXMuJC5mYWN0b3IucmVuZGVyKGR1bXAudmFsdWUuZmFjdG9yKTtcbiAgICB0aGlzLiQuc29mdG5lc3MucmVuZGVyKGR1bXAudmFsdWUuc29mdG5lc3MpO1xuICAgIHRoaXMuJC53aWR0aC5yZW5kZXIoZHVtcC52YWx1ZS53aWR0aCk7XG59XG5cbmxldCBpc0luaXQgPSBmYWxzZTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWR5KHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPikge1xuICAgIHRoaXMuJC5yZWxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbmZpcm1cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBhc3NpZ25FZmZlY3RBc3NldCgnU3ByaXRlRWZmZWN0RGlzc29sdmUnKTtcbiAgICAgICAgYXdhaXQgcmVpbXBvcnRBc3NldCgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpc0luaXQpIHtcbiAgICAgICAgYXdhaXQgYXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdERpc3NvbHZlJyk7XG4gICAgICAgIGF3YWl0IHJlaW1wb3J0QXNzZXQoKTtcbiAgICAgICAgaXNJbml0ID0gdHJ1ZTtcbiAgICB9XG59Il19