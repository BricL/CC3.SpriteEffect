"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadowSample = void 0;
const cc_1 = require("cc");
const EffectShadow_1 = require("../../script/EffectShadow");
const { ccclass, property } = cc_1._decorator;
let ShadowSample = class ShadowSample extends cc_1.Component {
    constructor() {
        super(...arguments);
        this.effect = null;
        this.xOffset = null;
        this.yOffset = null;
    }
    xOffsetCallback(slider) {
        this.effect.offset = new cc_1.Vec2(cc_1.lerp(-1.0, 1.0, slider.progress), this.effect.offset.y);
        const editBox = slider.node.getComponentInChildren(cc_1.EditBox);
        editBox.string = slider.progress.toFixed(2);
    }
    yOffsetCallback(slider) {
        this.effect.offset = new cc_1.Vec2(this.effect.offset.x, cc_1.lerp(-1.0, 1.0, slider.progress));
        const editBox = slider.node.getComponentInChildren(cc_1.EditBox);
        editBox.string = slider.progress.toFixed(2);
    }
    shadowTypeCallback(event) {
        const node = event.target;
        let shadowType = EffectShadow_1.ShadowType[node.name];
        this.effect.shadowType = shadowType;
    }
    start() {
        // X Offset 
        const xOffsetEditBox = this.xOffset.getComponentInChildren(cc_1.EditBox);
        xOffsetEditBox.string = cc_1.lerp(-1.0, 1.0, this.xOffset.progress).toFixed(2);
        // Y Offset 
        const yOffsetEditBox = this.yOffset.getComponentInChildren(cc_1.EditBox);
        yOffsetEditBox.string = cc_1.lerp(-1.0, 1.0, this.yOffset.progress).toFixed(2);
    }
};
__decorate([
    property({ type: EffectShadow_1.EffectShadow })
], ShadowSample.prototype, "effect", void 0);
__decorate([
    property({ type: cc_1.Slider })
], ShadowSample.prototype, "xOffset", void 0);
__decorate([
    property({ type: cc_1.Slider })
], ShadowSample.prototype, "yOffset", void 0);
ShadowSample = __decorate([
    ccclass('ShadowSample')
], ShadowSample);
exports.ShadowSample = ShadowSample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhZG93U2FtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc291cmNlL2Fzc2V0cy9zYW1wbGVzL3NjcmlwdC9TaGFkb3dTYW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQThFO0FBQzlFLDREQUFxRTtBQUVyRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUd6QyxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsY0FBUztJQUEzQzs7UUFFVyxXQUFNLEdBQWlCLElBQUksQ0FBQztRQUc1QixZQUFPLEdBQVcsSUFBSSxDQUFDO1FBR3ZCLFlBQU8sR0FBVyxJQUFJLENBQUM7SUErQmxDLENBQUM7SUE3QlUsZUFBZSxDQUFDLE1BQWM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxTQUFJLENBQUMsU0FBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEYsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFPLENBQUMsQ0FBQztRQUM1RCxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxlQUFlLENBQUMsTUFBYztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLFNBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsU0FBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUV0RixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFlBQU8sQ0FBQyxDQUFDO1FBQzVELE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLGtCQUFrQixDQUFDLEtBQWlCO1FBQ3ZDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUF5QixDQUFDO1FBQzdDLElBQUksVUFBVSxHQUFlLHlCQUFVLENBQUMsSUFBSSxDQUFDLElBQStCLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDeEMsQ0FBQztJQUVELEtBQUs7UUFDRCxZQUFZO1FBQ1osTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxZQUFPLENBQUMsQ0FBQztRQUNwRSxjQUFjLENBQUMsTUFBTSxHQUFHLFNBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUUsWUFBWTtRQUNaLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsWUFBTyxDQUFDLENBQUM7UUFDcEUsY0FBYyxDQUFDLE1BQU0sR0FBRyxTQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FDSixDQUFBO0FBckNHO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLDJCQUFZLEVBQUUsQ0FBQzs0Q0FDRTtBQUduQztJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFNLEVBQUUsQ0FBQzs2Q0FDRztBQUc5QjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFNLEVBQUUsQ0FBQzs2Q0FDRztBQVJyQixZQUFZO0lBRHhCLE9BQU8sQ0FBQyxjQUFjLENBQUM7R0FDWCxZQUFZLENBdUN4QjtBQXZDWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IsIENvbXBvbmVudCwgRWRpdEJveCwgbGVycCwgTm9kZSwgU2xpZGVyLCBWZWMyIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgRWZmZWN0U2hhZG93LCBTaGFkb3dUeXBlIH0gZnJvbSAnLi4vLi4vc2NyaXB0L0VmZmVjdFNoYWRvdyc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKCdTaGFkb3dTYW1wbGUnKVxuZXhwb3J0IGNsYXNzIFNoYWRvd1NhbXBsZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogRWZmZWN0U2hhZG93IH0pXG4gICAgcHVibGljIGVmZmVjdDogRWZmZWN0U2hhZG93ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNsaWRlciB9KVxuICAgIHB1YmxpYyB4T2Zmc2V0OiBTbGlkZXIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogU2xpZGVyIH0pXG4gICAgcHVibGljIHlPZmZzZXQ6IFNsaWRlciA9IG51bGw7XG5cbiAgICBwdWJsaWMgeE9mZnNldENhbGxiYWNrKHNsaWRlcjogU2xpZGVyKSB7XG4gICAgICAgIHRoaXMuZWZmZWN0Lm9mZnNldCA9IG5ldyBWZWMyKGxlcnAoLTEuMCwgMS4wLCBzbGlkZXIucHJvZ3Jlc3MpLCB0aGlzLmVmZmVjdC5vZmZzZXQueSk7XG5cbiAgICAgICAgY29uc3QgZWRpdEJveCA9IHNsaWRlci5ub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oRWRpdEJveCk7XG4gICAgICAgIGVkaXRCb3guc3RyaW5nID0gc2xpZGVyLnByb2dyZXNzLnRvRml4ZWQoMik7XG4gICAgfVxuXG4gICAgcHVibGljIHlPZmZzZXRDYWxsYmFjayhzbGlkZXI6IFNsaWRlcikge1xuICAgICAgICB0aGlzLmVmZmVjdC5vZmZzZXQgPSBuZXcgVmVjMih0aGlzLmVmZmVjdC5vZmZzZXQueCwgbGVycCgtMS4wLCAxLjAsIHNsaWRlci5wcm9ncmVzcykpO1xuXG4gICAgICAgIGNvbnN0IGVkaXRCb3ggPSBzbGlkZXIubm9kZS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKEVkaXRCb3gpO1xuICAgICAgICBlZGl0Qm94LnN0cmluZyA9IHNsaWRlci5wcm9ncmVzcy50b0ZpeGVkKDIpO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgc2hhZG93VHlwZUNhbGxiYWNrKGV2ZW50OiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBldmVudC50YXJnZXQgYXMgdW5rbm93biBhcyBOb2RlO1xuICAgICAgICBsZXQgc2hhZG93VHlwZTogU2hhZG93VHlwZSA9IFNoYWRvd1R5cGVbbm9kZS5uYW1lIGFzIGtleW9mIHR5cGVvZiBTaGFkb3dUeXBlXTtcbiAgICAgICAgdGhpcy5lZmZlY3Quc2hhZG93VHlwZSA9IHNoYWRvd1R5cGU7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIC8vIFggT2Zmc2V0IFxuICAgICAgICBjb25zdCB4T2Zmc2V0RWRpdEJveCA9IHRoaXMueE9mZnNldC5nZXRDb21wb25lbnRJbkNoaWxkcmVuKEVkaXRCb3gpO1xuICAgICAgICB4T2Zmc2V0RWRpdEJveC5zdHJpbmcgPSBsZXJwKC0xLjAsIDEuMCwgdGhpcy54T2Zmc2V0LnByb2dyZXNzKS50b0ZpeGVkKDIpO1xuXG4gICAgICAgIC8vIFkgT2Zmc2V0IFxuICAgICAgICBjb25zdCB5T2Zmc2V0RWRpdEJveCA9IHRoaXMueU9mZnNldC5nZXRDb21wb25lbnRJbkNoaWxkcmVuKEVkaXRCb3gpO1xuICAgICAgICB5T2Zmc2V0RWRpdEJveC5zdHJpbmcgPSBsZXJwKC0xLjAsIDEuMCwgdGhpcy55T2Zmc2V0LnByb2dyZXNzKS50b0ZpeGVkKDIpO1xuICAgIH1cbn1cblxuIl19