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

    <ui-prop type="dump" class="rChannelMin"></ui-prop>
    <ui-prop type="dump" class="rChannelMax"></ui-prop>
    <ui-prop type="dump" class="gChannelMin"></ui-prop>
    <ui-prop type="dump" class="gChannelMax"></ui-prop>
    <ui-prop type="dump" class="bChannelMin"></ui-prop>
    <ui-prop type="dump" class="bChannelMax"></ui-prop>
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
    is2Din3D: '.is2Din3D',
    reload: '.reload',
    rChannelMin: '.rChannelMin',
    rChannelMax: '.rChannelMax',
    gChannelMin: '.gChannelMin',
    gChannelMax: '.gChannelMax',
    bChannelMin: '.bChannelMin',
    bChannelMax: '.bChannelMax',
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
    this.$.is2Din3D.render(dump.value.is2Din3D);
    if (typeof this.$.reload.render === "function") {
        this.$.reload.render(dump.value.label);
    }
    this.$.rChannelMin.render(dump.value.rChannelMin);
    this.$.rChannelMax.render(dump.value.rChannelMax);
    this.$.gChannelMin.render(dump.value.gChannelMin);
    this.$.gChannelMax.render(dump.value.gChannelMax);
    this.$.bChannelMin.render(dump.value.bChannelMin);
    this.$.bChannelMax.render(dump.value.bChannelMax);
}
exports.update = update;
let isInit = false;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        await util_1.autoAssignEffectAsset('SpriteEffectColorizing');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        await util_1.autoAssignEffectAsset('SpriteEffectColorizing');
        await util_1.reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3RDb2xvcml6aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2NvbnRyaWJ1dGlvbnMvaW5zcGVjdG9yL2NvbXAtU3ByaXRlRWZmZWN0Q29sb3JpemluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7OztBQUViLHFDQUFrRTtBQUlyRCxRQUFBLFFBQVEsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F1QnZCLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRztJQUNoQixXQUFXLEVBQUUsY0FBYztJQUMzQixXQUFXLEVBQUUsY0FBYztJQUMzQixRQUFRLEVBQUUsV0FBVztJQUNyQixJQUFJLEVBQUUsT0FBTztJQUNiLElBQUksRUFBRSxPQUFPO0lBQ2IsUUFBUSxFQUFFLFdBQVc7SUFDckIsVUFBVSxFQUFFLGFBQWE7SUFDekIsU0FBUyxFQUFFLFlBQVk7SUFDdkIsU0FBUyxFQUFFLFlBQVk7Q0FDMUIsQ0FBQTtBQUVELE1BQU0sV0FBVyxHQUFHO0lBQ2hCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0NBQzlCLENBQUE7QUFFWSxRQUFBLENBQUMsbUNBQVEsV0FBVyxHQUFLLFdBQVcsRUFBRztBQUVwRCxTQUFnQixNQUFNLENBQTJCLElBQVM7SUFDdEQsd0NBQXdDO0lBQ3hDLG1DQUFtQztJQUNuQyxzQkFBc0I7SUFFdEIsZUFBZTtJQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTlDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtRQUM1QixxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3pDO1NBQU07UUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzFDO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO1FBQzVCLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDaEMsbURBQW1EO1lBQ25ELElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNsRDtLQUNKO1NBQU07UUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsZUFBZTtJQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQXRERCx3QkFzREM7QUFFRCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFFWixLQUFLLFVBQVUsS0FBSztJQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDakQsTUFBTSw0QkFBcUIsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sb0JBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNULE1BQU0sNEJBQXFCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN0RCxNQUFNLG9CQUFhLEVBQUUsQ0FBQztRQUN0QixNQUFNLEdBQUcsSUFBSSxDQUFDO0tBQ2pCO0FBQ0wsQ0FBQztBQVhELHNCQVdDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBhdXRvQXNzaWduRWZmZWN0QXNzZXQsIHJlaW1wb3J0QXNzZXQgfSBmcm9tIFwiLi4vLi4vdXRpbFwiO1xuXG50eXBlIFNlbGVjdG9yPFQ+ID0geyAkOiBSZWNvcmQ8a2V5b2YgVCwgYW55IHwgbnVsbD4gfVxuXG5leHBvcnQgY29uc3QgdGVtcGxhdGUgPSBgXG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwic3ByaXRlQXRsYXNcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwic3ByaXRlRnJhbWVcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwic2l6ZU1vZGVcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwidHlwZVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJ0cmltXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImZpbGxUeXBlXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImZpbGxDZW50ZXJcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZmlsbFN0YXJ0XCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImZpbGxSYW5nZVwiPjwvdWktcHJvcD5cblxuPHVpLXNlY3Rpb24gY2xhc3M9XCJjb25maWdcIiBoZWFkZXI9XCJFZmZlY3QgUHJvcHNcIiBleHBhbmQ+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImVmZmVjdENvbG9yXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJpczJEaW4zRFwiPjwvdWktcHJvcD5cbiAgICA8dWktYnV0dG9uIGNsYXNzPVwicmVsb2FkXCIgc3R5bGU9XCJoZWlnaHQ6MjRweDttYXJnaW46MTZweCAwO1wiPlJlbG9hZCBBc3NldDwvdWktYnV0dG9uPlxuXG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInJDaGFubmVsTWluXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJyQ2hhbm5lbE1heFwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZ0NoYW5uZWxNaW5cIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImdDaGFubmVsTWF4XCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJiQ2hhbm5lbE1pblwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiYkNoYW5uZWxNYXhcIj48L3VpLXByb3A+XG48L3VpLXNlY3Rpb24+XG5gO1xuXG5jb25zdCBzcHJpdGVDb25zdCA9IHtcbiAgICBzcHJpdGVBdGxhczogJy5zcHJpdGVBdGxhcycsXG4gICAgc3ByaXRlRnJhbWU6ICcuc3ByaXRlRnJhbWUnLFxuICAgIHNpemVNb2RlOiAnLnNpemVNb2RlJyxcbiAgICB0eXBlOiAnLnR5cGUnLFxuICAgIHRyaW06ICcudHJpbScsXG4gICAgZmlsbFR5cGU6ICcuZmlsbFR5cGUnLFxuICAgIGZpbGxDZW50ZXI6ICcuZmlsbENlbnRlcicsXG4gICAgZmlsbFN0YXJ0OiAnLmZpbGxTdGFydCcsXG4gICAgZmlsbFJhbmdlOiAnLmZpbGxSYW5nZScsXG59XG5cbmNvbnN0IGVmZmVjdENvbnN0ID0ge1xuICAgIGVmZmVjdENvbG9yOiAnLmVmZmVjdENvbG9yJyxcbiAgICBpczJEaW4zRDogJy5pczJEaW4zRCcsXG4gICAgcmVsb2FkOiAnLnJlbG9hZCcsXG4gICAgckNoYW5uZWxNaW46ICcuckNoYW5uZWxNaW4nLFxuICAgIHJDaGFubmVsTWF4OiAnLnJDaGFubmVsTWF4JyxcbiAgICBnQ2hhbm5lbE1pbjogJy5nQ2hhbm5lbE1pbicsXG4gICAgZ0NoYW5uZWxNYXg6ICcuZ0NoYW5uZWxNYXgnLFxuICAgIGJDaGFubmVsTWluOiAnLmJDaGFubmVsTWluJyxcbiAgICBiQ2hhbm5lbE1heDogJy5iQ2hhbm5lbE1heCcsXG59XG5cbmV4cG9ydCBjb25zdCAkID0geyAuLi5zcHJpdGVDb25zdCwgLi4uZWZmZWN0Q29uc3QgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZSh0aGlzOiBTZWxlY3Rvcjx0eXBlb2YgJD4sIGR1bXA6IGFueSkge1xuICAgIC8vIOS9v+eUqCB1aS1wb3JwIOiHquWKqOa4suafk++8jOiuvue9riBwcm9wIOeahCB0eXBlIOS4uiBkdW1wXG4gICAgLy8gcmVuZGVyIOS8oOWFpeS4gOS4qiBkdW1wIOaVsOaNru+8jOiDveWkn+iHquWKqOa4suafk+WHuuWvueW6lOeahOeVjOmdolxuICAgIC8vIOiHquWKqOa4suafk+eahOeVjOmdouS/ruaUueWQju+8jOiDveWkn+iHquWKqOaPkOS6pOaVsOaNrlxuXG4gICAgLy8gc3ByaXRlIHByb3BzXG4gICAgdGhpcy4kLnNwcml0ZUF0bGFzLnJlbmRlcihkdW1wLnZhbHVlLnNwcml0ZUF0bGFzKTtcbiAgICB0aGlzLiQuc3ByaXRlRnJhbWUucmVuZGVyKGR1bXAudmFsdWUuc3ByaXRlRnJhbWUpO1xuICAgIHRoaXMuJC5zaXplTW9kZS5yZW5kZXIoZHVtcC52YWx1ZS5zaXplTW9kZSk7XG4gICAgdGhpcy4kLnR5cGUucmVuZGVyKGR1bXAudmFsdWUudHlwZSk7XG4gICAgdGhpcy4kLnRyaW0ucmVuZGVyKGR1bXAudmFsdWUudHJpbSk7XG4gICAgdGhpcy4kLmZpbGxUeXBlLnJlbmRlcihkdW1wLnZhbHVlLmZpbGxUeXBlKTtcbiAgICB0aGlzLiQuZmlsbENlbnRlci5yZW5kZXIoZHVtcC52YWx1ZS5maWxsQ2VudGVyKTtcbiAgICB0aGlzLiQuZmlsbFN0YXJ0LnJlbmRlcihkdW1wLnZhbHVlLmZpbGxTdGFydCk7XG4gICAgdGhpcy4kLmZpbGxSYW5nZS5yZW5kZXIoZHVtcC52YWx1ZS5maWxsUmFuZ2UpO1xuXG4gICAgaWYgKGR1bXAudmFsdWUudHlwZS52YWx1ZSA9PSAwKSB7XG4gICAgICAgIC8vIHRyaW0gb25seSBzaG93IHdoZW4gdHlwZSBpcyBzaW1wbGVcbiAgICAgICAgdGhpcy4kLnRyaW0ucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiQudHJpbS5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcbiAgICB9XG5cbiAgICBpZiAoZHVtcC52YWx1ZS50eXBlLnZhbHVlID09IDMpIHtcbiAgICAgICAgdGhpcy4kLmZpbGxUeXBlLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJC5maWxsU3RhcnQucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy4kLmZpbGxSYW5nZS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuXG4gICAgICAgIGlmIChkdW1wLnZhbHVlLmZpbGxUeXBlLnZhbHVlID09IDIpIHtcbiAgICAgICAgICAgIC8vIGZpbGxDZW50ZXIgb25seSBlZGl0YWJsZSB3aGVuIGZpbGxUeXBlIGlzIHJhZGlhbFxuICAgICAgICAgICAgdGhpcy4kLmZpbGxDZW50ZXIucmVtb3ZlQXR0cmlidXRlKCdyZWFkb25seScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kLmZpbGxDZW50ZXIuc2V0QXR0cmlidXRlKCdyZWFkb25seScsICcnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJC5maWxsVHlwZS5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcbiAgICAgICAgdGhpcy4kLmZpbGxDZW50ZXIuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgICAgIHRoaXMuJC5maWxsU3RhcnQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgICAgIHRoaXMuJC5maWxsUmFuZ2Uuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgfVxuXG4gICAgLy8gZWZmZWN0IHByb3BzXG4gICAgdGhpcy4kLmVmZmVjdENvbG9yLnJlbmRlcihkdW1wLnZhbHVlLmVmZmVjdENvbG9yKTtcbiAgICB0aGlzLiQuaXMyRGluM0QucmVuZGVyKGR1bXAudmFsdWUuaXMyRGluM0QpO1xuICAgIGlmICh0eXBlb2YgdGhpcy4kLnJlbG9hZC5yZW5kZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aGlzLiQucmVsb2FkLnJlbmRlcihkdW1wLnZhbHVlLmxhYmVsKTtcbiAgICB9XG4gICAgdGhpcy4kLnJDaGFubmVsTWluLnJlbmRlcihkdW1wLnZhbHVlLnJDaGFubmVsTWluKTtcbiAgICB0aGlzLiQuckNoYW5uZWxNYXgucmVuZGVyKGR1bXAudmFsdWUuckNoYW5uZWxNYXgpO1xuICAgIHRoaXMuJC5nQ2hhbm5lbE1pbi5yZW5kZXIoZHVtcC52YWx1ZS5nQ2hhbm5lbE1pbik7XG4gICAgdGhpcy4kLmdDaGFubmVsTWF4LnJlbmRlcihkdW1wLnZhbHVlLmdDaGFubmVsTWF4KTtcbiAgICB0aGlzLiQuYkNoYW5uZWxNaW4ucmVuZGVyKGR1bXAudmFsdWUuYkNoYW5uZWxNaW4pO1xuICAgIHRoaXMuJC5iQ2hhbm5lbE1heC5yZW5kZXIoZHVtcC52YWx1ZS5iQ2hhbm5lbE1heCk7XG59XG5cbmxldCBpc0luaXQgPSBmYWxzZTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWR5KHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPikge1xuICAgIHRoaXMuJC5yZWxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbmZpcm1cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBhdXRvQXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdENvbG9yaXppbmcnKTtcbiAgICAgICAgYXdhaXQgcmVpbXBvcnRBc3NldCgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpc0luaXQpIHtcbiAgICAgICAgYXdhaXQgYXV0b0Fzc2lnbkVmZmVjdEFzc2V0KCdTcHJpdGVFZmZlY3RDb2xvcml6aW5nJyk7XG4gICAgICAgIGF3YWl0IHJlaW1wb3J0QXNzZXQoKTtcbiAgICAgICAgaXNJbml0ID0gdHJ1ZTtcbiAgICB9XG59Il19