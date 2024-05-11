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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0RGlzYXBwZWFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2Fzc2V0cy9zY3JpcHQvRWZmZWN0RGlzYXBwZWFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUFpRDtBQUNqRCw2Q0FBMEM7QUFDMUMsMkJBQTJCO0FBQzNCLDJCQUE4QjtBQUc5QixNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUV6QyxJQUFZLFNBR1g7QUFIRCxXQUFZLFNBQVM7SUFDakIscURBQVUsQ0FBQTtJQUNWLGlEQUFRLENBQUE7QUFDWixDQUFDLEVBSFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7QUFHRCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLHVCQUFVO0lBQS9DOztRQUVXLGlCQUFZLEdBQXFCLElBQUksQ0FBQztRQWNyQyxhQUFRLEdBQWMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQWV6QyxZQUFPLEdBQVcsR0FBRyxDQUFDO1FBZ0J0QixVQUFLLEdBQVcsR0FBRyxDQUFDO1FBQzVCLFlBQVk7UUFFSixrQkFBYSxHQUFHO1lBQ3BCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUM7SUErQ04sQ0FBQztJQWhHRyxrQkFBa0I7SUFFbEIsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFXLE9BQU8sQ0FBQyxHQUFjO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUlELFlBQVk7SUFFWix5QkFBeUI7SUFFekIsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFXLE1BQU0s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RUFBRSxDQUFDOzJDQUc1RztBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzhDQUNoRztBQS9DbkIsZUFBZTtJQUQzQixPQUFPLENBQUMsaUJBQWlCLENBQUM7R0FDZCxlQUFlLENBb0czQjtBQXBHWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudW0sIFRleHR1cmUyRCwgX2RlY29yYXRvciB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVmZmVjdEJhc2UgfSBmcm9tICcuL0VmZmVjdEJhc2UnO1xuaW1wb3J0IHsgZXJyb3IgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVESVRPUiwgUFJFVklFVyB9IGZyb20gJ2NjL2VudidcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuZXhwb3J0IGVudW0gRGlyZWN0aW9uIHtcbiAgICBIT1JJWk9OVEFMLFxuICAgIFZFUlRJQ0FMXG59XG5cbkBjY2NsYXNzKCdFZmZlY3REaXNhcHBlYXInKVxuZXhwb3J0IGNsYXNzIEVmZmVjdERpc2FwcGVhciBleHRlbmRzIEVmZmVjdEJhc2Uge1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFRleHR1cmUyRCwgdG9vbHRpcDogJ+aMh+WumuWZquWjsOiyvOWclicgfSlcbiAgICBwdWJsaWMgc2Vjb25kU3ByaXRlOiBUZXh0dXJlMkQgfCBudWxsID0gbnVsbDtcblxuICAgIC8vI3JlZ2lvbiB0b25lTW9kZVxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdHlwZTogRW51bShEaXJlY3Rpb24pLCAgdG9vbHRpcDogJ+aMh+WumuaWueWQkScgfSlcbiAgICBwdWJsaWMgZ2V0IGRpck1vZGUoKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpck1vZGU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBkaXJNb2RlKHZhbDogRGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2Rpck1vZGUgPSB2YWw7XG4gICAgICAgIHRoaXMuX3NldFBhcmFtc0RpcnR5KCdfZGlyTW9kZScpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgdHlwZTogRW51bShEaXJlY3Rpb24pLCAgdG9vbHRpcDogJ+aMh+WumuaWueWQkScsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9kaXJNb2RlOiBEaXJlY3Rpb24gPSBEaXJlY3Rpb24uVkVSVElDQUw7XG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gZGlzYXBwZWFyT2Zmc2V0XG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogJ+a2iOWkseWBj+enuycgfSlcbiAgICBwdWJsaWMgZ2V0IG9mZnNldCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2V0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgb2Zmc2V0KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX29mZnNldCA9IHZhbDtcbiAgICAgICAgdGhpcy5fc2V0UGFyYW1zRGlydHkoJ19vZmZzZXQnKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEsIDAuMDFdLCB0b29sdGlwOiAn5raI5aSx5YGP56e7JywgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX29mZnNldDogbnVtYmVyID0gMC4wO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gdHJhbnNsdWNlbnRPZmZzZXRcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDAuNSwgMC4wMV0sIHRvb2x0aXA6ICfmn5TpgornqIvluqYnIH0pXG4gICAgcHVibGljIGdldCBzb2Z0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zb2Z0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgc29mdCh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zb2Z0ID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX3NvZnQnKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDAuNSwgMC4wMV0sIHRvb2x0aXA6ICfmn5TpgornqIvluqYnLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfc29mdDogbnVtYmVyID0gMC4wO1xuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgcHJpdmF0ZSBfZGVmaW5lX21hY3JvID0ge1xuICAgICAgICBVU0VfVEVYVFVSRTogdHJ1ZSxcbiAgICAgICAgRElSX1ZFUlRJQ0FMOiB0cnVlXG4gICAgfTtcblxuICAgIHB1YmxpYyBzZXRTZWNvbmRTcHJpdGUoc3ByaXRlOiBUZXh0dXJlMkQpIHtcbiAgICAgICAgdGhpcy5zZWNvbmRTcHJpdGUgPSBzcHJpdGU7XG4gICAgICAgIHRoaXMuX3Nwcml0ZSEubWF0ZXJpYWwhLnNldFByb3BlcnR5KCdfc2Vjb25kU3ByaXRlJywgdGhpcy5zZWNvbmRTcHJpdGUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfaW5zdE1hdGVyaWFsKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5lZmZlY3RBc3NldCkge1xuICAgICAgICAgICAgbGV0IG1hdDogTWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwoKTtcbiAgICAgICAgICAgIG1hdC5pbml0aWFsaXplKHtcbiAgICAgICAgICAgICAgICBlZmZlY3RBc3NldDogdGhpcy5lZmZlY3RBc3NldCxcbiAgICAgICAgICAgICAgICBkZWZpbmVzOiB0aGlzLl9kZWZpbmVfbWFjcm8sXG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlOiB0aGlzLl9pczJEaW4zRCA/IDEgOiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1hdC5zZXRQcm9wZXJ0eSgnX3NlY29uZFNwcml0ZScsIHRoaXMuc2Vjb25kU3ByaXRlKTtcblxuICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfZGlyTW9kZScsIC0xKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX29mZnNldCcsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfb2Zmc2V0JykpO1xuICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfc29mdCcsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfc29mdCcpKTtcblxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5jdXN0b21NYXRlcmlhbCA9IG1hdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yKCdFZmZlY3REaXNhcHBlYXIuX2luc3RNYXRlcmlhbDogZWZmZWN0QXNzZXQgaXMgbnVsbCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF91cGRhdGVQYXJhbXMoa2V5OiBzdHJpbmcsIGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChrZXkgPT09ICdfb2Zmc2V0Jykge1xuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5tYXRlcmlhbD8ucGFzc2VzWzBdLnNldFVuaWZvcm0oaWR4LCB0aGlzLl9vZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ19zb2Z0Jykge1xuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5tYXRlcmlhbD8ucGFzc2VzWzBdLnNldFVuaWZvcm0oaWR4LCB0aGlzLl9zb2Z0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfZGlyTW9kZScpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fZGlyTW9kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLkhPUklaT05UQUw6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlZmluZV9tYWNyby5ESVJfVkVSVElDQUwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uVkVSVElDQUw6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlZmluZV9tYWNyby5ESVJfVkVSVElDQUwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2luc3RNYXRlcmlhbCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbiJdfQ==