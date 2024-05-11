"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistortSample = void 0;
const cc_1 = require("cc");
const EffectDistort_1 = require("../../script/EffectDistort");
const { ccclass, property } = cc_1._decorator;
let DistortSample = class DistortSample extends cc_1.Component {
    constructor() {
        super(...arguments);
        this.effect = null;
        this.speed = null;
        this.strength = null;
    }
    speedCallback(slider) {
        this.effect.speed = cc_1.lerp(0.01, 0.1, slider.progress);
        const editBox = slider.node.getComponentInChildren(cc_1.EditBox);
        editBox.string = slider.progress.toFixed(2);
    }
    strengthCallback(slider) {
        this.effect.strength = cc_1.lerp(0.01, 0.1, slider.progress);
        const editBox = slider.node.getComponentInChildren(cc_1.EditBox);
        editBox.string = slider.progress.toFixed(2);
    }
    start() {
        // Speed
        this.speed.progress = (this.effect.speed - 0.01) / (0.1 - 0.01);
        const speedLabel = this.speed.getComponentInChildren(cc_1.EditBox);
        speedLabel.string = `Speed`;
        const speedEditBox = this.speed.getComponentInChildren(cc_1.EditBox);
        speedEditBox.string = this.effect.speed.toFixed(2);
        // Strength
        this.strength.progress = (this.effect.strength - 0.01) / (0.1 - 0.01);
        const strengthLabel = this.strength.getComponentInChildren(cc_1.EditBox);
        strengthLabel.string = `Strength`;
        const strengthEditBox = this.strength.getComponentInChildren(cc_1.EditBox);
        strengthEditBox.string = this.effect.strength.toFixed(2);
    }
};
__decorate([
    property({ type: EffectDistort_1.EffectDistort })
], DistortSample.prototype, "effect", void 0);
__decorate([
    property({ type: cc_1.Slider })
], DistortSample.prototype, "speed", void 0);
__decorate([
    property({ type: cc_1.Slider })
], DistortSample.prototype, "strength", void 0);
DistortSample = __decorate([
    ccclass('DistortSample')
], DistortSample);
exports.DistortSample = DistortSample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzdG9ydFNhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS9hc3NldHMvc2FtcGxlcy9zY3JpcHQvRGlzdG9ydFNhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBd0U7QUFDeEUsOERBQTJEO0FBRTNELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBR3pDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxjQUFTO0lBQTVDOztRQUVXLFdBQU0sR0FBa0IsSUFBSSxDQUFDO1FBRzdCLFVBQUssR0FBVyxJQUFJLENBQUM7UUFHckIsYUFBUSxHQUFXLElBQUksQ0FBQztJQW1DbkMsQ0FBQztJQWpDVSxhQUFhLENBQUMsTUFBYztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxTQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFckQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFPLENBQUMsQ0FBQztRQUM1RCxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxNQUFjO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLFNBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4RCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFlBQU8sQ0FBQyxDQUFDO1FBQzVELE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELEtBQUs7UUFDRCxRQUFRO1FBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUVoRSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLFlBQU8sQ0FBQyxDQUFDO1FBQzlELFVBQVUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBRTVCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsWUFBTyxDQUFDLENBQUM7UUFDaEUsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkQsV0FBVztRQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFdEUsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFPLENBQUMsQ0FBQztRQUNwRSxhQUFhLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUVsQyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLFlBQU8sQ0FBQyxDQUFDO1FBQ3RFLGVBQWUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7Q0FDSixDQUFBO0FBekNHO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLDZCQUFhLEVBQUUsQ0FBQzs2Q0FDRTtBQUdwQztJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFNLEVBQUUsQ0FBQzs0Q0FDQztBQUc1QjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFNLEVBQUUsQ0FBQzsrQ0FDSTtBQVJ0QixhQUFhO0lBRHpCLE9BQU8sQ0FBQyxlQUFlLENBQUM7R0FDWixhQUFhLENBMkN6QjtBQTNDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IsIENvbXBvbmVudCwgRWRpdEJveCwgbGVycCwgTm9kZSwgU2xpZGVyIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgRWZmZWN0RGlzdG9ydCB9IGZyb20gJy4uLy4uL3NjcmlwdC9FZmZlY3REaXN0b3J0JztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuQGNjY2xhc3MoJ0Rpc3RvcnRTYW1wbGUnKVxuZXhwb3J0IGNsYXNzIERpc3RvcnRTYW1wbGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEVmZmVjdERpc3RvcnQgfSlcbiAgICBwdWJsaWMgZWZmZWN0OiBFZmZlY3REaXN0b3J0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNsaWRlciB9KVxuICAgIHB1YmxpYyBzcGVlZDogU2xpZGVyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNsaWRlciB9KVxuICAgIHB1YmxpYyBzdHJlbmd0aDogU2xpZGVyID0gbnVsbDtcblxuICAgIHB1YmxpYyBzcGVlZENhbGxiYWNrKHNsaWRlcjogU2xpZGVyKSB7XG4gICAgICAgIHRoaXMuZWZmZWN0LnNwZWVkID0gbGVycCgwLjAxLCAwLjEsIHNsaWRlci5wcm9ncmVzcyk7XG5cbiAgICAgICAgY29uc3QgZWRpdEJveCA9IHNsaWRlci5ub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oRWRpdEJveCk7XG4gICAgICAgIGVkaXRCb3guc3RyaW5nID0gc2xpZGVyLnByb2dyZXNzLnRvRml4ZWQoMik7XG4gICAgfVxuXG4gICAgcHVibGljIHN0cmVuZ3RoQ2FsbGJhY2soc2xpZGVyOiBTbGlkZXIpIHtcbiAgICAgICAgdGhpcy5lZmZlY3Quc3RyZW5ndGggPSBsZXJwKDAuMDEsIDAuMSwgc2xpZGVyLnByb2dyZXNzKTtcblxuICAgICAgICBjb25zdCBlZGl0Qm94ID0gc2xpZGVyLm5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihFZGl0Qm94KTtcbiAgICAgICAgZWRpdEJveC5zdHJpbmcgPSBzbGlkZXIucHJvZ3Jlc3MudG9GaXhlZCgyKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgLy8gU3BlZWRcbiAgICAgICAgdGhpcy5zcGVlZC5wcm9ncmVzcyA9ICh0aGlzLmVmZmVjdC5zcGVlZCAtIDAuMDEpIC8gKDAuMSAtIDAuMDEpO1xuXG4gICAgICAgIGNvbnN0IHNwZWVkTGFiZWwgPSB0aGlzLnNwZWVkLmdldENvbXBvbmVudEluQ2hpbGRyZW4oRWRpdEJveCk7XG4gICAgICAgIHNwZWVkTGFiZWwuc3RyaW5nID0gYFNwZWVkYDtcblxuICAgICAgICBjb25zdCBzcGVlZEVkaXRCb3ggPSB0aGlzLnNwZWVkLmdldENvbXBvbmVudEluQ2hpbGRyZW4oRWRpdEJveCk7XG4gICAgICAgIHNwZWVkRWRpdEJveC5zdHJpbmcgPSB0aGlzLmVmZmVjdC5zcGVlZC50b0ZpeGVkKDIpO1xuXG4gICAgICAgIC8vIFN0cmVuZ3RoXG4gICAgICAgIHRoaXMuc3RyZW5ndGgucHJvZ3Jlc3MgPSAodGhpcy5lZmZlY3Quc3RyZW5ndGggLSAwLjAxKSAvICgwLjEgLSAwLjAxKTtcblxuICAgICAgICBjb25zdCBzdHJlbmd0aExhYmVsID0gdGhpcy5zdHJlbmd0aC5nZXRDb21wb25lbnRJbkNoaWxkcmVuKEVkaXRCb3gpO1xuICAgICAgICBzdHJlbmd0aExhYmVsLnN0cmluZyA9IGBTdHJlbmd0aGA7XG5cbiAgICAgICAgY29uc3Qgc3RyZW5ndGhFZGl0Qm94ID0gdGhpcy5zdHJlbmd0aC5nZXRDb21wb25lbnRJbkNoaWxkcmVuKEVkaXRCb3gpO1xuICAgICAgICBzdHJlbmd0aEVkaXRCb3guc3RyaW5nID0gdGhpcy5lZmZlY3Quc3RyZW5ndGgudG9GaXhlZCgyKTtcbiAgICB9XG59XG5cbiJdfQ==