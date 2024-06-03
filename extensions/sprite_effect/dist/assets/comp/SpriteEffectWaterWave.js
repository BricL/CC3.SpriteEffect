"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectWaterWave = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
let SpriteEffectWaterWave = class SpriteEffectWaterWave extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this._offset = 0.5;
        this._waveWidth = 20.0;
        this._waveHeight = 0.01;
        this._waveSpeed = 10.0;
    }
    //#region offset
    set offset(val) {
        this._offset = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }
    get offset() {
        return this._offset;
    }
    //#endregion
    //#region waveWidth
    set waveWidth(val) {
        this._waveWidth = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }
    get waveWidth() {
        return this._waveWidth;
    }
    //#endregion
    //#region waveHeight
    set waveHeight(val) {
        this._waveHeight = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }
    get waveHeight() {
        return this._waveHeight;
    }
    //#endregion
    //#region waveSpeed
    set waveSpeed(val) {
        this._waveSpeed = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }
    get waveSpeed() {
        return this._waveSpeed;
    }
    //#endregion
    //#region override
    /**
     * @override SpriteEffectBase
     */
    get countOfUsedFloats() {
        return 8;
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
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;
        propBuffer[index + 4] = this._offset;
        propBuffer[index + 5] = this._waveWidth;
        propBuffer[index + 6] = this._waveHeight;
        propBuffer[index + 7] = this._waveSpeed;
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
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '偏移量' })
], SpriteEffectWaterWave.prototype, "offset", null);
__decorate([
    property
], SpriteEffectWaterWave.prototype, "_offset", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '水波寬' })
], SpriteEffectWaterWave.prototype, "waveWidth", null);
__decorate([
    property
], SpriteEffectWaterWave.prototype, "_waveWidth", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '水波高' })
], SpriteEffectWaterWave.prototype, "waveHeight", null);
__decorate([
    property
], SpriteEffectWaterWave.prototype, "_waveHeight", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 20, 0.01], tooltip: '速度' })
], SpriteEffectWaterWave.prototype, "waveSpeed", null);
__decorate([
    property
], SpriteEffectWaterWave.prototype, "_waveSpeed", void 0);
SpriteEffectWaterWave = __decorate([
    ccclass('SpriteEffectWaterWave')
], SpriteEffectWaterWave);
exports.SpriteEffectWaterWave = SpriteEffectWaterWave;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0V2F0ZXJXYXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2Fzc2V0cy9jb21wL1Nwcml0ZUVmZmVjdFdhdGVyV2F2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBMEM7QUFDMUMsZ0NBQStDO0FBQy9DLHlEQUFzRDtBQUN0RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUl6QyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLG1DQUFnQjtJQUEzRDs7UUFrQlksWUFBTyxHQUFXLEdBQUcsQ0FBQztRQXFCdEIsZUFBVSxHQUFXLElBQUksQ0FBQztRQXFCMUIsZ0JBQVcsR0FBVyxJQUFJLENBQUM7UUFxQjNCLGVBQVUsR0FBVyxJQUFJLENBQUM7SUFnRHRDLENBQUM7SUFoSUcsZ0JBQWdCO0lBRWhCLElBQVcsTUFBTSxDQUFDLEdBQVc7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFFbkIsSUFBSSwyQkFBcUIsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVELElBQVcsTUFBTTtRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBSUQsWUFBWTtJQUdaLG1CQUFtQjtJQUVuQixJQUFXLFNBQVMsQ0FBQyxHQUFXO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBRXRCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDaEIsT0FBTyxJ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QVN6RztBQU9EO0lBREMsUUFBUTtzREFDcUI7QUFNOUI7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO3NEQVMxRztBQU9EO0lBREMsUUFBUTt5REFDeUI7QUFNbEM7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO3VEQVN6RztBQU9EO0lBREMsUUFBUTswREFDMEI7QUFNbkM7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO3NEQVN6RztBQU9EO0lBREMsUUFBUTt5REFDeUI7QUFqRnpCLHFCQUFxQjtJQURqQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7R0FDcEIscUJBQXFCLENBaUlqQztBQWpJWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBNYXRlcmlhbCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVESVRPUl9OT1RfSU5fUFJFVklFVyB9IGZyb20gJ2NjL2Vudic7XG5pbXBvcnQgeyBTcHJpdGVFZmZlY3RCYXNlIH0gZnJvbSAnLi9TcHJpdGVFZmZlY3RCYXNlJztcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cblxuQGNjY2xhc3MoJ1Nwcml0ZUVmZmVjdFdhdGVyV2F2ZScpXG5leHBvcnQgY2xhc3MgU3ByaXRlRWZmZWN0V2F0ZXJXYXZlIGV4dGVuZHMgU3ByaXRlRWZmZWN0QmFzZSB7XG4gICAgLy8jcmVnaW9uIG9mZnNldFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICflgY/np7vph48nIH0pXG4gICAgcHVibGljIHNldCBvZmZzZXQodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faXNQcm9wRGlydHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBvZmZzZXQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNldDtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9vZmZzZXQ6IG51bWJlciA9IDAuNTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIHdhdmVXaWR0aFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMjAsIDAuMDFdLCB0b29sdGlwOiAn5rC05rOi5a+sJyB9KVxuICAgIHB1YmxpYyBzZXQgd2F2ZVdpZHRoKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3dhdmVXaWR0aCA9IHZhbDtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lzUHJvcERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgd2F2ZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl93YXZlV2lkdGg7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfd2F2ZVdpZHRoOiBudW1iZXIgPSAyMC4wO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gd2F2ZUhlaWdodFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICfmsLTms6Lpq5gnIH0pXG4gICAgcHVibGljIHNldCB3YXZlSGVpZ2h0KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3dhdmVIZWlnaHQgPSB2YWw7XG5cbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pc1Byb3BEaXJ0eSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHdhdmVIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhdmVIZWlnaHQ7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfd2F2ZUhlaWdodDogbnVtYmVyID0gMC4wMTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIHdhdmVTcGVlZFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMjAsIDAuMDFdLCB0b29sdGlwOiAn6YCf5bqmJyB9KVxuICAgIHB1YmxpYyBzZXQgd2F2ZVNwZWVkKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3dhdmVTcGVlZCA9IHZhbDtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lzUHJvcERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgd2F2ZVNwZWVkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl93YXZlU3BlZWQ7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfd2F2ZVNwZWVkOiBudW1iZXIgPSAxMC4wO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gb3ZlcnJpZGVcbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXQgY291bnRPZlVzZWRGbG9hdHMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0UHJvcHNVbmlvbktleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfV8ke3RoaXMuX2lzMkRpbjNEfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdXBkYXRlUGFyYW1zKGluZGV4OiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQge1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMF0gPSB0aGlzLl9lZmZlY3RDb2xvci5yIC8gMjU1O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMV0gPSB0aGlzLl9lZmZlY3RDb2xvci5nIC8gMjU1O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMl0gPSB0aGlzLl9lZmZlY3RDb2xvci5iIC8gMjU1O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgM10gPSB0aGlzLl9lZmZlY3RDb2xvci5hIC8gMjU1O1xuXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA0XSA9IHRoaXMuX29mZnNldDtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDVdID0gdGhpcy5fd2F2ZVdpZHRoO1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNl0gPSB0aGlzLl93YXZlSGVpZ2h0O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgN10gPSB0aGlzLl93YXZlU3BlZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaW5pdE1hdGVyaWFsKCk6IE1hdGVyaWFsIHtcbiAgICAgICAgbGV0IG1hdCA9IG5ldyBNYXRlcmlhbCgpO1xuICAgICAgICBtYXQuaW5pdGlhbGl6ZShcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlZmZlY3RBc3NldDogdGhpcy5lZmZlY3RBc3NldCxcbiAgICAgICAgICAgICAgICBkZWZpbmVzOiB7fSxcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IHRoaXMuX2lzMkRpbjNEID8gMSA6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG1hdDtcbiAgICB9XG59XG5cbiJdfQ==