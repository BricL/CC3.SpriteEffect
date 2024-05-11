"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectShadow = exports.ShadowType = void 0;
const cc_1 = require("cc");
const EffectBase_1 = require("./EffectBase");
const cc_2 = require("cc");
const cc_3 = require("cc");
const cc_4 = require("cc");
const cc_5 = require("cc");
const { ccclass, property } = cc_1._decorator;
var ShadowType;
(function (ShadowType) {
    ShadowType[ShadowType["LIMITED_BOUND"] = 0] = "LIMITED_BOUND";
    ShadowType[ShadowType["NORMAL"] = 1] = "NORMAL";
})(ShadowType = exports.ShadowType || (exports.ShadowType = {}));
let EffectShadow = class EffectShadow extends EffectBase_1.EffectBase {
    constructor() {
        super(...arguments);
        this._shadowType = ShadowType.LIMITED_BOUND;
        this._shadowColor = new cc_3.Color(0, 0, 0, 1.0);
        this._offset = new cc_4.Vec2(0.1, 0.1);
    }
    //#region ShadowType
    get shadowType() {
        return this._shadowType;
    }
    set shadowType(val) {
        this._shadowType = val;
        this._setParamsDirty('_shadowType');
    }
    //#endregion
    //#region ShadowColor
    get shadowColor() {
        return this._shadowColor;
    }
    set shadowColor(val) {
        this._shadowColor.set(val);
        this._setParamsDirty('_shadowColor');
    }
    //#endregion
    //#region Offset
    get offset() {
        return this._offset;
    }
    set offset(val) {
        this._offset.set(val);
        this._setParamsDirty('_offset');
    }
    //#endregion
    _instMaterial() {
        if (!this._sprite.customMaterial) {
            if (this.effectAsset) {
                let mat = new cc_5.Material();
                mat.initialize({
                    effectAsset: this.effectAsset,
                    defines: { USE_TEXTURE: true }
                });
                this._setParams('_shadowType', -1);
                this._setParams('_shadowColor', mat.passes[0].getHandle('_shadowColor'));
                this._setParams('_offset', mat.passes[0].getHandle('_offset'));
                this._sprite.customMaterial = mat;
            }
            else {
                cc_2.error('EffectShadow._instMaterial: effectAsset is null');
            }
        }
    }
    _updateParams(key, idx) {
        var _a, _b;
        if (key === '_shadowColor') {
            (_a = this._sprite.material) === null || _a === void 0 ? void 0 : _a.passes[0].setUniform(idx, this._shadowColor);
        }
        else if (key === '_offset') {
            (_b = this._sprite.material) === null || _b === void 0 ? void 0 : _b.passes[0].setUniform(idx, this._offset);
        }
        else if (key === '_shadowType') {
            let mat = new cc_5.Material();
            switch (this._shadowType) {
                case ShadowType.LIMITED_BOUND:
                    mat.initialize({
                        effectAsset: this.effectAsset,
                        defines: { USE_TEXTURE: true },
                        technique: 0
                    });
                    break;
                case ShadowType.NORMAL:
                    mat.initialize({
                        effectAsset: this.effectAsset,
                        defines: { USE_TEXTURE: true },
                        technique: 1
                    });
                    break;
            }
            this._setParams('_shadowType', -1);
            this._setParams('_shadowColor', mat.passes[0].getHandle('_shadowColor'));
            this._setParams('_offset', mat.passes[0].getHandle('_offset'));
            this._sprite.customMaterial = mat;
        }
    }
};
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Enum(ShadowType), tooltip: "陰影模式" })
], EffectShadow.prototype, "shadowType", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, tooltip: "陰影模式", visible: true })
], EffectShadow.prototype, "_shadowType", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, tooltip: "陰影顏色" })
], EffectShadow.prototype, "shadowColor", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, tooltip: "陰影顏色", visible: true })
], EffectShadow.prototype, "_shadowColor", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, tooltip: "偏移量" })
], EffectShadow.prototype, "offset", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "偏移量", visible: true })
], EffectShadow.prototype, "_offset", void 0);
EffectShadow = __decorate([
    ccclass('EffectShadow')
], EffectShadow);
exports.EffectShadow = EffectShadow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0U2hhZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2Fzc2V0cy9zY3JpcHQvRWZmZWN0U2hhZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUFzQztBQUN0Qyw2Q0FBMEM7QUFDMUMsMkJBQTJCO0FBQzNCLDJCQUEyQjtBQUMzQiwyQkFBMEI7QUFDMUIsMkJBQThCO0FBRTlCLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBRXpDLElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNsQiw2REFBYSxDQUFBO0lBQ2IsK0NBQU0sQ0FBQTtBQUNWLENBQUMsRUFIVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUdyQjtBQUdELElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSx1QkFBVTtJQUE1Qzs7UUFhWSxnQkFBVyxHQUFlLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFnQm5ELGlCQUFZLEdBQVUsSUFBSSxVQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFnQjlDLFlBQU8sR0FBUyxJQUFJLFNBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUEwRC9DLENBQUM7SUF0R0csb0JBQW9CO0lBRXBCLElBQVcsVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQVcsVUFBVSxDQUFDLEdBQWU7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBSUQsWUFBWTtJQUdaLHFCQUFxQjtJQUVyQixJQUFXLFdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFXLFdBQVcsQ0FB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RSxDQUFDOzBDQUd2RTtBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzZDQUM5RTtBQTdDbEMsWUFBWTtJQUR4QixPQUFPLENBQUMsY0FBYyxDQUFDO0dBQ1gsWUFBWSxDQXVHeEI7QUF2R1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnVtLCBfZGVjb3JhdG9yIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgRWZmZWN0QmFzZSB9IGZyb20gJy4vRWZmZWN0QmFzZSc7XG5pbXBvcnQgeyBlcnJvciB9IGZyb20gJ2NjJztcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgVmVjMiB9IGZyb20gJ2NjJztcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnY2MnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBTaGFkb3dUeXBlIHtcbiAgICBMSU1JVEVEX0JPVU5ELFxuICAgIE5PUk1BTFxufVxuXG5AY2NjbGFzcygnRWZmZWN0U2hhZG93JylcbmV4cG9ydCBjbGFzcyBFZmZlY3RTaGFkb3cgZXh0ZW5kcyBFZmZlY3RCYXNlIHtcbiAgICAvLyNyZWdpb24gU2hhZG93VHlwZVxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdHlwZTogRW51bShTaGFkb3dUeXBlKSwgdG9vbHRpcDogXCLpmbDlvbHmqKHlvI9cIiB9KVxuICAgIHB1YmxpYyBnZXQgc2hhZG93VHlwZSgpOiBTaGFkb3dUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYWRvd1R5cGU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBzaGFkb3dUeXBlKHZhbDogU2hhZG93VHlwZSkge1xuICAgICAgICB0aGlzLl9zaGFkb3dUeXBlID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX3NoYWRvd1R5cGUnKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHRvb2x0aXA6IFwi6Zmw5b2x5qih5byPXCIsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9zaGFkb3dUeXBlOiBTaGFkb3dUeXBlID0gU2hhZG93VHlwZS5MSU1JVEVEX0JPVU5EO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gU2hhZG93Q29sb3JcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHRvb2x0aXA6IFwi6Zmw5b2x6aGP6ImyXCIgfSlcbiAgICBwdWJsaWMgZ2V0IHNoYWRvd0NvbG9yKCk6IENvbG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYWRvd0NvbG9yO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgc2hhZG93Q29sb3IodmFsOiBDb2xvcikge1xuICAgICAgICB0aGlzLl9zaGFkb3dDb2xvci5zZXQodmFsKTtcbiAgICAgICAgdGhpcy5fc2V0UGFyYW1zRGlydHkoJ19zaGFkb3dDb2xvcicpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgdG9vbHRpcDogXCLpmbDlvbHpoY/oibJcIiwgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX3NoYWRvd0NvbG9yOiBDb2xvciA9IG5ldyBDb2xvcigwLCAwLCAwLCAxLjApO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gT2Zmc2V0XG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0b29sdGlwOiBcIuWBj+enu+mHj1wiIH0pXG4gICAgcHVibGljIGdldCBvZmZzZXQoKTogVmVjMiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBvZmZzZXQodmFsOiBWZWMyKSB7XG4gICAgICAgIHRoaXMuX29mZnNldC5zZXQodmFsKTtcbiAgICAgICAgdGhpcy5fc2V0UGFyYW1zRGlydHkoJ19vZmZzZXQnKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEsIDAuMDFdLCB0b29sdGlwOiBcIuWBj+enu+mHj1wiLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfb2Zmc2V0OiBWZWMyID0gbmV3IFZlYzIoMC4xLCAwLjEpO1xuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgXG4gICAgcHJvdGVjdGVkIF9pbnN0TWF0ZXJpYWwoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fc3ByaXRlIS5jdXN0b21NYXRlcmlhbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWZmZWN0QXNzZXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWF0OiBNYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCgpO1xuICAgICAgICAgICAgICAgIG1hdC5pbml0aWFsaXplKHtcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXG4gICAgICAgICAgICAgICAgICAgIGRlZmluZXM6IHsgVVNFX1RFWFRVUkU6IHRydWUgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfc2hhZG93VHlwZScsIC0xKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRQYXJhbXMoJ19zaGFkb3dDb2xvcicsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfc2hhZG93Q29sb3InKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfb2Zmc2V0JywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ19vZmZzZXQnKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGUhLmN1c3RvbU1hdGVyaWFsID0gbWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyb3IoJ0VmZmVjdFNoYWRvdy5faW5zdE1hdGVyaWFsOiBlZmZlY3RBc3NldCBpcyBudWxsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3VwZGF0ZVBhcmFtcyhrZXk6IHN0cmluZywgaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ19zaGFkb3dDb2xvcicpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEubWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fc2hhZG93Q29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ19vZmZzZXQnKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX29mZnNldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX3NoYWRvd1R5cGUnKSB7XG4gICAgICAgICAgICBsZXQgbWF0OiBNYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCgpO1xuICAgICAgICAgICAgc3dpdGNoKHRoaXMuX3NoYWRvd1R5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFNoYWRvd1R5cGUuTElNSVRFRF9CT1VORDpcbiAgICAgICAgICAgICAgICAgICAgbWF0LmluaXRpYWxpemUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbmVzOiB7IFVTRV9URVhUVVJFOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IDBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU2hhZG93VHlwZS5OT1JNQUw6XG4gICAgICAgICAgICAgICAgICAgIG1hdC5pbml0aWFsaXplKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5lczogeyBVU0VfVEVYVFVSRTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVjaG5pcXVlOiAxXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfc2hhZG93VHlwZScsIC0xKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX3NoYWRvd0NvbG9yJywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ19zaGFkb3dDb2xvcicpKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX29mZnNldCcsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfb2Zmc2V0JykpO1xuXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLmN1c3RvbU1hdGVyaWFsID0gbWF0O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbiJdfQ==