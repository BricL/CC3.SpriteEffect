'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = exports.update = exports.$ = exports.template = void 0;
const util_1 = require("../../util");
const comp_Sprite_1 = require("./comp-Sprite");
exports.template = `
${comp_Sprite_1.sprite_template}

<ui-section class="config" header="Effect Props" expand>
    <ui-prop type="dump" class="effectAsset"></ui-prop>
    <ui-prop type="dump" class="effectColor"></ui-prop>
    <ui-prop type="dump" class="is2Din3D"></ui-prop>
    <ui-prop type="dump" class="sampleFromRT"></ui-prop>
    <ui-button class="reload" style="height:24px;margin:16px 0;">Reload Asset</ui-button>
    <ui-prop type="dump" class="speed"></ui-prop>
    <ui-prop type="dump" class="density"></ui-prop>
</ui-section>
`;
const effectConst = {
    effectAsset: '.effectAsset',
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    sampleFromRT: '.sampleFromRT',
    reload: '.reload',
    speed: '.speed',
    density: '.density',
};
exports.$ = Object.assign(Object.assign({}, comp_Sprite_1.spriteConst), effectConst);
function update(dump) {
    comp_Sprite_1.base_sprite_update.call(this, dump);
    // effect props
    this.$.effectAsset.render(dump.value.effectAsset);
    this.$.effectColor.render(dump.value.effectColor);
    this.$.is2Din3D.render(dump.value.is2Din3D);
    this.$.sampleFromRT.render(dump.value.sampleFromRT);
    if (typeof this.$.reload.render === "function") {
        this.$.reload.render(dump.value.label);
    }
    this.$.speed.render(dump.value.speed);
    this.$.density.render(dump.value.density);
}
exports.update = update;
let isInit = false;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        await util_1.assignEffectAsset('SpriteEffectWaterRipple');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        // await assignEffectAsset('SpriteEffectWaterRipple');
        // await reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3RXYXRlclJpcHBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9jb250cmlidXRpb25zL2luc3BlY3Rvci9jb21wLVNwcml0ZUVmZmVjdFdhdGVyUmlwcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7O0FBRWIscUNBQThEO0FBQzlELCtDQUEyRjtBQUU5RSxRQUFBLFFBQVEsR0FBRztFQUN0Qiw2QkFBZTs7Ozs7Ozs7Ozs7Q0FXaEIsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHO0lBQ2hCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLFlBQVksRUFBRSxlQUFlO0lBQzdCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLEtBQUssRUFBRSxRQUFRO0lBQ2YsT0FBTyxFQUFFLFVBQVU7Q0FDdEIsQ0FBQTtBQUVZLFFBQUEsQ0FBQyxtQ0FBUSx5QkFBVyxHQUFLLFdBQVcsRUFBRztBQUVwRCxTQUFnQixNQUFNLENBQTJCLElBQVM7SUFDdEQsZ0NBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVwQyxlQUFlO0lBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDcEQsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7UUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUM7SUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBYkQsd0JBYUM7QUFFRCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFFWixLQUFLLFVBQVUsS0FBSztJQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDakQsTUFBTSx3QkFBaUIsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sb0JBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNULHNEQUFzRDtRQUN0RCx5QkFBeUI7UUFDekIsTUFBTSxHQUFHLElBQUksQ0FBQztLQUNqQjtBQUNMLENBQUM7QUFYRCxzQkFXQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IGFzc2lnbkVmZmVjdEFzc2V0LCByZWltcG9ydEFzc2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxcIjtcclxuaW1wb3J0IHsgU2VsZWN0b3IsIGJhc2Vfc3ByaXRlX3VwZGF0ZSwgc3ByaXRlQ29uc3QsIHNwcml0ZV90ZW1wbGF0ZSB9IGZyb20gXCIuL2NvbXAtU3ByaXRlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdGVtcGxhdGUgPSBgXHJcbiR7c3ByaXRlX3RlbXBsYXRlfVxyXG5cclxuPHVpLXNlY3Rpb24gY2xhc3M9XCJjb25maWdcIiBoZWFkZXI9XCJFZmZlY3QgUHJvcHNcIiBleHBhbmQ+XHJcbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZWZmZWN0QXNzZXRcIj48L3VpLXByb3A+XHJcbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZWZmZWN0Q29sb3JcIj48L3VpLXByb3A+XHJcbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiaXMyRGluM0RcIj48L3VpLXByb3A+XHJcbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwic2FtcGxlRnJvbVJUXCI+PC91aS1wcm9wPlxyXG4gICAgPHVpLWJ1dHRvbiBjbGFzcz1cInJlbG9hZFwiIHN0eWxlPVwiaGVpZ2h0OjI0cHg7bWFyZ2luOjE2cHggMDtcIj5SZWxvYWQgQXNzZXQ8L3VpLWJ1dHRvbj5cclxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzcGVlZFwiPjwvdWktcHJvcD5cclxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJkZW5zaXR5XCI+PC91aS1wcm9wPlxyXG48L3VpLXNlY3Rpb24+XHJcbmA7XHJcblxyXG5jb25zdCBlZmZlY3RDb25zdCA9IHtcclxuICAgIGVmZmVjdEFzc2V0OiAnLmVmZmVjdEFzc2V0JyxcclxuICAgIGVmZmVjdENvbG9yOiAnLmVmZmVjdENvbG9yJyxcclxuICAgIGlzMkRpbjNEOiAnLmlzMkRpbjNEJyxcclxuICAgIHNhbXBsZUZyb21SVDogJy5zYW1wbGVGcm9tUlQnLFxyXG4gICAgcmVsb2FkOiAnLnJlbG9hZCcsXHJcbiAgICBzcGVlZDogJy5zcGVlZCcsXHJcbiAgICBkZW5zaXR5OiAnLmRlbnNpdHknLFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgJCA9IHsgLi4uc3ByaXRlQ29uc3QsIC4uLmVmZmVjdENvbnN0IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPiwgZHVtcDogYW55KSB7XHJcbiAgICBiYXNlX3Nwcml0ZV91cGRhdGUuY2FsbCh0aGlzLCBkdW1wKTtcclxuXHJcbiAgICAvLyBlZmZlY3QgcHJvcHNcclxuICAgIHRoaXMuJC5lZmZlY3RBc3NldC5yZW5kZXIoZHVtcC52YWx1ZS5lZmZlY3RBc3NldCk7XHJcbiAgICB0aGlzLiQuZWZmZWN0Q29sb3IucmVuZGVyKGR1bXAudmFsdWUuZWZmZWN0Q29sb3IpO1xyXG4gICAgdGhpcy4kLmlzMkRpbjNELnJlbmRlcihkdW1wLnZhbHVlLmlzMkRpbjNEKTtcclxuICAgIHRoaXMuJC5zYW1wbGVGcm9tUlQucmVuZGVyKGR1bXAudmFsdWUuc2FtcGxlRnJvbVJUKTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy4kLnJlbG9hZC5yZW5kZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHRoaXMuJC5yZWxvYWQucmVuZGVyKGR1bXAudmFsdWUubGFiZWwpO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kLnNwZWVkLnJlbmRlcihkdW1wLnZhbHVlLnNwZWVkKTtcclxuICAgIHRoaXMuJC5kZW5zaXR5LnJlbmRlcihkdW1wLnZhbHVlLmRlbnNpdHkpO1xyXG59XHJcblxyXG5sZXQgaXNJbml0ID0gZmFsc2U7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZHkodGhpczogU2VsZWN0b3I8dHlwZW9mICQ+KSB7XHJcbiAgICB0aGlzLiQucmVsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJjb25maXJtXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBhc3NpZ25FZmZlY3RBc3NldCgnU3ByaXRlRWZmZWN0V2F0ZXJSaXBwbGUnKTtcclxuICAgICAgICBhd2FpdCByZWltcG9ydEFzc2V0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWlzSW5pdCkge1xyXG4gICAgICAgIC8vIGF3YWl0IGFzc2lnbkVmZmVjdEFzc2V0KCdTcHJpdGVFZmZlY3RXYXRlclJpcHBsZScpO1xyXG4gICAgICAgIC8vIGF3YWl0IHJlaW1wb3J0QXNzZXQoKTtcclxuICAgICAgICBpc0luaXQgPSB0cnVlO1xyXG4gICAgfVxyXG59Il19