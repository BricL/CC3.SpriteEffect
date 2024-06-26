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
    <ui-button class="reload" style="height:24px;margin:16px 0;">Reload Asset</ui-button>
    <ui-prop type="dump" class="offset"></ui-prop>
    <ui-prop type="dump" class="waveWidth"></ui-prop>
    <ui-prop type="dump" class="waveHeight"></ui-prop>
    <ui-prop type="dump" class="waveSpeed"></ui-prop>
</ui-section>
`;
const effectConst = {
    effectAsset: '.effectAsset',
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    reload: '.reload',
    offset: '.offset',
    waveWidth: '.waveWidth',
    waveHeight: '.waveHeight',
    waveSpeed: '.waveSpeed',
};
exports.$ = Object.assign(Object.assign({}, comp_Sprite_1.spriteConst), effectConst);
function update(dump) {
    comp_Sprite_1.base_sprite_update.call(this, dump);
    // effect props
    this.$.effectAsset.render(dump.value.effectAsset);
    this.$.effectColor.render(dump.value.effectColor);
    this.$.is2Din3D.render(dump.value.is2Din3D);
    if (typeof this.$.reload.render === "function") {
        this.$.reload.render(dump.value.label);
    }
    this.$.offset.render(dump.value.offset);
    this.$.waveWidth.render(dump.value.waveWidth);
    this.$.waveHeight.render(dump.value.waveHeight);
    this.$.waveSpeed.render(dump.value.waveSpeed);
}
exports.update = update;
let isInit = false;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        await util_1.assignEffectAsset('SpriteEffectWaterWave');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        // await assignEffectAsset('SpriteEffectWaterWave');
        // await reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3RXYXRlcldhdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvY29udHJpYnV0aW9ucy9pbnNwZWN0b3IvY29tcC1TcHJpdGVFZmZlY3RXYXRlcldhdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7QUFFYixxQ0FBOEQ7QUFDOUQsK0NBQTJGO0FBRTlFLFFBQUEsUUFBUSxHQUFHO0VBQ3RCLDZCQUFlOzs7Ozs7Ozs7Ozs7Q0FZaEIsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHO0lBQ2hCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLFNBQVMsRUFBRSxZQUFZO0NBQzFCLENBQUE7QUFFWSxRQUFBLENBQUMsbUNBQVEseUJBQVcsR0FBSyxXQUFXLEVBQUc7QUFFcEQsU0FBZ0IsTUFBTSxDQUEyQixJQUFTO0lBQ3RELGdDQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFcEMsZUFBZTtJQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQWRELHdCQWNDO0FBRUQsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBRVosS0FBSyxVQUFVLEtBQUs7SUFDdkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2pELE1BQU0sd0JBQWlCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNqRCxNQUFNLG9CQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDVCxvREFBb0Q7UUFDcEQseUJBQXlCO1FBQ3pCLE1BQU0sR0FBRyxJQUFJLENBQUM7S0FDakI7QUFDTCxDQUFDO0FBWEQsc0JBV0MiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGFzc2lnbkVmZmVjdEFzc2V0LCByZWltcG9ydEFzc2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxcIjtcbmltcG9ydCB7IFNlbGVjdG9yLCBiYXNlX3Nwcml0ZV91cGRhdGUsIHNwcml0ZUNvbnN0LCBzcHJpdGVfdGVtcGxhdGUgfSBmcm9tIFwiLi9jb21wLVNwcml0ZVwiO1xuXG5leHBvcnQgY29uc3QgdGVtcGxhdGUgPSBgXG4ke3Nwcml0ZV90ZW1wbGF0ZX1cblxuPHVpLXNlY3Rpb24gY2xhc3M9XCJjb25maWdcIiBoZWFkZXI9XCJFZmZlY3QgUHJvcHNcIiBleHBhbmQ+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImVmZmVjdEFzc2V0XCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJlZmZlY3RDb2xvclwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiaXMyRGluM0RcIj48L3VpLXByb3A+XG4gICAgPHVpLWJ1dHRvbiBjbGFzcz1cInJlbG9hZFwiIHN0eWxlPVwiaGVpZ2h0OjI0cHg7bWFyZ2luOjE2cHggMDtcIj5SZWxvYWQgQXNzZXQ8L3VpLWJ1dHRvbj5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwib2Zmc2V0XCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJ3YXZlV2lkdGhcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cIndhdmVIZWlnaHRcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cIndhdmVTcGVlZFwiPjwvdWktcHJvcD5cbjwvdWktc2VjdGlvbj5cbmA7XG5cbmNvbnN0IGVmZmVjdENvbnN0ID0ge1xuICAgIGVmZmVjdEFzc2V0OiAnLmVmZmVjdEFzc2V0JyxcbiAgICBlZmZlY3RDb2xvcjogJy5lZmZlY3RDb2xvcicsXG4gICAgaXMyRGluM0Q6ICcuaXMyRGluM0QnLFxuICAgIHJlbG9hZDogJy5yZWxvYWQnLFxuICAgIG9mZnNldDogJy5vZmZzZXQnLFxuICAgIHdhdmVXaWR0aDogJy53YXZlV2lkdGgnLFxuICAgIHdhdmVIZWlnaHQ6ICcud2F2ZUhlaWdodCcsXG4gICAgd2F2ZVNwZWVkOiAnLndhdmVTcGVlZCcsXG59XG5cbmV4cG9ydCBjb25zdCAkID0geyAuLi5zcHJpdGVDb25zdCwgLi4uZWZmZWN0Q29uc3QgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZSh0aGlzOiBTZWxlY3Rvcjx0eXBlb2YgJD4sIGR1bXA6IGFueSkge1xuICAgIGJhc2Vfc3ByaXRlX3VwZGF0ZS5jYWxsKHRoaXMsIGR1bXApO1xuXG4gICAgLy8gZWZmZWN0IHByb3BzXG4gICAgdGhpcy4kLmVmZmVjdEFzc2V0LnJlbmRlcihkdW1wLnZhbHVlLmVmZmVjdEFzc2V0KTtcbiAgICB0aGlzLiQuZWZmZWN0Q29sb3IucmVuZGVyKGR1bXAudmFsdWUuZWZmZWN0Q29sb3IpO1xuICAgIHRoaXMuJC5pczJEaW4zRC5yZW5kZXIoZHVtcC52YWx1ZS5pczJEaW4zRCk7XG4gICAgaWYgKHR5cGVvZiB0aGlzLiQucmVsb2FkLnJlbmRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXMuJC5yZWxvYWQucmVuZGVyKGR1bXAudmFsdWUubGFiZWwpO1xuICAgIH1cbiAgICB0aGlzLiQub2Zmc2V0LnJlbmRlcihkdW1wLnZhbHVlLm9mZnNldCk7XG4gICAgdGhpcy4kLndhdmVXaWR0aC5yZW5kZXIoZHVtcC52YWx1ZS53YXZlV2lkdGgpO1xuICAgIHRoaXMuJC53YXZlSGVpZ2h0LnJlbmRlcihkdW1wLnZhbHVlLndhdmVIZWlnaHQpO1xuICAgIHRoaXMuJC53YXZlU3BlZWQucmVuZGVyKGR1bXAudmFsdWUud2F2ZVNwZWVkKTtcbn1cblxubGV0IGlzSW5pdCA9IGZhbHNlO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZHkodGhpczogU2VsZWN0b3I8dHlwZW9mICQ+KSB7XG4gICAgdGhpcy4kLnJlbG9hZC5hZGRFdmVudExpc3RlbmVyKFwiY29uZmlybVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGFzc2lnbkVmZmVjdEFzc2V0KCdTcHJpdGVFZmZlY3RXYXRlcldhdmUnKTtcbiAgICAgICAgYXdhaXQgcmVpbXBvcnRBc3NldCgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpc0luaXQpIHtcbiAgICAgICAgLy8gYXdhaXQgYXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdFdhdGVyV2F2ZScpO1xuICAgICAgICAvLyBhd2FpdCByZWltcG9ydEFzc2V0KCk7XG4gICAgICAgIGlzSW5pdCA9IHRydWU7XG4gICAgfVxufSJdfQ==