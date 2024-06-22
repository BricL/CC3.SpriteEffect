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

    <ui-prop type="dump" class="secondSprite"></ui-prop>
    <ui-prop type="dump" class="dirMode"></ui-prop>
    <ui-prop type="dump" class="offset"></ui-prop>
    <ui-prop type="dump" class="soft"></ui-prop>
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
    secondSprite: '.secondSprite',
    dirMode: '.dirMode',
    offset: '.offset',
    soft: '.soft',
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
    this.$.secondSprite.render(dump.value.secondSprite);
    this.$.dirMode.render(dump.value.dirMode);
    this.$.offset.render(dump.value.offset);
    this.$.soft.render(dump.value.soft);
}
exports.update = update;
let isInit = false;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        await util_1.autoAssignEffectAsset('SpriteEffectDisappear');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        await util_1.autoAssignEffectAsset('SpriteEffectDisappear');
        await util_1.reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3REaXNhcHBlYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvY29udHJpYnV0aW9ucy9pbnNwZWN0b3IvY29tcC1TcHJpdGVFZmZlY3REaXNhcHBlYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7QUFFYixxQ0FBa0U7QUFJckQsUUFBQSxRQUFRLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXFCdkIsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHO0lBQ2hCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLElBQUksRUFBRSxPQUFPO0lBQ2IsSUFBSSxFQUFFLE9BQU87SUFDYixRQUFRLEVBQUUsV0FBVztJQUNyQixVQUFVLEVBQUUsYUFBYTtJQUN6QixTQUFTLEVBQUUsWUFBWTtJQUN2QixTQUFTLEVBQUUsWUFBWTtDQUMxQixDQUFBO0FBRUQsTUFBTSxXQUFXLEdBQUc7SUFDaEIsV0FBVyxFQUFFLGNBQWM7SUFDM0IsUUFBUSxFQUFFLFdBQVc7SUFDckIsTUFBTSxFQUFFLFNBQVM7SUFDakIsWUFBWSxFQUFFLGVBQWU7SUFDN0IsT0FBTyxFQUFFLFVBQVU7SUFDbkIsTUFBTSxFQUFFLFNBQVM7SUFDakIsSUFBSSxFQUFFLE9BQU87Q0FDaEIsQ0FBQTtBQUVZLFFBQUEsQ0FBQyxtQ0FBUSxXQUFXLEdBQUssV0FBVyxFQUFHO0FBRXBELFNBQWdCLE1BQU0sQ0FBMkIsSUFBUztJQUN0RCx3Q0FBd0M7SUFDeEMsbUNBQW1DO0lBQ25DLHNCQUFzQjtJQUV0QixlQUFlO0lBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFOUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO1FBQzVCLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDekM7U0FBTTtRQUNILElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDMUM7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7UUFDNUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNoQyxtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO0tBQ0o7U0FBTTtRQUNILElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDL0M7SUFFRCxlQUFlO0lBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7UUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUM7SUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwRCxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBcERELHdCQW9EQztBQUVELElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztBQUVaLEtBQUssVUFBVSxLQUFLO0lBQ3ZCLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNqRCxNQUFNLDRCQUFxQixDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckQsTUFBTSxvQkFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1QsTUFBTSw0QkFBcUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sb0JBQWEsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sR0FBRyxJQUFJLENBQUM7S0FDakI7QUFDTCxDQUFDO0FBWEQsc0JBV0MiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGF1dG9Bc3NpZ25FZmZlY3RBc3NldCwgcmVpbXBvcnRBc3NldCB9IGZyb20gXCIuLi8uLi91dGlsXCI7XG5cbnR5cGUgU2VsZWN0b3I8VD4gPSB7ICQ6IFJlY29yZDxrZXlvZiBULCBhbnkgfCBudWxsPiB9XG5cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IGBcbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzcHJpdGVBdGxhc1wiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzcHJpdGVGcmFtZVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzaXplTW9kZVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJ0eXBlXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInRyaW1cIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZmlsbFR5cGVcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZmlsbENlbnRlclwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmaWxsU3RhcnRcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZmlsbFJhbmdlXCI+PC91aS1wcm9wPlxuXG48dWktc2VjdGlvbiBjbGFzcz1cImNvbmZpZ1wiIGhlYWRlcj1cIkVmZmVjdCBQcm9wc1wiIGV4cGFuZD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZWZmZWN0Q29sb3JcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImlzMkRpbjNEXCI+PC91aS1wcm9wPlxuICAgIDx1aS1idXR0b24gY2xhc3M9XCJyZWxvYWRcIiBzdHlsZT1cImhlaWdodDoyNHB4O21hcmdpbjoxNnB4IDA7XCI+UmVsb2FkIEFzc2V0PC91aS1idXR0b24+XG5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwic2Vjb25kU3ByaXRlXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJkaXJNb2RlXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJvZmZzZXRcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNvZnRcIj48L3VpLXByb3A+XG48L3VpLXNlY3Rpb24+XG5gO1xuXG5jb25zdCBzcHJpdGVDb25zdCA9IHtcbiAgICBzcHJpdGVBdGxhczogJy5zcHJpdGVBdGxhcycsXG4gICAgc3ByaXRlRnJhbWU6ICcuc3ByaXRlRnJhbWUnLFxuICAgIHNpemVNb2RlOiAnLnNpemVNb2RlJyxcbiAgICB0eXBlOiAnLnR5cGUnLFxuICAgIHRyaW06ICcudHJpbScsXG4gICAgZmlsbFR5cGU6ICcuZmlsbFR5cGUnLFxuICAgIGZpbGxDZW50ZXI6ICcuZmlsbENlbnRlcicsXG4gICAgZmlsbFN0YXJ0OiAnLmZpbGxTdGFydCcsXG4gICAgZmlsbFJhbmdlOiAnLmZpbGxSYW5nZScsXG59XG5cbmNvbnN0IGVmZmVjdENvbnN0ID0ge1xuICAgIGVmZmVjdENvbG9yOiAnLmVmZmVjdENvbG9yJyxcbiAgICBpczJEaW4zRDogJy5pczJEaW4zRCcsXG4gICAgcmVsb2FkOiAnLnJlbG9hZCcsXG4gICAgc2Vjb25kU3ByaXRlOiAnLnNlY29uZFNwcml0ZScsXG4gICAgZGlyTW9kZTogJy5kaXJNb2RlJyxcbiAgICBvZmZzZXQ6ICcub2Zmc2V0JyxcbiAgICBzb2Z0OiAnLnNvZnQnLFxufVxuXG5leHBvcnQgY29uc3QgJCA9IHsgLi4uc3ByaXRlQ29uc3QsIC4uLmVmZmVjdENvbnN0IH07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUodGhpczogU2VsZWN0b3I8dHlwZW9mICQ+LCBkdW1wOiBhbnkpIHtcbiAgICAvLyDkvb/nlKggdWktcG9ycCDoh6rliqjmuLLmn5PvvIzorr7nva4gcHJvcCDnmoQgdHlwZSDkuLogZHVtcFxuICAgIC8vIHJlbmRlciDkvKDlhaXkuIDkuKogZHVtcCDmlbDmja7vvIzog73lpJ/oh6rliqjmuLLmn5Plh7rlr7nlupTnmoTnlYzpnaJcbiAgICAvLyDoh6rliqjmuLLmn5PnmoTnlYzpnaLkv67mlLnlkI7vvIzog73lpJ/oh6rliqjmj5DkuqTmlbDmja5cblxuICAgIC8vIHNwcml0ZSBwcm9wc1xuICAgIHRoaXMuJC5zcHJpdGVBdGxhcy5yZW5kZXIoZHVtcC52YWx1ZS5zcHJpdGVBdGxhcyk7XG4gICAgdGhpcy4kLnNwcml0ZUZyYW1lLnJlbmRlcihkdW1wLnZhbHVlLnNwcml0ZUZyYW1lKTtcbiAgICB0aGlzLiQuc2l6ZU1vZGUucmVuZGVyKGR1bXAudmFsdWUuc2l6ZU1vZGUpO1xuICAgIHRoaXMuJC50eXBlLnJlbmRlcihkdW1wLnZhbHVlLnR5cGUpO1xuICAgIHRoaXMuJC50cmltLnJlbmRlcihkdW1wLnZhbHVlLnRyaW0pO1xuICAgIHRoaXMuJC5maWxsVHlwZS5yZW5kZXIoZHVtcC52YWx1ZS5maWxsVHlwZSk7XG4gICAgdGhpcy4kLmZpbGxDZW50ZXIucmVuZGVyKGR1bXAudmFsdWUuZmlsbENlbnRlcik7XG4gICAgdGhpcy4kLmZpbGxTdGFydC5yZW5kZXIoZHVtcC52YWx1ZS5maWxsU3RhcnQpO1xuICAgIHRoaXMuJC5maWxsUmFuZ2UucmVuZGVyKGR1bXAudmFsdWUuZmlsbFJhbmdlKTtcblxuICAgIGlmIChkdW1wLnZhbHVlLnR5cGUudmFsdWUgPT0gMCkge1xuICAgICAgICAvLyB0cmltIG9ubHkgc2hvdyB3aGVuIHR5cGUgaXMgc2ltcGxlXG4gICAgICAgIHRoaXMuJC50cmltLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kLnRyaW0uc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgfVxuXG4gICAgaWYgKGR1bXAudmFsdWUudHlwZS52YWx1ZSA9PSAzKSB7XG4gICAgICAgIHRoaXMuJC5maWxsVHlwZS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLiQuZmlsbENlbnRlci5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLiQuZmlsbFN0YXJ0LnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJC5maWxsUmFuZ2UucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcblxuICAgICAgICBpZiAoZHVtcC52YWx1ZS5maWxsVHlwZS52YWx1ZSA9PSAyKSB7XG4gICAgICAgICAgICAvLyBmaWxsQ2VudGVyIG9ubHkgZWRpdGFibGUgd2hlbiBmaWxsVHlwZSBpcyByYWRpYWxcbiAgICAgICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAnJyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiQuZmlsbFR5cGUuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgICAgICB0aGlzLiQuZmlsbFN0YXJ0LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgICAgICB0aGlzLiQuZmlsbFJhbmdlLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgIH1cblxuICAgIC8vIGVmZmVjdCBwcm9wc1xuICAgIHRoaXMuJC5lZmZlY3RDb2xvci5yZW5kZXIoZHVtcC52YWx1ZS5lZmZlY3RDb2xvcik7XG4gICAgdGhpcy4kLmlzMkRpbjNELnJlbmRlcihkdW1wLnZhbHVlLmlzMkRpbjNEKTtcbiAgICBpZiAodHlwZW9mIHRoaXMuJC5yZWxvYWQucmVuZGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhpcy4kLnJlbG9hZC5yZW5kZXIoZHVtcC52YWx1ZS5sYWJlbCk7XG4gICAgfVxuICAgIHRoaXMuJC5zZWNvbmRTcHJpdGUucmVuZGVyKGR1bXAudmFsdWUuc2Vjb25kU3ByaXRlKTtcbiAgICB0aGlzLiQuZGlyTW9kZS5yZW5kZXIoZHVtcC52YWx1ZS5kaXJNb2RlKTtcbiAgICB0aGlzLiQub2Zmc2V0LnJlbmRlcihkdW1wLnZhbHVlLm9mZnNldCk7XG4gICAgdGhpcy4kLnNvZnQucmVuZGVyKGR1bXAudmFsdWUuc29mdCk7XG59XG5cbmxldCBpc0luaXQgPSBmYWxzZTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWR5KHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPikge1xuICAgIHRoaXMuJC5yZWxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbmZpcm1cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBhdXRvQXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdERpc2FwcGVhcicpO1xuICAgICAgICBhd2FpdCByZWltcG9ydEFzc2V0KCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzSW5pdCkge1xuICAgICAgICBhd2FpdCBhdXRvQXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdERpc2FwcGVhcicpO1xuICAgICAgICBhd2FpdCByZWltcG9ydEFzc2V0KCk7XG4gICAgICAgIGlzSW5pdCA9IHRydWU7XG4gICAgfVxufSJdfQ==