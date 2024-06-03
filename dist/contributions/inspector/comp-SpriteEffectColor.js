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

    <ui-prop type="dump" class="toneMode"></ui-prop>
    <ui-prop type="dump" class="toneFactor"></ui-prop>
    <ui-prop type="dump" class="colorMode"></ui-prop>
    <ui-prop type="dump" class="colorFactor"></ui-prop>
    <ui-prop type="dump" class="blurMode"></ui-prop>
    <ui-prop type="dump" class="blurFactor"></ui-prop>
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
    toneMode: '.toneMode',
    toneFactor: '.toneFactor',
    colorMode: '.colorMode',
    colorFactor: '.colorFactor',
    blurMode: '.blurMode',
    blurFactor: '.blurFactor',
    reload: '.reload',
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
    this.$.toneMode.render(dump.value.toneMode);
    this.$.toneFactor.render(dump.value.toneFactor);
    this.$.colorMode.render(dump.value.colorMode);
    this.$.colorFactor.render(dump.value.colorFactor);
    this.$.blurMode.render(dump.value.blurMode);
    this.$.blurFactor.render(dump.value.blurFactor);
}
exports.update = update;
async function ready() {
    this.$.reload.addEventListener("confirm", async () => {
        const reloadTsFile_000 = await Editor.Message.request("asset-db", "reimport-asset", "853e8fbf-9769-49a8-b2d2-0016390b6953");
        // const effectCompName = 'SpriteEffectColor';
        // const uuids = Editor.Selection.getSelected('node');
        // const node = await Editor.Message.request('scene', 'query-node', uuids[0]);
        // if (!node) {
        //     console.warn(`未選中節點`);
        //     return;
        // }
        // const index = node.__comps__.findIndex((v: any) => v.type === effectCompName);
        // if (index === -1) {
        //     console.warn(`節點未掛載${effectCompName}組件`);
        //     return;
        // }
        // const effectFileName = effectCompName.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
        // const url = `db://assets/sprite_effect/effect/${effectFileName}.effect`;
        // console.log(`url: ${url}`);
        // const res = await Editor.Message.request('asset-db', 'query-asset-info', url);
        // await Editor.Message.request("asset-db", "reimport-asset", res!.uuid);
    });
    await util_1.autoAssignEffectAsset('SpriteEffectColor');
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcC1TcHJpdGVFZmZlY3RDb2xvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9jb250cmlidXRpb25zL2luc3BlY3Rvci9jb21wLVNwcml0ZUVmZmVjdENvbG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7O0FBRWIscUNBQTJFO0FBSTlELFFBQUEsUUFBUSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXVCdkIsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHO0lBQ2hCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFdBQVcsRUFBRSxjQUFjO0lBQzNCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLElBQUksRUFBRSxPQUFPO0lBQ2IsSUFBSSxFQUFFLE9BQU87SUFDYixRQUFRLEVBQUUsV0FBVztJQUNyQixVQUFVLEVBQUUsYUFBYTtJQUN6QixTQUFTLEVBQUUsWUFBWTtJQUN2QixTQUFTLEVBQUUsWUFBWTtDQUMxQixDQUFBO0FBRUQsTUFBTSxXQUFXLEdBQUc7SUFDaEIsV0FBVyxFQUFFLGNBQWM7SUFDM0IsUUFBUSxFQUFFLFdBQVc7SUFDckIsUUFBUSxFQUFFLFdBQVc7SUFDckIsVUFBVSxFQUFFLGFBQWE7SUFDekIsU0FBUyxFQUFFLFlBQVk7SUFDdkIsV0FBVyxFQUFFLGNBQWM7SUFDM0IsUUFBUSxFQUFFLFdBQVc7SUFDckIsVUFBVSxFQUFFLGFBQWE7SUFDekIsTUFBTSxFQUFFLFNBQVM7Q0FDcEIsQ0FBQTtBQUVZLFFBQUEsQ0FBQyxtQ0FBUSxXQUFXLEdBQUssV0FBVyxFQUFHO0FBRXBELFNBQWdCLE1BQU0sQ0FBMkIsSUFBUztJQUN0RCx3Q0FBd0M7SUFDeEMsbUNBQW1DO0lBQ25DLHNCQUFzQjtJQUV0QixlQUFlO0lBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFOUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO1FBQzVCLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDekM7U0FBTTtRQUNILElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDMUM7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7UUFDNUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNoQyxtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO0tBQ0o7U0FBTTtRQUNILElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDL0M7SUFFRCxlQUFlO0lBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7UUFDNUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUM7SUFFRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBdkRELHdCQXVEQztBQUVNLEtBQUssVUFBVSxLQUFLO0lBQ3ZCLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNqRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFFLHNDQUFzQyxDQUFDLENBQUM7UUFFNUgsOENBQThDO1FBQzlDLHNEQUFzRDtRQUN0RCw4RUFBOEU7UUFDOUUsZUFBZTtRQUNmLDZCQUE2QjtRQUM3QixjQUFjO1FBQ2QsSUFBSTtRQUVKLGlGQUFpRjtRQUNqRixzQkFBc0I7UUFDdEIsZ0RBQWdEO1FBQ2hELGNBQWM7UUFDZCxJQUFJO1FBRUosMkZBQTJGO1FBQzNGLDJFQUEyRTtRQUMzRSw4QkFBOEI7UUFFOUIsaUZBQWlGO1FBQ2pGLHlFQUF5RTtJQUM3RSxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sNEJBQXFCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBM0JELHNCQTJCQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgYXV0b0Fzc2lnbkVmZmVjdEFzc2V0LCBhdXRvQXNzaWduVGV4dHVyZUFzc2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxcIjtcblxudHlwZSBTZWxlY3RvcjwkPiA9IHsgJDogUmVjb3JkPGtleW9mICQsIGFueSB8IG51bGw+IH1cblxuZXhwb3J0IGNvbnN0IHRlbXBsYXRlID0gYFxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNwcml0ZUF0bGFzXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNwcml0ZUZyYW1lXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInNpemVNb2RlXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cInR5cGVcIj48L3VpLXByb3A+XG48dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwidHJpbVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmaWxsVHlwZVwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmaWxsQ2VudGVyXCI+PC91aS1wcm9wPlxuPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImZpbGxTdGFydFwiPjwvdWktcHJvcD5cbjx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJmaWxsUmFuZ2VcIj48L3VpLXByb3A+XG5cbjx1aS1zZWN0aW9uIGNsYXNzPVwiY29uZmlnXCIgaGVhZGVyPVwiRWZmZWN0IFByb3BzXCIgZXhwYW5kPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJlZmZlY3RDb2xvclwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiaXMyRGluM0RcIj48L3VpLXByb3A+XG4gICAgPHVpLWJ1dHRvbiBjbGFzcz1cInJlbG9hZFwiIHN0eWxlPVwiaGVpZ2h0OjI0cHg7bWFyZ2luOjE2cHggMDtcIj5SZWxvYWQgQXNzZXQ8L3VpLWJ1dHRvbj5cblxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJ0b25lTW9kZVwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwidG9uZUZhY3RvclwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiY29sb3JNb2RlXCI+PC91aS1wcm9wPlxuICAgIDx1aS1wcm9wIHR5cGU9XCJkdW1wXCIgY2xhc3M9XCJjb2xvckZhY3RvclwiPjwvdWktcHJvcD5cbiAgICA8dWktcHJvcCB0eXBlPVwiZHVtcFwiIGNsYXNzPVwiYmx1ck1vZGVcIj48L3VpLXByb3A+XG4gICAgPHVpLXByb3AgdHlwZT1cImR1bXBcIiBjbGFzcz1cImJsdXJGYWN0b3JcIj48L3VpLXByb3A+XG48L3VpLXNlY3Rpb24+XG5gO1xuXG5jb25zdCBzcHJpdGVDb25zdCA9IHtcbiAgICBzcHJpdGVBdGxhczogJy5zcHJpdGVBdGxhcycsXG4gICAgc3ByaXRlRnJhbWU6ICcuc3ByaXRlRnJhbWUnLFxuICAgIHNpemVNb2RlOiAnLnNpemVNb2RlJyxcbiAgICB0eXBlOiAnLnR5cGUnLFxuICAgIHRyaW06ICcudHJpbScsXG4gICAgZmlsbFR5cGU6ICcuZmlsbFR5cGUnLFxuICAgIGZpbGxDZW50ZXI6ICcuZmlsbENlbnRlcicsXG4gICAgZmlsbFN0YXJ0OiAnLmZpbGxTdGFydCcsXG4gICAgZmlsbFJhbmdlOiAnLmZpbGxSYW5nZScsXG59XG5cbmNvbnN0IGVmZmVjdENvbnN0ID0ge1xuICAgIGVmZmVjdENvbG9yOiAnLmVmZmVjdENvbG9yJyxcbiAgICBpczJEaW4zRDogJy5pczJEaW4zRCcsXG4gICAgdG9uZU1vZGU6ICcudG9uZU1vZGUnLFxuICAgIHRvbmVGYWN0b3I6ICcudG9uZUZhY3RvcicsXG4gICAgY29sb3JNb2RlOiAnLmNvbG9yTW9kZScsXG4gICAgY29sb3JGYWN0b3I6ICcuY29sb3JGYWN0b3InLFxuICAgIGJsdXJNb2RlOiAnLmJsdXJNb2RlJyxcbiAgICBibHVyRmFjdG9yOiAnLmJsdXJGYWN0b3InLFxuICAgIHJlbG9hZDogJy5yZWxvYWQnLFxufVxuXG5leHBvcnQgY29uc3QgJCA9IHsgLi4uc3ByaXRlQ29uc3QsIC4uLmVmZmVjdENvbnN0IH07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUodGhpczogU2VsZWN0b3I8dHlwZW9mICQ+LCBkdW1wOiBhbnkpIHtcbiAgICAvLyDkvb/nlKggdWktcG9ycCDoh6rliqjmuLLmn5PvvIzorr7nva4gcHJvcCDnmoQgdHlwZSDkuLogZHVtcFxuICAgIC8vIHJlbmRlciDkvKDlhaXkuIDkuKogZHVtcCDmlbDmja7vvIzog73lpJ/oh6rliqjmuLLmn5Plh7rlr7nlupTnmoTnlYzpnaJcbiAgICAvLyDoh6rliqjmuLLmn5PnmoTnlYzpnaLkv67mlLnlkI7vvIzog73lpJ/oh6rliqjmj5DkuqTmlbDmja5cblxuICAgIC8vIHNwcml0ZSBwcm9wc1xuICAgIHRoaXMuJC5zcHJpdGVBdGxhcy5yZW5kZXIoZHVtcC52YWx1ZS5zcHJpdGVBdGxhcyk7XG4gICAgdGhpcy4kLnNwcml0ZUZyYW1lLnJlbmRlcihkdW1wLnZhbHVlLnNwcml0ZUZyYW1lKTtcbiAgICB0aGlzLiQuc2l6ZU1vZGUucmVuZGVyKGR1bXAudmFsdWUuc2l6ZU1vZGUpO1xuICAgIHRoaXMuJC50eXBlLnJlbmRlcihkdW1wLnZhbHVlLnR5cGUpO1xuICAgIHRoaXMuJC50cmltLnJlbmRlcihkdW1wLnZhbHVlLnRyaW0pO1xuICAgIHRoaXMuJC5maWxsVHlwZS5yZW5kZXIoZHVtcC52YWx1ZS5maWxsVHlwZSk7XG4gICAgdGhpcy4kLmZpbGxDZW50ZXIucmVuZGVyKGR1bXAudmFsdWUuZmlsbENlbnRlcik7XG4gICAgdGhpcy4kLmZpbGxTdGFydC5yZW5kZXIoZHVtcC52YWx1ZS5maWxsU3RhcnQpO1xuICAgIHRoaXMuJC5maWxsUmFuZ2UucmVuZGVyKGR1bXAudmFsdWUuZmlsbFJhbmdlKTtcblxuICAgIGlmIChkdW1wLnZhbHVlLnR5cGUudmFsdWUgPT0gMCkge1xuICAgICAgICAvLyB0cmltIG9ubHkgc2hvdyB3aGVuIHR5cGUgaXMgc2ltcGxlXG4gICAgICAgIHRoaXMuJC50cmltLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kLnRyaW0uc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgfVxuXG4gICAgaWYgKGR1bXAudmFsdWUudHlwZS52YWx1ZSA9PSAzKSB7XG4gICAgICAgIHRoaXMuJC5maWxsVHlwZS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLiQuZmlsbENlbnRlci5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLiQuZmlsbFN0YXJ0LnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJC5maWxsUmFuZ2UucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcblxuICAgICAgICBpZiAoZHVtcC52YWx1ZS5maWxsVHlwZS52YWx1ZSA9PSAyKSB7XG4gICAgICAgICAgICAvLyBmaWxsQ2VudGVyIG9ubHkgZWRpdGFibGUgd2hlbiBmaWxsVHlwZSBpcyByYWRpYWxcbiAgICAgICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAnJyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiQuZmlsbFR5cGUuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgICAgIHRoaXMuJC5maWxsQ2VudGVyLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgICAgICB0aGlzLiQuZmlsbFN0YXJ0LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgICAgICB0aGlzLiQuZmlsbFJhbmdlLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xuICAgIH1cblxuICAgIC8vIGVmZmVjdCBwcm9wc1xuICAgIHRoaXMuJC5lZmZlY3RDb2xvci5yZW5kZXIoZHVtcC52YWx1ZS5lZmZlY3RDb2xvcik7XG4gICAgdGhpcy4kLmlzMkRpbjNELnJlbmRlcihkdW1wLnZhbHVlLmlzMkRpbjNEKTtcbiAgICBpZiAodHlwZW9mIHRoaXMuJC5yZWxvYWQucmVuZGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhpcy4kLnJlbG9hZC5yZW5kZXIoZHVtcC52YWx1ZS5sYWJlbCk7XG4gICAgfVxuXG4gICAgdGhpcy4kLnRvbmVNb2RlLnJlbmRlcihkdW1wLnZhbHVlLnRvbmVNb2RlKTtcbiAgICB0aGlzLiQudG9uZUZhY3Rvci5yZW5kZXIoZHVtcC52YWx1ZS50b25lRmFjdG9yKTtcbiAgICB0aGlzLiQuY29sb3JNb2RlLnJlbmRlcihkdW1wLnZhbHVlLmNvbG9yTW9kZSk7XG4gICAgdGhpcy4kLmNvbG9yRmFjdG9yLnJlbmRlcihkdW1wLnZhbHVlLmNvbG9yRmFjdG9yKTtcbiAgICB0aGlzLiQuYmx1ck1vZGUucmVuZGVyKGR1bXAudmFsdWUuYmx1ck1vZGUpO1xuICAgIHRoaXMuJC5ibHVyRmFjdG9yLnJlbmRlcihkdW1wLnZhbHVlLmJsdXJGYWN0b3IpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZHkodGhpczogU2VsZWN0b3I8dHlwZW9mICQ+KSB7XG4gICAgdGhpcy4kLnJlbG9hZC5hZGRFdmVudExpc3RlbmVyKFwiY29uZmlybVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbG9hZFRzRmlsZV8wMDAgPSBhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KFwiYXNzZXQtZGJcIiwgXCJyZWltcG9ydC1hc3NldFwiLCBcIjg1M2U4ZmJmLTk3NjktNDlhOC1iMmQyLTAwMTYzOTBiNjk1M1wiKTtcblxuICAgICAgICAvLyBjb25zdCBlZmZlY3RDb21wTmFtZSA9ICdTcHJpdGVFZmZlY3RDb2xvcic7XG4gICAgICAgIC8vIGNvbnN0IHV1aWRzID0gRWRpdG9yLlNlbGVjdGlvbi5nZXRTZWxlY3RlZCgnbm9kZScpO1xuICAgICAgICAvLyBjb25zdCBub2RlID0gYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAncXVlcnktbm9kZScsIHV1aWRzWzBdKTtcbiAgICAgICAgLy8gaWYgKCFub2RlKSB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLndhcm4oYOacqumBuOS4reevgOm7nmApO1xuICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gY29uc3QgaW5kZXggPSBub2RlLl9fY29tcHNfXy5maW5kSW5kZXgoKHY6IGFueSkgPT4gdi50eXBlID09PSBlZmZlY3RDb21wTmFtZSk7XG4gICAgICAgIC8vIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUud2Fybihg56+A6bue5pyq5o6b6LyJJHtlZmZlY3RDb21wTmFtZX3ntYTku7ZgKTtcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGNvbnN0IGVmZmVjdEZpbGVOYW1lID0gZWZmZWN0Q29tcE5hbWUucmVwbGFjZSgvKFtBLVpdKS9nLCAnXyQxJykudG9Mb3dlckNhc2UoKS5zbGljZSgxKTtcbiAgICAgICAgLy8gY29uc3QgdXJsID0gYGRiOi8vYXNzZXRzL3Nwcml0ZV9lZmZlY3QvZWZmZWN0LyR7ZWZmZWN0RmlsZU5hbWV9LmVmZmVjdGA7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGB1cmw6ICR7dXJsfWApO1xuXG4gICAgICAgIC8vIGNvbnN0IHJlcyA9IGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ2Fzc2V0LWRiJywgJ3F1ZXJ5LWFzc2V0LWluZm8nLCB1cmwpO1xuICAgICAgICAvLyBhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KFwiYXNzZXQtZGJcIiwgXCJyZWltcG9ydC1hc3NldFwiLCByZXMhLnV1aWQpO1xuICAgIH0pO1xuXG4gICAgYXdhaXQgYXV0b0Fzc2lnbkVmZmVjdEFzc2V0KCdTcHJpdGVFZmZlY3RDb2xvcicpO1xufSJdfQ==