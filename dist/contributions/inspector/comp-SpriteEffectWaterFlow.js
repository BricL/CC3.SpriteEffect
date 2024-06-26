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
    <ui-prop type="dump" class="frequency"></ui-prop>
    <ui-prop type="dump" class="amplitude"></ui-prop>
    <ui-prop type="dump" class="speed"></ui-prop>
    <ui-prop type="dump" class="flowDirection"></ui-prop>
</ui-section>
`;
const effectConst = {
    effectAsset: '.effectAsset',
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    reload: '.reload',
    noiseTexture: '.noiseTexture',
    frequency: '.frequency',
    amplitude: '.amplitude',
    speed: '.speed',
    flowDirection: '.flowDirection',
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
    this.$.frequency.render(dump.value.frequency);
    this.$.amplitude.render(dump.value.amplitude);
    this.$.speed.render(dump.value.speed);
    this.$.flowDirection.render(dump.value.flowDirection);
}
exports.update = update;
let isInit = false;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        await util_1.assignEffectAsset('SpriteEffectWaterFlow');
        await util_1.reimportAsset();
    });
    if (!isInit) {
        // await assignEffectAsset('SpriteEffectWaterFlow');
        // await reimportAsset();
        isInit = true;
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3RXYXRlckZsb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvY29udHJpYnV0aW9ucy9pbnNwZWN0b3IvY29tcC1TcHJpdGVFZmZlY3RXYXRlckZsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7QUFFYixxQ0FBOEQ7QUFDOUQsK0NBQTJGO0FBRTlFLFFBQUEsUUFBUSxHQUFHO0VBQ3RCLDZCQUFlOzs7Ozs7Ozs7Ozs7OztDQWNoQixDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUc7SUFDaEIsV0FBVyxFQUFFLGNBQWM7SUFDM0IsV0FBVyxFQUFFLGNBQWM7SUFDM0IsUUFBUSxFQUFFLFdBQVc7SUFDckIsTUFBTSxFQUFFLFNBQVM7SUFDakIsWUFBWSxFQUFFLGVBQWU7SUFDN0IsU0FBUyxFQUFFLFlBQVk7SUFDdkIsU0FBUyxFQUFFLFlBQVk7SUFDdkIsS0FBSyxFQUFFLFFBQVE7SUFDZixhQUFhLEVBQUUsZ0JBQWdCO0NBQ2xDLENBQUE7QUFFWSxRQUFBLENBQUMsbUNBQVEseUJBQVcsR0FBSyxXQUFXLEVBQUc7QUFFcEQsU0FBZ0IsTUFBTSxDQUEyQixJQUFTO0lBQ3RELGdDQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFcEMsZUFBZTtJQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFDO0lBRUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDcEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQWhCRCx3QkFnQkM7QUFFRCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFFWixLQUFLLFVBQVUsS0FBSztJQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDakQsTUFBTSx3QkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sb0JBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNULG9EQUFvRDtRQUNwRCx5QkFBeUI7UUFDekIsTUFBTSxHQUFHLElBQUksQ0FBQztLQUNqQjtBQUNMLENBQUM7QUFYRCxzQkFXQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgYXNzaWduRWZmZWN0QXNzZXQsIHJlaW1wb3J0QXNzZXQgfSBmcm9tIFwiLi4vLi4vdXRpbFwiO1xuaW1wb3J0IHsgU2VsZWN0b3IsIGJhc2Vfc3ByaXRlX3VwZGF0ZSwgc3ByaXRlQ29uc3QsIHNwcml0ZV90ZW1wbGF0ZSB9IGZyb20gXCIuL2NvbXAtU3ByaXRlXCI7XG5cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IGBcbiR7c3ByaXRlX3RlbXBsYXRlfVxuXG48dWktc2VjdGlvbiBjbGFzcz1cImNvbmZpZ1wiIGhlYWRlcj1cIkVmZmVjdCBQcm9wc1wiIGV4cGFuZD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZWZmZWN0QXNzZXRcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImVmZmVjdENvbG9yXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJpczJEaW4zRFwiPjwvdWktcHJvcD5cbiAgICA8dWktYnV0dG9uIGNsYXNzPVwicmVsb2FkXCIgc3R5bGU9XCJoZWlnaHQ6MjRweDttYXJnaW46MTZweCAwO1wiPlJlbG9hZCBBc3NldDwvdWktYnV0dG9uPlxuXG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cIm5vaXNlVGV4dHVyZVwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiZnJlcXVlbmN5XCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJhbXBsaXR1ZGVcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNwZWVkXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmbG93RGlyZWN0aW9uXCI+PC91aS1wcm9wPlxuPC91aS1zZWN0aW9uPlxuYDtcblxuY29uc3QgZWZmZWN0Q29uc3QgPSB7XG4gICAgZWZmZWN0QXNzZXQ6ICcuZWZmZWN0QXNzZXQnLFxuICAgIGVmZmVjdENvbG9yOiAnLmVmZmVjdENvbG9yJyxcbiAgICBpczJEaW4zRDogJy5pczJEaW4zRCcsXG4gICAgcmVsb2FkOiAnLnJlbG9hZCcsXG4gICAgbm9pc2VUZXh0dXJlOiAnLm5vaXNlVGV4dHVyZScsXG4gICAgZnJlcXVlbmN5OiAnLmZyZXF1ZW5jeScsXG4gICAgYW1wbGl0dWRlOiAnLmFtcGxpdHVkZScsXG4gICAgc3BlZWQ6ICcuc3BlZWQnLFxuICAgIGZsb3dEaXJlY3Rpb246ICcuZmxvd0RpcmVjdGlvbicsXG59XG5cbmV4cG9ydCBjb25zdCAkID0geyAuLi5zcHJpdGVDb25zdCwgLi4uZWZmZWN0Q29uc3QgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZSh0aGlzOiBTZWxlY3Rvcjx0eXBlb2YgJD4sIGR1bXA6IGFueSkge1xuICAgIGJhc2Vfc3ByaXRlX3VwZGF0ZS5jYWxsKHRoaXMsIGR1bXApO1xuXG4gICAgLy8gZWZmZWN0IHByb3BzXG4gICAgdGhpcy4kLmVmZmVjdEFzc2V0LnJlbmRlcihkdW1wLnZhbHVlLmVmZmVjdEFzc2V0KTtcbiAgICB0aGlzLiQuZWZmZWN0Q29sb3IucmVuZGVyKGR1bXAudmFsdWUuZWZmZWN0Q29sb3IpO1xuICAgIHRoaXMuJC5pczJEaW4zRC5yZW5kZXIoZHVtcC52YWx1ZS5pczJEaW4zRCk7XG4gICAgaWYgKHR5cGVvZiB0aGlzLiQucmVsb2FkLnJlbmRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXMuJC5yZWxvYWQucmVuZGVyKGR1bXAudmFsdWUubGFiZWwpO1xuICAgIH1cblxuICAgIHRoaXMuJC5ub2lzZVRleHR1cmUucmVuZGVyKGR1bXAudmFsdWUubm9pc2VUZXh0dXJlKTtcbiAgICB0aGlzLiQuZnJlcXVlbmN5LnJlbmRlcihkdW1wLnZhbHVlLmZyZXF1ZW5jeSk7XG4gICAgdGhpcy4kLmFtcGxpdHVkZS5yZW5kZXIoZHVtcC52YWx1ZS5hbXBsaXR1ZGUpO1xuICAgIHRoaXMuJC5zcGVlZC5yZW5kZXIoZHVtcC52YWx1ZS5zcGVlZCk7XG4gICAgdGhpcy4kLmZsb3dEaXJlY3Rpb24ucmVuZGVyKGR1bXAudmFsdWUuZmxvd0RpcmVjdGlvbik7XG59XG5cbmxldCBpc0luaXQgPSBmYWxzZTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWR5KHRoaXM6IFNlbGVjdG9yPHR5cGVvZiAkPikge1xuICAgIHRoaXMuJC5yZWxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbmZpcm1cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBhc3NpZ25FZmZlY3RBc3NldCgnU3ByaXRlRWZmZWN0V2F0ZXJGbG93Jyk7XG4gICAgICAgIGF3YWl0IHJlaW1wb3J0QXNzZXQoKTtcbiAgICB9KTtcblxuICAgIGlmICghaXNJbml0KSB7XG4gICAgICAgIC8vIGF3YWl0IGFzc2lnbkVmZmVjdEFzc2V0KCdTcHJpdGVFZmZlY3RXYXRlckZsb3cnKTtcbiAgICAgICAgLy8gYXdhaXQgcmVpbXBvcnRBc3NldCgpO1xuICAgICAgICBpc0luaXQgPSB0cnVlO1xuICAgIH1cbn0iXX0=