"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectGaussianBlur = exports.BlurDirectionMode = exports.BlurQualityMode = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
var BlurQualityMode;
(function (BlurQualityMode) {
    BlurQualityMode[BlurQualityMode["LOW"] = 0] = "LOW";
    BlurQualityMode[BlurQualityMode["MEDIUM"] = 1] = "MEDIUM";
    BlurQualityMode[BlurQualityMode["HIGH"] = 2] = "HIGH";
})(BlurQualityMode = exports.BlurQualityMode || (exports.BlurQualityMode = {}));
var BlurDirectionMode;
(function (BlurDirectionMode) {
    BlurDirectionMode[BlurDirectionMode["USE_Y_DIRECTION"] = 0] = "USE_Y_DIRECTION";
    BlurDirectionMode[BlurDirectionMode["USE_X_DIRECTION"] = 1] = "USE_X_DIRECTION";
    BlurDirectionMode[BlurDirectionMode["USE_BOTH_DIRECTION"] = 2] = "USE_BOTH_DIRECTION";
})(BlurDirectionMode = exports.BlurDirectionMode || (exports.BlurDirectionMode = {}));
let SpriteEffectGaussianBlur = class SpriteEffectGaussianBlur extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this._blurQualityMode = BlurQualityMode.LOW;
        this._blurDirectionMode = BlurDirectionMode.USE_BOTH_DIRECTION;
        this._blurFactor = 0.5;
    }
    //#region blurQualityMode
    set blurQualityMode(val) {
        this._blurQualityMode = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
        else {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
    }
    get blurQualityMode() {
        return this._blurQualityMode;
    }
    //#endregion
    //#region blurMode
    set blurDirectionMode(val) {
        this._blurDirectionMode = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
        else {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
    }
    get blurDirectionMode() {
        return this._blurDirectionMode;
    }
    //#endregion
    //#region blur
    set blurFactor(val) {
        this._blurFactor = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get blurFactor() {
        return this._blurFactor;
    }
    //#endregion
    //#region override
    /**
     * @override SpriteEffectBase
     */
    get floatUsage() {
        return 16;
    }
    /**
     * @override SpriteEffectBase
     */
    getEffectUnionKey() {
        return `${this.constructor.name}_${this._is2Din3D}_${this._blurQualityMode}_${this._blurDirectionMode}`;
    }
    /**
     * @override SpriteEffectBase
     */
    updateParams(idx, textureWidth, propBuffer) {
        const baseUV = this.getUV(this.spriteFrame.uv);
        let blurTextureSize = new cc_1.Vec2(100, 100);
        if (this.spriteFrame) {
            blurTextureSize.x = Math.floor(this.spriteFrame.width * baseUV.z);
            blurTextureSize.y = Math.floor(this.spriteFrame.height * baseUV.w);
        }
        else {
            blurTextureSize.x = this.node.getComponent(cc_1.UITransform).contentSize.width;
            blurTextureSize.y = this.node.getComponent(cc_1.UITransform).contentSize.height;
        }
        let index = this.calBufferIndex(idx, 0, textureWidth);
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;
        index = this.calBufferIndex(idx, 1, textureWidth);
        propBuffer[index + 4] = baseUV.x;
        propBuffer[index + 5] = baseUV.y;
        propBuffer[index + 6] = baseUV.z;
        propBuffer[index + 7] = baseUV.w;
        index = this.calBufferIndex(idx, 2, textureWidth);
        propBuffer[index + 8] = blurTextureSize.x;
        propBuffer[index + 9] = blurTextureSize.y;
        propBuffer[index + 10] = cc_1.lerp(0.0, 3.0, this._blurFactor);
        propBuffer[index + 11] = 1.0;
    }
    /**
     * @override SpriteEffectBase
     */
    initMaterial() {
        let mat = new cc_1.Material();
        let define_macro = {
            HIGH: false,
            MEDIUM: false,
            USE_Y_DIRECTION: false,
            USE_X_DIRECTION: false,
        };
        switch (this._blurQualityMode) {
            case BlurQualityMode.HIGH:
                define_macro.HIGH = true;
                break;
            case BlurQualityMode.MEDIUM:
                define_macro.MEDIUM = true;
                break;
        }
        switch (this._blurDirectionMode) {
            case BlurDirectionMode.USE_Y_DIRECTION:
                define_macro.USE_Y_DIRECTION = true;
                break;
            case BlurDirectionMode.USE_X_DIRECTION:
                define_macro.USE_X_DIRECTION = true;
                break;
        }
        mat.initialize({
            effectAsset: this.effectAsset,
            defines: define_macro,
            technique: this._is2Din3D ? 1 : 0
        });
        return mat;
    }
};
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Enum(BlurQualityMode), tooltip: "模糊品質" })
], SpriteEffectGaussianBlur.prototype, "blurQualityMode", null);
__decorate([
    property({ type: cc_1.Enum(BlurQualityMode) })
], SpriteEffectGaussianBlur.prototype, "_blurQualityMode", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Enum(BlurDirectionMode), tooltip: "模糊模式" })
], SpriteEffectGaussianBlur.prototype, "blurDirectionMode", null);
__decorate([
    property({ type: cc_1.Enum(BlurDirectionMode) })
], SpriteEffectGaussianBlur.prototype, "_blurDirectionMode", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '模糊程度' })
], SpriteEffectGaussianBlur.prototype, "blurFactor", null);
__decorate([
    property
], SpriteEffectGaussianBlur.prototype, "_blurFactor", void 0);
SpriteEffectGaussianBlur = __decorate([
    ccclass('SpriteEffectGaussianBlur')
], SpriteEffectGaussianBlur);
exports.SpriteEffectGaussianBlur = SpriteEffectGaussianBlur;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0R2F1c3NpYW5CbHVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL3N0YXRpYy9jb21wL1Nwcml0ZUVmZmVjdEdhdXNzaWFuQmx1ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBeUU7QUFDekUsZ0NBQW9EO0FBQ3BELHlEQUFzRDtBQUN0RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUV6QyxJQUFZLGVBSVg7QUFKRCxXQUFZLGVBQWU7SUFDdkIsbURBQUcsQ0FBQTtJQUNILHlEQUFNLENBQUE7SUFDTixxREFBSSxDQUFBO0FBQ1IsQ0FBQyxFQUpXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBSTFCO0FBRUQsSUFBWSxpQkFJWDtBQUpELFdBQVksaUJBQWlCO0lBQ3pCLCtFQUFlLENBQUE7SUFDZiwrRUFBZSxDQUFBO0lBQ2YscUZBQWtCLENBQUE7QUFDdEIsQ0FBQyxFQUpXLGlCQUFpQixHQUFqQix5QkFBaUIsS0FBakIseUJBQWlCLFFBSTVCO0FBR0QsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBeUIsU0FBUSxtQ0FBZ0I7SUFBOUQ7O1FBb0JZLHFCQUFnQixHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUM7UUF1QnZDLHVCQUFrQixHQUFHLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDO1FBc0IxRCxnQkFBVyxHQUFXLEdBQUcsQ0FBQztJQTJGdEMsQ0FBQztJQTNKRyx5QkFBeUI7SUFFekIsSUFBVyxlQUFlLENBQUMsR0FBb0I7UUFDM0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztRQUU1QixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUFNO1lBQ0gsSUFB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QVEsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztrRUFDSztBQU0vQztJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7aUVBV3ZHO0FBT0Q7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQztvRUFDc0I7QUFNbEU7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzBEQVU5RztBQU9EO0lBREMsUUFBUTs2REFDeUI7QUFqRXpCLHdCQUF3QjtJQURwQyxPQUFPLENBQUMsMEJBQTBCLENBQUM7R0FDdkIsd0JBQXdCLENBNEpwQztBQTVKWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBFbnVtLCBsZXJwLCBNYXRlcmlhbCwgVUlUcmFuc2Zvcm0sIFZlYzIgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBERVYsIEVESVRPUl9OT1RfSU5fUFJFVklFVyB9IGZyb20gJ2NjL2Vudic7XG5pbXBvcnQgeyBTcHJpdGVFZmZlY3RCYXNlIH0gZnJvbSAnLi9TcHJpdGVFZmZlY3RCYXNlJztcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbmV4cG9ydCBlbnVtIEJsdXJRdWFsaXR5TW9kZSB7XG4gICAgTE9XLFxuICAgIE1FRElVTSxcbiAgICBISUdILFxufVxuXG5leHBvcnQgZW51bSBCbHVyRGlyZWN0aW9uTW9kZSB7XG4gICAgVVNFX1lfRElSRUNUSU9OLFxuICAgIFVTRV9YX0RJUkVDVElPTixcbiAgICBVU0VfQk9USF9ESVJFQ1RJT05cbn1cblxuQGNjY2xhc3MoJ1Nwcml0ZUVmZmVjdEdhdXNzaWFuQmx1cicpXG5leHBvcnQgY2xhc3MgU3ByaXRlRWZmZWN0R2F1c3NpYW5CbHVyIGV4dGVuZHMgU3ByaXRlRWZmZWN0QmFzZSB7XG4gICAgLy8jcmVnaW9uIGJsdXJRdWFsaXR5TW9kZVxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdHlwZTogRW51bShCbHVyUXVhbGl0eU1vZGUpLCB0b29sdGlwOiBcIuaooeeziuWTgeizqlwiIH0pXG4gICAgcHVibGljIHNldCBibHVyUXVhbGl0eU1vZGUodmFsOiBCbHVyUXVhbGl0eU1vZGUpIHtcbiAgICAgICAgdGhpcy5fYmx1clF1YWxpdHlNb2RlID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdCh0aGlzLnBpeGVsc1VzYWdlKTtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMucGl4ZWxzVXNhZ2UpO1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGJsdXJRdWFsaXR5TW9kZSgpOiBCbHVyUXVhbGl0eU1vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmx1clF1YWxpdHlNb2RlO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEVudW0oQmx1clF1YWxpdHlNb2RlKSB9KVxuICAgIHByaXZhdGUgX2JsdXJRdWFsaXR5TW9kZSA9IEJsdXJRdWFsaXR5TW9kZS5MT1c7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBibHVyTW9kZVxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdHlwZTogRW51bShCbHVyRGlyZWN0aW9uTW9kZSksIHRvb2x0aXA6IFwi5qih57OK5qih5byPXCIgfSlcbiAgICBwdWJsaWMgc2V0IGJsdXJEaXJlY3Rpb25Nb2RlKHZhbDogQmx1ckRpcmVjdGlvbk1vZGUpIHtcbiAgICAgICAgdGhpcy5fYmx1ckRpcmVjdGlvbk1vZGUgPSB2YWw7XG5cbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMucGl4ZWxzVXNhZ2UpO1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluaXQodGhpcy5waXhlbHNVc2FnZSk7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYmx1ckRpcmVjdGlvbk1vZGUoKTogQmx1ckRpcmVjdGlvbk1vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmx1ckRpcmVjdGlvbk1vZGU7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogRW51bShCbHVyRGlyZWN0aW9uTW9kZSkgfSlcbiAgICBwcml2YXRlIF9ibHVyRGlyZWN0aW9uTW9kZSA9IEJsdXJEaXJlY3Rpb25Nb2RlLlVTRV9CT1RIX0RJUkVDVElPTjtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIGJsdXJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgMS4wLCAwLjAxXSwgdG9vbHRpcDogJ+aooeeziueoi+W6picgfSlcbiAgICBwdWJsaWMgc2V0IGJsdXJGYWN0b3IodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fYmx1ckZhY3RvciA9IHZhbDtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBibHVyRmFjdG9yKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ibHVyRmFjdG9yO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX2JsdXJGYWN0b3I6IG51bWJlciA9IDAuNTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIG92ZXJyaWRlXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0IGZsb2F0VXNhZ2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDE2O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldEVmZmVjdFVuaW9uS2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9XyR7dGhpcy5faXMyRGluM0R9XyR7dGhpcy5fYmx1clF1YWxpdHlNb2RlfV8ke3RoaXMuX2JsdXJEaXJlY3Rpb25Nb2RlfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlUGFyYW1zKGlkeDogbnVtYmVyLCB0ZXh0dXJlV2lkdGg6IG51bWJlciwgcHJvcEJ1ZmZlcjogRmxvYXQzMkFycmF5KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGJhc2VVViA9IHRoaXMuZ2V0VVYodGhpcy5zcHJpdGVGcmFtZSEudXYpO1xuXG4gICAgICAgIGxldCBibHVyVGV4dHVyZVNpemUgPSBuZXcgVmVjMigxMDAsIDEwMCk7XG4gICAgICAgIGlmICh0aGlzLnNwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICBibHVyVGV4dHVyZVNpemUueCA9IE1hdGguZmxvb3IodGhpcy5zcHJpdGVGcmFtZS53aWR0aCAqIGJhc2VVVi56KTtcbiAgICAgICAgICAgIGJsdXJUZXh0dXJlU2l6ZS55ID0gTWF0aC5mbG9vcih0aGlzLnNwcml0ZUZyYW1lLmhlaWdodCAqIGJhc2VVVi53KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJsdXJUZXh0dXJlU2l6ZS54ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChVSVRyYW5zZm9ybSkhLmNvbnRlbnRTaXplLndpZHRoO1xuICAgICAgICAgICAgYmx1clRleHR1cmVTaXplLnkgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFVJVHJhbnNmb3JtKSEuY29udGVudFNpemUuaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDAsIHRleHR1cmVXaWR0aCk7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAwXSA9IHRoaXMuX2VmZmVjdENvbG9yLnIgLyAyNTU7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxXSA9IHRoaXMuX2VmZmVjdENvbG9yLmcgLyAyNTU7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAyXSA9IHRoaXMuX2VmZmVjdENvbG9yLmIgLyAyNTU7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAzXSA9IHRoaXMuX2VmZmVjdENvbG9yLmEgLyAyNTU7XG5cbiAgICAgICAgaW5kZXggPSB0aGlzLmNhbEJ1ZmZlckluZGV4KGlkeCwgMSwgdGV4dHVyZVdpZHRoKTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDRdID0gYmFzZVVWLng7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA1XSA9IGJhc2VVVi55O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNl0gPSBiYXNlVVYuejtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDddID0gYmFzZVVWLnc7XG5cbiAgICAgICAgaW5kZXggPSB0aGlzLmNhbEJ1ZmZlckluZGV4KGlkeCwgMiwgdGV4dHVyZVdpZHRoKTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDhdID0gYmx1clRleHR1cmVTaXplLng7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA5XSA9IGJsdXJUZXh0dXJlU2l6ZS55O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTBdID0gbGVycCgwLjAsIDMuMCwgdGhpcy5fYmx1ckZhY3Rvcik7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxMV0gPSAxLjA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5pdE1hdGVyaWFsKCk6IE1hdGVyaWFsIHtcbiAgICAgICAgbGV0IG1hdCA9IG5ldyBNYXRlcmlhbCgpO1xuICAgICAgICBsZXQgZGVmaW5lX21hY3JvID0ge1xuICAgICAgICAgICAgSElHSDogZmFsc2UsXG4gICAgICAgICAgICBNRURJVU06IGZhbHNlLFxuICAgICAgICAgICAgVVNFX1lfRElSRUNUSU9OOiBmYWxzZSxcbiAgICAgICAgICAgIFVTRV9YX0RJUkVDVElPTjogZmFsc2UsXG4gICAgICAgIH07XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLl9ibHVyUXVhbGl0eU1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgQmx1clF1YWxpdHlNb2RlLkhJR0g6XG4gICAgICAgICAgICAgICAgZGVmaW5lX21hY3JvLkhJR0ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBCbHVyUXVhbGl0eU1vZGUuTUVESVVNOlxuICAgICAgICAgICAgICAgIGRlZmluZV9tYWNyby5NRURJVU0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLl9ibHVyRGlyZWN0aW9uTW9kZSkge1xuICAgICAgICAgICAgY2FzZSBCbHVyRGlyZWN0aW9uTW9kZS5VU0VfWV9ESVJFQ1RJT046XG4gICAgICAgICAgICAgICAgZGVmaW5lX21hY3JvLlVTRV9ZX0RJUkVDVElPTiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEJsdXJEaXJlY3Rpb25Nb2RlLlVTRV9YX0RJUkVDVElPTjpcbiAgICAgICAgICAgICAgICBkZWZpbmVfbWFjcm8uVVNFX1hfRElSRUNUSU9OID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIG1hdC5pbml0aWFsaXplKHtcbiAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxuICAgICAgICAgICAgZGVmaW5lczogZGVmaW5lX21hY3JvLFxuICAgICAgICAgICAgdGVjaG5pcXVlOiB0aGlzLl9pczJEaW4zRCA/IDEgOiAwXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWF0O1xuICAgIH1cbn0iXX0=