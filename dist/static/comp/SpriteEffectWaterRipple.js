"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectWaterRipple = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
let SpriteEffectWaterRipple = class SpriteEffectWaterRipple extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this._speed = 0.1;
        this._density = 6.12;
    }
    //#region speed
    set speed(val) {
        this._speed = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get speed() {
        return this._speed;
    }
    //#endregion
    //#region density
    set density(val) {
        this._density = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get density() {
        return this._density;
    }
    //#endregion
    //#region override
    /**
     * @override SpriteEffectBase
     */
    get floatUsage() {
        return 6;
    }
    /**
     * @override SpriteEffectBase
     */
    getEffectUnionKey() {
        return `SpriteEffectWaterRipple_${this._is2Din3D}_${this._sampleFromRT}`;
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
        propBuffer[index + 4] = this._speed;
        propBuffer[index + 5] = this._density;
        propBuffer[index + 6] = 0.0;
        propBuffer[index + 7] = 1.0;
    }
    /**
     * @override SpriteEffectBase
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
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲速度' })
], SpriteEffectWaterRipple.prototype, "speed", null);
__decorate([
    property
], SpriteEffectWaterRipple.prototype, "_speed", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [1, 100, 0.01], tooltip: '水波密度' })
], SpriteEffectWaterRipple.prototype, "density", null);
__decorate([
    property
], SpriteEffectWaterRipple.prototype, "_density", void 0);
SpriteEffectWaterRipple = __decorate([
    ccclass('SpriteEffectWaterRipple')
], SpriteEffectWaterRipple);
exports.SpriteEffectWaterRipple = SpriteEffectWaterRipple;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0V2F0ZXJSaXBwbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2Uvc3RhdGljL2NvbXAvU3ByaXRlRWZmZWN0V2F0ZXJSaXBwbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQWlEO0FBQ2pELGdDQUFvRDtBQUNwRCx5REFBc0Q7QUFDdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxlQUFVLENBQUM7QUFJekMsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBd0IsU0FBUSxtQ0FBZ0I7SUFBN0Q7O1FBa0JZLFdBQU0sR0FBVyxHQUFHLENBQUM7UUFxQnJCLGFBQVEsR0FBVyxJQUFJLENBQUM7SUFvRHBDLENBQUM7SUExRkcsZUFBZTtJQUVmLElBQVcsS0FBSyxDQUFDLEdBQVc7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFFbEIsSUFBSSwyQkFBcUIsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7YUFBTTtZQUNILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUlELFlBQVk7SUFHWixpQkFBaUI7SUFFakIsSUFBVyxPQUFPLENBQUMsR0FBVztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUVwQixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUFNO1lBQ0gsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVELElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBSUQsWUFBWTtJQUdaLGtCQUFrQjtJQUNsQjs7T0FFRztJQUNILElBQXVCLFVBQVU7UUFDN0IsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQ7O09BRUc7SUFDZ0IsaUJBQWlCO1FBQ2hDLE9BQU8sMkJBQTJCLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzdFLENBQUM7SUFFRDs7T0FFRztJQUNnQixZQUFZLENBQUMsR0FBVyxFQUFFLFlBQW9CLEVBQUUsVUFBd0I7UUFDdkYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3RELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRWxELEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN0QyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM1QixVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDZ0IsWUFBWTtRQUMzQixJQUFJLEdBQUcsR0FBRyxJQUFJLGFBQVEsRUFBRSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxVQUFVLENBQ1Y7WUFDSSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsT0FBTyxFQUFFO2dCQUNMLGNBQWMsRUFBRSxJQUFJLENBQUMsYUFBYTthQUNyQztZQUNELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEMsQ0FDSixDQUFDO1FBQ0YsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQTtBQXhGRztJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7b0RBUzFHO0FBT0Q7SUFEQyxRQUFRO3VEQUNvQjtBQU03QjtJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7c0RBUzVHO0FBT0Q7SUFEQyxRQUFRO3lEQUN1QjtBQXZDdkIsdUJBQXVCO0lBRG5DLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQztHQUN0Qix1QkFBdUIsQ0EyRm5DO0FBM0ZZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IsIENvbG9yLCBNYXRlcmlhbCB9IGZyb20gJ2NjJztcclxuaW1wb3J0IHsgREVWLCBFRElUT1JfTk9UX0lOX1BSRVZJRVcgfSBmcm9tICdjYy9lbnYnO1xyXG5pbXBvcnQgeyBTcHJpdGVFZmZlY3RCYXNlIH0gZnJvbSAnLi9TcHJpdGVFZmZlY3RCYXNlJztcclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcclxuXHJcblxyXG5AY2NjbGFzcygnU3ByaXRlRWZmZWN0V2F0ZXJSaXBwbGUnKVxyXG5leHBvcnQgY2xhc3MgU3ByaXRlRWZmZWN0V2F0ZXJSaXBwbGUgZXh0ZW5kcyBTcHJpdGVFZmZlY3RCYXNlIHtcclxuICAgIC8vI3JlZ2lvbiBzcGVlZFxyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogJ+aJreabsumAn+W6picgfSlcclxuICAgIHB1YmxpYyBzZXQgc3BlZWQodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zcGVlZCA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzcGVlZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX3NwZWVkOiBudW1iZXIgPSAwLjE7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIGRlbnNpdHlcclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMSwgMTAwLCAwLjAxXSwgdG9vbHRpcDogJ+awtOazouWvhuW6picgfSlcclxuICAgIHB1YmxpYyBzZXQgZGVuc2l0eSh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2RlbnNpdHkgPSB2YWw7XHJcblxyXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGVuc2l0eSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZW5zaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSBfZGVuc2l0eTogbnVtYmVyID0gNi4xMjtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gb3ZlcnJpZGVcclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldCBmbG9hdFVzYWdlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0RWZmZWN0VW5pb25LZXkoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYFNwcml0ZUVmZmVjdFdhdGVyUmlwcGxlXyR7dGhpcy5faXMyRGluM0R9XyR7dGhpcy5fc2FtcGxlRnJvbVJUfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlUGFyYW1zKGlkeDogbnVtYmVyLCB0ZXh0dXJlV2lkdGg6IG51bWJlciwgcHJvcEJ1ZmZlcjogRmxvYXQzMkFycmF5KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDAsIHRleHR1cmVXaWR0aCk7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDBdID0gdGhpcy5fZWZmZWN0Q29sb3IuciAvIDI1NTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMV0gPSB0aGlzLl9lZmZlY3RDb2xvci5nIC8gMjU1O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAyXSA9IHRoaXMuX2VmZmVjdENvbG9yLmIgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDNdID0gdGhpcy5fZWZmZWN0Q29sb3IuYSAvIDI1NTtcclxuXHJcbiAgICAgICAgaW5kZXggPSB0aGlzLmNhbEJ1ZmZlckluZGV4KGlkeCwgMSwgdGV4dHVyZVdpZHRoKTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNF0gPSB0aGlzLl9zcGVlZDtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNV0gPSB0aGlzLl9kZW5zaXR5O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA2XSA9IDAuMDtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgN10gPSAxLjA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5pdE1hdGVyaWFsKCk6IE1hdGVyaWFsIHtcclxuICAgICAgICBsZXQgbWF0ID0gbmV3IE1hdGVyaWFsKCk7XHJcbiAgICAgICAgbWF0LmluaXRpYWxpemUoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxyXG4gICAgICAgICAgICAgICAgZGVmaW5lczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFNBTVBMRV9GUk9NX1JUOiB0aGlzLl9zYW1wbGVGcm9tUlQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlOiB0aGlzLl9pczJEaW4zRCA/IDEgOiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==