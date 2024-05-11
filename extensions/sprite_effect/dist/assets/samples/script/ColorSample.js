"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorSample = void 0;
const cc_1 = require("cc");
const EffectColor_1 = require("../../script/EffectColor");
const { ccclass, property } = cc_1._decorator;
let ColorSample = class ColorSample extends cc_1.Component {
    constructor() {
        super(...arguments);
        this.effect = null;
        this.toneSlider = null;
        this.colorSlider = null;
        this.blurSlider = null;
    }
    toneModeCallback(event) {
        const node = event.target;
        let toneMode = EffectColor_1.ToneMode[node.name];
        this.effect.toneMode = toneMode;
    }
    colorModeCallback(event) {
        const node = event.target;
        let colorMode = EffectColor_1.ColorMode[node.name];
        this.effect.colorMode = colorMode;
    }
    blurModeCallback(event) {
        const node = event.target;
        let blurMode = EffectColor_1.BlurMode[node.name];
        this.effect.blurMode = blurMode;
    }
    toneFactorCallback(slider) {
        let toneFactor = slider.progress;
        this.effect.toneFactor = toneFactor;
        const label = slider.getComponentInChildren(cc_1.Label);
        label.string = `Tone Factor`;
        const editBox = slider.node.getComponentInChildren(cc_1.EditBox);
        editBox.string = toneFactor.toFixed(2);
    }
    colorFactorCallback(slider) {
        let colorFactor = slider.progress;
        this.effect.colorFactor = colorFactor;
        const label = slider.getComponentInChildren(cc_1.Label);
        label.string = `Color Factor`;
        const editBox = slider.node.getComponentInChildren(cc_1.EditBox);
        editBox.string = colorFactor.toFixed(2);
    }
    blurFactorCallback(slider) {
        let blurFactor = slider.progress;
        this.effect.blurFactor = blurFactor;
        const label = slider.getComponentInChildren(cc_1.Label);
        label.string = `Blur Factor`;
        const editBox = slider.node.getComponentInChildren(cc_1.EditBox);
        editBox.string = blurFactor.toFixed(2);
    }
    start() {
        this.toneSlider.getComponentInChildren(cc_1.Label).string = `Tone Factor`;
        this.colorSlider.getComponentInChildren(cc_1.Label).string = `Color Factor`;
        this.blurSlider.getComponentInChildren(cc_1.Label).string = `Blur Factor`;
        this.effect.toneFactor = this.toneSlider.progress;
        this.effect.colorFactor = this.colorSlider.progress;
        this.effect.blurFactor = this.blurSlider.progress;
    }
};
__decorate([
    property({ type: EffectColor_1.EffectColor })
], ColorSample.prototype, "effect", void 0);
__decorate([
    property({ type: cc_1.Slider })
], ColorSample.prototype, "toneSlider", void 0);
__decorate([
    property({ type: cc_1.Slider })
], ColorSample.prototype, "colorSlider", void 0);
__decorate([
    property({ type: cc_1.Slider })
], ColorSample.prototype, "blurSlider", void 0);
ColorSample = __decorate([
    ccclass('ColorSample')
], ColorSample);
exports.ColorSample = ColorSample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sb3JTYW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zb3VyY2UvYXNzZXRzL3NhbXBsZXMvc2NyaXB0L0NvbG9yU2FtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUF5RTtBQUN6RSwwREFBc0Y7QUFFdEYsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxlQUFVLENBQUM7QUFHekMsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLGNBQVM7SUFBMUM7O1FBRVcsV0FBTSxHQUFnQixJQUFJLENBQUM7UUFHM0IsZUFBVSxHQUFXLElBQUksQ0FBQztRQUcxQixnQkFBVyxHQUFXLElBQUksQ0FBQztRQUczQixlQUFVLEdBQVcsSUFBSSxDQUFDO0lBOERyQyxDQUFDO0lBNURVLGdCQUFnQixDQUFDLEtBQWlCO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUF5QixDQUFDO1FBQzdDLElBQUksUUFBUSxHQUFhLHNCQUFRLENBQUMsSUFBSSxDQUFDLElBQTZCLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVNLGlCQUFpQixDQUFDLEtBQWlCO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUF5QixDQUFDO1FBQzdDLElBQUksU0FBUyxHQUFjLHVCQUFTLENBQUMsSUFBSSxDQUFDLElBQThCLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDdEMsQ0FBQztJQUVNLGdCQUFnQixDQUFDLEtBQWlCO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUF5QixDQUFDO1FBQzdDLElBQUksUUFBUSxHQUFhLHNCQUFRLENBQUMsSUFBSSxDQUFDLElBQTZCLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsTUFB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RVksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb21wb25lbnQsIE5vZGUsIFNsaWRlciwgTGFiZWwsIEVkaXRCb3ggfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBCbHVyTW9kZSwgQ29sb3JNb2RlLCBFZmZlY3RDb2xvciwgVG9uZU1vZGUgfSBmcm9tICcuLi8uLi9zY3JpcHQvRWZmZWN0Q29sb3InO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xuXG5AY2NjbGFzcygnQ29sb3JTYW1wbGUnKVxuZXhwb3J0IGNsYXNzIENvbG9yU2FtcGxlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBFZmZlY3RDb2xvciB9KVxuICAgIHB1YmxpYyBlZmZlY3Q6IEVmZmVjdENvbG9yID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNsaWRlciB9KVxuICAgIHB1YmxpYyB0b25lU2xpZGVyOiBTbGlkZXIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogU2xpZGVyIH0pXG4gICAgcHVibGljIGNvbG9yU2xpZGVyOiBTbGlkZXIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogU2xpZGVyIH0pXG4gICAgcHVibGljIGJsdXJTbGlkZXI6IFNsaWRlciA9IG51bGw7XG5cbiAgICBwdWJsaWMgdG9uZU1vZGVDYWxsYmFjayhldmVudDogVG91Y2hFdmVudCkge1xuICAgICAgICBjb25zdCBub2RlID0gZXZlbnQudGFyZ2V0IGFzIHVua25vd24gYXMgTm9kZTtcbiAgICAgICAgbGV0IHRvbmVNb2RlOiBUb25lTW9kZSA9IFRvbmVNb2RlW25vZGUubmFtZSBhcyBrZXlvZiB0eXBlb2YgVG9uZU1vZGVdO1xuICAgICAgICB0aGlzLmVmZmVjdC50b25lTW9kZSA9IHRvbmVNb2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb2xvck1vZGVDYWxsYmFjayhldmVudDogVG91Y2hFdmVudCkge1xuICAgICAgICBjb25zdCBub2RlID0gZXZlbnQudGFyZ2V0IGFzIHVua25vd24gYXMgTm9kZTtcbiAgICAgICAgbGV0IGNvbG9yTW9kZTogQ29sb3JNb2RlID0gQ29sb3JNb2RlW25vZGUubmFtZSBhcyBrZXlvZiB0eXBlb2YgQ29sb3JNb2RlXTtcbiAgICAgICAgdGhpcy5lZmZlY3QuY29sb3JNb2RlID0gY29sb3JNb2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBibHVyTW9kZUNhbGxiYWNrKGV2ZW50OiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBldmVudC50YXJnZXQgYXMgdW5rbm93biBhcyBOb2RlO1xuICAgICAgICBsZXQgYmx1ck1vZGU6IEJsdXJNb2RlID0gQmx1ck1vZGVbbm9kZS5uYW1lIGFzIGtleW9mIHR5cGVvZiBCbHVyTW9kZV07XG4gICAgICAgIHRoaXMuZWZmZWN0LmJsdXJNb2RlID0gYmx1ck1vZGU7XG4gICAgfVxuXG4gICAgcHVibGljIHRvbmVGYWN0b3JDYWxsYmFjayhzbGlkZXI6IFNsaWRlcikge1xuICAgICAgICBsZXQgdG9uZUZhY3RvciA9IHNsaWRlci5wcm9ncmVzcztcbiAgICAgICAgdGhpcy5lZmZlY3QudG9uZUZhY3RvciA9IHRvbmVGYWN0b3I7XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSBzbGlkZXIuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihMYWJlbCk7XG4gICAgICAgIGxhYmVsLnN0cmluZyA9IGBUb25lIEZhY3RvcmA7XG5cbiAgICAgICAgY29uc3QgZWRpdEJveCA9IHNsaWRlci5ub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oRWRpdEJveCk7XG4gICAgICAgIGVkaXRCb3guc3RyaW5nID0gdG9uZUZhY3Rvci50b0ZpeGVkKDIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb2xvckZhY3RvckNhbGxiYWNrKHNsaWRlcjogU2xpZGVyKSB7XG4gICAgICAgIGxldCBjb2xvckZhY3RvciA9IHNsaWRlci5wcm9ncmVzcztcbiAgICAgICAgdGhpcy5lZmZlY3QuY29sb3JGYWN0b3IgPSBjb2xvckZhY3RvcjtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IHNsaWRlci5nZXRDb21wb25lbnRJbkNoaWxkcmVuKExhYmVsKTtcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gYENvbG9yIEZhY3RvcmA7XG5cbiAgICAgICAgY29uc3QgZWRpdEJveCA9IHNsaWRlci5ub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oRWRpdEJveCk7XG4gICAgICAgIGVkaXRCb3guc3RyaW5nID0gY29sb3JGYWN0b3IudG9GaXhlZCgyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYmx1ckZhY3RvckNhbGxiYWNrKHNsaWRlcjogU2xpZGVyKSB7XG4gICAgICAgIGxldCBibHVyRmFjdG9yID0gc2xpZGVyLnByb2dyZXNzO1xuICAgICAgICB0aGlzLmVmZmVjdC5ibHVyRmFjdG9yID0gYmx1ckZhY3RvcjtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IHNsaWRlci5nZXRDb21wb25lbnRJbkNoaWxkcmVuKExhYmVsKTtcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gYEJsdXIgRmFjdG9yYDtcblxuICAgICAgICBjb25zdCBlZGl0Qm94ID0gc2xpZGVyLm5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihFZGl0Qm94KTtcbiAgICAgICAgZWRpdEJveC5zdHJpbmcgPSBibHVyRmFjdG9yLnRvRml4ZWQoMik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvbmVTbGlkZXIuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihMYWJlbCkuc3RyaW5nID0gYFRvbmUgRmFjdG9yYDtcbiAgICAgICAgdGhpcy5jb2xvclNsaWRlci5nZXRDb21wb25lbnRJbkNoaWxkcmVuKExhYmVsKS5zdHJpbmcgPSBgQ29sb3IgRmFjdG9yYDtcbiAgICAgICAgdGhpcy5ibHVyU2xpZGVyLmdldENvbXBvbmVudEluQ2hpbGRyZW4oTGFiZWwpLnN0cmluZyA9IGBCbHVyIEZhY3RvcmA7XG5cbiAgICAgICAgdGhpcy5lZmZlY3QudG9uZUZhY3RvciA9IHRoaXMudG9uZVNsaWRlci5wcm9ncmVzcztcbiAgICAgICAgdGhpcy5lZmZlY3QuY29sb3JGYWN0b3IgPSB0aGlzLmNvbG9yU2xpZGVyLnByb2dyZXNzO1xuICAgICAgICB0aGlzLmVmZmVjdC5ibHVyRmFjdG9yID0gdGhpcy5ibHVyU2xpZGVyLnByb2dyZXNzO1xuICAgIH1cbn1cblxuIl19