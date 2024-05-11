"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectWaterRipple = void 0;
const cc_1 = require("cc");
const EffectBase_1 = require("./EffectBase");
const cc_2 = require("cc");
const cc_3 = require("cc");
const { ccclass, property } = cc_1._decorator;
let EffectWaterRipple = class EffectWaterRipple extends EffectBase_1.EffectBase {
    constructor() {
        super(...arguments);
        this._speed = 0.1;
        this._density = 6.12;
    }
    //#region speed
    get speed() {
        return this._speed;
    }
    set speed(val) {
        this._speed = val;
        this._setParamsDirty('_speed');
    }
    //#endregion
    //#region density
    get density() {
        return this._density;
    }
    set density(val) {
        this._density = val;
        this._setParamsDirty('_density');
    }
    //#endregion
    _instMaterial() {
        if (this.effectAsset) {
            let mat = new cc_2.Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                defines: { USE_Brightness: true },
                technique: this._is2Din3D ? 1 : 0
            });
            this._setParams('_speed', mat.passes[0].getHandle('_speed'));
            this._setParams('_density', mat.passes[0].getHandle('_density'));
            this._sprite.customMaterial = mat;
        }
        else {
            cc_3.error('EffectWaterRipple: effectAsset is null');
        }
    }
    _updateParams(key, idx) {
        var _a, _b;
        if (key === '_speed') {
            (_a = this._sprite.material) === null || _a === void 0 ? void 0 : _a.passes[0].setUniform(idx, this._speed);
        }
        else if (key === '_density') {
            (_b = this._sprite.material) === null || _b === void 0 ? void 0 : _b.passes[0].setUniform(idx, this._density);
        }
    }
};
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲速度' })
], EffectWaterRipple.prototype, "speed", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲速度', visible: true })
], EffectWaterRipple.prototype, "_speed", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [1, 100, 0.01], tooltip: '水波密度' })
], EffectWaterRipple.prototype, "density", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [1, 100, 0.01], tooltip: '水波密度', visible: true })
], EffectWaterRipple.prototype, "_density", void 0);
EffectWaterRipple = __decorate([
    ccclass('EffectWaterRipple')
], EffectWaterRipple);
exports.EffectWaterRipple = EffectWaterRipple;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0V2F0ZXJSaXBwbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2Uvc2NyaXB0L0VmZmVjdFdhdGVyUmlwcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUFnQztBQUNoQyw2Q0FBMEM7QUFDMUMsMkJBQThCO0FBQzlCLDJCQUEyQjtBQUUzQixNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUd6QyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLHVCQUFVO0lBQWpEOztRQWFZLFdBQU0sR0FBVyxHQUFHLENBQUM7UUFlckIsYUFBUSxHQUFXLElBQUksQ0FBQztJQStCcEMsQ0FBQztJQTFERyxlQUFlO0lBRWYsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFXLEtBQUssQ0FBQyxHQUFXO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUlELFlBQVk7SUFFWixpQkFBaUI7SUFFakIsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFXLE9BQU8sQ0FBQyxHQUFXO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUlELFlBQVk7SUFHRixhQUFhO1FBQ25CLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLEdBQUcsR0FBRyxJQUFJLGFBQVEsRUFBRSxDQUFDO1lBQ3pCLEdBQUcsQ0FBQyxVQUFVLENBQUM7Z0JBQ1gsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUM3QixPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO2dCQUNqQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUVqRSxJQUFJLENBQUMsT0FBUSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7U0FDdEM7YUFDSTtZQUNELFVBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztJQUVTLGFBQWEsQ0FBQyxHQUFXLEVBQUUsR0FBVzs7UUFDNUMsSUFBSSxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ2xCLE1BQUEsSUFBSSxDQUFDLE9BQVEsQ0FBQyxRQUFRLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEU7YUFDSSxJQUFJLEdBQUcsS0FBSyxVQUFVLEVBQUU7WUFDekIsTUFBQSxJQUFJLENBQUMsT0FBUSxDQUFDLFFBQVEsMENBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwRTtJQUNMLENBQUM7Q0FDSixDQUFBO0FBeERHO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs4Q0FHMUc7QUFRRDtJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztpREFDN0Y7QUFLN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO2dEQUc1RztBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO21EQUM1RjtBQTVCdkIsaUJBQWlCO0lBRDdCLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztHQUNoQixpQkFBaUIsQ0EyRDdCO0FBM0RZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBFZmZlY3RCYXNlIH0gZnJvbSAnLi9FZmZlY3RCYXNlJztcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgZXJyb3IgfSBmcm9tICdjYyc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKCdFZmZlY3RXYXRlclJpcHBsZScpXG5leHBvcnQgY2xhc3MgRWZmZWN0V2F0ZXJSaXBwbGUgZXh0ZW5kcyBFZmZlY3RCYXNlIHtcbiAgICAvLyNyZWdpb24gc3BlZWRcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEsIDAuMDFdLCB0b29sdGlwOiAn5omt5puy6YCf5bqmJyB9KVxuICAgIHB1YmxpYyBnZXQgc3BlZWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgc3BlZWQodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc3BlZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuX3NldFBhcmFtc0RpcnR5KCdfc3BlZWQnKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEsIDAuMDFdLCB0b29sdGlwOiAn5omt5puy6YCf5bqmJywgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX3NwZWVkOiBudW1iZXIgPSAwLjE7XG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gZGVuc2l0eVxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMSwgMTAwLCAwLjAxXSwgdG9vbHRpcDogJ+awtOazouWvhuW6picgfSlcbiAgICBwdWJsaWMgZ2V0IGRlbnNpdHkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlbnNpdHk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBkZW5zaXR5KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2RlbnNpdHkgPSB2YWw7XG4gICAgICAgIHRoaXMuX3NldFBhcmFtc0RpcnR5KCdfZGVuc2l0eScpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMSwgMTAwLCAwLjAxXSwgdG9vbHRpcDogJ+awtOazouWvhuW6picsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9kZW5zaXR5OiBudW1iZXIgPSA2LjEyO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICBwcm90ZWN0ZWQgX2luc3RNYXRlcmlhbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZWZmZWN0QXNzZXQpIHtcbiAgICAgICAgICAgIGxldCBtYXQgPSBuZXcgTWF0ZXJpYWwoKTtcbiAgICAgICAgICAgIG1hdC5pbml0aWFsaXplKHtcbiAgICAgICAgICAgICAgICBlZmZlY3RBc3NldDogdGhpcy5lZmZlY3RBc3NldCxcbiAgICAgICAgICAgICAgICBkZWZpbmVzOiB7IFVTRV9CcmlnaHRuZXNzOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlOiB0aGlzLl9pczJEaW4zRCA/IDEgOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfc3BlZWQnLCBtYXQucGFzc2VzWzBdLmdldEhhbmRsZSgnX3NwZWVkJykpO1xuICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfZGVuc2l0eScsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfZGVuc2l0eScpKTtcblxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5jdXN0b21NYXRlcmlhbCA9IG1hdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yKCdFZmZlY3RXYXRlclJpcHBsZTogZWZmZWN0QXNzZXQgaXMgbnVsbCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF91cGRhdGVQYXJhbXMoa2V5OiBzdHJpbmcsIGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChrZXkgPT09ICdfc3BlZWQnKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX3NwZWVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfZGVuc2l0eScpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEubWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fZGVuc2l0eSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuIl19