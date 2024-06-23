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
    <ui-prop type="dump" class="lightColor"></ui-prop>
    <ui-prop type="dump" class="lightWidth"></ui-prop>
    <ui-prop type="dump" class="soft"></ui-prop>
    <ui-prop type="dump" class="offset"></ui-prop>
    <ui-prop type="dump" class="rotation"></ui-prop>
</ui-section>
`;
const effectConst = {
    effectAsset: '.effectAsset',
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    reload: '.reload',
    lightColor: '.lightColor',
    lightWidth: '.lightWidth',
    soft: '.soft',
    offset: '.offset',
    rotation: '.rotation',
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
    this.$.lightColor.render(dump.value.lightColor);
    this.$.lightWidth.render(dump.value.lightWidth);
    this.$.soft.render(dump.value.soft);
    this.$.offset.render(dump.value.offset);
    this.$.rotation.render(dump.value.rotation);
}
exports.update = update;
let isInit = false;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        await util_1.assignEffectAsset('SpriteEffectFlowLight');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        // await assignEffectAsset('SpriteEffectFlowLight');
        // await reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3RGbG93TGlnaHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvY29udHJpYnV0aW9ucy9pbnNwZWN0b3IvY29tcC1TcHJpdGVFZmZlY3RGbG93TGlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7QUFFYixxQ0FBOEQ7QUFDOUQsK0NBQTJGO0FBRTlFLFFBQUEsUUFBUSxHQUFHO0VBQ3RCLDZCQUFlOzs7Ozs7Ozs7Ozs7O0NBYWhCLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRztJQUNoQixXQUFXLEVBQUUsY0FBYztJQUMzQixXQUFXLEVBQUUsY0FBYztJQUMzQixRQUFRLEVBQUUsV0FBVztJQUNyQixNQUFNLEVBQUUsU0FBUztJQUNqQixVQUFVLEVBQUUsYUFBYTtJQUN6QixVQUFVLEVBQUUsYUFBYTtJQUN6QixJQUFJLEVBQUUsT0FBTztJQUNiLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFFBQVEsRUFBRSxXQUFXO0NBQ3hCLENBQUE7QUFFWSxRQUFBLENBQUMsbUNBQVEseUJBQVcsR0FBSyxXQUFXLEVBQUc7QUFFcEQsU0FBZ0IsTUFBTSxDQUEyQixJQUFTO0lBQ3RELGdDQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFcEMsZUFBZTtJQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQWZELHdCQWVDO0FBRUQsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBRVosS0FBSyxVQUFVLEtBQUs7SUFDdkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2pELE1BQU0sd0JBQWlCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNqRCxNQUFNLG9CQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDVCxvREFBb0Q7UUFDcEQseUJBQXlCO1FBQ3pCLE1BQU0sR0FBRyxJQUFJLENBQUM7S0FDakI7QUFDTCxDQUFDO0FBWEQsc0JBV0MiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGFzc2lnbkVmZmVjdEFzc2V0LCByZWltcG9ydEFzc2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxcIjtcbmltcG9ydCB7IFNlbGVjdG9yLCBiYXNlX3Nwcml0ZV91cGRhdGUsIHNwcml0ZUNvbnN0LCBzcHJpdGVfdGVtcGxhdGUgfSBmcm9tIFwiLi9jb21wLVNwcml0ZVwiO1xuXG5leHBvcnQgY29uc3QgdGVtcGxhdGUgPSBgXG4ke3Nwcml0ZV90ZW1wbGF0ZX1cblxuPHVpLXNlY3Rpb24gY2xhc3M9XCJjb25maWdcIiBoZWFkZXI9XCJFZmZlY3QgUHJvcHNcIiBleHBhbmQ+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImVmZmVjdEFzc2V0XCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJlZmZlY3RDb2xvclwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiaXMyRGluM0RcIj48L3VpLXByb3A+XG4gICAgPHVpLWJ1dHRvbiBjbGFzcz1cInJlbG9hZFwiIHN0eWxlPVwiaGVpZ2h0OjI0cHg7bWFyZ2luOjE2cHggMDtcIj5SZWxvYWQgQXNzZXQ8L3VpLWJ1dHRvbj5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwibGlnaHRDb2xvclwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwibGlnaHRXaWR0aFwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwic29mdFwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwib2Zmc2V0XCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJyb3RhdGlvblwiPjwvdWktcHJvcD5cbjwvdWktc2VjdGlvbj5cbmA7XG5cbmNvbnN0IGVmZmVjdENvbnN0ID0ge1xuICAgIGVmZmVjdEFzc2V0OiAnLmVmZmVjdEFzc2V0JyxcbiAgICBlZmZlY3RDb2xvcjogJy5lZmZlY3RDb2xvcicsXG4gICAgaXMyRGluM0Q6ICcuaXMyRGluM0QnLFxuICAgIHJlbG9hZDogJy5yZWxvYWQnLFxuICAgIGxpZ2h0Q29sb3I6ICcubGlnaHRDb2xvcicsXG4gICAgbGlnaHRXaWR0aDogJy5saWdodFdpZHRoJyxcbiAgICBzb2Z0OiAnLnNvZnQnLFxuICAgIG9mZnNldDogJy5vZmZzZXQnLFxuICAgIHJvdGF0aW9uOiAnLnJvdGF0aW9uJyxcbn1cblxuZXhwb3J0IGNvbnN0ICQgPSB7IC4uLnNwcml0ZUNvbnN0LCAuLi5lZmZlY3RDb25zdCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPiwgZHVtcDogYW55KSB7XG4gICAgYmFzZV9zcHJpdGVfdXBkYXRlLmNhbGwodGhpcywgZHVtcCk7XG5cbiAgICAvLyBlZmZlY3QgcHJvcHNcbiAgICB0aGlzLiQuZWZmZWN0QXNzZXQucmVuZGVyKGR1bXAudmFsdWUuZWZmZWN0QXNzZXQpO1xuICAgIHRoaXMuJC5lZmZlY3RDb2xvci5yZW5kZXIoZHVtcC52YWx1ZS5lZmZlY3RDb2xvcik7XG4gICAgdGhpcy4kLmlzMkRpbjNELnJlbmRlcihkdW1wLnZhbHVlLmlzMkRpbjNEKTtcbiAgICBpZiAodHlwZW9mIHRoaXMuJC5yZWxvYWQucmVuZGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhpcy4kLnJlbG9hZC5yZW5kZXIoZHVtcC52YWx1ZS5sYWJlbCk7XG4gICAgfVxuICAgIHRoaXMuJC5saWdodENvbG9yLnJlbmRlcihkdW1wLnZhbHVlLmxpZ2h0Q29sb3IpO1xuICAgIHRoaXMuJC5saWdodFdpZHRoLnJlbmRlcihkdW1wLnZhbHVlLmxpZ2h0V2lkdGgpO1xuICAgIHRoaXMuJC5zb2Z0LnJlbmRlcihkdW1wLnZhbHVlLnNvZnQpO1xuICAgIHRoaXMuJC5vZmZzZXQucmVuZGVyKGR1bXAudmFsdWUub2Zmc2V0KTtcbiAgICB0aGlzLiQucm90YXRpb24ucmVuZGVyKGR1bXAudmFsdWUucm90YXRpb24pO1xufVxuXG5sZXQgaXNJbml0ID0gZmFsc2U7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkeSh0aGlzOiBTZWxlY3Rvcjx0eXBlb2YgJD4pIHtcbiAgICB0aGlzLiQucmVsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJjb25maXJtXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgYXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdEZsb3dMaWdodCcpO1xuICAgICAgICBhd2FpdCByZWltcG9ydEFzc2V0KCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzSW5pdCkge1xuICAgICAgICAvLyBhd2FpdCBhc3NpZ25FZmZlY3RBc3NldCgnU3ByaXRlRWZmZWN0Rmxvd0xpZ2h0Jyk7XG4gICAgICAgIC8vIGF3YWl0IHJlaW1wb3J0QXNzZXQoKTtcbiAgICAgICAgaXNJbml0ID0gdHJ1ZTtcbiAgICB9XG59Il19