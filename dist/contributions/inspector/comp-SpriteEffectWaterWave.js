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
    <ui-prop type="dump" class="offset"></ui-prop>
    <ui-prop type="dump" class="waveWidth"></ui-prop>
    <ui-prop type="dump" class="waveHeight"></ui-prop>
    <ui-prop type="dump" class="waveSpeed"></ui-prop>
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
    offset: '.offset',
    waveWidth: '.waveWidth',
    waveHeight: '.waveHeight',
    waveSpeed: '.waveSpeed',
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
    this.$.offset.render(dump.value.offset);
    this.$.waveWidth.render(dump.value.waveWidth);
    this.$.waveHeight.render(dump.value.waveHeight);
    this.$.waveSpeed.render(dump.value.waveSpeed);
}
exports.update = update;
let isInit = false;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        await util_1.autoAssignEffectAsset('SpriteEffectWaterWave');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        await util_1.autoAssignEffectAsset('SpriteEffectWaterWave');
        await util_1.reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3RXYXRlcldhdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvY29udHJpYnV0aW9ucy9pbnNwZWN0b3IvY29tcC1TcHJpdGVFZmZlY3RXYXRlcldhdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7QUFFYixxQ0FBa0U7QUFJckQsUUFBQSxRQUFRLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBb0J2QixDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUc7SUFDaEIsV0FBVyxFQUFFLGNBQWM7SUFDM0IsV0FBVyxFQUFFLGNBQWM7SUFDM0IsUUFBUSxFQUFFLFdBQVc7SUFDckIsSUFBSSxFQUFFLE9BQU87SUFDYixJQUFJLEVBQUUsT0FBTztJQUNiLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLFNBQVMsRUFBRSxZQUFZO0NBQzFCLENBQUE7QUFFRCxNQUFNLFdBQVcsR0FBRztJQUNoQixXQUFXLEVBQUUsY0FBYztJQUMzQixRQUFRLEVBQUUsV0FBVztJQUNyQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixTQUFTLEVBQUUsWUFBWTtJQUN2QixVQUFVLEVBQUUsYUFBYTtJQUN6QixTQUFTLEVBQUUsWUFBWTtDQUMxQixDQUFBO0FBRVksUUFBQSxDQUFDLG1DQUFRLFdBQVcsR0FBSyxXQUFXLEVBQUc7QUFFcEQsU0FBZ0IsTUFBTSxDQUEyQixJQUFTO0lBQ3RELHdDQUF3QztJQUN4QyxtQ0FBbUM7SUFDbkMsc0JBQXNCO0lBRXRCLGVBQWU7SUFDZixJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUU5QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7UUFDNUIscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN6QztTQUFNO1FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMxQztJQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtRQUM1QixJQUFJLENBQUMsQ0FB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aWN0JztcblxuaW1wb3J0IHsgYXV0b0Fzc2lnbkVmZmVjdEFzc2V0LCByZWltcG9ydEFzc2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxcIjtcblxudHlwZSBTZWxlY3RvcjxUPiA9IHsgJDogUmVjb3JkPGtleW9mIFQsIGFueSB8IG51bGw+IH1cblxuZXhwb3J0IGNvbnN0IHRlbXBsYXRlID0gYFxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNwcml0ZUF0bGFzXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNwcml0ZUZyYW1lXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNpemVNb2RlXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInR5cGVcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwidHJpbVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmaWxsVHlwZVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmaWxsQ2VudGVyXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImZpbGxTdGFydFwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmaWxsUmFuZ2VcIj48L3VpLXByb3A+XG5cbjx1aS1zZWN0aW9uIGNsYXNzPVwiY29uZmlnXCIgaGVhZGVyPVwiRWZmZWN0IFByb3BzXCIgZXhwYW5kPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJlZmZlY3RDb2xvclwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiaXMyRGluM0RcIj48L3VpLXByb3A+XG4gICAgPHVpLWJ1dHRvbiBjbGFzcz1cInJlbG9hZFwiIHN0eWxlPVwiaGVpZ2h0OjI0cHg7bWFyZ2luOjE2cHggMDtcIj5SZWxvYWQgQXNzZXQ8L3VpLWJ1dHRvbj5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwib2Zmc2V0XCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJ3YXZlV2lkdGhcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cIndhdmVIZWlnaHRcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cIndhdmVTcGVlZFwiPjwvdWktcHJvcD5cbjwvdWktc2VjdGlvbj5cbmA7XG5cbmNvbnN0IHNwcml0ZUNvbnN0ID0ge1xuICAgIHNwcml0ZUF0bGFzOiAnLnNwcml0ZUF0bGFzJyxcbiAgICBzcHJpdGVGcmFtZTogJy5zcHJpdGVGcmFtZScsXG4gICAgc2l6ZU1vZGU6ICcuc2l6ZU1vZGUnLFxuICAgIHR5cGU6ICcudHlwZScsXG4gICAgdHJpbTogJy50cmltJyxcbiAgICBmaWxsVHlwZTogJy5maWxsVHlwZScsXG4gICAgZmlsbENlbnRlcjogJy5maWxsQ2VudGVyJyxcbiAgICBmaWxsU3RhcnQ6ICcuZmlsbFN0YXJ0JyxcbiAgICBmaWxsUmFuZ2U6ICcuZmlsbFJhbmdlJyxcbn1cblxuY29uc3QgZWZmZWN0Q29uc3QgPSB7XG4gICAgZWZmZWN0Q29sb3I6ICcuZWZmZWN0Q29sb3InLFxuICAgIGlzMkRpbjNEOiAnLmlzMkRpbjNEJyxcbiAgICByZWxvYWQ6ICcucmVsb2FkJyxcbiAgICBvZmZzZXQ6ICcub2Zmc2V0JyxcbiAgICB3YXZlV2lkdGg6ICcud2F2ZVdpZHRoJyxcbiAgICB3YXZlSGVpZ2h0OiAnLndhdmVIZWlnaHQnLFxuICAgIHdhdmVTcGVlZDogJy53YXZlU3BlZWQnLFxufVxuXG5leHBvcnQgY29uc3QgJCA9IHsgLi4uc3ByaXRlQ29uc3QsIC4uLmVmZmVjdENvbnN0IH07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUodGhpczogU2VsZWN0b3I8dHlwZW9mICQ+LCBkdW1wOiBhbnkpIHtcbiAgICAvLyDkvb/nlKggdWktcG9ycCDoh6rliqjmuLLmn5PvvIzorr7nva4gcHJvcCDnmoQgdHlwZSDkuLogZHVtcFxuICAgIC8vIHJlbmRlciDkvKDlhaXkuIDkuKogZHVtcCDmlbDmja7vvIzog73lpJ/oh6rliqjmuLLmn5Plh7rlr7nlupTnmoTnlYzpnaJcbiAgICAvLyDoh6rliqjmuLLmn5PnmoTnlYzpnaLkv67mlLnlkI7vvIzog73lpJ/oh6rliqjmj5DkuqTmlbDmja5cblxuICAgIC8vIHNwcml0ZSBwcm9wc1xuICAgIHRoaXMuJC5zcHJpdGVBdGxhcy5yZW5kZXIoZHVtcC52YWx1ZS5zcHJpdGVBdGxhcyk7XG4gICAgdGhpcy4kLnNwcml0ZUZyYW1lLnJlbmRlcihkdW1wLnZhbHVlLnNwcml0ZUZyYW1lKTtcbiAgICB0aGlzLiQuc2l6ZU1vZGUucmVuZGVyKGR1bXAudmFsdWUuc2l6ZU1vZGUpO1xuICAgIHRoaXMuJC50eXBlLnJlbmRlcihkdW1wLnZhbHVlLnR5cGUpO1xuICAgIHRoaXMuJC50cmltLnJlbmRlcihkdW1wLnZhbHVlLnRyaW0pO1xuICAgIHRoaXMuJC5maWxsVHlwZS5yZW5kZXIoZHVtcC52YWx1ZS5maWxsVHlwZSk7XG4gICAgdGhpcy4kLmZpbGxDZW50ZXIucmVuZGVyKGR1bXAudmFsdWUuZmlsbENlbnRlcik7XG4gICAgdGhpcy4kLmZpbGxTdGFydC5yZW5kZXIoZHVtcC52YWx1ZS5maWxsU3RhcnQpO1xuICAgIHRoaXMuJC5maWxsUmFuZ2UucmVuZGVyKGR1bXAudmFsdWUuZmlsbFJhbmdlKTtcblxuICAgIGlmIChkdW1wLnZhbHVlLnR5cGUudmFsdWUgPT0gMCkge1xuICAgICAgICAvLyB0cmltIG9ubHkgc2hvdyB3aGVuIHR5cGUgaXMgc2ltcGxlXG4gICAgICAgIHRoaXMuJC50cmltLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kLnRyaW0uc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgfVxuXG4gICAgaWYgKGR1bXAudmFsdWUudHlwZS52YWx1ZSA9PSAzKSB7XG4gICAgICAgIHRoaXMuJC5maWxsVHlwZS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLiQuZmlsbENlbnRlci5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLiQuZmlsbFN0YXJ0LnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJC5maWxsUmFuZ2UucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcblxuICAgICAgICBpZiAoZHVtcC52YWx1ZS5maWxsVHlwZS52YWx1ZSA9PSAyKSB7XG4gICAgICAgICAgICAvLyBmaWxsQ2VudGVyIG9ubHkgZWRpdGFibGUgd2hlbiBmaWxsVHlwZSBpcyByYWRpYWxcbiAgICAgICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAnJyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiQuZmlsbFR5cGUuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgICAgICB0aGlzLiQuZmlsbFN0YXJ0LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgICAgICB0aGlzLiQuZmlsbFJhbmdlLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgIH1cblxuICAgIC8vIGVmZmVjdCBwcm9wc1xuICAgIHRoaXMuJC5lZmZlY3RDb2xvci5yZW5kZXIoZHVtcC52YWx1ZS5lZmZlY3RDb2xvcik7XG4gICAgdGhpcy4kLmlzMkRpbjNELnJlbmRlcihkdW1wLnZhbHVlLmlzMkRpbjNEKTtcbiAgICBpZiAodHlwZW9mIHRoaXMuJC5yZWxvYWQucmVuZGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhpcy4kLnJlbG9hZC5yZW5kZXIoZHVtcC52YWx1ZS5sYWJlbCk7XG4gICAgfVxuICAgIHRoaXMuJC5vZmZzZXQucmVuZGVyKGR1bXAudmFsdWUub2Zmc2V0KTtcbiAgICB0aGlzLiQud2F2ZVdpZHRoLnJlbmRlcihkdW1wLnZhbHVlLndhdmVXaWR0aCk7XG4gICAgdGhpcy4kLndhdmVIZWlnaHQucmVuZGVyKGR1bXAudmFsdWUud2F2ZUhlaWdodCk7XG4gICAgdGhpcy4kLndhdmVTcGVlZC5yZW5kZXIoZHVtcC52YWx1ZS53YXZlU3BlZWQpO1xufVxuXG5sZXQgaXNJbml0ID0gZmFsc2U7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkeSh0aGlzOiBTZWxlY3Rvcjx0eXBlb2YgJD4pIHtcbiAgICB0aGlzLiQucmVsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJjb25maXJtXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgYXV0b0Fzc2lnbkVmZmVjdEFzc2V0KCdTcHJpdGVFZmZlY3RXYXRlcldhdmUnKTtcbiAgICAgICAgYXdhaXQgcmVpbXBvcnRBc3NldCgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpc0luaXQpIHtcbiAgICAgICAgYXdhaXQgYXV0b0Fzc2lnbkVmZmVjdEFzc2V0KCdTcHJpdGVFZmZlY3RXYXRlcldhdmUnKTtcbiAgICAgICAgYXdhaXQgcmVpbXBvcnRBc3NldCgpO1xuICAgICAgICBpc0luaXQgPSB0cnVlO1xuICAgIH1cbn0iXX0=