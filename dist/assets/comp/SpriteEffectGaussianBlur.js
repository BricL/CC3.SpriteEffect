"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SpriteEffectGaussianBlur_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectGaussianBlur = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
let SpriteEffectGaussianBlur = SpriteEffectGaussianBlur_1 = class SpriteEffectGaussianBlur extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this._blurFactor = 0.5;
    }
    isDirty(idx) {
        return SpriteEffectGaussianBlur_1._isPropDirty[idx];
    }
    setDirty(idx, val) {
        SpriteEffectGaussianBlur_1._isPropDirty[idx] = val;
    }
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
    get countOfUsedFloats() {
        return 16;
    }
    /**
     * @override SpriteEffectBase
     */
    getPropsUnionKey() {
        return `${this.constructor.name}_${this._is2Din3D}`;
    }
    /**
     * @override SpriteEffectBase
     */
    updateParams(index, propBuffer) {
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
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;
        propBuffer[index + 4] = baseUV.x;
        propBuffer[index + 5] = baseUV.y;
        propBuffer[index + 6] = baseUV.z;
        propBuffer[index + 7] = baseUV.w;
        propBuffer[index + 8] = blurTextureSize.x;
        propBuffer[index + 9] = blurTextureSize.y;
        propBuffer[index + 10] = this._blurFactor;
    }
    /**
     * @override SpriteEffectBase
     */
    initMaterial() {
        let mat = new cc_1.Material();
        mat.initialize({
            effectAsset: this.effectAsset,
            defines: {},
            technique: this._is2Din3D ? 1 : 0
        });
        return mat;
    }
};
SpriteEffectGaussianBlur._isPropDirty = [false, false, false];
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '模糊程度' })
], SpriteEffectGaussianBlur.prototype, "blurFactor", null);
__decorate([
    property
], SpriteEffectGaussianBlur.prototype, "_blurFactor", void 0);
SpriteEffectGaussianBlur = SpriteEffectGaussianBlur_1 = __decorate([
    ccclass('SpriteEffectGaussianBlur')
], SpriteEffectGaussianBlur);
exports.SpriteEffectGaussianBlur = SpriteEffectGaussianBlur;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0R2F1c3NpYW5CbHVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2Fzc2V0cy9jb21wL1Nwcml0ZUVmZmVjdEdhdXNzaWFuQmx1ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkJBQW9FO0FBQ3BFLGdDQUFvRDtBQUNwRCx5REFBc0Q7QUFDdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxlQUFVLENBQUM7QUFJekMsSUFBYSx3QkFBd0IsZ0NBQXJDLE1BQWEsd0JBQXlCLFNBQVEsbUNBQWdCO0lBQTlEOztRQThCWSxnQkFBVyxHQUFXLEdBQUcsQ0FBQztJQWdFdEMsQ0FBQztJQTNGYSxPQUFPLENBQUMsR0FBVztRQUN6QixPQUFPLDBCQUF3QixDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRVMsUUFBUSxDQUFDLEdBQVcsRUFBRSxHQUFZO1FBQ3hDLDBCQUF3QixDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDckQsQ0FBQztJQUdELGNBQWM7SUFFZCxJQUFXLFVBQVUsQ0FBQyxHQUFXO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBRXZCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBSUQsWUFBWTtJQUdaLGtCQUFrQjtJQUNsQjs7T0FFRztJQUNILElBQWMsaUJBQWlCO1FBQzNCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ08sZ0JBQWdCO1FBQ3RCLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FB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ZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzBEQVU5RztBQU9EO0lBREMsUUFBUTs2REFDeUI7QUE5QnpCLHdCQUF3QjtJQURwQyxPQUFPLENBQUMsMEJBQTBCLENBQUM7R0FDdkIsd0JBQXdCLENBOEZwQztBQTlGWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb2xvciwgTWF0ZXJpYWwsIFVJVHJhbnNmb3JtLCBWZWMyIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgREVWLCBFRElUT1JfTk9UX0lOX1BSRVZJRVcgfSBmcm9tICdjYy9lbnYnO1xuaW1wb3J0IHsgU3ByaXRlRWZmZWN0QmFzZSB9IGZyb20gJy4vU3ByaXRlRWZmZWN0QmFzZSc7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xuXG5cbkBjY2NsYXNzKCdTcHJpdGVFZmZlY3RHYXVzc2lhbkJsdXInKVxuZXhwb3J0IGNsYXNzIFNwcml0ZUVmZmVjdEdhdXNzaWFuQmx1ciBleHRlbmRzIFNwcml0ZUVmZmVjdEJhc2Uge1xuICAgIHByaXZhdGUgc3RhdGljIF9pc1Byb3BEaXJ0eTogYm9vbGVhbltdID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2VdO1xuXG4gICAgcHJvdGVjdGVkIGlzRGlydHkoaWR4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIFNwcml0ZUVmZmVjdEdhdXNzaWFuQmx1ci5faXNQcm9wRGlydHlbaWR4XTtcbiAgICB9XG4gICAgXG4gICAgcHJvdGVjdGVkIHNldERpcnR5KGlkeDogbnVtYmVyLCB2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgU3ByaXRlRWZmZWN0R2F1c3NpYW5CbHVyLl9pc1Byb3BEaXJ0eVtpZHhdID0gdmFsO1xuICAgIH1cblxuXG4gICAgLy8jcmVnaW9uIGJsdXJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgMS4wLCAwLjAxXSwgdG9vbHRpcDogJ+aooeeziueoi+W6picgfSlcbiAgICBwdWJsaWMgc2V0IGJsdXJGYWN0b3IodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fYmx1ckZhY3RvciA9IHZhbDtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBnZXQgYmx1ckZhY3RvcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmx1ckZhY3RvcjtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9ibHVyRmFjdG9yOiBudW1iZXIgPSAwLjU7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBvdmVycmlkZVxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldCBjb3VudE9mVXNlZEZsb2F0cygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gMTY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0UHJvcHNVbmlvbktleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfV8ke3RoaXMuX2lzMkRpbjNEfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdXBkYXRlUGFyYW1zKGluZGV4OiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQge1xuICAgICAgICBjb25zdCBiYXNlVVYgPSB0aGlzLmdldFVWKHRoaXMuc3ByaXRlRnJhbWUhLnV2KTtcblxuICAgICAgICBsZXQgYmx1clRleHR1cmVTaXplID0gbmV3IFZlYzIoMTAwLCAxMDApO1xuICAgICAgICBpZiAodGhpcy5zcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgYmx1clRleHR1cmVTaXplLnggPSBNYXRoLmZsb29yKHRoaXMuc3ByaXRlRnJhbWUud2lkdGggKiBiYXNlVVYueik7XG4gICAgICAgICAgICBibHVyVGV4dHVyZVNpemUueSA9IE1hdGguZmxvb3IodGhpcy5zcHJpdGVGcmFtZS5oZWlnaHQgKiBiYXNlVVYudyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBibHVyVGV4dHVyZVNpemUueCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoVUlUcmFuc2Zvcm0pIS5jb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgICAgIGJsdXJUZXh0dXJlU2l6ZS55ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChVSVRyYW5zZm9ybSkhLmNvbnRlbnRTaXplLmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAwXSA9IHRoaXMuX2VmZmVjdENvbG9yLnIgLyAyNTU7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxXSA9IHRoaXMuX2VmZmVjdENvbG9yLmcgLyAyNTU7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAyXSA9IHRoaXMuX2VmZmVjdENvbG9yLmIgLyAyNTU7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAzXSA9IHRoaXMuX2VmZmVjdENvbG9yLmEgLyAyNTU7XG5cbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDRdID0gYmFzZVVWLng7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA1XSA9IGJhc2VVVi55O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNl0gPSBiYXNlVVYuejtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDddID0gYmFzZVVWLnc7XG5cbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDhdID0gYmx1clRleHR1cmVTaXplLng7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA5XSA9IGJsdXJUZXh0dXJlU2l6ZS55O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTBdID0gdGhpcy5fYmx1ckZhY3RvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBpbml0TWF0ZXJpYWwoKTogTWF0ZXJpYWwge1xuICAgICAgICBsZXQgbWF0ID0gbmV3IE1hdGVyaWFsKCk7XG4gICAgICAgIG1hdC5pbml0aWFsaXplKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxuICAgICAgICAgICAgICAgIGRlZmluZXM6IHt9LFxuICAgICAgICAgICAgICAgIHRlY2huaXF1ZTogdGhpcy5faXMyRGluM0QgPyAxIDogMFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbWF0O1xuICAgIH1cbn1cblxuIl19