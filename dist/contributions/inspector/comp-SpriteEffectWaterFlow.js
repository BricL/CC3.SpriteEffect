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

    <ui-prop type="dump" class="noiseTexture"></ui-prop>
    <ui-prop type="dump" class="frequency"></ui-prop>
    <ui-prop type="dump" class="amplitude"></ui-prop>
    <ui-prop type="dump" class="speed"></ui-prop>
    <ui-prop type="dump" class="flowDirection"></ui-prop>
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
    noiseTexture: '.noiseTexture',
    frequency: '.frequency',
    amplitude: '.amplitude',
    speed: '.speed',
    flowDirection: '.flowDirection',
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
    this.$.noiseTexture.render(dump.value.noiseTexture);
    this.$.frequency.render(dump.value.frequency);
    this.$.amplitude.render(dump.value.amplitude);
    this.$.speed.render(dump.value.speed);
    this.$.flowDirection.render(dump.value.flowDirection);
}
exports.update = update;
let isInit = false;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        await util_1.autoAssignEffectAsset('SpriteEffectWaterFlow');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        await util_1.autoAssignEffectAsset('SpriteEffectWaterFlow');
        await util_1.reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3RXYXRlckZsb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvY29udHJpYnV0aW9ucy9pbnNwZWN0b3IvY29tcC1TcHJpdGVFZmZlY3RXYXRlckZsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7QUFFYixxQ0FBa0U7QUFJckQsUUFBQSxRQUFRLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FzQnZCLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRztJQUNoQixXQUFXLEVBQUUsY0FBYztJQUMzQixXQUFXLEVBQUUsY0FBYztJQUMzQixRQUFRLEVBQUUsV0FBVztJQUNyQixJQUFJLEVBQUUsT0FBTztJQUNiLElBQUksRUFBRSxPQUFPO0lBQ2IsUUFBUSxFQUFFLFdBQVc7SUFDckIsVUFBVSxFQUFFLGFBQWE7SUFDekIsU0FBUyxFQUFFLFlBQVk7SUFDdkIsU0FBUyxFQUFFLFlBQVk7Q0FDMUIsQ0FBQTtBQUVELE1BQU0sV0FBVyxHQUFHO0lBQ2hCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFlBQVksRUFBRSxlQUFlO0lBQzdCLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLEtBQUssRUFBRSxRQUFRO0lBQ2YsYUFBYSxFQUFFLGdCQUFnQjtDQUNsQyxDQUFBO0FBRVksUUFBQSxDQUFDLG1DQUFRLFdBQVcsR0FBSyxXQUFXLEVBQUc7QUFFcEQsU0FBZ0IsTUFBTSxDQUEyQixJQUFTO0lBQ3RELHdDQUF3QztJQUN4QyxtQ0FBbUM7SUFDbkMsc0JBQXNCO0lBRXRCLGVBQWU7SUFDZixJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUU5QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7UUFDNUIscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN6QztTQUFNO1FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMxQztJQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMs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ckQsTUFBTSxvQkFBYSxFQUFFLENBQUM7UUFDdEIsTUFBTSxHQUFHLElBQUksQ0FBQztLQUNqQjtBQUNMLENBQUM7QUFYRCxzQkFXQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgYXV0b0Fzc2lnbkVmZmVjdEFzc2V0LCByZWltcG9ydEFzc2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxcIjtcblxudHlwZSBTZWxlY3RvcjxUPiA9IHsgJDogUmVjb3JkPGtleW9mIFQsIGFueSB8IG51bGw+IH1cblxuZXhwb3J0IGNvbnN0IHRlbXBsYXRlID0gYFxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNwcml0ZUF0bGFzXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNwcml0ZUZyYW1lXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNpemVNb2RlXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInR5cGVcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwidHJpbVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmaWxsVHlwZVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmaWxsQ2VudGVyXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImZpbGxTdGFydFwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmaWxsUmFuZ2VcIj48L3VpLXByb3A+XG5cbjx1aS1zZWN0aW9uIGNsYXNzPVwiY29uZmlnXCIgaGVhZGVyPVwiRWZmZWN0IFByb3BzXCIgZXhwYW5kPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJlZmZlY3RDb2xvclwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiaXMyRGluM0RcIj48L3VpLXByb3A+XG4gICAgPHVpLWJ1dHRvbiBjbGFzcz1cInJlbG9hZFwiIHN0eWxlPVwiaGVpZ2h0OjI0cHg7bWFyZ2luOjE2cHggMDtcIj5SZWxvYWQgQXNzZXQ8L3VpLWJ1dHRvbj5cblxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJub2lzZVRleHR1cmVcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImZyZXF1ZW5jeVwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiYW1wbGl0dWRlXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJzcGVlZFwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZmxvd0RpcmVjdGlvblwiPjwvdWktcHJvcD5cbjwvdWktc2VjdGlvbj5cbmA7XG5cbmNvbnN0IHNwcml0ZUNvbnN0ID0ge1xuICAgIHNwcml0ZUF0bGFzOiAnLnNwcml0ZUF0bGFzJyxcbiAgICBzcHJpdGVGcmFtZTogJy5zcHJpdGVGcmFtZScsXG4gICAgc2l6ZU1vZGU6ICcuc2l6ZU1vZGUnLFxuICAgIHR5cGU6ICcudHlwZScsXG4gICAgdHJpbTogJy50cmltJyxcbiAgICBmaWxsVHlwZTogJy5maWxsVHlwZScsXG4gICAgZmlsbENlbnRlcjogJy5maWxsQ2VudGVyJyxcbiAgICBmaWxsU3RhcnQ6ICcuZmlsbFN0YXJ0JyxcbiAgICBmaWxsUmFuZ2U6ICcuZmlsbFJhbmdlJyxcbn1cblxuY29uc3QgZWZmZWN0Q29uc3QgPSB7XG4gICAgZWZmZWN0Q29sb3I6ICcuZWZmZWN0Q29sb3InLFxuICAgIGlzMkRpbjNEOiAnLmlzMkRpbjNEJyxcbiAgICByZWxvYWQ6ICcucmVsb2FkJyxcbiAgICBub2lzZVRleHR1cmU6ICcubm9pc2VUZXh0dXJlJyxcbiAgICBmcmVxdWVuY3k6ICcuZnJlcXVlbmN5JyxcbiAgICBhbXBsaXR1ZGU6ICcuYW1wbGl0dWRlJyxcbiAgICBzcGVlZDogJy5zcGVlZCcsXG4gICAgZmxvd0RpcmVjdGlvbjogJy5mbG93RGlyZWN0aW9uJyxcbn1cblxuZXhwb3J0IGNvbnN0ICQgPSB7IC4uLnNwcml0ZUNvbnN0LCAuLi5lZmZlY3RDb25zdCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPiwgZHVtcDogYW55KSB7XG4gICAgLy8g5L2/55SoIHVpLXBvcnAg6Ieq5Yqo5riy5p+T77yM6K6+572uIHByb3Ag55qEIHR5cGUg5Li6IGR1bXBcbiAgICAvLyByZW5kZXIg5Lyg5YWl5LiA5LiqIGR1bXAg5pWw5o2u77yM6IO95aSf6Ieq5Yqo5riy5p+T5Ye65a+55bqU55qE55WM6Z2iXG4gICAgLy8g6Ieq5Yqo5riy5p+T55qE55WM6Z2i5L+u5pS55ZCO77yM6IO95aSf6Ieq5Yqo5o+Q5Lqk5pWw5o2uXG5cbiAgICAvLyBzcHJpdGUgcHJvcHNcbiAgICB0aGlzLiQuc3ByaXRlQXRsYXMucmVuZGVyKGR1bXAudmFsdWUuc3ByaXRlQXRsYXMpO1xuICAgIHRoaXMuJC5zcHJpdGVGcmFtZS5yZW5kZXIoZHVtcC52YWx1ZS5zcHJpdGVGcmFtZSk7XG4gICAgdGhpcy4kLnNpemVNb2RlLnJlbmRlcihkdW1wLnZhbHVlLnNpemVNb2RlKTtcbiAgICB0aGlzLiQudHlwZS5yZW5kZXIoZHVtcC52YWx1ZS50eXBlKTtcbiAgICB0aGlzLiQudHJpbS5yZW5kZXIoZHVtcC52YWx1ZS50cmltKTtcbiAgICB0aGlzLiQuZmlsbFR5cGUucmVuZGVyKGR1bXAudmFsdWUuZmlsbFR5cGUpO1xuICAgIHRoaXMuJC5maWxsQ2VudGVyLnJlbmRlcihkdW1wLnZhbHVlLmZpbGxDZW50ZXIpO1xuICAgIHRoaXMuJC5maWxsU3RhcnQucmVuZGVyKGR1bXAudmFsdWUuZmlsbFN0YXJ0KTtcbiAgICB0aGlzLiQuZmlsbFJhbmdlLnJlbmRlcihkdW1wLnZhbHVlLmZpbGxSYW5nZSk7XG5cbiAgICBpZiAoZHVtcC52YWx1ZS50eXBlLnZhbHVlID09IDApIHtcbiAgICAgICAgLy8gdHJpbSBvbmx5IHNob3cgd2hlbiB0eXBlIGlzIHNpbXBsZVxuICAgICAgICB0aGlzLiQudHJpbS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJC50cmltLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgIH1cblxuICAgIGlmIChkdW1wLnZhbHVlLnR5cGUudmFsdWUgPT0gMykge1xuICAgICAgICB0aGlzLiQuZmlsbFR5cGUucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy4kLmZpbGxDZW50ZXIucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy4kLmZpbGxTdGFydC5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLiQuZmlsbFJhbmdlLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG5cbiAgICAgICAgaWYgKGR1bXAudmFsdWUuZmlsbFR5cGUudmFsdWUgPT0gMikge1xuICAgICAgICAgICAgLy8gZmlsbENlbnRlciBvbmx5IGVkaXRhYmxlIHdoZW4gZmlsbFR5cGUgaXMgcmFkaWFsXG4gICAgICAgICAgICB0aGlzLiQuZmlsbENlbnRlci5yZW1vdmVBdHRyaWJ1dGUoJ3JlYWRvbmx5Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiQuZmlsbENlbnRlci5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJycpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kLmZpbGxUeXBlLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgICAgICB0aGlzLiQuZmlsbENlbnRlci5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcbiAgICAgICAgdGhpcy4kLmZpbGxTdGFydC5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcbiAgICAgICAgdGhpcy4kLmZpbGxSYW5nZS5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcbiAgICB9XG5cbiAgICAvLyBlZmZlY3QgcHJvcHNcbiAgICB0aGlzLiQuZWZmZWN0Q29sb3IucmVuZGVyKGR1bXAudmFsdWUuZWZmZWN0Q29sb3IpO1xuICAgIHRoaXMuJC5pczJEaW4zRC5yZW5kZXIoZHVtcC52YWx1ZS5pczJEaW4zRCk7XG4gICAgaWYgKHR5cGVvZiB0aGlzLiQucmVsb2FkLnJlbmRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXMuJC5yZWxvYWQucmVuZGVyKGR1bXAudmFsdWUubGFiZWwpO1xuICAgIH1cblxuICAgIHRoaXMuJC5ub2lzZVRleHR1cmUucmVuZGVyKGR1bXAudmFsdWUubm9pc2VUZXh0dXJlKTtcbiAgICB0aGlzLiQuZnJlcXVlbmN5LnJlbmRlcihkdW1wLnZhbHVlLmZyZXF1ZW5jeSk7XG4gICAgdGhpcy4kLmFtcGxpdHVkZS5yZW5kZXIoZHVtcC52YWx1ZS5hbXBsaXR1ZGUpO1xuICAgIHRoaXMuJC5zcGVlZC5yZW5kZXIoZHVtcC52YWx1ZS5zcGVlZCk7XG4gICAgdGhpcy4kLmZsb3dEaXJlY3Rpb24ucmVuZGVyKGR1bXAudmFsdWUuZmxvd0RpcmVjdGlvbik7XG59XG5cbmxldCBpc0luaXQgPSBmYWxzZTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWR5KHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPikge1xuICAgIHRoaXMuJC5yZWxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbmZpcm1cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBhdXRvQXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdFdhdGVyRmxvdycpO1xuICAgICAgICBhd2FpdCByZWltcG9ydEFzc2V0KCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzSW5pdCkge1xuICAgICAgICBhd2FpdCBhdXRvQXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdFdhdGVyRmxvdycpO1xuICAgICAgICBhd2FpdCByZWltcG9ydEFzc2V0KCk7XG4gICAgICAgIGlzSW5pdCA9IHRydWU7XG4gICAgfVxufSJdfQ==