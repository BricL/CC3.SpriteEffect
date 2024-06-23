'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = exports.update = exports.$ = exports.template = void 0;
const util_1 = require("../../util");
const comp_Sprite_1 = require("./comp-Sprite");
exports.template = `
${comp_Sprite_1.sprite_template}

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
const effectConst = {
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    reload: '.reload',
    secondSprite: '.secondSprite',
    dirMode: '.dirMode',
    offset: '.offset',
    soft: '.soft',
};
exports.$ = Object.assign(Object.assign({}, comp_Sprite_1.spriteConst), effectConst);
function update(dump) {
    comp_Sprite_1.base_sprite_update.call(this, dump);
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
        await util_1.assignEffectAsset('SpriteEffectDisappear');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        await util_1.assignEffectAsset('SpriteEffectDisappear');
        await util_1.reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3REaXNhcHBlYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvY29udHJpYnV0aW9ucy9pbnNwZWN0b3IvY29tcC1TcHJpdGVFZmZlY3REaXNhcHBlYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7QUFFYixxQ0FBOEQ7QUFDOUQsK0NBQTJGO0FBRTlFLFFBQUEsUUFBUSxHQUFHO0VBQ3RCLDZCQUFlOzs7Ozs7Ozs7Ozs7Q0FZaEIsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHO0lBQ2hCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFlBQVksRUFBRSxlQUFlO0lBQzdCLE9BQU8sRUFBRSxVQUFVO0lBQ25CLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLElBQUksRUFBRSxPQUFPO0NBQ2hCLENBQUE7QUFFWSxRQUFBLENBQUMsbUNBQVEseUJBQVcsR0FBSyxXQUFXLEVBQUc7QUFFcEQsU0FBZ0IsTUFBTSxDQUEyQixJQUFTO0lBQ3RELGdDQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFcEMsZUFBZTtJQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDcEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQWJELHdCQWFDO0FBRUQsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBRVosS0FBSyxVQUFVLEtBQUs7SUFDdkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2pELE1BQU0sd0JBQWlCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNqRCxNQUFNLG9CQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDVCxNQUFNLHdCQUFpQixDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDakQsTUFBTSxvQkFBYSxFQUFFLENBQUM7UUFDdEIsTUFBTSxHQUFHLElBQUksQ0FBQztLQUNqQjtBQUNMLENBQUM7QUFYRCxzQkFXQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgYXNzaWduRWZmZWN0QXNzZXQsIHJlaW1wb3J0QXNzZXQgfSBmcm9tIFwiLi4vLi4vdXRpbFwiO1xuaW1wb3J0IHsgU2VsZWN0b3IsIGJhc2Vfc3ByaXRlX3VwZGF0ZSwgc3ByaXRlQ29uc3QsIHNwcml0ZV90ZW1wbGF0ZSB9IGZyb20gXCIuL2NvbXAtU3ByaXRlXCI7XG5cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IGBcbiR7c3ByaXRlX3RlbXBsYXRlfVxuXG48dWktc2VjdGlvbiBjbGFzcz1cImNvbmZpZ1wiIGhlYWRlcj1cIkVmZmVjdCBQcm9wc1wiIGV4cGFuZD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZWZmZWN0Q29sb3JcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImlzMkRpbjNEXCI+PC91aS1wcm9wPlxuICAgIDx1aS1idXR0b24gY2xhc3M9XCJyZWxvYWRcIiBzdHlsZT1cImhlaWdodDoyNHB4O21hcmdpbjoxNnB4IDA7XCI+UmVsb2FkIEFzc2V0PC91aS1idXR0b24+XG5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwic2Vjb25kU3ByaXRlXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJkaXJNb2RlXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJvZmZzZXRcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNvZnRcIj48L3VpLXByb3A+XG48L3VpLXNlY3Rpb24+XG5gO1xuXG5jb25zdCBlZmZlY3RDb25zdCA9IHtcbiAgICBlZmZlY3RDb2xvcjogJy5lZmZlY3RDb2xvcicsXG4gICAgaXMyRGluM0Q6ICcuaXMyRGluM0QnLFxuICAgIHJlbG9hZDogJy5yZWxvYWQnLFxuICAgIHNlY29uZFNwcml0ZTogJy5zZWNvbmRTcHJpdGUnLFxuICAgIGRpck1vZGU6ICcuZGlyTW9kZScsXG4gICAgb2Zmc2V0OiAnLm9mZnNldCcsXG4gICAgc29mdDogJy5zb2Z0Jyxcbn1cblxuZXhwb3J0IGNvbnN0ICQgPSB7IC4uLnNwcml0ZUNvbnN0LCAuLi5lZmZlY3RDb25zdCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPiwgZHVtcDogYW55KSB7XG4gICAgYmFzZV9zcHJpdGVfdXBkYXRlLmNhbGwodGhpcywgZHVtcCk7XG5cbiAgICAvLyBlZmZlY3QgcHJvcHNcbiAgICB0aGlzLiQuZWZmZWN0Q29sb3IucmVuZGVyKGR1bXAudmFsdWUuZWZmZWN0Q29sb3IpO1xuICAgIHRoaXMuJC5pczJEaW4zRC5yZW5kZXIoZHVtcC52YWx1ZS5pczJEaW4zRCk7XG4gICAgaWYgKHR5cGVvZiB0aGlzLiQucmVsb2FkLnJlbmRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXMuJC5yZWxvYWQucmVuZGVyKGR1bXAudmFsdWUubGFiZWwpO1xuICAgIH1cbiAgICB0aGlzLiQuc2Vjb25kU3ByaXRlLnJlbmRlcihkdW1wLnZhbHVlLnNlY29uZFNwcml0ZSk7XG4gICAgdGhpcy4kLmRpck1vZGUucmVuZGVyKGR1bXAudmFsdWUuZGlyTW9kZSk7XG4gICAgdGhpcy4kLm9mZnNldC5yZW5kZXIoZHVtcC52YWx1ZS5vZmZzZXQpO1xuICAgIHRoaXMuJC5zb2Z0LnJlbmRlcihkdW1wLnZhbHVlLnNvZnQpO1xufVxuXG5sZXQgaXNJbml0ID0gZmFsc2U7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkeSh0aGlzOiBTZWxlY3Rvcjx0eXBlb2YgJD4pIHtcbiAgICB0aGlzLiQucmVsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJjb25maXJtXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgYXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdERpc2FwcGVhcicpO1xuICAgICAgICBhd2FpdCByZWltcG9ydEFzc2V0KCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzSW5pdCkge1xuICAgICAgICBhd2FpdCBhc3NpZ25FZmZlY3RBc3NldCgnU3ByaXRlRWZmZWN0RGlzYXBwZWFyJyk7XG4gICAgICAgIGF3YWl0IHJlaW1wb3J0QXNzZXQoKTtcbiAgICAgICAgaXNJbml0ID0gdHJ1ZTtcbiAgICB9XG59Il19