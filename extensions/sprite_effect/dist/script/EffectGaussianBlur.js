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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0R2F1c3NpYW5CbHVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL3NjcmlwdC9FZmZlY3RHYXVzc2lhbkJsdXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQWdDO0FBQ2hDLDZDQUEwQztBQUMxQywyQkFBMkI7QUFDM0IsMkJBQThCO0FBQzlCLDJCQUEwQjtBQUMxQiwyQkFBaUM7QUFDakMsMkJBQTBCO0FBRzFCLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBR3pDLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsdUJBQVU7SUFBbEQ7O1FBYVksVUFBSyxHQUFXLEdBQUcsQ0FBQztRQUM1QixZQUFZO1FBR0oscUJBQWdCLEdBQVMsSUFBSSxTQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLGlCQUFZLEdBQWMsSUFBSSxTQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQTZDOUQsQ0FBQztJQTlERyxjQUFjO0lBRWQsSUFBVyxJQUFJO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFXLElBQUksQ0FBQyxHQUFXO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQVVTLGFBQWE7UUFDbkIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksR0FBRyxHQUFhLElBQUksYUFBUSxFQUFFLENBQUM7WUFDbkMsR0FBRyxDQUFDLFVBQVUsQ0FBQztnQkFDWCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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LEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7aURBQ2xHO0FBYm5CLGtCQUFrQjtJQUQ5QixPQUFPLENBQUMsb0JBQW9CLENBQUM7R0FDakIsa0JBQWtCLENBK0Q5QjtBQS9EWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgRWZmZWN0QmFzZSB9IGZyb20gJy4vRWZmZWN0QmFzZSc7XG5pbXBvcnQgeyBlcnJvciB9IGZyb20gJ2NjJztcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgVmVjMiB9IGZyb20gJ2NjJztcbmltcG9ydCB7IFVJVHJhbnNmb3JtIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgbWF0aCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVESVRPUiwgUFJFVklFVyB9IGZyb20gJ2NjL2VudidcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuQGNjY2xhc3MoJ0VmZmVjdEdhdXNzaWFuQmx1cicpXG5leHBvcnQgY2xhc3MgRWZmZWN0R2F1c3NpYW5CbHVyIGV4dGVuZHMgRWZmZWN0QmFzZSB7XG4gICAgLy8jcmVnaW9uIGJsdXJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgMS4wLCAwLjAxXSwgdG9vbHRpcDogJ+aooeeziueoi+W6picgfSlcbiAgICBwdWJsaWMgZ2V0IGJsdXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JsdXI7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBibHVyKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2JsdXIgPSB2YWw7XG4gICAgICAgIHRoaXMuX3NldFBhcmFtc0RpcnR5KCdfYmx1cicpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMC4wLCAxLjAsIDAuMDFdLCB0b29sdGlwOiAn5qih57OK56iL5bqmJywgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX2JsdXI6IG51bWJlciA9IDAuNTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgcHJpdmF0ZSBfYmx1clRleHR1cmVTaXplOiBWZWMyID0gbmV3IFZlYzIoMTAwLCAxMDApO1xuICAgIHByaXZhdGUgX2NvbnRlbnRTaXplOiBtYXRoLlNpemUgPSBuZXcgbWF0aC5TaXplKDEwMCwgMTAwKTtcblxuICAgIHByb3RlY3RlZCBfaW5zdE1hdGVyaWFsKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5lZmZlY3RBc3NldCkge1xuICAgICAgICAgICAgbGV0IG1hdDogTWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwoKTtcbiAgICAgICAgICAgIG1hdC5pbml0aWFsaXplKHtcbiAgICAgICAgICAgICAgICBlZmZlY3RBc3NldDogdGhpcy5lZmZlY3RBc3NldCxcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IHRoaXMuX2lzMkRpbjNEID8gMSA6IDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9jb250ZW50U2l6ZSA9IHRoaXMuX3Nwcml0ZSEuZ2V0Q29tcG9uZW50KFVJVHJhbnNmb3JtKSEuY29udGVudFNpemU7XG5cbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX2Jhc2VVVicsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfYmFzZVVWJykpO1xuICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfdGV4dHVyZVNpemUnLCBtYXQucGFzc2VzWzBdLmdldEhhbmRsZSgnX3RleHR1cmVTaXplJykpO1xuICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdfYmx1cicsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdfYmx1cicpKTtcblxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5jdXN0b21NYXRlcmlhbCA9IG1hdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yKCdFZmZlY3REaXN0b3J0OiBlZmZlY3RBc3NldCBpcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3VwZGF0ZVBhcmFtcyhrZXk6IHN0cmluZywgaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ19iYXNlVVYnKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX2dldFVWKHRoaXMuX3Nwcml0ZSEuc3ByaXRlRnJhbWUhLnV2KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX3RleHR1cmVTaXplJykge1xuICAgICAgICAgICAgY29uc3QgYmFzZVVWID0gdGhpcy5fZ2V0VVYodGhpcy5fc3ByaXRlIS5zcHJpdGVGcmFtZSEudXYpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fc3ByaXRlIS5zcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2JsdXJUZXh0dXJlU2l6ZS54ID0gTWF0aC5mbG9vcih0aGlzLl9zcHJpdGUhLnNwcml0ZUZyYW1lLndpZHRoICogYmFzZVVWLnopO1xuICAgICAgICAgICAgICAgIHRoaXMuX2JsdXJUZXh0dXJlU2l6ZS55ID0gTWF0aC5mbG9vcih0aGlzLl9zcHJpdGUhLnNwcml0ZUZyYW1lLmhlaWdodCAqIGJhc2VVVi53KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2JsdXJUZXh0dXJlU2l6ZS54ID0gdGhpcy5fY29udGVudFNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmx1clRleHR1cmVTaXplLnkgPSB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEubWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fYmx1clRleHR1cmVTaXplKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfYmx1cicpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEubWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fYmx1cik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuIl19