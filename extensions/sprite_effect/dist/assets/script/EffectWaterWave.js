"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectWaterWave = void 0;
const cc_1 = require("cc");
const EffectBase_1 = require("./EffectBase");
const cc_2 = require("cc");
const cc_3 = require("cc");
const { ccclass, property } = cc_1._decorator;
let EffectWaterWave = class EffectWaterWave extends EffectBase_1.EffectBase {
    constructor() {
        super(...arguments);
        this._offset = 0.5;
        this._waveWidth = 20.0;
        this._waveHeight = 0.01;
        this._waveSpeed = 10.0;
    }
    //#region offset
    get offset() {
        return this._offset;
    }
    set offset(val) {
        this._offset = val;
        this._setParamsDirty('_offset');
    }
    //#endregion
    //#region waveWidth
    get waveWidth() {
        return this._waveWidth;
    }
    set waveWidth(val) {
        this._waveWidth = val;
        this._setParamsDirty('_waveWidth');
    }
    //#endregion
    //#region waveHeight
    get waveHeight() {
        return this._waveHeight;
    }
    set waveHeight(val) {
        this._waveHeight = val;
        this._setParamsDirty('_waveHeight');
    }
    //#endregion
    //#region waveSpeed
    get waveSpeed() {
        return this._waveSpeed;
    }
    set waveSpeed(val) {
        this._waveSpeed = val;
        this._setParamsDirty('_waveSpeed');
    }
    //#endregion
    _instMaterial() {
        if (this.effectAsset) {
            let mat = new cc_3.Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                defines: { USE_TEXTURE: true },
                technique: this._is2Din3D ? 1 : 0
            });
            this._setParams('_offset', mat.passes[0].getHandle('_offset'));
            this._setParams('_waveWidth', mat.passes[0].getHandle('_waveWidth'));
            this._setParams('_waveHeight', mat.passes[0].getHandle('_waveHeight'));
            this._setParams('_waveSpeed', mat.passes[0].getHandle('_waveSpeed'));
            this._sprite.customMaterial = mat;
        }
        else {
            cc_2.error('EffectWaterWave._instMaterial: effectAsset is null');
        }
    }
    _updateParams(key, idx) {
        var _a, _b, _c, _d;
        if (key === '_offset') {
            (_a = this._sprite.customMaterial) === null || _a === void 0 ? void 0 : _a.passes[0].setUniform(idx, 1.0 - this._offset);
        }
        else if (key === '_waveWidth') {
            (_b = this._sprite.customMaterial) === null || _b === void 0 ? void 0 : _b.passes[0].setUniform(idx, this._waveWidth);
        }
        else if (key === '_waveHeight') {
            (_c = this._sprite.customMaterial) === null || _c === void 0 ? void 0 : _c.passes[0].setUniform(idx, this._waveHeight);
        }
        else if (key === '_waveSpeed') {
            (_d = this._sprite.customMaterial) === null || _d === void 0 ? void 0 : _d.passes[0].setUniform(idx, this._waveSpeed);
        }
    }
};
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '偏移量' })
], EffectWaterWave.prototype, "offset", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '偏移量', visible: true })
], EffectWaterWave.prototype, "_offset", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '水波寬' })
], EffectWaterWave.prototype, "waveWidth", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '水波寬', visible: true })
], EffectWaterWave.prototype, "_waveWidth", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '水波高' })
], EffectWaterWave.prototype, "waveHeight", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '水波高', visible: true })
], EffectWaterWave.prototype, "_waveHeight", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '速度' })
], EffectWaterWave.prototype, "waveSpeed", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '速度', visible: true })
], EffectWaterWave.prototype, "_waveSpeed", void 0);
EffectWaterWave = __decorate([
    ccclass('EffectWaterWave')
], EffectWaterWave);
exports.EffectWaterWave = EffectWaterWave;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0V2F0ZXJXYXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2Fzc2V0cy9zY3JpcHQvRWZmZWN0V2F0ZXJXYXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUFnQztBQUNoQyw2Q0FBMEM7QUFDMUMsMkJBQTJCO0FBQzNCLDJCQUE4QjtBQUU5QixNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUd6QyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLHVCQUFVO0lBQS9DOztRQWFZLFlBQU8sR0FBVyxHQUFHLENBQUM7UUFnQnRCLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFnQjFCLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBZ0IzQixlQUFVLEdBQVcsSUFBSSxDQUFDO0lBdUN0QyxDQUFDO0lBbkdHLGdCQUFnQjtJQUVoQixJQUFXLE1BQU07UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQVcsTUFBTSxDQUFDLEdBQVc7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBSUQsWUFBWTtJQUdaLG1CQUFtQjtJQUVuQixJQUFXLFNBQVM7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFXLFNBQVMsQ0FBQyxHQUFXO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUlELFlBQVk7SUFHWixvQkFBb0I7SUFFcEIsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBVyxVQUFVLENBQUMs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Q0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztvREFDdEY7QUFNbkM7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO2dEQUd6RztBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO21EQUN2RjtBQTdEekIsZUFBZTtJQUQzQixPQUFPLENBQUMsaUJBQWlCLENBQUM7R0FDZCxlQUFlLENBb0czQjtBQXBHWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBFZmZlY3RCYXNlIH0gZnJvbSAnLi9FZmZlY3RCYXNlJztcbmltcG9ydCB7IGVycm9yIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICdjYyc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKCdFZmZlY3RXYXRlcldhdmUnKVxuZXhwb3J0IGNsYXNzIEVmZmVjdFdhdGVyV2F2ZSBleHRlbmRzIEVmZmVjdEJhc2Uge1xuICAgIC8vI3JlZ2lvbiBvZmZzZXRcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEsIDAuMDFdLCB0b29sdGlwOiAn5YGP56e76YePJyB9KVxuICAgIHB1YmxpYyBnZXQgb2Zmc2V0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBvZmZzZXQodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX29mZnNldCcpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICflgY/np7vph48nLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfb2Zmc2V0OiBudW1iZXIgPSAwLjU7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiB3YXZlV2lkdGhcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDIwLCAwLjAxXSwgdG9vbHRpcDogJ+awtOazouWvrCcgfSlcbiAgICBwdWJsaWMgZ2V0IHdhdmVXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2F2ZVdpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgd2F2ZVdpZHRoKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3dhdmVXaWR0aCA9IHZhbDtcbiAgICAgICAgdGhpcy5fc2V0UGFyYW1zRGlydHkoJ193YXZlV2lkdGgnKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDIwLCAwLjAxXSwgdG9vbHRpcDogJ+awtOazouWvrCcsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF93YXZlV2lkdGg6IG51bWJlciA9IDIwLjA7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiB3YXZlSGVpZ2h0XG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogJ+awtOazoumrmCcgfSlcbiAgICBwdWJsaWMgZ2V0IHdhdmVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhdmVIZWlnaHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCB3YXZlSGVpZ2h0KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3dhdmVIZWlnaHQgPSB2YWw7XG4gICAgICAgIHRoaXMuX3NldFBhcmFtc0RpcnR5KCdfd2F2ZUhlaWdodCcpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICfmsLTms6Lpq5gnLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfd2F2ZUhlaWdodDogbnVtYmVyID0gMC4wMTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIHdhdmVTcGVlZFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMjAsIDAuMDFdLCB0b29sdGlwOiAn6YCf5bqmJyB9KVxuICAgIHB1YmxpYyBnZXQgd2F2ZVNwZWVkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl93YXZlU3BlZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCB3YXZlU3BlZWQodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fd2F2ZVNwZWVkID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX3dhdmVTcGVlZCcpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMjAsIDAuMDFdLCB0b29sdGlwOiAn6YCf5bqmJywgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX3dhdmVTcGVlZDogbnVtYmVyID0gMTAuMDtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgcHJvdGVjdGVkIF9pbnN0TWF0ZXJpYWwoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmVmZmVjdEFzc2V0KSB7XG4gICAgICAgICAgICBsZXQgbWF0OiBNYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCgpO1xuICAgICAgICAgICAgbWF0LmluaXRpYWxpemUoe1xuICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxuICAgICAgICAgICAgICAgIGRlZmluZXM6IHsgVVNFX1RFWFRVUkU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IHRoaXMuX2lzMkRpbjNEID8gMSA6IDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9zZXRQYXJhbXMoJ19vZmZzZXQnLCBtYXQucGFzc2VzWzBdLmdldEhhbmRsZSgnX29mZnNldCcpKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX3dhdmVXaWR0aCcsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfd2F2ZVdpZHRoJykpO1xuICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfd2F2ZUhlaWdodCcsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfd2F2ZUhlaWdodCcpKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX3dhdmVTcGVlZCcsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfd2F2ZVNwZWVkJykpO1xuXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLmN1c3RvbU1hdGVyaWFsID0gbWF0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IoJ0VmZmVjdFdhdGVyV2F2ZS5faW5zdE1hdGVyaWFsOiBlZmZlY3RBc3NldCBpcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3VwZGF0ZVBhcmFtcyhrZXk6IHN0cmluZywgaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ19vZmZzZXQnKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLmN1c3RvbU1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIDEuMCAtIHRoaXMuX29mZnNldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX3dhdmVXaWR0aCcpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEuY3VzdG9tTWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fd2F2ZVdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfd2F2ZUhlaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEuY3VzdG9tTWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fd2F2ZUhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX3dhdmVTcGVlZCcpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEuY3VzdG9tTWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fd2F2ZVNwZWVkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4iXX0=