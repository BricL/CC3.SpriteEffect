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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0RGlzdG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9zY3JpcHQvRWZmZWN0RGlzdG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBOEI7QUFDOUIsMkJBQTJCO0FBQzNCLDJCQUErQjtBQUMvQiwyQkFBZ0M7QUFFaEMsNkNBQTBDO0FBRTFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBRzlFLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSx1QkFBVTtJQUE3Qzs7UUFFVyxpQkFBWSxHQUFxQixJQUFJLENBQUM7UUFjckMsV0FBTSxHQUFXLElBQUksQ0FBQztRQWdCdEIsY0FBUyxHQUFXLElBQUksQ0FBQztJQXFDckMsQ0FBQztJQWpFRyxlQUFlO0lBRWYsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFXLEtBQUssQ0FBQyxHQUFXO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUlELFlBQVk7SUFHWixrQkFBa0I7SUFFbEIsSUFBVyxRQUFRO1FBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFXLFFBQVEsQ0FBQyxHQUFXO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUlELFlBQVk7SUFHRixhQUFhO1FBQ25CLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3ZDLElBQUksR0FBRyxHQUFhLElBQUksYUFBUSxFQUFFLENB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LE1BQU0sRUFBRSxDQUFDOzZDQUdoSDtBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO2dEQUMvRjtBQWhDeEIsYUFBYTtJQUR6QixPQUFPLENBQUMsZUFBZSxDQUFDO0dBQ1osYUFBYSxDQXFFekI7QUFyRVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IGVycm9yIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgVGV4dHVyZTJEIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgX2RlY29yYXRvciB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVESVRPUiwgUFJFVklFVyB9IGZyb20gJ2NjL2VudidcbmltcG9ydCB7IEVmZmVjdEJhc2UgfSBmcm9tICcuL0VmZmVjdEJhc2UnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHJlcXVpcmVDb21wb25lbnQsIGV4ZWN1dGVJbkVkaXRNb2RlLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuQGNjY2xhc3MoJ0VmZmVjdERpc3RvcnQnKVxuZXhwb3J0IGNsYXNzIEVmZmVjdERpc3RvcnQgZXh0ZW5kcyBFZmZlY3RCYXNlIHtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBUZXh0dXJlMkQsIHRvb2x0aXA6ICfmjIflrprlmarlo7DosrzlnJYnIH0pXG4gICAgcHVibGljIG5vaXNlVGV4dHVyZTogVGV4dHVyZTJEIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvLyNyZWdpb24gc3BlZWRcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMDEsIDAuMSwgMC4wMDFdLCB0b29sdGlwOiAn5omt5puy6YCf5bqmJyB9KVxuICAgIHB1YmxpYyBnZXQgc3BlZWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgc3BlZWQodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc3BlZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuX3NldFBhcmFtc0RpcnR5KCdfc3BlZWQnKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMDEsIDAuMSwgMC4wMDFdLCB0b29sdGlwOiAn5omt5puy6YCf5bqmJywgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX3NwZWVkOiBudW1iZXIgPSAwLjA1O1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gc3RyZW5ndGhcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMDEsIDAuMSwgMC4wMDFdLCB0b29sdGlwOiAn5omt5puy5by65bqmJyB9KVxuICAgIHB1YmxpYyBnZXQgc3RyZW5ndGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgc3RyZW5ndGgodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc3RyZW5ndGggPSB2YWw7XG4gICAgICAgIHRoaXMuX3NldFBhcmFtc0RpcnR5KCdfc3RyZW5ndGgnKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMDEsIDAuMSwgMC4wMDFdLCB0b29sdGlwOiAn5omt5puy5by65bqmJywgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX3N0cmVuZ3RoOiBudW1iZXIgPSAwLjA1O1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICBwcm90ZWN0ZWQgX2luc3RNYXRlcmlhbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZWZmZWN0QXNzZXQgJiYgdGhpcy5ub2lzZVRleHR1cmUpIHtcbiAgICAgICAgICAgIGxldCBtYXQ6IE1hdGVyaWFsID0gbmV3IE1hdGVyaWFsKCk7XG4gICAgICAgICAgICBtYXQuaW5pdGlhbGl6ZSh7XG4gICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXG4gICAgICAgICAgICAgICAgZGVmaW5lczoge30sXG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlOiB0aGlzLl9pczJEaW4zRCA/IDEgOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWF0LnNldFByb3BlcnR5KCdfbm9pc2VUZXh0dXJlJywgdGhpcy5ub2lzZVRleHR1cmUpO1xuXG4gICAgICAgICAgICB0aGlzLl9zZXRQYXJhbXMoJ19iYXNlVVYnLCBtYXQucGFzc2VzWzBdLmdldEhhbmRsZSgnX2Jhc2VVVicpKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX3NwZWVkJywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ19zcGVlZCcpKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX3N0cmVuZ3RoJywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ19zdHJlbmd0aCcpKTtcblxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5jdXN0b21NYXRlcmlhbCA9IG1hdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yKCdFZmZlY3REaXN0b3J0OiBlZmZlY3RBc3NldCBvciBub2lzZSB0ZXh0dXJlIGlzIG51bGwnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfdXBkYXRlUGFyYW1zKGtleTogc3RyaW5nLCBpZHg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoa2V5ID09PSAnX2Jhc2VVVicpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEubWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fZ2V0VVYodGhpcy5fc3ByaXRlIS5zcHJpdGVGcmFtZSEudXYpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfc3BlZWQnKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX3NwZWVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfc3RyZW5ndGgnKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX3N0cmVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4iXX0=