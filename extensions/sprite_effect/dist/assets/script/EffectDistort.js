"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectDistort = void 0;
const cc_1 = require("cc");
const cc_2 = require("cc");
const cc_3 = require("cc");
const cc_4 = require("cc");
const EffectBase_1 = require("./EffectBase");
const { ccclass, requireComponent, executeInEditMode, property } = cc_4._decorator;
let EffectDistort = class EffectDistort extends EffectBase_1.EffectBase {
    constructor() {
        super(...arguments);
        this.noiseTexture = null;
        this._speed = 0.05;
        this._strength = 0.05;
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
    //#region strength
    get strength() {
        return this._strength;
    }
    set strength(val) {
        this._strength = val;
        this._setParamsDirty('_strength');
    }
    //#endregion
    _instMaterial() {
        if (this.effectAsset && this.noiseTexture) {
            let mat = new cc_1.Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                defines: {},
                technique: this._is2Din3D ? 1 : 0
            });
            mat.setProperty('_noiseTexture', this.noiseTexture);
            this._setParams('_baseUV', mat.passes[0].getHandle('_baseUV'));
            this._setParams('_speed', mat.passes[0].getHandle('_speed'));
            this._setParams('_strength', mat.passes[0].getHandle('_strength'));
            this._sprite.customMaterial = mat;
        }
        else {
            cc_2.error('EffectDistort: effectAsset or noise texture is null');
        }
    }
    _updateParams(key, idx) {
        var _a, _b, _c;
        if (key === '_baseUV') {
            (_a = this._sprite.material) === null || _a === void 0 ? void 0 : _a.passes[0].setUniform(idx, this._getUV(this._sprite.spriteFrame.uv));
        }
        else if (key === '_speed') {
            (_b = this._sprite.material) === null || _b === void 0 ? void 0 : _b.passes[0].setUniform(idx, this._speed);
        }
        else if (key === '_strength') {
            (_c = this._sprite.material) === null || _c === void 0 ? void 0 : _c.passes[0].setUniform(idx, this._strength);
        }
    }
};
__decorate([
    property({ type: cc_3.Texture2D, tooltip: '指定噪声貼圖' })
], EffectDistort.prototype, "noiseTexture", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲速度' })
], EffectDistort.prototype, "speed", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲速度', visible: true })
], EffectDistort.prototype, "_speed", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲强度' })
], EffectDistort.prototype, "strength", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.01, 0.1, 0.001], tooltip: '扭曲强度', visible: true })
], EffectDistort.prototype, "_strength", void 0);
EffectDistort = __decorate([
    ccclass('EffectDistort')
], EffectDistort);
exports.EffectDistort = EffectDistort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0RGlzdG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hc3NldHMvc2NyaXB0L0VmZmVjdERpc3RvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQThCO0FBQzlCLDJCQUEyQjtBQUMzQiwyQkFBK0I7QUFDL0IsMkJBQWdDO0FBRWhDLDZDQUEwQztBQUUxQyxNQUFNLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUc5RSxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEsdUJBQVU7SUFBN0M7O1FBRVcsaUJBQVksR0FBcUIsSUFBSSxDQUFDO1FBY3JDLFdBQU0sR0FBVyxJQUFJLENBQUM7UUFnQnRCLGNBQVMsR0FBVyxJQUFJLENBQUM7SUFxQ3JDLENBQUM7SUFqRUcsZUFBZTtJQUVmLElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBVyxLQUFLLENBQUMsR0FBVztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFJRCxZQUFZO0lBR1osa0JBQWtCO0lBRWxCLElBQVcsUUFBUTtRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBVyxRQUFRLENBQUMsR0FBVztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFJRCxZQUFZO0lBR0YsYUFBYTtRQUNuQixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN2QyxJQUFJLEdBQUcsR0FBYSxJQUFJLGFB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LE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs2Q0FHaEg7QUFRRDtJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztnREFDL0Y7QUFoQ3hCLGFBQWE7SUFEekIsT0FBTyxDQUFDLGVBQWUsQ0FBQztHQUNaLGFBQWEsQ0FxRXpCO0FBckVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBlcnJvciB9IGZyb20gJ2NjJztcbmltcG9ydCB7IFRleHR1cmUyRCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IF9kZWNvcmF0b3IgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBFRElUT1IsIFBSRVZJRVcgfSBmcm9tICdjYy9lbnYnXG5pbXBvcnQgeyBFZmZlY3RCYXNlIH0gZnJvbSAnLi9FZmZlY3RCYXNlJztcblxuY29uc3QgeyBjY2NsYXNzLCByZXF1aXJlQ29tcG9uZW50LCBleGVjdXRlSW5FZGl0TW9kZSwgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKCdFZmZlY3REaXN0b3J0JylcbmV4cG9ydCBjbGFzcyBFZmZlY3REaXN0b3J0IGV4dGVuZHMgRWZmZWN0QmFzZSB7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogVGV4dHVyZTJELCB0b29sdGlwOiAn5oyH5a6a5Zmq5aOw6LK85ZyWJyB9KVxuICAgIHB1YmxpYyBub2lzZVRleHR1cmU6IFRleHR1cmUyRCB8IG51bGwgPSBudWxsO1xuXG4gICAgLy8jcmVnaW9uIHNwZWVkXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAxLCAwLjEsIDAuMDAxXSwgdG9vbHRpcDogJ+aJreabsumAn+W6picgfSlcbiAgICBwdWJsaWMgZ2V0IHNwZWVkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNwZWVkKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX3NwZWVkJyk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJQcml2YXRlIFByb3BzXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAxLCAwLjEsIDAuMDAxXSwgdG9vbHRpcDogJ+aJreabsumAn+W6picsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9zcGVlZDogbnVtYmVyID0gMC4wNTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIHN0cmVuZ3RoXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAxLCAwLjEsIDAuMDAxXSwgdG9vbHRpcDogJ+aJreabsuW8uuW6picgfSlcbiAgICBwdWJsaWMgZ2V0IHN0cmVuZ3RoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHJlbmd0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHN0cmVuZ3RoKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3N0cmVuZ3RoID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX3N0cmVuZ3RoJyk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJQcml2YXRlIFByb3BzXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAxLCAwLjEsIDAuMDAxXSwgdG9vbHRpcDogJ+aJreabsuW8uuW6picsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9zdHJlbmd0aDogbnVtYmVyID0gMC4wNTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgcHJvdGVjdGVkIF9pbnN0TWF0ZXJpYWwoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmVmZmVjdEFzc2V0ICYmIHRoaXMubm9pc2VUZXh0dXJlKSB7XG4gICAgICAgICAgICBsZXQgbWF0OiBNYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCgpO1xuICAgICAgICAgICAgbWF0LmluaXRpYWxpemUoe1xuICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxuICAgICAgICAgICAgICAgIGRlZmluZXM6IHt9LFxuICAgICAgICAgICAgICAgIHRlY2huaXF1ZTogdGhpcy5faXMyRGluM0QgPyAxIDogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hdC5zZXRQcm9wZXJ0eSgnX25vaXNlVGV4dHVyZScsIHRoaXMubm9pc2VUZXh0dXJlKTtcblxuICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfYmFzZVVWJywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ19iYXNlVVYnKSk7XG4gICAgICAgICAgICB0aGlzLl9zZXRQYXJhbXMoJ19zcGVlZCcsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfc3BlZWQnKSk7XG4gICAgICAgICAgICB0aGlzLl9zZXRQYXJhbXMoJ19zdHJlbmd0aCcsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfc3RyZW5ndGgnKSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEuY3VzdG9tTWF0ZXJpYWwgPSBtYXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlcnJvcignRWZmZWN0RGlzdG9ydDogZWZmZWN0QXNzZXQgb3Igbm9pc2UgdGV4dHVyZSBpcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3VwZGF0ZVBhcmFtcyhrZXk6IHN0cmluZywgaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ19iYXNlVVYnKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX2dldFVWKHRoaXMuX3Nwcml0ZSEuc3ByaXRlRnJhbWUhLnV2KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX3NwZWVkJykge1xuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5tYXRlcmlhbD8ucGFzc2VzWzBdLnNldFVuaWZvcm0oaWR4LCB0aGlzLl9zcGVlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX3N0cmVuZ3RoJykge1xuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5tYXRlcmlhbD8ucGFzc2VzWzBdLnNldFVuaWZvcm0oaWR4LCB0aGlzLl9zdHJlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuIl19