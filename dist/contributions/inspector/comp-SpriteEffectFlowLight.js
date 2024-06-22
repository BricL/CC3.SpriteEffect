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
    <ui-prop type="dump" class="lightColor"></ui-prop>
    <ui-prop type="dump" class="lightWidth"></ui-prop>
    <ui-prop type="dump" class="soft"></ui-prop>
    <ui-prop type="dump" class="offset"></ui-prop>
    <ui-prop type="dump" class="rotation"></ui-prop>
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
    lightColor: '.lightColor',
    lightWidth: '.lightWidth',
    soft: '.soft',
    offset: '.offset',
    rotation: '.rotation',
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
        await util_1.autoAssignEffectAsset('SpriteEffectFlowLight');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        await util_1.autoAssignEffectAsset('SpriteEffectFlowLight');
        await util_1.reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3RGbG93TGlnaHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvY29udHJpYnV0aW9ucy9pbnNwZWN0b3IvY29tcC1TcHJpdGVFZmZlY3RGbG93TGlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7QUFHYixxQ0FBa0U7QUFJckQsUUFBQSxRQUFRLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXFCdkIsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHO0lBQ2hCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLElBQUksRUFBRSxPQUFPO0lBQ2IsSUFBSSxFQUFFLE9BQU87SUFDYixRQUFRLEVBQUUsV0FBVztJQUNyQixVQUFVLEVBQUUsYUFBYTtJQUN6QixTQUFTLEVBQUUsWUFBWTtJQUN2QixTQUFTLEVBQUUsWUFBWTtDQUMxQixDQUFBO0FBRUQsTUFBTSxXQUFXLEdBQUc7SUFDaEIsV0FBVyxFQUFFLGNBQWM7SUFDM0IsUUFBUSxFQUFFLFdBQVc7SUFDckIsTUFBTSxFQUFFLFNBQVM7SUFDakIsVUFBVSxFQUFFLGFBQWE7SUFDekIsVUFBVSxFQUFFLGFBQWE7SUFDekIsSUFBSSxFQUFFLE9BQU87SUFDYixNQUFNLEVBQUUsU0FBUztJQUNqQixRQUFRLEVBQUUsV0FBVztDQUN4QixDQUFBO0FBRVksUUFBQSxDQUFDLG1DQUFRLFdBQVcsR0FBSyxXQUFXLEVBQUc7QUFFcEQsU0FBZ0IsTUFBTSxDQUEyQixJQUFTO0lBQ3RELHdDQUF3QztJQUN4QyxtQ0FBbUM7SUFDbkMsc0JBQXNCO0lBRXRCLGVBQWU7SUFDZixJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUU5QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7UUFDNUIscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN6QztTQUFNO1FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMxQztJQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFB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TUFBTSxvQkFBYSxFQUFFLENBQUM7UUFDdEIsTUFBTSxHQUFHLElBQUksQ0FBQztLQUNqQjtBQUNMLENBQUM7QUFYRCxzQkFXQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgb2ZmIH0gZnJvbSBcInByb2Nlc3NcIjtcbmltcG9ydCB7IGF1dG9Bc3NpZ25FZmZlY3RBc3NldCwgcmVpbXBvcnRBc3NldCB9IGZyb20gXCIuLi8uLi91dGlsXCI7XG5cbnR5cGUgU2VsZWN0b3I8VD4gPSB7ICQ6IFJlY29yZDxrZXlvZiBULCBhbnkgfCBudWxsPiB9XG5cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IGBcbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzcHJpdGVBdGxhc1wiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzcHJpdGVGcmFtZVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzaXplTW9kZVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJ0eXBlXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInRyaW1cIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZmlsbFR5cGVcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZmlsbENlbnRlclwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmaWxsU3RhcnRcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZmlsbFJhbmdlXCI+PC91aS1wcm9wPlxuXG48dWktc2VjdGlvbiBjbGFzcz1cImNvbmZpZ1wiIGhlYWRlcj1cIkVmZmVjdCBQcm9wc1wiIGV4cGFuZD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZWZmZWN0Q29sb3JcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImlzMkRpbjNEXCI+PC91aS1wcm9wPlxuICAgIDx1aS1idXR0b24gY2xhc3M9XCJyZWxvYWRcIiBzdHlsZT1cImhlaWdodDoyNHB4O21hcmdpbjoxNnB4IDA7XCI+UmVsb2FkIEFzc2V0PC91aS1idXR0b24+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImxpZ2h0Q29sb3JcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImxpZ2h0V2lkdGhcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNvZnRcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cIm9mZnNldFwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwicm90YXRpb25cIj48L3VpLXByb3A+XG48L3VpLXNlY3Rpb24+XG5gO1xuXG5jb25zdCBzcHJpdGVDb25zdCA9IHtcbiAgICBzcHJpdGVBdGxhczogJy5zcHJpdGVBdGxhcycsXG4gICAgc3ByaXRlRnJhbWU6ICcuc3ByaXRlRnJhbWUnLFxuICAgIHNpemVNb2RlOiAnLnNpemVNb2RlJyxcbiAgICB0eXBlOiAnLnR5cGUnLFxuICAgIHRyaW06ICcudHJpbScsXG4gICAgZmlsbFR5cGU6ICcuZmlsbFR5cGUnLFxuICAgIGZpbGxDZW50ZXI6ICcuZmlsbENlbnRlcicsXG4gICAgZmlsbFN0YXJ0OiAnLmZpbGxTdGFydCcsXG4gICAgZmlsbFJhbmdlOiAnLmZpbGxSYW5nZScsXG59XG5cbmNvbnN0IGVmZmVjdENvbnN0ID0ge1xuICAgIGVmZmVjdENvbG9yOiAnLmVmZmVjdENvbG9yJyxcbiAgICBpczJEaW4zRDogJy5pczJEaW4zRCcsXG4gICAgcmVsb2FkOiAnLnJlbG9hZCcsXG4gICAgbGlnaHRDb2xvcjogJy5saWdodENvbG9yJyxcbiAgICBsaWdodFdpZHRoOiAnLmxpZ2h0V2lkdGgnLFxuICAgIHNvZnQ6ICcuc29mdCcsXG4gICAgb2Zmc2V0OiAnLm9mZnNldCcsXG4gICAgcm90YXRpb246ICcucm90YXRpb24nLFxufVxuXG5leHBvcnQgY29uc3QgJCA9IHsgLi4uc3ByaXRlQ29uc3QsIC4uLmVmZmVjdENvbnN0IH07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUodGhpczogU2VsZWN0b3I8dHlwZW9mICQ+LCBkdW1wOiBhbnkpIHtcbiAgICAvLyDkvb/nlKggdWktcG9ycCDoh6rliqjmuLLmn5PvvIzorr7nva4gcHJvcCDnmoQgdHlwZSDkuLogZHVtcFxuICAgIC8vIHJlbmRlciDkvKDlhaXkuIDkuKogZHVtcCDmlbDmja7vvIzog73lpJ/oh6rliqjmuLLmn5Plh7rlr7nlupTnmoTnlYzpnaJcbiAgICAvLyDoh6rliqjmuLLmn5PnmoTnlYzpnaLkv67mlLnlkI7vvIzog73lpJ/oh6rliqjmj5DkuqTmlbDmja5cblxuICAgIC8vIHNwcml0ZSBwcm9wc1xuICAgIHRoaXMuJC5zcHJpdGVBdGxhcy5yZW5kZXIoZHVtcC52YWx1ZS5zcHJpdGVBdGxhcyk7XG4gICAgdGhpcy4kLnNwcml0ZUZyYW1lLnJlbmRlcihkdW1wLnZhbHVlLnNwcml0ZUZyYW1lKTtcbiAgICB0aGlzLiQuc2l6ZU1vZGUucmVuZGVyKGR1bXAudmFsdWUuc2l6ZU1vZGUpO1xuICAgIHRoaXMuJC50eXBlLnJlbmRlcihkdW1wLnZhbHVlLnR5cGUpO1xuICAgIHRoaXMuJC50cmltLnJlbmRlcihkdW1wLnZhbHVlLnRyaW0pO1xuICAgIHRoaXMuJC5maWxsVHlwZS5yZW5kZXIoZHVtcC52YWx1ZS5maWxsVHlwZSk7XG4gICAgdGhpcy4kLmZpbGxDZW50ZXIucmVuZGVyKGR1bXAudmFsdWUuZmlsbENlbnRlcik7XG4gICAgdGhpcy4kLmZpbGxTdGFydC5yZW5kZXIoZHVtcC52YWx1ZS5maWxsU3RhcnQpO1xuICAgIHRoaXMuJC5maWxsUmFuZ2UucmVuZGVyKGR1bXAudmFsdWUuZmlsbFJhbmdlKTtcblxuICAgIGlmIChkdW1wLnZhbHVlLnR5cGUudmFsdWUgPT0gMCkge1xuICAgICAgICAvLyB0cmltIG9ubHkgc2hvdyB3aGVuIHR5cGUgaXMgc2ltcGxlXG4gICAgICAgIHRoaXMuJC50cmltLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kLnRyaW0uc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgfVxuXG4gICAgaWYgKGR1bXAudmFsdWUudHlwZS52YWx1ZSA9PSAzKSB7XG4gICAgICAgIHRoaXMuJC5maWxsVHlwZS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLiQuZmlsbENlbnRlci5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLiQuZmlsbFN0YXJ0LnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJC5maWxsUmFuZ2UucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcblxuICAgICAgICBpZiAoZHVtcC52YWx1ZS5maWxsVHlwZS52YWx1ZSA9PSAyKSB7XG4gICAgICAgICAgICAvLyBmaWxsQ2VudGVyIG9ubHkgZWRpdGFibGUgd2hlbiBmaWxsVHlwZSBpcyByYWRpYWxcbiAgICAgICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAnJyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiQuZmlsbFR5cGUuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgICAgICB0aGlzLiQuZmlsbFN0YXJ0LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgICAgICB0aGlzLiQuZmlsbFJhbmdlLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgIH1cblxuICAgIC8vIGVmZmVjdCBwcm9wc1xuICAgIHRoaXMuJC5lZmZlY3RDb2xvci5yZW5kZXIoZHVtcC52YWx1ZS5lZmZlY3RDb2xvcik7XG4gICAgdGhpcy4kLmlzMkRpbjNELnJlbmRlcihkdW1wLnZhbHVlLmlzMkRpbjNEKTtcbiAgICBpZiAodHlwZW9mIHRoaXMuJC5yZWxvYWQucmVuZGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhpcy4kLnJlbG9hZC5yZW5kZXIoZHVtcC52YWx1ZS5sYWJlbCk7XG4gICAgfVxuICAgIHRoaXMuJC5saWdodENvbG9yLnJlbmRlcihkdW1wLnZhbHVlLmxpZ2h0Q29sb3IpO1xuICAgIHRoaXMuJC5saWdodFdpZHRoLnJlbmRlcihkdW1wLnZhbHVlLmxpZ2h0V2lkdGgpO1xuICAgIHRoaXMuJC5zb2Z0LnJlbmRlcihkdW1wLnZhbHVlLnNvZnQpO1xuICAgIHRoaXMuJC5vZmZzZXQucmVuZGVyKGR1bXAudmFsdWUub2Zmc2V0KTtcbiAgICB0aGlzLiQucm90YXRpb24ucmVuZGVyKGR1bXAudmFsdWUucm90YXRpb24pO1xufVxuXG5sZXQgaXNJbml0ID0gZmFsc2U7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkeSh0aGlzOiBTZWxlY3Rvcjx0eXBlb2YgJD4pIHtcbiAgICB0aGlzLiQucmVsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJjb25maXJtXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgYXV0b0Fzc2lnbkVmZmVjdEFzc2V0KCdTcHJpdGVFZmZlY3RGbG93TGlnaHQnKTtcbiAgICAgICAgYXdhaXQgcmVpbXBvcnRBc3NldCgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpc0luaXQpIHtcbiAgICAgICAgYXdhaXQgYXV0b0Fzc2lnbkVmZmVjdEFzc2V0KCdTcHJpdGVFZmZlY3RGbG93TGlnaHQnKTtcbiAgICAgICAgYXdhaXQgcmVpbXBvcnRBc3NldCgpO1xuICAgICAgICBpc0luaXQgPSB0cnVlO1xuICAgIH1cbn0iXX0=