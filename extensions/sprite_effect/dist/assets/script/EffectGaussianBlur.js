"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectGaussianBlur = void 0;
const cc_1 = require("cc");
const EffectBase_1 = require("./EffectBase");
const cc_2 = require("cc");
const cc_3 = require("cc");
const cc_4 = require("cc");
const cc_5 = require("cc");
const cc_6 = require("cc");
const { ccclass, property } = cc_1._decorator;
let EffectGaussianBlur = class EffectGaussianBlur extends EffectBase_1.EffectBase {
    constructor() {
        super(...arguments);
        this._blur = 0.5;
        //#endregion
        this._blurTextureSize = new cc_4.Vec2(100, 100);
        this._contentSize = new cc_6.math.Size(100, 100);
    }
    //#region blur
    get blur() {
        return this._blur;
    }
    set blur(val) {
        this._blur = val;
        this._setParamsDirty('_blur');
    }
    _instMaterial() {
        if (this.effectAsset) {
            let mat = new cc_3.Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                technique: this._is2Din3D ? 1 : 0
            });
            this._contentSize = this._sprite.getComponent(cc_5.UITransform).contentSize;
            this._setParams('_baseUV', mat.passes[0].getHandle('_baseUV'));
            this._setParams('_textureSize', mat.passes[0].getHandle('_textureSize'));
            this._setParams('_blur', mat.passes[0].getHandle('_blur'));
            this._sprite.customMaterial = mat;
        }
        else {
            cc_2.error('EffectDistort: effectAsset is null');
        }
    }
    _updateParams(key, idx) {
        var _a, _b, _c;
        if (key === '_baseUV') {
            (_a = this._sprite.material) === null || _a === void 0 ? void 0 : _a.passes[0].setUniform(idx, this._getUV(this._sprite.spriteFrame.uv));
        }
        else if (key === '_textureSize') {
            const baseUV = this._getUV(this._sprite.spriteFrame.uv);
            if (this._sprite.spriteFrame) {
                this._blurTextureSize.x = Math.floor(this._sprite.spriteFrame.width * baseUV.z);
                this._blurTextureSize.y = Math.floor(this._sprite.spriteFrame.height * baseUV.w);
            }
            else {
                this._blurTextureSize.x = this._contentSize.width;
                this._blurTextureSize.y = this._contentSize.height;
            }
            (_b = this._sprite.material) === null || _b === void 0 ? void 0 : _b.passes[0].setUniform(idx, this._blurTextureSize);
        }
        else if (key === '_blur') {
            (_c = this._sprite.material) === null || _c === void 0 ? void 0 : _c.passes[0].setUniform(idx, this._blur);
        }
    }
};
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '模糊程度' })
], EffectGaussianBlur.prototype, "blur", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '模糊程度', visible: true })
], EffectGaussianBlur.prototype, "_blur", void 0);
EffectGaussianBlur = __decorate([
    ccclass('EffectGaussianBlur')
], EffectGaussianBlur);
exports.EffectGaussianBlur = EffectGaussianBlur;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0R2F1c3NpYW5CbHVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2Fzc2V0cy9zY3JpcHQvRWZmZWN0R2F1c3NpYW5CbHVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUFnQztBQUNoQyw2Q0FBMEM7QUFDMUMsMkJBQTJCO0FBQzNCLDJCQUE4QjtBQUM5QiwyQkFBMEI7QUFDMUIsMkJBQWlDO0FBQ2pDLDJCQUEwQjtBQUcxQixNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUd6QyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLHVCQUFVO0lBQWxEOztRQWFZLFVBQUssR0FBVyxHQUFHLENBQUM7UUFDNUIsWUFBWTtRQUdKLHFCQUFnQixHQUFTLElBQUksU0FBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1QyxpQkFBWSxHQUFjLElBQUksU0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUE2QzlELENBQUM7SUE5REcsY0FBYztJQUVkLElBQVcsSUFBSTtRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBVyxJQUFJLENBQUMsR0FBVztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFVUyxhQUFhO1FBQ25CLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLEdBQUcsR0FBYSxJQUFJLGFBQVEsRUFBRSxDQUFDO1lBQ25DLEdBQUcsQ0FBQyxVQUFVLENBQUM7Z0JBQ1gsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUM3QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQVEsQ0FBQyxZQUFZLENBQUMsZ0JBQVcsQ0FBRSxDQUFDLFdBQVcsQ0FBQztZQUV6RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUUzRCxJQUFJLENBQUMsT0FBUSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7U0FDdEM7YUFDSTtZQUNELFVBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQztJQUVTLGFBQWEsQ0FBQyxHQUFXLEVBQUUsR0FBVzs7UUFDNUMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ25CLE1BQUEsSUFBSSxDQUFDLE9BQVEsQ0FBQyxRQUFRLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFRLENBQUMsV0FBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDakc7YUFDSSxJQUFJLEdBQUcsS0FBSyxjQUFjLEVBQUU7WUFDN0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBUSxDQUFDLFdBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUUxRCxJQUFJLElBQUksQ0FBQyxPQUFRLENBQUMsV0FBVyxFQUFFO2dCQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckY7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFDbEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQzthQUN0RDtZQUVELE1BQUEsSUFBSSxDQUFDLE9BQVEsQ0FBQyxRQUFRLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUM1RTthQUNJLElBQUksR0FBRyxLQUFLLE9BQU8sRUFBRTtZQUN0QixNQUFBLElBQUksQ0FBQyxPQUFRLENBQUMsUUFBUSwwQ0FBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pFO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUE1REc7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzhDQUc5RztBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO2lEQUNsRztBQWJuQixrQkFBa0I7SUFEOUIsT0FBTyxDQUFDLG9CQUFvQixDQUFDO0dBQ2pCLGtCQUFrQixDQStEOUI7QUEvRFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVmZmVjdEJhc2UgfSBmcm9tICcuL0VmZmVjdEJhc2UnO1xuaW1wb3J0IHsgZXJyb3IgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IFZlYzIgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBVSVRyYW5zZm9ybSB9IGZyb20gJ2NjJztcbmltcG9ydCB7IG1hdGggfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBFRElUT1IsIFBSRVZJRVcgfSBmcm9tICdjYy9lbnYnXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKCdFZmZlY3RHYXVzc2lhbkJsdXInKVxuZXhwb3J0IGNsYXNzIEVmZmVjdEdhdXNzaWFuQmx1ciBleHRlbmRzIEVmZmVjdEJhc2Uge1xuICAgIC8vI3JlZ2lvbiBibHVyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAsIDEuMCwgMC4wMV0sIHRvb2x0aXA6ICfmqKHns4rnqIvluqYnIH0pXG4gICAgcHVibGljIGdldCBibHVyKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ibHVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgYmx1cih2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9ibHVyID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX2JsdXInKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgMS4wLCAwLjAxXSwgdG9vbHRpcDogJ+aooeeziueoi+W6picsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9ibHVyOiBudW1iZXIgPSAwLjU7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIHByaXZhdGUgX2JsdXJUZXh0dXJlU2l6ZTogVmVjMiA9IG5ldyBWZWMyKDEwMCwgMTAwKTtcbiAgICBwcml2YXRlIF9jb250ZW50U2l6ZTogbWF0aC5TaXplID0gbmV3IG1hdGguU2l6ZSgxMDAsIDEwMCk7XG5cbiAgICBwcm90ZWN0ZWQgX2luc3RNYXRlcmlhbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZWZmZWN0QXNzZXQpIHtcbiAgICAgICAgICAgIGxldCBtYXQ6IE1hdGVyaWFsID0gbmV3IE1hdGVyaWFsKCk7XG4gICAgICAgICAgICBtYXQuaW5pdGlhbGl6ZSh7XG4gICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlOiB0aGlzLl9pczJEaW4zRCA/IDEgOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5fY29udGVudFNpemUgPSB0aGlzLl9zcHJpdGUhLmdldENvbXBvbmVudChVSVRyYW5zZm9ybSkhLmNvbnRlbnRTaXplO1xuXG4gICAgICAgICAgICB0aGlzLl9zZXRQYXJhbXMoJ19iYXNlVVYnLCBtYXQucGFzc2VzWzBdLmdldEhhbmRsZSgnX2Jhc2VVVicpKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX3RleHR1cmVTaXplJywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ190ZXh0dXJlU2l6ZScpKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX2JsdXInLCBtYXQucGFzc2VzWzBdLmdldEhhbmRsZSgnX2JsdXInKSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEuY3VzdG9tTWF0ZXJpYWwgPSBtYXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlcnJvcignRWZmZWN0RGlzdG9ydDogZWZmZWN0QXNzZXQgaXMgbnVsbCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF91cGRhdGVQYXJhbXMoa2V5OiBzdHJpbmcsIGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChrZXkgPT09ICdfYmFzZVVWJykge1xuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5tYXRlcmlhbD8ucGFzc2VzWzBdLnNldFVuaWZvcm0oaWR4LCB0aGlzLl9nZXRVVih0aGlzLl9zcHJpdGUhLnNwcml0ZUZyYW1lIS51dikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ190ZXh0dXJlU2l6ZScpIHtcbiAgICAgICAgICAgIGNvbnN0IGJhc2VVViA9IHRoaXMuX2dldFVWKHRoaXMuX3Nwcml0ZSEuc3ByaXRlRnJhbWUhLnV2KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3Nwcml0ZSEuc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibHVyVGV4dHVyZVNpemUueCA9IE1hdGguZmxvb3IodGhpcy5fc3ByaXRlIS5zcHJpdGVGcmFtZS53aWR0aCAqIGJhc2VVVi56KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibHVyVGV4dHVyZVNpemUueSA9IE1hdGguZmxvb3IodGhpcy5fc3ByaXRlIS5zcHJpdGVGcmFtZS5oZWlnaHQgKiBiYXNlVVYudyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibHVyVGV4dHVyZVNpemUueCA9IHRoaXMuX2NvbnRlbnRTaXplLndpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2JsdXJUZXh0dXJlU2l6ZS55ID0gdGhpcy5fY29udGVudFNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX2JsdXJUZXh0dXJlU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX2JsdXInKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX2JsdXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbiJdfQ==