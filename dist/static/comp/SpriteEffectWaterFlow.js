"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectWaterFlow = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
let SpriteEffectWaterFlow = class SpriteEffectWaterFlow extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this.noiseTexture = null;
        this._frequency = 0.1;
        this._amplitude = 0.02;
        this._speed = 0.1;
        this._flowDirection = new cc_1.Vec2(1, 0);
    }
    //#region frequency
    set frequency(val) {
        this._frequency = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get frequency() {
        return this._frequency;
    }
    //#endregion
    //#region amplitude
    set amplitude(val) {
        this._amplitude = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get amplitude() {
        return this._amplitude;
    }
    //#endregion
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
    //#region flowDirection
    set flowDirection(val) {
        this._flowDirection.set(val);
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get flowDirection() {
        return this._flowDirection;
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
        propBuffer[index + 4] = this._flowDirection.x;
        propBuffer[index + 5] = this._flowDirection.y;
        propBuffer[index + 6] = this._frequency;
        propBuffer[index + 7] = this._amplitude;
        propBuffer[index + 8] = this._speed;
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
        mat.setProperty('noiseTexture', this.noiseTexture);
        return mat;
    }
};
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Texture2D, tooltip: '指定噪声貼圖' })
], SpriteEffectWaterFlow.prototype, "noiseTexture", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 10, 0.01], tooltip: '扭曲频率' })
], SpriteEffectWaterFlow.prototype, "frequency", null);
__decorate([
    property
], SpriteEffectWaterFlow.prototype, "_frequency", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲幅度' })
], SpriteEffectWaterFlow.prototype, "amplitude", null);
__decorate([
    property
], SpriteEffectWaterFlow.prototype, "_amplitude", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '扭曲速度' })
], SpriteEffectWaterFlow.prototype, "speed", null);
__decorate([
    property
], SpriteEffectWaterFlow.prototype, "_speed", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '流动方向' })
], SpriteEffectWaterFlow.prototype, "flowDirection", null);
__decorate([
    property
], SpriteEffectWaterFlow.prototype, "_flowDirection", void 0);
SpriteEffectWaterFlow = __decorate([
    ccclass('SpriteEffectWaterFlow')
], SpriteEffectWaterFlow);
exports.SpriteEffectWaterFlow = SpriteEffectWaterFlow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0V2F0ZXJGbG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL3N0YXRpYy9jb21wL1Nwcml0ZUVmZmVjdFdhdGVyRmxvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBa0U7QUFDbEUsZ0NBQW9EO0FBQ3BELHlEQUFzRDtBQUV0RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUd6QyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLG1DQUFnQjtJQUEzRDs7UUFFVyxpQkFBWSxHQUFxQixJQUFJLENBQUM7UUFvQnJDLGVBQVUsR0FBVyxHQUFHLENBQUM7UUFzQnpCLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFzQjFCLFdBQU0sR0FBVyxHQUFHLENBQUM7UUFzQnJCLG1CQUFjLEdBQVMsSUFBSSxTQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBb0RsRCxDQUFDO0lBeElHLG1CQUFtQjtJQUVuQixJQUFXLFNBQVMsQ0FBQyxHQUFXO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBRXRCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBSUQsWUFBWTtJQUdaLG1CQUFtQjtJQUVuQixJQUFXLFNBQVMsQ0FBQyxHQUFXO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBRXRCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFF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RDtJQURDLFFBQVE7NkRBQ3FDO0FBeEZyQyxxQkFBcUI7SUFEakMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO0dBQ3BCLHFCQUFxQixDQTRJakM7QUE1SVksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29sb3IsIE1hdGVyaWFsLCBUZXh0dXJlMkQsIFZlYzIgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBERVYsIEVESVRPUl9OT1RfSU5fUFJFVklFVyB9IGZyb20gJ2NjL2Vudic7XG5pbXBvcnQgeyBTcHJpdGVFZmZlY3RCYXNlIH0gZnJvbSAnLi9TcHJpdGVFZmZlY3RCYXNlJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuQGNjY2xhc3MoJ1Nwcml0ZUVmZmVjdFdhdGVyRmxvdycpXG5leHBvcnQgY2xhc3MgU3ByaXRlRWZmZWN0V2F0ZXJGbG93IGV4dGVuZHMgU3ByaXRlRWZmZWN0QmFzZSB7XG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0eXBlOiBUZXh0dXJlMkQsIHRvb2x0aXA6ICfmjIflrprlmarlo7DosrzlnJYnIH0pXG4gICAgcHVibGljIG5vaXNlVGV4dHVyZTogVGV4dHVyZTJEIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvLyNyZWdpb24gZnJlcXVlbmN5XG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxMCwgMC4wMV0sIHRvb2x0aXA6ICfmia3mm7LpopHnjocnIH0pXG4gICAgcHVibGljIHNldCBmcmVxdWVuY3kodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZnJlcXVlbmN5ID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHVibGljIGdldCBmcmVxdWVuY3koKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyZXF1ZW5jeTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9mcmVxdWVuY3k6IG51bWJlciA9IDAuMTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIGFtcGxpdHVkZVxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICfmia3mm7LluYXluqYnIH0pXG4gICAgcHVibGljIHNldCBhbXBsaXR1ZGUodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fYW1wbGl0dWRlID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHVibGljIGdldCBhbXBsaXR1ZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FtcGxpdHVkZTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9hbXBsaXR1ZGU6IG51bWJlciA9IDAuMDI7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBzcGVlZFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICfmia3mm7LpgJ/luqYnIH0pXG4gICAgcHVibGljIHNldCBzcGVlZCh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHZhbDtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBnZXQgc3BlZWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX3NwZWVkOiBudW1iZXIgPSAwLjE7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBmbG93RGlyZWN0aW9uXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0b29sdGlwOiAn5rWB5Yqo5pa55ZCRJyB9KVxuICAgIHB1YmxpYyBzZXQgZmxvd0RpcmVjdGlvbih2YWw6IFZlYzIpIHtcbiAgICAgICAgdGhpcy5fZmxvd0RpcmVjdGlvbi5zZXQodmFsKTtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBnZXQgZmxvd0RpcmVjdGlvbigpOiBWZWMyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zsb3dEaXJlY3Rpb247XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfZmxvd0RpcmVjdGlvbjogVmVjMiA9IG5ldyBWZWMyKDEsIDApO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gb3ZlcnJpZGVcbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBnZXQgZmxvYXRVc2FnZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gMTY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0UHJvcHNVbmlvbktleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfV8ke3RoaXMuX2lzMkRpbjNEfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlUGFyYW1zKGluZGV4OiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQge1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMF0gPSB0aGlzLl9lZmZlY3RDb2xvci5yIC8gMjU1O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMV0gPSB0aGlzLl9lZmZlY3RDb2xvci5nIC8gMjU1O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMl0gPSB0aGlzLl9lZmZlY3RDb2xvci5iIC8gMjU1O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgM10gPSB0aGlzLl9lZmZlY3RDb2xvci5hIC8gMjU1O1xuXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA0XSA9IHRoaXMuX2Zsb3dEaXJlY3Rpb24ueDtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDVdID0gdGhpcy5fZmxvd0RpcmVjdGlvbi55O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNl0gPSB0aGlzLl9mcmVxdWVuY3k7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA3XSA9IHRoaXMuX2FtcGxpdHVkZTtcblxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgOF0gPSB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBpbml0TWF0ZXJpYWwoKTogTWF0ZXJpYWwge1xuICAgICAgICBsZXQgbWF0ID0gbmV3IE1hdGVyaWFsKCk7XG4gICAgICAgIG1hdC5pbml0aWFsaXplKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxuICAgICAgICAgICAgICAgIGRlZmluZXM6IHt9LFxuICAgICAgICAgICAgICAgIHRlY2huaXF1ZTogdGhpcy5faXMyRGluM0QgPyAxIDogMFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIG1hdC5zZXRQcm9wZXJ0eSgnbm9pc2VUZXh0dXJlJywgdGhpcy5ub2lzZVRleHR1cmUpO1xuICAgICAgICByZXR1cm4gbWF0O1xuICAgIH1cbn1cblxuIl19