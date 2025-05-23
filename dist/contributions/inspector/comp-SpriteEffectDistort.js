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

    <ui-prop type="dump" class="noiseTexture"></ui-prop>
    <ui-prop type="dump" class="speed"></ui-prop>
    <ui-prop type="dump" class="strength"></ui-prop>
</ui-section>
`;
const effectConst = {
    effectAsset: '.effectAsset',
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    sampleFromRT: '.sampleFromRT',
    reload: '.reload',
    noiseTexture: '.noiseTexture',
    speed: '.speed',
    strength: '.strength',
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
    this.$.noiseTexture.render(dump.value.noiseTexture);
    this.$.speed.render(dump.value.speed);
    this.$.strength.render(dump.value.strength);
}
exports.update = update;
let isInit = false;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        await util_1.assignEffectAsset('SpriteEffectDistort');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        // await assignEffectAsset('SpriteEffectDistort');
        // await reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3REaXN0b3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2NvbnRyaWJ1dGlvbnMvaW5zcGVjdG9yL2NvbXAtU3ByaXRlRWZmZWN0RGlzdG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7OztBQUViLHFDQUFzRjtBQUN0RiwrQ0FBMkY7QUFFOUUsUUFBQSxRQUFRLEdBQUc7RUFDdEIsNkJBQWU7Ozs7Ozs7Ozs7Ozs7Q0FhaEIsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHO0lBQ2hCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLFlBQVksRUFBRSxlQUFlO0lBQzdCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFlBQVksRUFBRSxlQUFlO0lBQzdCLEtBQUssRUFBRSxRQUFRO0lBQ2YsUUFBUSxFQUFFLFdBQVc7Q0FDeEIsQ0FBQTtBQUVZLFFBQUEsQ0FBQyxtQ0FBUSx5QkFBVyxHQUFLLFdBQVcsRUFBRztBQUVwRCxTQUFnQixNQUFNLENBQTJCLElBQVM7SUFDdEQsZ0NBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVwQyxlQUFlO0lBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDcEQsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7UUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUM7SUFFRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBZkQsd0JBZUM7QUFFRCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFFWixLQUFLLFVBQVUsS0FBSztJQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDakQsTUFBTSx3QkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sb0JBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNULGtEQUFrRDtRQUNsRCx5QkFBeUI7UUFDekIsTUFBTSxHQUFHLElBQUksQ0FBQztLQUNqQjtBQUNMLENBQUM7QUFYRCxzQkFXQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB7IGFzc2lnbkVmZmVjdEFzc2V0LCBhdXRvQXNzaWduVGV4dHVyZUFzc2V0LCByZWltcG9ydEFzc2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxcIjtcclxuaW1wb3J0IHsgU2VsZWN0b3IsIGJhc2Vfc3ByaXRlX3VwZGF0ZSwgc3ByaXRlQ29uc3QsIHNwcml0ZV90ZW1wbGF0ZSB9IGZyb20gXCIuL2NvbXAtU3ByaXRlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdGVtcGxhdGUgPSBgXHJcbiR7c3ByaXRlX3RlbXBsYXRlfVxyXG5cclxuPHVpLXNlY3Rpb24gY2xhc3M9XCJjb25maWdcIiBoZWFkZXI9XCJFZmZlY3QgUHJvcHNcIiBleHBhbmQ+XHJcbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZWZmZWN0QXNzZXRcIj48L3VpLXByb3A+XHJcbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZWZmZWN0Q29sb3JcIj48L3VpLXByb3A+XHJcbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiaXMyRGluM0RcIj48L3VpLXByb3A+XHJcbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwic2FtcGxlRnJvbVJUXCI+PC91aS1wcm9wPlxyXG4gICAgPHVpLWJ1dHRvbiBjbGFzcz1cInJlbG9hZFwiIHN0eWxlPVwiaGVpZ2h0OjI0cHg7bWFyZ2luOjE2cHggMDtcIj5SZWxvYWQgQXNzZXQ8L3VpLWJ1dHRvbj5cclxuXHJcbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwibm9pc2VUZXh0dXJlXCI+PC91aS1wcm9wPlxyXG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNwZWVkXCI+PC91aS1wcm9wPlxyXG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInN0cmVuZ3RoXCI+PC91aS1wcm9wPlxyXG48L3VpLXNlY3Rpb24+XHJcbmA7XHJcblxyXG5jb25zdCBlZmZlY3RDb25zdCA9IHtcclxuICAgIGVmZmVjdEFzc2V0OiAnLmVmZmVjdEFzc2V0JyxcclxuICAgIGVmZmVjdENvbG9yOiAnLmVmZmVjdENvbG9yJyxcclxuICAgIGlzMkRpbjNEOiAnLmlzMkRpbjNEJyxcclxuICAgIHNhbXBsZUZyb21SVDogJy5zYW1wbGVGcm9tUlQnLFxyXG4gICAgcmVsb2FkOiAnLnJlbG9hZCcsXHJcbiAgICBub2lzZVRleHR1cmU6ICcubm9pc2VUZXh0dXJlJyxcclxuICAgIHNwZWVkOiAnLnNwZWVkJyxcclxuICAgIHN0cmVuZ3RoOiAnLnN0cmVuZ3RoJyxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0ICQgPSB7IC4uLnNwcml0ZUNvbnN0LCAuLi5lZmZlY3RDb25zdCB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZSh0aGlzOiBTZWxlY3Rvcjx0eXBlb2YgJD4sIGR1bXA6IGFueSkge1xyXG4gICAgYmFzZV9zcHJpdGVfdXBkYXRlLmNhbGwodGhpcywgZHVtcCk7XHJcblxyXG4gICAgLy8gZWZmZWN0IHByb3BzXHJcbiAgICB0aGlzLiQuZWZmZWN0QXNzZXQucmVuZGVyKGR1bXAudmFsdWUuZWZmZWN0QXNzZXQpO1xyXG4gICAgdGhpcy4kLmVmZmVjdENvbG9yLnJlbmRlcihkdW1wLnZhbHVlLmVmZmVjdENvbG9yKTtcclxuICAgIHRoaXMuJC5pczJEaW4zRC5yZW5kZXIoZHVtcC52YWx1ZS5pczJEaW4zRCk7XHJcbiAgICB0aGlzLiQuc2FtcGxlRnJvbVJULnJlbmRlcihkdW1wLnZhbHVlLnNhbXBsZUZyb21SVCk7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuJC5yZWxvYWQucmVuZGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB0aGlzLiQucmVsb2FkLnJlbmRlcihkdW1wLnZhbHVlLmxhYmVsKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLiQubm9pc2VUZXh0dXJlLnJlbmRlcihkdW1wLnZhbHVlLm5vaXNlVGV4dHVyZSk7XHJcbiAgICB0aGlzLiQuc3BlZWQucmVuZGVyKGR1bXAudmFsdWUuc3BlZWQpO1xyXG4gICAgdGhpcy4kLnN0cmVuZ3RoLnJlbmRlcihkdW1wLnZhbHVlLnN0cmVuZ3RoKTtcclxufVxyXG5cclxubGV0IGlzSW5pdCA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWR5KHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPikge1xyXG4gICAgdGhpcy4kLnJlbG9hZC5hZGRFdmVudExpc3RlbmVyKFwiY29uZmlybVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgYXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdERpc3RvcnQnKTtcclxuICAgICAgICBhd2FpdCByZWltcG9ydEFzc2V0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWlzSW5pdCkge1xyXG4gICAgICAgIC8vIGF3YWl0IGFzc2lnbkVmZmVjdEFzc2V0KCdTcHJpdGVFZmZlY3REaXN0b3J0Jyk7XHJcbiAgICAgICAgLy8gYXdhaXQgcmVpbXBvcnRBc3NldCgpO1xyXG4gICAgICAgIGlzSW5pdCA9IHRydWU7XHJcbiAgICB9XHJcbn0iXX0=