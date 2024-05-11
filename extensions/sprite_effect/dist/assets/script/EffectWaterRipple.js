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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0V2F0ZXJSaXBwbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvYXNzZXRzL3NjcmlwdC9FZmZlY3RXYXRlclJpcHBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBZ0M7QUFDaEMsNkNBQTBDO0FBQzFDLDJCQUE4QjtBQUM5QiwyQkFBMkI7QUFFM0IsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxlQUFVLENBQUM7QUFHekMsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSx1QkFBVTtJQUFqRDs7UUFhWSxXQUFNLEdBQVcsR0FBRyxDQUFDO1FBZXJCLGFBQVEsR0FBVyxJQUFJLENBQUM7SUErQnBDLENBQUM7SUExREcsZUFBZTtJQUVmLElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBVyxLQUFLLENBQUMsR0FBVztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFJRCxZQUFZO0lBRVosaUJBQWlCO0lBRWpCLElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBVyxPQUFPLENBQUMsR0FBVztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFJRCxZQUFZO0lBR0YsYUFBYTtRQUNuQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxhQUFRLEVBQUUsQ0FBQztZQUN6QixHQUFHLENBQUMsVUFBVSxDQUFDO2dCQUNYLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDN0IsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRTtnQkFDakMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLE9BQVEsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO1NBQ3RDO2FBQ0k7WUFDRCxVQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztTQUNuRDtJQUNMLENBQUM7SUFFUyxhQUFhLENBQUMsR0FBVyxFQUFFLEdBQVc7O1FBQzVDLElBQUksR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUNsQixNQUFBLElBQUksQ0FBQyxPQUFRLENBQUMsUUFBUSwwQ0FBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2xFO2FBQ0ksSUFBSSxHQUFHLEtBQUssVUFBVSxFQUFFO1lBQ3pCLE1BQUEsSUFBSSxDQUFDLE9BQVEsQ0FBQyxRQUFRLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEU7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQXhERztJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7OENBRzFHO0FBUUQ7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7aURBQzdGO0FBSzdCO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztnREFHNUc7QUFRRDtJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzttREFDNUY7QUE1QnZCLGlCQUFpQjtJQUQ3QixPQUFPLENBQUMsbUJBQW1CLENBQUM7R0FDaEIsaUJBQWlCLENBMkQ3QjtBQTNEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgRWZmZWN0QmFzZSB9IGZyb20gJy4vRWZmZWN0QmFzZSc7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IGVycm9yIH0gZnJvbSAnY2MnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xuXG5AY2NjbGFzcygnRWZmZWN0V2F0ZXJSaXBwbGUnKVxuZXhwb3J0IGNsYXNzIEVmZmVjdFdhdGVyUmlwcGxlIGV4dGVuZHMgRWZmZWN0QmFzZSB7XG4gICAgLy8jcmVnaW9uIHNwZWVkXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogJ+aJreabsumAn+W6picgfSlcbiAgICBwdWJsaWMgZ2V0IHNwZWVkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNwZWVkKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX3NwZWVkJyk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJQcml2YXRlIFByb3BzXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogJ+aJreabsumAn+W6picsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9zcGVlZDogbnVtYmVyID0gMC4xO1xuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uIGRlbnNpdHlcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzEsIDEwMCwgMC4wMV0sIHRvb2x0aXA6ICfmsLTms6Llr4bluqYnIH0pXG4gICAgcHVibGljIGdldCBkZW5zaXR5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZW5zaXR5O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZGVuc2l0eSh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9kZW5zaXR5ID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX2RlbnNpdHknKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzEsIDEwMCwgMC4wMV0sIHRvb2x0aXA6ICfmsLTms6Llr4bluqYnLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfZGVuc2l0eTogbnVtYmVyID0gNi4xMjtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgcHJvdGVjdGVkIF9pbnN0TWF0ZXJpYWwoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmVmZmVjdEFzc2V0KSB7XG4gICAgICAgICAgICBsZXQgbWF0ID0gbmV3IE1hdGVyaWFsKCk7XG4gICAgICAgICAgICBtYXQuaW5pdGlhbGl6ZSh7XG4gICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXG4gICAgICAgICAgICAgICAgZGVmaW5lczogeyBVU0VfQnJpZ2h0bmVzczogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIHRlY2huaXF1ZTogdGhpcy5faXMyRGluM0QgPyAxIDogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX3NwZWVkJywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ19zcGVlZCcpKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX2RlbnNpdHknLCBtYXQucGFzc2VzWzBdLmdldEhhbmRsZSgnX2RlbnNpdHknKSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEuY3VzdG9tTWF0ZXJpYWwgPSBtYXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlcnJvcignRWZmZWN0V2F0ZXJSaXBwbGU6IGVmZmVjdEFzc2V0IGlzIG51bGwnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfdXBkYXRlUGFyYW1zKGtleTogc3RyaW5nLCBpZHg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoa2V5ID09PSAnX3NwZWVkJykge1xuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5tYXRlcmlhbD8ucGFzc2VzWzBdLnNldFVuaWZvcm0oaWR4LCB0aGlzLl9zcGVlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX2RlbnNpdHknKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX2RlbnNpdHkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbiJdfQ==