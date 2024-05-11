"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GaussianBlurSample = void 0;
const cc_1 = require("cc");
const EffectGaussianBlur_1 = require("../../script/EffectGaussianBlur");
const { ccclass, property } = cc_1._decorator;
let GaussianBlurSample = class GaussianBlurSample extends cc_1.Component {
    constructor() {
        super(...arguments);
        this.effect = null;
        this.blur = null;
    }
    blurCallback(slider) {
        this.effect.blur = cc_1.lerp(0.0, 1.0, slider.progress);
        const editBox = slider.node.getComponentInChildren(cc_1.EditBox);
        editBox.string = slider.progress.toFixed(2);
    }
    start() {
        this.blur.progress = this.effect.blur;
        const speedLabel = this.blur.getComponentInChildren(cc_1.EditBox);
        speedLabel.string = `Blur`;
        const speedEditBox = this.blur.getComponentInChildren(cc_1.EditBox);
        speedEditBox.string = this.effect.blur.toFixed(2);
    }
};
__decorate([
    property({ type: EffectGaussianBlur_1.EffectGaussianBlur })
], GaussianBlurSample.prototype, "effect", void 0);
__decorate([
    property({ type: cc_1.Slider })
], GaussianBlurSample.prototype, "blur", void 0);
GaussianBlurSample = __decorate([
    ccclass('GaussianBlurSample')
], GaussianBlurSample);
exports.GaussianBlurSample = GaussianBlurSample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2F1c3NpYW5CbHVyU2FtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc291cmNlL2Fzc2V0cy9zYW1wbGVzL3NjcmlwdC9HYXVzc2lhbkJsdXJTYW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQXdFO0FBQ3hFLHdFQUFxRTtBQUVyRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUd6QyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLGNBQVM7SUFBakQ7O1FBRVcsV0FBTSxHQUF1QixJQUFJLENBQUM7UUFHbEMsU0FBSSxHQUFXLElBQUksQ0FBQztJQWtCL0IsQ0FBQztJQWhCVSxZQUFZLENBQUMsTUFBYztRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxTQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbkQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFPLENBQUMsQ0FBQztRQUM1RCxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxLQUFLO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFdEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFPLENBQUMsQ0FBQztRQUM3RCxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUUzQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFlBQU8sQ0FBQyxDQUFDO1FBQy9ELFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDSixDQUFBO0FBckJHO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLHVDQUFrQixFQUFFLENBQUM7a0RBQ0U7QUFHekM7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBTSxFQUFFLENBQUM7Z0RBQ0E7QUFMbEIsa0JBQWtCO0lBRDlCLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztHQUNqQixrQkFBa0IsQ0F1QjlCO0FBdkJZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IsIENvbXBvbmVudCwgRWRpdEJveCwgbGVycCwgTm9kZSwgU2xpZGVyIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgRWZmZWN0R2F1c3NpYW5CbHVyIH0gZnJvbSAnLi4vLi4vc2NyaXB0L0VmZmVjdEdhdXNzaWFuQmx1cic7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKCdHYXVzc2lhbkJsdXJTYW1wbGUnKVxuZXhwb3J0IGNsYXNzIEdhdXNzaWFuQmx1clNhbXBsZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogRWZmZWN0R2F1c3NpYW5CbHVyIH0pXG4gICAgcHVibGljIGVmZmVjdDogRWZmZWN0R2F1c3NpYW5CbHVyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNsaWRlciB9KVxuICAgIHB1YmxpYyBibHVyOiBTbGlkZXIgPSBudWxsO1xuXG4gICAgcHVibGljIGJsdXJDYWxsYmFjayhzbGlkZXI6IFNsaWRlcikge1xuICAgICAgICB0aGlzLmVmZmVjdC5ibHVyID0gbGVycCgwLjAsIDEuMCwgc2xpZGVyLnByb2dyZXNzKTtcblxuICAgICAgICBjb25zdCBlZGl0Qm94ID0gc2xpZGVyLm5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihFZGl0Qm94KTtcbiAgICAgICAgZWRpdEJveC5zdHJpbmcgPSBzbGlkZXIucHJvZ3Jlc3MudG9GaXhlZCgyKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICB0aGlzLmJsdXIucHJvZ3Jlc3MgPSB0aGlzLmVmZmVjdC5ibHVyO1xuXG4gICAgICAgY29uc3Qgc3BlZWRMYWJlbCA9IHRoaXMuYmx1ci5nZXRDb21wb25lbnRJbkNoaWxkcmVuKEVkaXRCb3gpO1xuICAgICAgIHNwZWVkTGFiZWwuc3RyaW5nID0gYEJsdXJgO1xuXG4gICAgICAgY29uc3Qgc3BlZWRFZGl0Qm94ID0gdGhpcy5ibHVyLmdldENvbXBvbmVudEluQ2hpbGRyZW4oRWRpdEJveCk7XG4gICAgICAgc3BlZWRFZGl0Qm94LnN0cmluZyA9IHRoaXMuZWZmZWN0LmJsdXIudG9GaXhlZCgyKTtcbiAgICB9XG59XG5cbiJdfQ==