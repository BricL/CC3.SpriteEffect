"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowLightSample = void 0;
const cc_1 = require("cc");
const EffectFlowLight_1 = require("../../script/EffectFlowLight");
const { ccclass, property } = cc_1._decorator;
let FlowLightSample = class FlowLightSample extends cc_1.Component {
    constructor() {
        super(...arguments);
        this.effect = null;
        this.lightWidth = null;
        this.soft = null;
        this.offset = null;
        this.rotation = null;
    }
    lightWidthCallback(slider) {
        let value = cc_1.lerp(0.0, 2.0, slider.progress);
        this.effect.lightWidth = value;
        const editBox = slider.node.getComponentInChildren(cc_1.EditBox);
        editBox.string = value.toFixed(2);
    }
    softCallback(slider) {
        let value = cc_1.lerp(0.0, 10.0, slider.progress);
        this.effect.soft = value;
        const editBox = slider.node.getComponentInChildren(cc_1.EditBox);
        editBox.string = value.toFixed(2);
    }
    offsetCallback(slider) {
        let value = cc_1.lerp(-3.0, 3.0, slider.progress);
        this.effect.offset = value;
        const editBox = slider.node.getComponentInChildren(cc_1.EditBox);
        editBox.string = value.toFixed(2);
    }
    rotationCallback(slider) {
        let value = cc_1.lerp(0.0, 6.28, slider.progress);
        this.effect.rotation = value;
        const editBox = slider.node.getComponentInChildren(cc_1.EditBox);
        editBox.string = value.toFixed(2);
    }
    start() {
        // Light Width
        this.lightWidth.progress = this.effect.lightWidth / 2.0;
        const lightWidthLabel = this.lightWidth.getComponentInChildren(cc_1.Label);
        lightWidthLabel.string = `Light Width`;
        const lightWidthEditBox = this.lightWidth.node.getComponentInChildren(cc_1.EditBox);
        lightWidthEditBox.string = this.effect.lightWidth.toFixed(2);
        // Soft
        this.soft.progress = this.effect.soft / 10.0;
        const softLabel = this.soft.getComponentInChildren(cc_1.Label);
        softLabel.string = `Soft`;
        const softEditBox = this.soft.node.getComponentInChildren(cc_1.EditBox);
        softEditBox.string = this.effect.soft.toFixed(2);
        // Offset
        this.offset.progress = ((this.effect.offset / 3.0) + 1.0) / 2.0;
        const offsetLabel = this.offset.getComponentInChildren(cc_1.Label);
        offsetLabel.string = `Offset`;
        const offsetEditBox = this.offset.node.getComponentInChildren(cc_1.EditBox);
        offsetEditBox.string = this.effect.offset.toFixed(2);
        // Rotation
        this.rotation.progress = this.effect.rotation / 6.28;
        const rotationLabel = this.rotation.getComponentInChildren(cc_1.Label);
        rotationLabel.string = `Rotation`;
        const rotationEditBox = this.rotation.node.getComponentInChildren(cc_1.EditBox);
        rotationEditBox.string = this.effect.rotation.toFixed(2);
    }
};
__decorate([
    property({ type: EffectFlowLight_1.EffectFlowLight })
], FlowLightSample.prototype, "effect", void 0);
__decorate([
    property({ type: cc_1.Slider })
], FlowLightSample.prototype, "lightWidth", void 0);
__decorate([
    property({ type: cc_1.Slider })
], FlowLightSample.prototype, "soft", void 0);
__decorate([
    property({ type: cc_1.Slider })
], FlowLightSample.prototype, "offset", void 0);
__decorate([
    property({ type: cc_1.Slider })
], FlowLightSample.prototype, "rotation", void 0);
FlowLightSample = __decorate([
    ccclass('FlowLightSample')
], FlowLightSample);
exports.FlowLightSample = FlowLightSample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxvd0xpZ2h0U2FtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc291cmNlL2Fzc2V0cy9zYW1wbGVzL3NjcmlwdC9GbG93TGlnaHRTYW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQStFO0FBQy9FLGtFQUErRDtBQUUvRCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUd6QyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLGNBQVM7SUFBOUM7O1FBRVcsV0FBTSxHQUFvQixJQUFJLENBQUM7UUFHL0IsZUFBVSxHQUFXLElBQUksQ0FBQztRQUcxQixTQUFJLEdBQVcsSUFBSSxDQUFDO1FBR3BCLFdBQU0sR0FBVyxJQUFJLENBQUM7UUFHdEIsYUFBUSxHQUFXLElBQUksQ0FBQztJQXVFbkMsQ0FBQztJQXJFVSxrQkFBa0IsQ0FBQyxNQUFjO1FBQ3BDLElBQUksS0FBSyxHQUFHLFNBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFL0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFPLENBQUMsQ0FBQztRQUM1RCxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLFlBQVksQ0FBQyxNQUFjO1FBQzlCLElBQUksS0FBSyxHQUFHLFNBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFFekIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxz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Q0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDO1FBRW5ELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsVUFBSyxDQUFDLENBQUM7UUFDbEUsYUFBYSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFFbEMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBTyxDQUFDLENBQUM7UUFDM0UsZUFBZSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNKLENBQUE7QUFuRkc7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsaUNBQWUsRUFBRSxDQUFDOytDQUNFO0FBR3RDO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQU0sRUFBRSxDQUFDO21EQUNNO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQU0sRUFBRSxDQUFDOzZDQUNBO0FBRzNCO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQU0sRUFBRSxDQUFDOytDQUNFO0FBRzdCO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQU0sRUFBRSxDQUFDO2lEQUNJO0FBZHRCLGVBQWU7SUFEM0IsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0dBQ2QsZUFBZSxDQXFGM0I7QUFyRlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb21wb25lbnQsIEVkaXRCb3gsIExhYmVsLCBsZXJwLCBOb2RlLCBTbGlkZXIgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBFZmZlY3RGbG93TGlnaHQgfSBmcm9tICcuLi8uLi9zY3JpcHQvRWZmZWN0Rmxvd0xpZ2h0JztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuQGNjY2xhc3MoJ0Zsb3dMaWdodFNhbXBsZScpXG5leHBvcnQgY2xhc3MgRmxvd0xpZ2h0U2FtcGxlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBFZmZlY3RGbG93TGlnaHQgfSlcbiAgICBwdWJsaWMgZWZmZWN0OiBFZmZlY3RGbG93TGlnaHQgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogU2xpZGVyIH0pXG4gICAgcHVibGljIGxpZ2h0V2lkdGg6IFNsaWRlciA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTbGlkZXIgfSlcbiAgICBwdWJsaWMgc29mdDogU2xpZGVyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNsaWRlciB9KVxuICAgIHB1YmxpYyBvZmZzZXQ6IFNsaWRlciA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBTbGlkZXIgfSlcbiAgICBwdWJsaWMgcm90YXRpb246IFNsaWRlciA9IG51bGw7XG5cbiAgICBwdWJsaWMgbGlnaHRXaWR0aENhbGxiYWNrKHNsaWRlcjogU2xpZGVyKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGxlcnAoMC4wLCAyLjAsIHNsaWRlci5wcm9ncmVzcyk7XG4gICAgICAgIHRoaXMuZWZmZWN0LmxpZ2h0V2lkdGggPSB2YWx1ZTtcblxuICAgICAgICBjb25zdCBlZGl0Qm94ID0gc2xpZGVyLm5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihFZGl0Qm94KTtcbiAgICAgICAgZWRpdEJveC5zdHJpbmcgPSB2YWx1ZS50b0ZpeGVkKDIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzb2Z0Q2FsbGJhY2soc2xpZGVyOiBTbGlkZXIpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gbGVycCgwLjAsIDEwLjAsIHNsaWRlci5wcm9ncmVzcyk7XG4gICAgICAgIHRoaXMuZWZmZWN0LnNvZnQgPSB2YWx1ZTtcblxuICAgICAgICBjb25zdCBlZGl0Qm94ID0gc2xpZGVyLm5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihFZGl0Qm94KTtcbiAgICAgICAgZWRpdEJveC5zdHJpbmcgPSB2YWx1ZS50b0ZpeGVkKDIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvZmZzZXRDYWxsYmFjayhzbGlkZXI6IFNsaWRlcikge1xuICAgICAgICBsZXQgdmFsdWUgPSBsZXJwKC0zLjAsIDMuMCwgc2xpZGVyLnByb2dyZXNzKTtcbiAgICAgICAgdGhpcy5lZmZlY3Qub2Zmc2V0ID0gdmFsdWU7XG5cbiAgICAgICAgY29uc3QgZWRpdEJveCA9IHNsaWRlci5ub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oRWRpdEJveCk7XG4gICAgICAgIGVkaXRCb3guc3RyaW5nID0gdmFsdWUudG9GaXhlZCgyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcm90YXRpb25DYWxsYmFjayhzbGlkZXI6IFNsaWRlcikge1xuICAgICAgICBsZXQgdmFsdWUgPSBsZXJwKDAuMCwgNi4yOCwgc2xpZGVyLnByb2dyZXNzKTtcbiAgICAgICAgdGhpcy5lZmZlY3Qucm90YXRpb24gPSB2YWx1ZTtcblxuICAgICAgICBjb25zdCBlZGl0Qm94ID0gc2xpZGVyLm5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihFZGl0Qm94KTtcbiAgICAgICAgZWRpdEJveC5zdHJpbmcgPSB2YWx1ZS50b0ZpeGVkKDIpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICAvLyBMaWdodCBXaWR0aFxuICAgICAgICB0aGlzLmxpZ2h0V2lkdGgucHJvZ3Jlc3MgPSB0aGlzLmVmZmVjdC5saWdodFdpZHRoLzIuMDtcblxuICAgICAgICBjb25zdCBsaWdodFdpZHRoTGFiZWwgPSB0aGlzLmxpZ2h0V2lkdGguZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihMYWJlbCk7XG4gICAgICAgIGxpZ2h0V2lkdGhMYWJlbC5zdHJpbmcgPSBgTGlnaHQgV2lkdGhgO1xuXG4gICAgICAgIGNvbnN0IGxpZ2h0V2lkdGhFZGl0Qm94ID0gdGhpcy5saWdodFdpZHRoLm5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihFZGl0Qm94KTtcbiAgICAgICAgbGlnaHRXaWR0aEVkaXRCb3guc3RyaW5nID0gdGhpcy5lZmZlY3QubGlnaHRXaWR0aC50b0ZpeGVkKDIpO1xuXG4gICAgICAgIC8vIFNvZnRcbiAgICAgICAgdGhpcy5zb2Z0LnByb2dyZXNzID0gdGhpcy5lZmZlY3Quc29mdC8xMC4wO1xuXG4gICAgICAgIGNvbnN0IHNvZnRMYWJlbCA9IHRoaXMuc29mdC5nZXRDb21wb25lbnRJbkNoaWxkcmVuKExhYmVsKTtcbiAgICAgICAgc29mdExhYmVsLnN0cmluZyA9IGBTb2Z0YDtcblxuICAgICAgICBjb25zdCBzb2Z0RWRpdEJveCA9IHRoaXMuc29mdC5ub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oRWRpdEJveCk7XG4gICAgICAgIHNvZnRFZGl0Qm94LnN0cmluZyA9IHRoaXMuZWZmZWN0LnNvZnQudG9GaXhlZCgyKTtcblxuICAgICAgICAvLyBPZmZzZXRcbiAgICAgICAgdGhpcy5vZmZzZXQucHJvZ3Jlc3MgPSAoKHRoaXMuZWZmZWN0Lm9mZnNldC8zLjApICsgMS4wKSAvIDIuMDtcblxuICAgICAgICBjb25zdCBvZmZzZXRMYWJlbCA9IHRoaXMub2Zmc2V0LmdldENvbXBvbmVudEluQ2hpbGRyZW4oTGFiZWwpO1xuICAgICAgICBvZmZzZXRMYWJlbC5zdHJpbmcgPSBgT2Zmc2V0YDtcblxuICAgICAgICBjb25zdCBvZmZzZXRFZGl0Qm94ID0gdGhpcy5vZmZzZXQubm9kZS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKEVkaXRCb3gpO1xuICAgICAgICBvZmZzZXRFZGl0Qm94LnN0cmluZyA9IHRoaXMuZWZmZWN0Lm9mZnNldC50b0ZpeGVkKDIpO1xuXG4gICAgICAgIC8vIFJvdGF0aW9uXG4gICAgICAgIHRoaXMucm90YXRpb24ucHJvZ3Jlc3MgPSB0aGlzLmVmZmVjdC5yb3RhdGlvbi82LjI4O1xuXG4gICAgICAgIGNvbnN0IHJvdGF0aW9uTGFiZWwgPSB0aGlzLnJvdGF0aW9uLmdldENvbXBvbmVudEluQ2hpbGRyZW4oTGFiZWwpO1xuICAgICAgICByb3RhdGlvbkxhYmVsLnN0cmluZyA9IGBSb3RhdGlvbmA7XG5cbiAgICAgICAgY29uc3Qgcm90YXRpb25FZGl0Qm94ID0gdGhpcy5yb3RhdGlvbi5ub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oRWRpdEJveCk7XG4gICAgICAgIHJvdGF0aW9uRWRpdEJveC5zdHJpbmcgPSB0aGlzLmVmZmVjdC5yb3RhdGlvbi50b0ZpeGVkKDIpO1xuICAgIH1cbn1cblxuIl19