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
<ui-prop type="dump" class="fillType"></ui-prop>
<ui-prop type="dump" class="fillCenter"></ui-prop>
<ui-prop type="dump" class="fillStart"></ui-prop>
<ui-prop type="dump" class="fillRange"></ui-prop>

<ui-section class="config" header="Effect Props" expand>
    <ui-prop type="dump" class="effectColor"></ui-prop>
    <ui-prop type="dump" class="is2Din3D"></ui-prop>
    <ui-button class="reload" style="height:24px;margin:16px 0;">Reload Asset</ui-button>

    <ui-prop type="dump" class="shadowType"></ui-prop>
    <ui-prop type="dump" class="shadowColor"></ui-prop>
    <ui-prop type="dump" class="offset"></ui-prop>
</ui-section>
`;
const spriteConst = {
    spriteAtlas: '.spriteAtlas',
    spriteFrame: '.spriteFrame',
    sizeMode: '.sizeMode',
    type: '.type',
    trim: '.trim',
    fillType: '.fillType',
    fillCenter: '.fillCenter',
    fillStart: '.fillStart',
    fillRange: '.fillRange',
};
const effectConst = {
    effectColor: '.effectColor',
    // is2Din3D: '.is2Din3D',
    reload: '.reload',
    shadowType: '.shadowType',
    shadowColor: '.shadowColor',
    offset: '.offset',
};
exports.$ = Object.assign(Object.assign({}, spriteConst), effectConst);
function update(dump) {
    // 使用 ui-porp 自动渲染，设置 prop 的 type 为 dump
    // render 传入一个 dump 数据，能够自动渲染出对应的界面
    // 自动渲染的界面修改后，能够自动提交数据
    // sprite props
    this.$.spriteAtlas.render(dump.value.spriteAtlas);
    this.$.spriteFrame.render(dump.value.spriteFrame);
    this.$.sizeMode.render(dump.value.sizeMode);
    this.$.type.render(dump.value.type);
    this.$.trim.render(dump.value.trim);
    this.$.fillType.render(dump.value.fillType);
    this.$.fillCenter.render(dump.value.fillCenter);
    this.$.fillStart.render(dump.value.fillStart);
    this.$.fillRange.render(dump.value.fillRange);
    if (dump.value.type.value == 0) {
        // trim only show when type is simple
        this.$.trim.removeAttribute('hidden');
    }
    else {
        this.$.trim.setAttribute('hidden', '');
    }
    if (dump.value.type.value == 3) {
        this.$.fillType.removeAttribute('hidden');
        this.$.fillCenter.removeAttribute('hidden');
        this.$.fillStart.removeAttribute('hidden');
        this.$.fillRange.removeAttribute('hidden');
        if (dump.value.fillType.value == 2) {
            // fillCenter only editable when fillType is radial
            this.$.fillCenter.removeAttribute('readonly');
        }
        else {
            this.$.fillCenter.setAttribute('readonly', '');
        }
    }
    else {
        this.$.fillType.setAttribute('hidden', '');
        this.$.fillCenter.setAttribute('hidden', '');
        this.$.fillStart.setAttribute('hidden', '');
        this.$.fillRange.setAttribute('hidden', '');
    }
    // effect props
    this.$.effectColor.render(dump.value.effectColor);
    // this.$.is2Din3D.render(dump.value.is2Din3D);
    if (typeof this.$.reload.render === "function") {
        this.$.reload.render(dump.value.label);
    }
    this.$.shadowType.render(dump.value.shadowType);
    this.$.shadowColor.render(dump.value.shadowColor);
    this.$.offset.render(dump.value.offset);
}
exports.update = update;
let isInit = false;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        await util_1.autoAssignEffectAsset('SpriteEffectShadow');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        await util_1.autoAssignEffectAsset('SpriteEffectShadow');
        await util_1.reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3RTaGFkb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvY29udHJpYnV0aW9ucy9pbnNwZWN0b3IvY29tcC1TcHJpdGVFZmZlY3RTaGFkb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7QUFFYixxQ0FBa0U7QUFJckQsUUFBQSxRQUFRLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBb0J2QixDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUc7SUFDaEIsV0FBVyxFQUFFLGNBQWM7SUFDM0IsV0FBVyxFQUFFLGNBQWM7SUFDM0IsUUFBUSxFQUFFLFdBQVc7SUFDckIsSUFBSSxFQUFFLE9BQU87SUFDYixJQUFJLEVBQUUsT0FBTztJQUNiLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLFNBQVMsRUFBRSxZQUFZO0NBQzFCLENBQUE7QUFFRCxNQUFNLFdBQVcsR0FBRztJQUNoQixXQUFXLEVBQUUsY0FBYztJQUMzQix5QkFBeUI7SUFDekIsTUFBTSxFQUFFLFNBQVM7SUFDakIsVUFBVSxFQUFFLGFBQWE7SUFDekIsV0FBVyxFQUFFLGNBQWM7SUFDM0IsTUFBTSxFQUFFLFNBQVM7Q0FDcEIsQ0FBQTtBQUVZLFFBQUEsQ0FBQyxtQ0FBUSxXQUFXLEdBQUssV0FBVyxFQUFHO0FBRXBELFNBQWdCLE1BQU0sQ0FBMkIsSUFBUztJQUN0RCx3Q0FBd0M7SUFDeEMsbUNBQW1DO0lBQ25DLHNCQUFzQjtJQUV0QixlQUFlO0lBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFOUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO1FBQzVCLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDekM7U0FBTTtRQUNILElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDMUM7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7UUFDNUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNoQyxtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO0tBQ0o7U0FBTTtRQUNILElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDL0M7SUFFRCxlQUFlO0lBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsK0NBQStDO0lBQy9DLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQW5ERCx3QkFtREM7QUFFRCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFFWixLQUFLLFVBQVUsS0FBSztJQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDakQsTUFBTSw0QkFBcUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sb0JBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNULE1BQU0sNEJBQXFCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsRCxNQUFNLG9CQUFhLEVBQUUsQ0FBQztRQUN0QixNQUFNLEdBQUcsSUFBSSxDQUFDO0tBQ2pCO0FBQ0wsQ0FBQztBQVhELHNCQVdDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBhdXRvQXNzaWduRWZmZWN0QXNzZXQsIHJlaW1wb3J0QXNzZXQgfSBmcm9tIFwiLi4vLi4vdXRpbFwiO1xuXG50eXBlIFNlbGVjdG9yPFQ+ID0geyAkOiBSZWNvcmQ8a2V5b2YgVCwgYW55IHwgbnVsbD4gfVxuXG5leHBvcnQgY29uc3QgdGVtcGxhdGUgPSBgXG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwic3ByaXRlQXRsYXNcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwic3ByaXRlRnJhbWVcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwic2l6ZU1vZGVcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwidHlwZVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJ0cmltXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImZpbGxUeXBlXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImZpbGxDZW50ZXJcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZmlsbFN0YXJ0XCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImZpbGxSYW5nZVwiPjwvdWktcHJvcD5cblxuPHVpLXNlY3Rpb24gY2xhc3M9XCJjb25maWdcIiBoZWFkZXI9XCJFZmZlY3QgUHJvcHNcIiBleHBhbmQ+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImVmZmVjdENvbG9yXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJpczJEaW4zRFwiPjwvdWktcHJvcD5cbiAgICA8dWktYnV0dG9uIGNsYXNzPVwicmVsb2FkXCIgc3R5bGU9XCJoZWlnaHQ6MjRweDttYXJnaW46MTZweCAwO1wiPlJlbG9hZCBBc3NldDwvdWktYnV0dG9uPlxuXG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNoYWRvd1R5cGVcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNoYWRvd0NvbG9yXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJvZmZzZXRcIj48L3VpLXByb3A+XG48L3VpLXNlY3Rpb24+XG5gO1xuXG5jb25zdCBzcHJpdGVDb25zdCA9IHtcbiAgICBzcHJpdGVBdGxhczogJy5zcHJpdGVBdGxhcycsXG4gICAgc3ByaXRlRnJhbWU6ICcuc3ByaXRlRnJhbWUnLFxuICAgIHNpemVNb2RlOiAnLnNpemVNb2RlJyxcbiAgICB0eXBlOiAnLnR5cGUnLFxuICAgIHRyaW06ICcudHJpbScsXG4gICAgZmlsbFR5cGU6ICcuZmlsbFR5cGUnLFxuICAgIGZpbGxDZW50ZXI6ICcuZmlsbENlbnRlcicsXG4gICAgZmlsbFN0YXJ0OiAnLmZpbGxTdGFydCcsXG4gICAgZmlsbFJhbmdlOiAnLmZpbGxSYW5nZScsXG59XG5cbmNvbnN0IGVmZmVjdENvbnN0ID0ge1xuICAgIGVmZmVjdENvbG9yOiAnLmVmZmVjdENvbG9yJyxcbiAgICAvLyBpczJEaW4zRDogJy5pczJEaW4zRCcsXG4gICAgcmVsb2FkOiAnLnJlbG9hZCcsXG4gICAgc2hhZG93VHlwZTogJy5zaGFkb3dUeXBlJyxcbiAgICBzaGFkb3dDb2xvcjogJy5zaGFkb3dDb2xvcicsXG4gICAgb2Zmc2V0OiAnLm9mZnNldCcsXG59XG5cbmV4cG9ydCBjb25zdCAkID0geyAuLi5zcHJpdGVDb25zdCwgLi4uZWZmZWN0Q29uc3QgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZSh0aGlzOiBTZWxlY3Rvcjx0eXBlb2YgJD4sIGR1bXA6IGFueSkge1xuICAgIC8vIOS9v+eUqCB1aS1wb3JwIOiHquWKqOa4suafk++8jOiuvue9riBwcm9wIOeahCB0eXBlIOS4uiBkdW1wXG4gICAgLy8gcmVuZGVyIOS8oOWFpeS4gOS4qiBkdW1wIOaVsOaNru+8jOiDveWkn+iHquWKqOa4suafk+WHuuWvueW6lOeahOeVjOmdolxuICAgIC8vIOiHquWKqOa4suafk+eahOeVjOmdouS/ruaUueWQju+8jOiDveWkn+iHquWKqOaPkOS6pOaVsOaNrlxuXG4gICAgLy8gc3ByaXRlIHByb3BzXG4gICAgdGhpcy4kLnNwcml0ZUF0bGFzLnJlbmRlcihkdW1wLnZhbHVlLnNwcml0ZUF0bGFzKTtcbiAgICB0aGlzLiQuc3ByaXRlRnJhbWUucmVuZGVyKGR1bXAudmFsdWUuc3ByaXRlRnJhbWUpO1xuICAgIHRoaXMuJC5zaXplTW9kZS5yZW5kZXIoZHVtcC52YWx1ZS5zaXplTW9kZSk7XG4gICAgdGhpcy4kLnR5cGUucmVuZGVyKGR1bXAudmFsdWUudHlwZSk7XG4gICAgdGhpcy4kLnRyaW0ucmVuZGVyKGR1bXAudmFsdWUudHJpbSk7XG4gICAgdGhpcy4kLmZpbGxUeXBlLnJlbmRlcihkdW1wLnZhbHVlLmZpbGxUeXBlKTtcbiAgICB0aGlzLiQuZmlsbENlbnRlci5yZW5kZXIoZHVtcC52YWx1ZS5maWxsQ2VudGVyKTtcbiAgICB0aGlzLiQuZmlsbFN0YXJ0LnJlbmRlcihkdW1wLnZhbHVlLmZpbGxTdGFydCk7XG4gICAgdGhpcy4kLmZpbGxSYW5nZS5yZW5kZXIoZHVtcC52YWx1ZS5maWxsUmFuZ2UpO1xuXG4gICAgaWYgKGR1bXAudmFsdWUudHlwZS52YWx1ZSA9PSAwKSB7XG4gICAgICAgIC8vIHRyaW0gb25seSBzaG93IHdoZW4gdHlwZSBpcyBzaW1wbGVcbiAgICAgICAgdGhpcy4kLnRyaW0ucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiQudHJpbS5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcbiAgICB9XG5cbiAgICBpZiAoZHVtcC52YWx1ZS50eXBlLnZhbHVlID09IDMpIHtcbiAgICAgICAgdGhpcy4kLmZpbGxUeXBlLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJC5maWxsU3RhcnQucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy4kLmZpbGxSYW5nZS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuXG4gICAgICAgIGlmIChkdW1wLnZhbHVlLmZpbGxUeXBlLnZhbHVlID09IDIpIHtcbiAgICAgICAgICAgIC8vIGZpbGxDZW50ZXIgb25seSBlZGl0YWJsZSB3aGVuIGZpbGxUeXBlIGlzIHJhZGlhbFxuICAgICAgICAgICAgdGhpcy4kLmZpbGxDZW50ZXIucmVtb3ZlQXR0cmlidXRlKCdyZWFkb25seScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kLmZpbGxDZW50ZXIuc2V0QXR0cmlidXRlKCdyZWFkb25seScsICcnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJC5maWxsVHlwZS5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcbiAgICAgICAgdGhpcy4kLmZpbGxDZW50ZXIuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgICAgIHRoaXMuJC5maWxsU3RhcnQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgICAgIHRoaXMuJC5maWxsUmFuZ2Uuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgfVxuXG4gICAgLy8gZWZmZWN0IHByb3BzXG4gICAgdGhpcy4kLmVmZmVjdENvbG9yLnJlbmRlcihkdW1wLnZhbHVlLmVmZmVjdENvbG9yKTtcbiAgICAvLyB0aGlzLiQuaXMyRGluM0QucmVuZGVyKGR1bXAudmFsdWUuaXMyRGluM0QpO1xuICAgIGlmICh0eXBlb2YgdGhpcy4kLnJlbG9hZC5yZW5kZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aGlzLiQucmVsb2FkLnJlbmRlcihkdW1wLnZhbHVlLmxhYmVsKTtcbiAgICB9XG4gICAgdGhpcy4kLnNoYWRvd1R5cGUucmVuZGVyKGR1bXAudmFsdWUuc2hhZG93VHlwZSk7XG4gICAgdGhpcy4kLnNoYWRvd0NvbG9yLnJlbmRlcihkdW1wLnZhbHVlLnNoYWRvd0NvbG9yKTtcbiAgICB0aGlzLiQub2Zmc2V0LnJlbmRlcihkdW1wLnZhbHVlLm9mZnNldCk7XG59XG5cbmxldCBpc0luaXQgPSBmYWxzZTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWR5KHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPikge1xuICAgIHRoaXMuJC5yZWxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbmZpcm1cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBhdXRvQXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdFNoYWRvdycpO1xuICAgICAgICBhd2FpdCByZWltcG9ydEFzc2V0KCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzSW5pdCkge1xuICAgICAgICBhd2FpdCBhdXRvQXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdFNoYWRvdycpO1xuICAgICAgICBhd2FpdCByZWltcG9ydEFzc2V0KCk7XG4gICAgICAgIGlzSW5pdCA9IHRydWU7XG4gICAgfVxufSJdfQ==