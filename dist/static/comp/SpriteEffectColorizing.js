"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectColorizing = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
let SpriteEffectColorizing = class SpriteEffectColorizing extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this._rChannelMin = 0;
        this._rChannelMax = 1;
        this._gChannelMin = 0;
        this._gChannelMax = 1;
        this._bChannelMin = 0;
        this._bChannelMax = 1;
    }
    // #region rChannel
    set rChannelMin(val) {
        this._rChannelMin = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get rChannelMin() {
        return this._rChannelMin;
    }
    set rChannelMax(val) {
        this._rChannelMax = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get rChannelMax() {
        return this._rChannelMax;
    }
    // #endregion
    // #region gChannel
    set gChannelMin(val) {
        this._gChannelMin = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get gChannelMin() {
        return this._gChannelMin;
    }
    set gChannelMax(val) {
        this._gChannelMax = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get gChannelMax() {
        return this._gChannelMax;
    }
    // #endregion
    // #region bChannel
    set bChannelMin(val) {
        this._bChannelMin = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get bChannelMin() {
        return this._bChannelMin;
    }
    set bChannelMax(val) {
        this._bChannelMax = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get bChannelMax() {
        return this._bChannelMax;
    }
    // #endregion
    //#region override
    /**
     * @override SpriteEffectBase
     */
    get floatUsage() {
        //return 10; // 手機上非2次幂的紋理會報錯
        return 16;
    }
    /**
     * @override SpriteEffectBase
     */
    getEffectUnionKey() {
        return `SpriteEffectColorizing_${this._is2Din3D}_${this._sampleFromRT}`;
    }
    /**
     * @override SpriteEffectBase
     */
    updateParams(idx, textureWidth, propBuffer) {
        let index = this.calBufferIndex(idx, 0, textureWidth);
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;
        index = this.calBufferIndex(idx, 1, textureWidth);
        propBuffer[index + 4] = this._rChannelMin;
        propBuffer[index + 5] = this._rChannelMax;
        propBuffer[index + 6] = this._gChannelMin;
        propBuffer[index + 7] = this._gChannelMax;
        index = this.calBufferIndex(idx, 2, textureWidth);
        propBuffer[index + 8] = this._bChannelMin;
        propBuffer[index + 9] = this._bChannelMax;
        propBuffer[index + 10] = 0.0;
        propBuffer[index + 11] = 1.0;
    }
    /**
     * @override SpriteEffectgftf55rfrrftfgt6gyredtBase
     */
    initMaterial() {
        let mat = new cc_1.Material();
        mat.initialize({
            effectAsset: this.effectAsset,
            defines: {
                SAMPLE_FROM_RT: this._sampleFromRT,
            },
            technique: this._is2Din3D ? 1 : 0
        });
        return mat;
    }
};
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定R通道Remap顏色最小值' })
], SpriteEffectColorizing.prototype, "rChannelMin", null);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定R通道Remap顏色最大值' })
], SpriteEffectColorizing.prototype, "rChannelMax", null);
__decorate([
    property
], SpriteEffectColorizing.prototype, "_rChannelMin", void 0);
__decorate([
    property
], SpriteEffectColorizing.prototype, "_rChannelMax", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定G通道Remap顏色最小值' })
], SpriteEffectColorizing.prototype, "gChannelMin", null);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定G通道填Remap顏色最大值' })
], SpriteEffectColorizing.prototype, "gChannelMax", null);
__decorate([
    property
], SpriteEffectColorizing.prototype, "_gChannelMin", void 0);
__decorate([
    property
], SpriteEffectColorizing.prototype, "_gChannelMax", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定B通道Remap顏色最小值' })
], SpriteEffectColorizing.prototype, "bChannelMin", null);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定B通道Remap顏色最大值' })
], SpriteEffectColorizing.prototype, "bChannelMax", null);
__decorate([
    property
], SpriteEffectColorizing.prototype, "_bChannelMin", void 0);
__decorate([
    property
], SpriteEffectColorizing.prototype, "_bChannelMax", void 0);
SpriteEffectColorizing = __decorate([
    ccclass('SpriteEffectColorizing')
], SpriteEffectColorizing);
exports.SpriteEffectColorizing = SpriteEffectColorizing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0Q29sb3JpemluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9zdGF0aWMvY29tcC9TcHJpdGVFZmZlY3RDb2xvcml6aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUEwQztBQUMxQyxnQ0FBK0M7QUFDL0MseURBQXNEO0FBQ3RELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBSXpDLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsbUNBQWdCO0lBQTVEOztRQW1DWSxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUV6QixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQXNDekIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFFekIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFzQ3pCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO0lBMkRyQyxDQUFDO0lBL0tHLG1CQUFtQjtJQUVuQixJQUFXLFdBQVcsQ0FBQyxHQUFXO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBRXhCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBR0QsSUFBVyxXQUFXLENBQUMsR0FBVztRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUV4QixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVELElBQVcsV0FBVztRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQU1ELGFBQWE7SUFHYixtQkFBbUI7SUFFbkIsSUFBVyxXQUFXLENBQUMsR0FBVztRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUV4QixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVELElBQVcsV0FBVztRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUdELElBQVcsV0FBVyxDQUFDLEdBQVc7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFFeEIsSUFBSSwyQkFBcUIsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7YUFDSTtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxJQUFXLFdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFNRCxhQUFhO0lBR2IsbUJBQW1CO0lBRW5CLElBQVcsV0FBVyxDQUFDLEdBQVc7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFFeEIsSUFBSSwyQkFBcUIsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7YUFDSTtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxJQUFXLFdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFHRCxJQUFXLFdBQVcsQ0FBQyxHQUFXO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBRXhCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBTUQsYUFBYTtJQUdiLGtCQUFrQjtJQUNsQjs7T0FFRztJQUNILElBQXVCLFVBQVU7UUFDN0IsNkJBQTZCO1FBQzdCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ2dCLGlCQUFpQjtRQUNoQyxPQUFPLDBCQUEwQixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM1RSxDQUFDO0lBRUQ7O09BRUc7SUFDZ0IsWUFBWSxDQUFDLEdBQVcsRUFBRSxZQUFvQixFQUFFLFVBQXdCO1FBQ3ZGLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN0RCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUVsRCxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMxQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDMUMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUUxQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMxQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDMUMsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDN0IsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ2dCLFlBQVk7UUFDM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxhQUFRLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsVUFBVSxDQUNWO1lBQ0ksV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUUsSUFBSSxDQUFDLGFBQWE7YUFDckM7WUFDRCxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDLENBQ0osQ0FBQztRQUNGLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUE7QUE3S0c7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLENBQUM7eURBVXpIO0FBT0Q7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLENBQUM7eURBVXpIO0FBT0Q7SUFEQyxRQUFROzREQUN3QjtBQUVqQztJQURDLFFBQVE7NERBQ3dCO0FBTWpDO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDO3lEQVV6SDtBQU9EO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxDQUFDO3lEQVUxSDtBQU9EO0lBREMsUUFBUTs0REFDd0I7QUFFakM7SUFEQyxRQUFROzREQUN3QjtBQU1qQztJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzt5REFVekg7QUFPRDtJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzt5REFVekg7QUFPRDtJQURDLFFBQVE7NERBQ3dCO0FBRWpDO0lBREMsUUFBUTs0REFDd0I7QUFySHhCLHNCQUFzQjtJQURsQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7R0FDckIsc0JBQXNCLENBZ0xsQztBQWhMWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBNYXRlcmlhbCB9IGZyb20gJ2NjJztcclxuaW1wb3J0IHsgRURJVE9SX05PVF9JTl9QUkVWSUVXIH0gZnJvbSAnY2MvZW52JztcclxuaW1wb3J0IHsgU3ByaXRlRWZmZWN0QmFzZSB9IGZyb20gJy4vU3ByaXRlRWZmZWN0QmFzZSc7XHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XHJcblxyXG5cclxuQGNjY2xhc3MoJ1Nwcml0ZUVmZmVjdENvbG9yaXppbmcnKVxyXG5leHBvcnQgY2xhc3MgU3ByaXRlRWZmZWN0Q29sb3JpemluZyBleHRlbmRzIFNwcml0ZUVmZmVjdEJhc2Uge1xyXG4gICAgLy8gI3JlZ2lvbiByQ2hhbm5lbFxyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAsIDEuMCwgMC4wMV0sIHRvb2x0aXA6ICfmjIflrppS6YCa6YGTUmVtYXDpoY/oibLmnIDlsI/lgLwnIH0pXHJcbiAgICBwdWJsaWMgc2V0IHJDaGFubmVsTWluKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fckNoYW5uZWxNaW4gPSB2YWw7XHJcblxyXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCByQ2hhbm5lbE1pbigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yQ2hhbm5lbE1pbjtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgMS4wLCAwLjAxXSwgdG9vbHRpcDogJ+aMh+WumlLpgJrpgZNSZW1hcOmhj+iJsuacgOWkp+WAvCcgfSlcclxuICAgIHB1YmxpYyBzZXQgckNoYW5uZWxNYXgodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9yQ2hhbm5lbE1heCA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJDaGFubmVsTWF4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JDaGFubmVsTWF4O1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSBfckNoYW5uZWxNaW46IG51bWJlciA9IDA7XHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX3JDaGFubmVsTWF4OiBudW1iZXIgPSAxO1xyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyAjcmVnaW9uIGdDaGFubmVsXHJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgMS4wLCAwLjAxXSwgdG9vbHRpcDogJ+aMh+WumkfpgJrpgZNSZW1hcOmhj+iJsuacgOWwj+WAvCcgfSlcclxuICAgIHB1YmxpYyBzZXQgZ0NoYW5uZWxNaW4odmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9nQ2hhbm5lbE1pbiA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBnQ2hhbm5lbE1pbigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nQ2hhbm5lbE1pbjtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgMS4wLCAwLjAxXSwgdG9vbHRpcDogJ+aMh+WumkfpgJrpgZPloatSZW1hcOmhj+iJsuacgOWkp+WAvCcgfSlcclxuICAgIHB1YmxpYyBzZXQgZ0NoYW5uZWxNYXgodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9nQ2hhbm5lbE1heCA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBnQ2hhbm5lbE1heCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nQ2hhbm5lbE1heDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX2dDaGFubmVsTWluOiBudW1iZXIgPSAwO1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9nQ2hhbm5lbE1heDogbnVtYmVyID0gMTtcclxuICAgIC8vICNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8gI3JlZ2lvbiBiQ2hhbm5lbFxyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAsIDEuMCwgMC4wMV0sIHRvb2x0aXA6ICfmjIflrppC6YCa6YGTUmVtYXDpoY/oibLmnIDlsI/lgLwnIH0pXHJcbiAgICBwdWJsaWMgc2V0IGJDaGFubmVsTWluKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYkNoYW5uZWxNaW4gPSB2YWw7XHJcblxyXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgYkNoYW5uZWxNaW4oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYkNoYW5uZWxNaW47XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAsIDEuMCwgMC4wMV0sIHRvb2x0aXA6ICfmjIflrppC6YCa6YGTUmVtYXDpoY/oibLmnIDlpKflgLwnIH0pXHJcbiAgICBwdWJsaWMgc2V0IGJDaGFubmVsTWF4KHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYkNoYW5uZWxNYXggPSB2YWw7XHJcblxyXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgYkNoYW5uZWxNYXgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYkNoYW5uZWxNYXg7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9iQ2hhbm5lbE1pbjogbnVtYmVyID0gMDtcclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSBfYkNoYW5uZWxNYXg6IG51bWJlciA9IDE7XHJcbiAgICAvLyAjZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBvdmVycmlkZVxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0IGZsb2F0VXNhZ2UoKTogbnVtYmVyIHtcclxuICAgICAgICAvL3JldHVybiAxMDsgLy8g5omL5qmf5LiK6Z2eMuasoeW5gueahOe0i+eQhuacg+WgsemMr1xyXG4gICAgICAgIHJldHVybiAxNjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBnZXRFZmZlY3RVbmlvbktleSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgU3ByaXRlRWZmZWN0Q29sb3JpemluZ18ke3RoaXMuX2lzMkRpbjNEfV8ke3RoaXMuX3NhbXBsZUZyb21SVH1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVBhcmFtcyhpZHg6IG51bWJlciwgdGV4dHVyZVdpZHRoOiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuY2FsQnVmZmVySW5kZXgoaWR4LCAwLCB0ZXh0dXJlV2lkdGgpO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAwXSA9IHRoaXMuX2VmZmVjdENvbG9yLnIgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDFdID0gdGhpcy5fZWZmZWN0Q29sb3IuZyAvIDI1NTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMl0gPSB0aGlzLl9lZmZlY3RDb2xvci5iIC8gMjU1O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAzXSA9IHRoaXMuX2VmZmVjdENvbG9yLmEgLyAyNTU7XHJcblxyXG4gICAgICAgIGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDEsIHRleHR1cmVXaWR0aCk7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDRdID0gdGhpcy5fckNoYW5uZWxNaW47XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDVdID0gdGhpcy5fckNoYW5uZWxNYXg7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDZdID0gdGhpcy5fZ0NoYW5uZWxNaW47XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDddID0gdGhpcy5fZ0NoYW5uZWxNYXg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaW5kZXggPSB0aGlzLmNhbEJ1ZmZlckluZGV4KGlkeCwgMiwgdGV4dHVyZVdpZHRoKTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgOF0gPSB0aGlzLl9iQ2hhbm5lbE1pbjtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgOV0gPSB0aGlzLl9iQ2hhbm5lbE1heDtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTBdID0gMC4wO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxMV0gPSAxLjA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0Z2Z0ZjU1cmZycmZ0Zmd0Nmd5cmVkdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGluaXRNYXRlcmlhbCgpOiBNYXRlcmlhbCB7XHJcbiAgICAgICAgbGV0IG1hdCA9IG5ldyBNYXRlcmlhbCgpO1xyXG4gICAgICAgIG1hdC5pbml0aWFsaXplKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RBc3NldDogdGhpcy5lZmZlY3RBc3NldCxcclxuICAgICAgICAgICAgICAgIGRlZmluZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBTQU1QTEVfRlJPTV9SVDogdGhpcy5fc2FtcGxlRnJvbVJULFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRlY2huaXF1ZTogdGhpcy5faXMyRGluM0QgPyAxIDogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gbWF0O1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=