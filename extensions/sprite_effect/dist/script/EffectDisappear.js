"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectDisappear = exports.Direction = void 0;
const cc_1 = require("cc");
const EffectBase_1 = require("./EffectBase");
const cc_2 = require("cc");
const cc_3 = require("cc");
const { ccclass, property } = cc_1._decorator;
var Direction;
(function (Direction) {
    Direction[Direction["HORIZONTAL"] = 0] = "HORIZONTAL";
    Direction[Direction["VERTICAL"] = 1] = "VERTICAL";
})(Direction = exports.Direction || (exports.Direction = {}));
let EffectDisappear = class EffectDisappear extends EffectBase_1.EffectBase {
    constructor() {
        super(...arguments);
        this.secondSprite = null;
        this._dirMode = Direction.VERTICAL;
        this._offset = 0.0;
        this._soft = 0.0;
        //#endregion
        this._define_macro = {
            USE_TEXTURE: true,
            DIR_VERTICAL: true
        };
    }
    //#region toneMode
    get dirMode() {
        return this._dirMode;
    }
    set dirMode(val) {
        this._dirMode = val;
        this._setParamsDirty('_dirMode');
    }
    //#endregion
    //#region disappearOffset
    get offset() {
        return this._offset;
    }
    set offset(val) {
        this._offset = val;
        this._setParamsDirty('_offset');
    }
    //#endregion
    //#region translucentOffset
    get soft() {
        return this._soft;
    }
    set soft(val) {
        this._soft = val;
        this._setParamsDirty('_soft');
    }
    setSecondSprite(sprite) {
        this.secondSprite = sprite;
        this._sprite.material.setProperty('_secondSprite', this.secondSprite);
    }
    _instMaterial() {
        if (this.effectAsset) {
            let mat = new cc_3.Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                defines: this._define_macro,
                technique: this._is2Din3D ? 1 : 0
            });
            mat.setProperty('_secondSprite', this.secondSprite);
            this._setParams('_dirMode', -1);
            this._setParams('_offset', mat.passes[0].getHandle('_offset'));
            this._setParams('_soft', mat.passes[0].getHandle('_soft'));
            this._sprite.customMaterial = mat;
        }
        else {
            cc_2.error('EffectDisappear._instMaterial: effectAsset is null');
        }
    }
    _updateParams(key, idx) {
        var _a, _b;
        if (key === '_offset') {
            (_a = this._sprite.material) === null || _a === void 0 ? void 0 : _a.passes[0].setUniform(idx, this._offset);
        }
        else if (key === '_soft') {
            (_b = this._sprite.material) === null || _b === void 0 ? void 0 : _b.passes[0].setUniform(idx, this._soft);
        }
        else if (key === '_dirMode') {
            switch (this._dirMode) {
                case Direction.HORIZONTAL:
                    this._define_macro.DIR_VERTICAL = false;
                    break;
                case Direction.VERTICAL:
                    this._define_macro.DIR_VERTICAL = true;
                    break;
            }
            this._instMaterial();
        }
    }
};
__decorate([
    property({ type: cc_1.Texture2D, tooltip: '指定噪声貼圖' })
], EffectDisappear.prototype, "secondSprite", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Enum(Direction), tooltip: '指定方向' })
], EffectDisappear.prototype, "dirMode", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, type: cc_1.Enum(Direction), tooltip: '指定方向', visible: true })
], EffectDisappear.prototype, "_dirMode", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '消失偏移' })
], EffectDisappear.prototype, "offset", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '消失偏移', visible: true })
], EffectDisappear.prototype, "_offset", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 0.5, 0.01], tooltip: '柔邊程度' })
], EffectDisappear.prototype, "soft", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 0.5, 0.01], tooltip: '柔邊程度', visible: true })
], EffectDisappear.prototype, "_soft", void 0);
EffectDisappear = __decorate([
    ccclass('EffectDisappear')
], EffectDisappear);
exports.EffectDisappear = EffectDisappear;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0RGlzYXBwZWFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL3NjcmlwdC9FZmZlY3REaXNhcHBlYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQWlEO0FBQ2pELDZDQUEwQztBQUMxQywyQkFBMkI7QUFDM0IsMkJBQThCO0FBRzlCLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBRXpDLElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNqQixxREFBVSxDQUFBO0lBQ1YsaURBQVEsQ0FBQTtBQUNaLENBQUMsRUFIVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUdwQjtBQUdELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsdUJBQVU7SUFBL0M7O1FBRVcsaUJBQVksR0FBcUIsSUFBSSxDQUFDO1FBY3JDLGFBQVEsR0FBYyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBZXpDLFlBQU8sR0FBVyxHQUFHLENBQUM7UUFnQnRCLFVBQUssR0FBVyxHQUFHLENBQUM7UUFDNUIsWUFBWTtRQUVKLGtCQUFhLEdBQUc7WUFDcEIsV0FBVyxFQUFFLElBQUk7WUFDakIsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQztJQStDTixDQUFDO0lBaEdHLGtCQUFrQjtJQUVsQixJQUFXLE9BQU87UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELElBQVcsT0FBTyxDQUFDLEdBQWM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBSUQsWUFBWTtJQUVaLHlCQUF5QjtJQUV6QixJQUFXLE1BQU07UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQVcsTUFBTSxDQUFDLEdBQVc7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MkNBRzVHO0FBUUQ7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OENBQ2hHO0FBL0NuQixlQUFlO0lBRDNCLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztHQUNkLGVBQWUsQ0FvRzNCO0FBcEdZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW51bSwgVGV4dHVyZTJELCBfZGVjb3JhdG9yIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgRWZmZWN0QmFzZSB9IGZyb20gJy4vRWZmZWN0QmFzZSc7XG5pbXBvcnQgeyBlcnJvciB9IGZyb20gJ2NjJztcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgRURJVE9SLCBQUkVWSUVXIH0gZnJvbSAnY2MvZW52J1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBEaXJlY3Rpb24ge1xuICAgIEhPUklaT05UQUwsXG4gICAgVkVSVElDQUxcbn1cblxuQGNjY2xhc3MoJ0VmZmVjdERpc2FwcGVhcicpXG5leHBvcnQgY2xhc3MgRWZmZWN0RGlzYXBwZWFyIGV4dGVuZHMgRWZmZWN0QmFzZSB7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogVGV4dHVyZTJELCB0b29sdGlwOiAn5oyH5a6a5Zmq5aOw6LK85ZyWJyB9KVxuICAgIHB1YmxpYyBzZWNvbmRTcHJpdGU6IFRleHR1cmUyRCB8IG51bGwgPSBudWxsO1xuXG4gICAgLy8jcmVnaW9uIHRvbmVNb2RlXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0eXBlOiBFbnVtKERpcmVjdGlvbiksICB0b29sdGlwOiAn5oyH5a6a5pa55ZCRJyB9KVxuICAgIHB1YmxpYyBnZXQgZGlyTW9kZSgpOiBEaXJlY3Rpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyTW9kZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGRpck1vZGUodmFsOiBEaXJlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fZGlyTW9kZSA9IHZhbDtcbiAgICAgICAgdGhpcy5fc2V0UGFyYW1zRGlydHkoJ19kaXJNb2RlJyk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJQcml2YXRlIFByb3BzXCIsIGlkOiBcIjFcIiB9LCB0eXBlOiBFbnVtKERpcmVjdGlvbiksICB0b29sdGlwOiAn5oyH5a6a5pa55ZCRJywgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX2Rpck1vZGU6IERpcmVjdGlvbiA9IERpcmVjdGlvbi5WRVJUSUNBTDtcbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiBkaXNhcHBlYXJPZmZzZXRcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEsIDAuMDFdLCB0b29sdGlwOiAn5raI5aSx5YGP56e7JyB9KVxuICAgIHB1YmxpYyBnZXQgb2Zmc2V0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBvZmZzZXQodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX29mZnNldCcpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICfmtojlpLHlgY/np7snLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfb2Zmc2V0OiBudW1iZXIgPSAwLjA7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiB0cmFuc2x1Y2VudE9mZnNldFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMC41LCAwLjAxXSwgdG9vbHRpcDogJ+aflOmCiueoi+W6picgfSlcbiAgICBwdWJsaWMgZ2V0IHNvZnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvZnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBzb2Z0KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NvZnQgPSB2YWw7XG4gICAgICAgIHRoaXMuX3NldFBhcmFtc0RpcnR5KCdfc29mdCcpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMC41LCAwLjAxXSwgdG9vbHRpcDogJ+aflOmCiueoi+W6picsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9zb2Z0OiBudW1iZXIgPSAwLjA7XG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICBwcml2YXRlIF9kZWZpbmVfbWFjcm8gPSB7XG4gICAgICAgIFVTRV9URVhUVVJFOiB0cnVlLFxuICAgICAgICBESVJfVkVSVElDQUw6IHRydWVcbiAgICB9O1xuXG4gICAgcHVibGljIHNldFNlY29uZFNwcml0ZShzcHJpdGU6IFRleHR1cmUyRCkge1xuICAgICAgICB0aGlzLnNlY29uZFNwcml0ZSA9IHNwcml0ZTtcbiAgICAgICAgdGhpcy5fc3ByaXRlIS5tYXRlcmlhbCEuc2V0UHJvcGVydHkoJ19zZWNvbmRTcHJpdGUnLCB0aGlzLnNlY29uZFNwcml0ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9pbnN0TWF0ZXJpYWwoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmVmZmVjdEFzc2V0KSB7XG4gICAgICAgICAgICBsZXQgbWF0OiBNYXRlcmlhbCA9IG5ldyBNYXRlcmlhbCgpO1xuICAgICAgICAgICAgbWF0LmluaXRpYWxpemUoe1xuICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxuICAgICAgICAgICAgICAgIGRlZmluZXM6IHRoaXMuX2RlZmluZV9tYWNybyxcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IHRoaXMuX2lzMkRpbjNEID8gMSA6IDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWF0LnNldFByb3BlcnR5KCdfc2Vjb25kU3ByaXRlJywgdGhpcy5zZWNvbmRTcHJpdGUpO1xuXG4gICAgICAgICAgICB0aGlzLl9zZXRQYXJhbXMoJ19kaXJNb2RlJywgLTEpO1xuICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfb2Zmc2V0JywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ19vZmZzZXQnKSk7XG4gICAgICAgICAgICB0aGlzLl9zZXRQYXJhbXMoJ19zb2Z0JywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ19zb2Z0JykpO1xuXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLmN1c3RvbU1hdGVyaWFsID0gbWF0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IoJ0VmZmVjdERpc2FwcGVhci5faW5zdE1hdGVyaWFsOiBlZmZlY3RBc3NldCBpcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3VwZGF0ZVBhcmFtcyhrZXk6IHN0cmluZywgaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ19vZmZzZXQnKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX29mZnNldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX3NvZnQnKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX3NvZnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ19kaXJNb2RlJykge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9kaXJNb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uSE9SSVpPTlRBTDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVmaW5lX21hY3JvLkRJUl9WRVJUSUNBTCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIERpcmVjdGlvbi5WRVJUSUNBTDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVmaW5lX21hY3JvLkRJUl9WRVJUSUNBTCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5faW5zdE1hdGVyaWFsKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuIl19