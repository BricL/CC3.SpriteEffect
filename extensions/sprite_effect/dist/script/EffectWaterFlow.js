"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectWaterFlow = void 0;
const cc_1 = require("cc");
const EffectBase_1 = require("./EffectBase");
const cc_2 = require("cc");
const cc_3 = require("cc");
const cc_4 = require("cc");
const cc_5 = require("cc");
const { ccclass, property } = cc_1._decorator;
let EffectWaterFlow = class EffectWaterFlow extends EffectBase_1.EffectBase {
    constructor() {
        super(...arguments);
        this.noiseTexture = null;
        this._frequency = 0.1;
        this._amplitude = 0.02;
        this._speed = 0.1;
        this._flowDirection = new cc_5.Vec2(1, 0);
    }
    //#region frequency
    get frequency() {
        return this._frequency;
    }
    set frequency(val) {
        this._frequency = val;
        this._setParamsDirty('_frequency');
    }
    //#endregion
    //#region amplitude
    get amplitude() {
        return this._amplitude;
    }
    set amplitude(val) {
        this._amplitude = val;
        this._setParamsDirty('_amplitude');
    }
    //#endregion
    //#region speed
    get speed() {
        return this._speed;
    }
    set speed(val) {
        this._speed = val;
        this._setParamsDirty('_speed');
    }
    //#endregion
    //#region flowDirection
    get flowDirection() {
        return this._flowDirection;
    }
    set flowDirection(val) {
        this._flowDirection.set(val);
        this._setParamsDirty('_flowDirection');
    }
    //#endregion
    _instMaterial() {
        if (this.effectAsset && this.noiseTexture) {
            let mat = new cc_2.Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                defines: { USE_TEXTURE: true },
                technique: this._is2Din3D ? 1 : 0
            });
            mat.setProperty('_noticeTex', this.noiseTexture);
            this._setParams('_frequency', mat.passes[0].getHandle('_frequency'));
            this._setParams('_amplitude', mat.passes[0].getHandle('_amplitude'));
            this._setParams('_speed', mat.passes[0].getHandle('_speed'));
            this._setParams('_flowDirection', mat.passes[0].getHandle('_flowDir'));
            this._sprite.customMaterial = mat;
        }
        else {
            cc_4.error('EffectWaterFlow: effectAsset or noise texture is null');
        }
    }
    _updateParams(key, idx) {
        var _a, _b, _c, _d;
        if (key === '_frequency') {
            (_a = this._sprite.material) === null || _a === void 0 ? void 0 : _a.passes[0].setUniform(idx, this._frequency);
        }
        else if (key === '_amplitude') {
            (_b = this._sprite.material) === null || _b === void 0 ? void 0 : _b.passes[0].setUniform(idx, this._amplitude);
        }
        else if (key === '_speed') {
            (_c = this._sprite.material) === null || _c === void 0 ? void 0 : _c.passes[0].setUniform(idx, this._speed);
        }
        else if (key === '_flowDirection') {
            (_d = this._sprite.material) === null || _d === void 0 ? void 0 : _d.passes[0].setUniform(idx, this._flowDirection);
        }
    }
};
__decorate([
    property({ type: cc_3.Texture2D, tooltip: '指定噪声貼圖' })
], EffectWaterFlow.prototype, "noiseTexture", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 10, 0.01], tooltip: '扭曲频率' })
], EffectWaterFlow.prototype, "frequency", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 10, 0.01], tooltip: '扭曲频率', visible: true })
], EffectWaterFlow.prototype, "_frequency", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲幅度' })
], EffectWaterFlow.prototype, "amplitude", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲幅度', visible: true })
], EffectWaterFlow.prototype, "_amplitude", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲速度' })
], EffectWaterFlow.prototype, "speed", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲速度', visible: true })
], EffectWaterFlow.prototype, "_speed", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '流动方向' })
], EffectWaterFlow.prototype, "flowDirection", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, tooltip: '流动方向' })
], EffectWaterFlow.prototype, "_flowDirection", void 0);
EffectWaterFlow = __decorate([
    ccclass('EffectWaterFlow')
], EffectWaterFlow);
exports.EffectWaterFlow = EffectWaterFlow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0V2F0ZXJGbG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL3NjcmlwdC9FZmZlY3RXYXRlckZsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQWlEO0FBQ2pELDZDQUEwQztBQUMxQywyQkFBOEI7QUFDOUIsMkJBQStCO0FBQy9CLDJCQUEyQjtBQUMzQiwyQkFBMEI7QUFFMUIsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxlQUFVLENBQUM7QUFHekMsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSx1QkFBVTtJQUEvQzs7UUFFVyxpQkFBWSxHQUFxQixJQUFJLENBQUM7UUFjckMsZUFBVSxHQUFXLEdBQUcsQ0FBQztRQWdCekIsZUFBVSxHQUFXLElBQUksQ0FBQztRQWdCMUIsV0FBTSxHQUFXLEdBQUcsQ0FBQztRQWdCckIsbUJBQWMsR0FBUyxJQUFJLFNBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUF5Q2xELENBQUM7SUFyR0csbUJBQW1CO0lBRW5CLElBQVcsU0FBUztRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQVcsU0FBUyxDQUFDLEdBQVc7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBSUQsWUFBWTtJQUdaLG1CQUFtQjtJQUVuQixJQUFXLFNBQVM7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFXLFNBQVMsQ0FBQyxHQUFXO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUlELFlBQVk7SUFHWixlQUFlO0lBRWYsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFXLEtBQUssQ0FBQyxHQUFXO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUlELFlBQVk7SUFHWix1QkFBdUI7SUFFdkIsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBVyxhQUFhLENBQUMsR0FBUztRQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUlELFlBQVk7SUFHRixhQUFhO1FBQ25CLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3ZDLElBQUksR0FBRyxHQUFHLElBQUksYUFBUSxFQUFFLENBQUM7WUFDekIsR0FBRyxDQUFDLFVBQVUsQ0FBQztnQkFDWCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBQzlCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEMsQ0FBQyxDQUFDO1lBRUgsR0FBRyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRWpELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUV2RSxJQUFJLENBQUMsT0FBUSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7U0FDdEM7YUFDSTtZQUNELFVBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0wsQ0FBQztJQUVTLGFBQWEsQ0FBQyxHQUFXLEVBQUUsR0FBVzs7UUFDNUMsSUFBSSxHQUFHLEtBQUssWUFBWSxFQUFFO1lBQ3RCLE1BQUEsSUFBSSxDQUFDLE9BQVEsQ0FBQyxRQUFRLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdEU7YUFDSSxJQUFJLEdBQUcsS0FBSyxZQUFZLEVBQUU7WUFDM0IsTUFBQSxJQUFJLENBQUMsT0FBUSxDQUFDLFFBQVEsMENBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN0RTthQUNJLElBQUksR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUN2QixNQUFBLElBQUksQ0FBQyxPQUFRLENBQUMsUUFBUSwwQ0FBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2xFO2FBQ0ksSUFBSSxHQUFHLEtBQUssZ0JBQWdCLEVBQUU7WUFDL0IsTUFBQSxJQUFJLENBQUMsT0FBUSxDQUFDLFFBQVEsMENBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUMxRTtJQUNMLENBQUM7Q0FDSixDQUFBO0FBdkdHO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLGNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7cURBQ0o7QUFJN0M7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO2dEQUczRztBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO21EQUMxRjtBQU1qQztJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7Z0RBRzFHO0FBUUQ7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7bURBQ3hGO0FBTWxDO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs0Q0FHMUc7QUFRRDtJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzsrQ0FDN0Y7QUFNN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7b0RBR3hFO0FBUUQ7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7dURBQzNCO0FBaEVyQyxlQUFlO0lBRDNCLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztHQUNkLGVBQWUsQ0F5RzNCO0FBekdZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29tcG9uZW50LCBOb2RlIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgRWZmZWN0QmFzZSB9IGZyb20gJy4vRWZmZWN0QmFzZSc7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IFRleHR1cmUyRCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IGVycm9yIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgVmVjMiB9IGZyb20gJ2NjJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuQGNjY2xhc3MoJ0VmZmVjdFdhdGVyRmxvdycpXG5leHBvcnQgY2xhc3MgRWZmZWN0V2F0ZXJGbG93IGV4dGVuZHMgRWZmZWN0QmFzZSB7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogVGV4dHVyZTJELCB0b29sdGlwOiAn5oyH5a6a5Zmq5aOw6LK85ZyWJyB9KVxuICAgIHB1YmxpYyBub2lzZVRleHR1cmU6IFRleHR1cmUyRCB8IG51bGwgPSBudWxsO1xuXG4gICAgLy8jcmVnaW9uIGZyZXF1ZW5jeVxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMTAsIDAuMDFdLCB0b29sdGlwOiAn5omt5puy6aKR546HJyB9KVxuICAgIHB1YmxpYyBnZXQgZnJlcXVlbmN5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mcmVxdWVuY3k7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBmcmVxdWVuY3kodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZnJlcXVlbmN5ID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX2ZyZXF1ZW5jeScpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMTAsIDAuMDFdLCB0b29sdGlwOiAn5omt5puy6aKR546HJywgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX2ZyZXF1ZW5jeTogbnVtYmVyID0gMC4xO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gYW1wbGl0dWRlXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogJ+aJreabsuW5heW6picgfSlcbiAgICBwdWJsaWMgZ2V0IGFtcGxpdHVkZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW1wbGl0dWRlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgYW1wbGl0dWRlKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2FtcGxpdHVkZSA9IHZhbDtcbiAgICAgICAgdGhpcy5fc2V0UGFyYW1zRGlydHkoJ19hbXBsaXR1ZGUnKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEsIDAuMDFdLCB0b29sdGlwOiAn5omt5puy5bmF5bqmJywgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX2FtcGxpdHVkZTogbnVtYmVyID0gMC4wMjtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIHNwZWVkXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogJ+aJreabsumAn+W6picgfSlcbiAgICBwdWJsaWMgZ2V0IHNwZWVkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNwZWVkKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX3NwZWVkJyk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJQcml2YXRlIFByb3BzXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogJ+aJreabsumAn+W6picsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9zcGVlZDogbnVtYmVyID0gMC4xO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gZmxvd0RpcmVjdGlvblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdG9vbHRpcDogJ+a1geWKqOaWueWQkScgfSlcbiAgICBwdWJsaWMgZ2V0IGZsb3dEaXJlY3Rpb24oKTogVmVjMiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mbG93RGlyZWN0aW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZmxvd0RpcmVjdGlvbih2YWw6IFZlYzIpIHtcbiAgICAgICAgdGhpcy5fZmxvd0RpcmVjdGlvbi5zZXQodmFsKTtcbiAgICAgICAgdGhpcy5fc2V0UGFyYW1zRGlydHkoJ19mbG93RGlyZWN0aW9uJyk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJQcml2YXRlIFByb3BzXCIsIGlkOiBcIjFcIiB9LCB0b29sdGlwOiAn5rWB5Yqo5pa55ZCRJyB9KVxuICAgIHByaXZhdGUgX2Zsb3dEaXJlY3Rpb246IFZlYzIgPSBuZXcgVmVjMigxLCAwKTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgcHJvdGVjdGVkIF9pbnN0TWF0ZXJpYWwoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmVmZmVjdEFzc2V0ICYmIHRoaXMubm9pc2VUZXh0dXJlKSB7XG4gICAgICAgICAgICBsZXQgbWF0ID0gbmV3IE1hdGVyaWFsKCk7XG4gICAgICAgICAgICBtYXQuaW5pdGlhbGl6ZSh7XG4gICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXG4gICAgICAgICAgICAgICAgZGVmaW5lczogeyBVU0VfVEVYVFVSRTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHRlY2huaXF1ZTogdGhpcy5faXMyRGluM0QgPyAxIDogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hdC5zZXRQcm9wZXJ0eSgnX25vdGljZVRleCcsIHRoaXMubm9pc2VUZXh0dXJlKTtcblxuICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfZnJlcXVlbmN5JywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ19mcmVxdWVuY3knKSk7XG4gICAgICAgICAgICB0aGlzLl9zZXRQYXJhbXMoJ19hbXBsaXR1ZGUnLCBtYXQucGFzc2VzWzBdLmdldEhhbmRsZSgnX2FtcGxpdHVkZScpKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX3NwZWVkJywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ19zcGVlZCcpKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX2Zsb3dEaXJlY3Rpb24nLCBtYXQucGFzc2VzWzBdLmdldEhhbmRsZSgnX2Zsb3dEaXInKSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEuY3VzdG9tTWF0ZXJpYWwgPSBtYXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlcnJvcignRWZmZWN0V2F0ZXJGbG93OiBlZmZlY3RBc3NldCBvciBub2lzZSB0ZXh0dXJlIGlzIG51bGwnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfdXBkYXRlUGFyYW1zKGtleTogc3RyaW5nLCBpZHg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoa2V5ID09PSAnX2ZyZXF1ZW5jeScpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEubWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fZnJlcXVlbmN5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfYW1wbGl0dWRlJykge1xuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5tYXRlcmlhbD8ucGFzc2VzWzBdLnNldFVuaWZvcm0oaWR4LCB0aGlzLl9hbXBsaXR1ZGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ19zcGVlZCcpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEubWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fc3BlZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ19mbG93RGlyZWN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5tYXRlcmlhbD8ucGFzc2VzWzBdLnNldFVuaWZvcm0oaWR4LCB0aGlzLl9mbG93RGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4iXX0=