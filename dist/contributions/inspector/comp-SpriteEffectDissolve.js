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

    <ui-prop type="dump" class="noiseTexture"></ui-prop>
    <ui-prop type="dump" class="dissolveColor"></ui-prop>
    <ui-prop type="dump" class="factor"></ui-prop>
    <ui-prop type="dump" class="softness"></ui-prop>
    <ui-prop type="dump" class="width"></ui-prop>
</ui-section>
`;
const effectConst = {
    effectAsset: '.effectAsset',
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    reload: '.reload',
    noiseTexture: '.noiseTexture',
    dissolveColor: '.dissolveColor',
    factor: '.factor',
    softness: '.softness',
    width: '.width',
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
    this.$.noiseTexture.render(dump.value.noiseTexture);
    this.$.dissolveColor.render(dump.value.dissolveColor);
    this.$.factor.render(dump.value.factor);
    this.$.softness.render(dump.value.softness);
    this.$.width.render(dump.value.width);
}
exports.update = update;
let isInit = false;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        await util_1.assignEffectAsset('SpriteEffectDissolve');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        // await assignEffectAsset('SpriteEffectDissolve');
        // await reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3REaXNzb2x2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9jb250cmlidXRpb25zL2luc3BlY3Rvci9jb21wLVNwcml0ZUVmZmVjdERpc3NvbHZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7O0FBRWIscUNBQThEO0FBQzlELCtDQUFpRjtBQUlwRSxRQUFBLFFBQVEsR0FBRztFQUN0Qiw2QkFBZTs7Ozs7Ozs7Ozs7Ozs7Q0FjaEIsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHO0lBQ2hCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLE1BQU0sRUFBRSxTQUFTO0lBRWpCLFlBQVksRUFBRSxlQUFlO0lBQzdCLGFBQWEsRUFBRSxnQkFBZ0I7SUFDL0IsTUFBTSxFQUFFLFNBQVM7SUFDakIsUUFBUSxFQUFFLFdBQVc7SUFDckIsS0FBSyxFQUFFLFFBQVE7Q0FDbEIsQ0FBQTtBQUVZLFFBQUEsQ0FBQyxtQ0FBUSx5QkFBVyxHQUFLLFdBQVcsRUFBRztBQUVwRCxTQUFnQixNQUFNLENBQTJCLElBQVM7SUFDdEQsZ0NBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVwQyxlQUFlO0lBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7UUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUM7SUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwRCxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RCxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBZkQsd0JBZUM7QUFFRCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFFWixLQUFLLFVBQVUsS0FBSztJQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDakQsTUFBTSx3QkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sb0JBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNULG1EQUFtRDtRQUNuRCx5QkFBeUI7UUFDekIsTUFBTSxHQUFHLElBQUksQ0FBQztLQUNqQjtBQUNMLENBQUM7QUFYRCxzQkFXQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgYXNzaWduRWZmZWN0QXNzZXQsIHJlaW1wb3J0QXNzZXQgfSBmcm9tIFwiLi4vLi4vdXRpbFwiO1xuaW1wb3J0IHsgYmFzZV9zcHJpdGVfdXBkYXRlLCBzcHJpdGVDb25zdCwgc3ByaXRlX3RlbXBsYXRlIH0gZnJvbSBcIi4vY29tcC1TcHJpdGVcIjtcblxudHlwZSBTZWxlY3RvcjxUPiA9IHsgJDogUmVjb3JkPGtleW9mIFQsIGFueSB8IG51bGw+IH1cblxuZXhwb3J0IGNvbnN0IHRlbXBsYXRlID0gYFxuJHtzcHJpdGVfdGVtcGxhdGV9XG5cbjx1aS1zZWN0aW9uIGNsYXNzPVwiY29uZmlnXCIgaGVhZGVyPVwiRWZmZWN0IFByb3BzXCIgZXhwYW5kPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJlZmZlY3RBc3NldFwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZWZmZWN0Q29sb3JcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImlzMkRpbjNEXCI+PC91aS1wcm9wPlxuICAgIDx1aS1idXR0b24gY2xhc3M9XCJyZWxvYWRcIiBzdHlsZT1cImhlaWdodDoyNHB4O21hcmdpbjoxNnB4IDA7XCI+UmVsb2FkIEFzc2V0PC91aS1idXR0b24+XG5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwibm9pc2VUZXh0dXJlXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJkaXNzb2x2ZUNvbG9yXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmYWN0b3JcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNvZnRuZXNzXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJ3aWR0aFwiPjwvdWktcHJvcD5cbjwvdWktc2VjdGlvbj5cbmA7XG5cbmNvbnN0IGVmZmVjdENvbnN0ID0ge1xuICAgIGVmZmVjdEFzc2V0OiAnLmVmZmVjdEFzc2V0JyxcbiAgICBlZmZlY3RDb2xvcjogJy5lZmZlY3RDb2xvcicsXG4gICAgaXMyRGluM0Q6ICcuaXMyRGluM0QnLFxuICAgIHJlbG9hZDogJy5yZWxvYWQnLFxuXG4gICAgbm9pc2VUZXh0dXJlOiAnLm5vaXNlVGV4dHVyZScsXG4gICAgZGlzc29sdmVDb2xvcjogJy5kaXNzb2x2ZUNvbG9yJyxcbiAgICBmYWN0b3I6ICcuZmFjdG9yJyxcbiAgICBzb2Z0bmVzczogJy5zb2Z0bmVzcycsXG4gICAgd2lkdGg6ICcud2lkdGgnLFxufVxuXG5leHBvcnQgY29uc3QgJCA9IHsgLi4uc3ByaXRlQ29uc3QsIC4uLmVmZmVjdENvbnN0IH07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUodGhpczogU2VsZWN0b3I8dHlwZW9mICQ+LCBkdW1wOiBhbnkpIHtcbiAgICBiYXNlX3Nwcml0ZV91cGRhdGUuY2FsbCh0aGlzLCBkdW1wKTtcblxuICAgIC8vIGVmZmVjdCBwcm9wc1xuICAgIHRoaXMuJC5lZmZlY3RBc3NldC5yZW5kZXIoZHVtcC52YWx1ZS5lZmZlY3RBc3NldCk7XG4gICAgdGhpcy4kLmVmZmVjdENvbG9yLnJlbmRlcihkdW1wLnZhbHVlLmVmZmVjdENvbG9yKTtcbiAgICB0aGlzLiQuaXMyRGluM0QucmVuZGVyKGR1bXAudmFsdWUuaXMyRGluM0QpO1xuICAgIGlmICh0eXBlb2YgdGhpcy4kLnJlbG9hZC5yZW5kZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aGlzLiQucmVsb2FkLnJlbmRlcihkdW1wLnZhbHVlLmxhYmVsKTtcbiAgICB9XG4gICAgdGhpcy4kLm5vaXNlVGV4dHVyZS5yZW5kZXIoZHVtcC52YWx1ZS5ub2lzZVRleHR1cmUpO1xuICAgIHRoaXMuJC5kaXNzb2x2ZUNvbG9yLnJlbmRlcihkdW1wLnZhbHVlLmRpc3NvbHZlQ29sb3IpO1xuICAgIHRoaXMuJC5mYWN0b3IucmVuZGVyKGR1bXAudmFsdWUuZmFjdG9yKTtcbiAgICB0aGlzLiQuc29mdG5lc3MucmVuZGVyKGR1bXAudmFsdWUuc29mdG5lc3MpO1xuICAgIHRoaXMuJC53aWR0aC5yZW5kZXIoZHVtcC52YWx1ZS53aWR0aCk7XG59XG5cbmxldCBpc0luaXQgPSBmYWxzZTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWR5KHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPikge1xuICAgIHRoaXMuJC5yZWxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbmZpcm1cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBhc3NpZ25FZmZlY3RBc3NldCgnU3ByaXRlRWZmZWN0RGlzc29sdmUnKTtcbiAgICAgICAgYXdhaXQgcmVpbXBvcnRBc3NldCgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpc0luaXQpIHtcbiAgICAgICAgLy8gYXdhaXQgYXNzaWduRWZmZWN0QXNzZXQoJ1Nwcml0ZUVmZmVjdERpc3NvbHZlJyk7XG4gICAgICAgIC8vIGF3YWl0IHJlaW1wb3J0QXNzZXQoKTtcbiAgICAgICAgaXNJbml0ID0gdHJ1ZTtcbiAgICB9XG59Il19