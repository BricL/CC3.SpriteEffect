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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0V2F0ZXJGbG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2Fzc2V0cy9zY3JpcHQvRWZmZWN0V2F0ZXJGbG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUFpRDtBQUNqRCw2Q0FBMEM7QUFDMUMsMkJBQThCO0FBQzlCLDJCQUErQjtBQUMvQiwyQkFBMkI7QUFDM0IsMkJBQTBCO0FBRTFCLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBR3pDLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsdUJBQVU7SUFBL0M7O1FBRVcsaUJBQVksR0FBcUIsSUFBSSxDQUFDO1FBY3JDLGVBQVUsR0FBVyxHQUFHLENBQUM7UUFnQnpCLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFnQjFCLFdBQU0sR0FBVyxHQUFHLENBQUM7UUFnQnJCLG1CQUFjLEdBQVMsSUFBSSxTQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBeUNsRCxDQUFDO0lBckdHLG1CQUFtQjtJQUVuQixJQUFXLFNBQVM7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFXLFNBQVMsQ0FBQyxHQUFXO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUlELFlBQVk7SUFHWixtQkFBbUI7SUFFbkIsSUFBVyxTQUFTO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBVyxTQUFTLENBQUMsR0FBVztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFJRCxZQUFZO0lBR1os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RUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO21EQUN4RjtBQU1sQztJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7NENBRzFHO0FBUUQ7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7K0NBQzdGO0FBTTdCO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO29EQUd4RTtBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO3VEQUMzQjtBQWhFckMsZUFBZTtJQUQzQixPQUFPLENBQUMsaUJBQWlCLENBQUM7R0FDZCxlQUFlLENBeUczQjtBQXpHWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IsIENvbXBvbmVudCwgTm9kZSB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVmZmVjdEJhc2UgfSBmcm9tICcuL0VmZmVjdEJhc2UnO1xuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBUZXh0dXJlMkQgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBlcnJvciB9IGZyb20gJ2NjJztcbmltcG9ydCB7IFZlYzIgfSBmcm9tICdjYyc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKCdFZmZlY3RXYXRlckZsb3cnKVxuZXhwb3J0IGNsYXNzIEVmZmVjdFdhdGVyRmxvdyBleHRlbmRzIEVmZmVjdEJhc2Uge1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFRleHR1cmUyRCwgdG9vbHRpcDogJ+aMh+WumuWZquWjsOiyvOWclicgfSlcbiAgICBwdWJsaWMgbm9pc2VUZXh0dXJlOiBUZXh0dXJlMkQgfCBudWxsID0gbnVsbDtcblxuICAgIC8vI3JlZ2lvbiBmcmVxdWVuY3lcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEwLCAwLjAxXSwgdG9vbHRpcDogJ+aJreabsumikeeOhycgfSlcbiAgICBwdWJsaWMgZ2V0IGZyZXF1ZW5jeSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZnJlcXVlbmN5O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZnJlcXVlbmN5KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2ZyZXF1ZW5jeSA9IHZhbDtcbiAgICAgICAgdGhpcy5fc2V0UGFyYW1zRGlydHkoJ19mcmVxdWVuY3knKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEwLCAwLjAxXSwgdG9vbHRpcDogJ+aJreabsumikeeOhycsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9mcmVxdWVuY3k6IG51bWJlciA9IDAuMTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIGFtcGxpdHVkZVxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICfmia3mm7LluYXluqYnIH0pXG4gICAgcHVibGljIGdldCBhbXBsaXR1ZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FtcGxpdHVkZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGFtcGxpdHVkZSh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9hbXBsaXR1ZGUgPSB2YWw7XG4gICAgICAgIHRoaXMuX3NldFBhcmFtc0RpcnR5KCdfYW1wbGl0dWRlJyk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJQcml2YXRlIFByb3BzXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogJ+aJreabsuW5heW6picsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9hbXBsaXR1ZGU6IG51bWJlciA9IDAuMDI7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBzcGVlZFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICfmia3mm7LpgJ/luqYnIH0pXG4gICAgcHVibGljIGdldCBzcGVlZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BlZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBzcGVlZCh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5fc2V0UGFyYW1zRGlydHkoJ19zcGVlZCcpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICfmia3mm7LpgJ/luqYnLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfc3BlZWQ6IG51bWJlciA9IDAuMTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIGZsb3dEaXJlY3Rpb25cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHRvb2x0aXA6ICfmtYHliqjmlrnlkJEnIH0pXG4gICAgcHVibGljIGdldCBmbG93RGlyZWN0aW9uKCk6IFZlYzIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmxvd0RpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGZsb3dEaXJlY3Rpb24odmFsOiBWZWMyKSB7XG4gICAgICAgIHRoaXMuX2Zsb3dEaXJlY3Rpb24uc2V0KHZhbCk7XG4gICAgICAgIHRoaXMuX3NldFBhcmFtc0RpcnR5KCdfZmxvd0RpcmVjdGlvbicpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgdG9vbHRpcDogJ+a1geWKqOaWueWQkScgfSlcbiAgICBwcml2YXRlIF9mbG93RGlyZWN0aW9uOiBWZWMyID0gbmV3IFZlYzIoMSwgMCk7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIHByb3RlY3RlZCBfaW5zdE1hdGVyaWFsKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5lZmZlY3RBc3NldCAmJiB0aGlzLm5vaXNlVGV4dHVyZSkge1xuICAgICAgICAgICAgbGV0IG1hdCA9IG5ldyBNYXRlcmlhbCgpO1xuICAgICAgICAgICAgbWF0LmluaXRpYWxpemUoe1xuICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxuICAgICAgICAgICAgICAgIGRlZmluZXM6IHsgVVNFX1RFWFRVUkU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IHRoaXMuX2lzMkRpbjNEID8gMSA6IDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXQuc2V0UHJvcGVydHkoJ19ub3RpY2VUZXgnLCB0aGlzLm5vaXNlVGV4dHVyZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX2ZyZXF1ZW5jeScsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfZnJlcXVlbmN5JykpO1xuICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfYW1wbGl0dWRlJywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ19hbXBsaXR1ZGUnKSk7XG4gICAgICAgICAgICB0aGlzLl9zZXRQYXJhbXMoJ19zcGVlZCcsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfc3BlZWQnKSk7XG4gICAgICAgICAgICB0aGlzLl9zZXRQYXJhbXMoJ19mbG93RGlyZWN0aW9uJywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ19mbG93RGlyJykpO1xuXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLmN1c3RvbU1hdGVyaWFsID0gbWF0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IoJ0VmZmVjdFdhdGVyRmxvdzogZWZmZWN0QXNzZXQgb3Igbm9pc2UgdGV4dHVyZSBpcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3VwZGF0ZVBhcmFtcyhrZXk6IHN0cmluZywgaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ19mcmVxdWVuY3knKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX2ZyZXF1ZW5jeSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX2FtcGxpdHVkZScpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEubWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fYW1wbGl0dWRlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfc3BlZWQnKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX3NwZWVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfZmxvd0RpcmVjdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEubWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fZmxvd0RpcmVjdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuIl19