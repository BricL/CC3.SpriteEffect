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
        return 12;
    }
    /**
     * @override SpriteEffectBase
     */
    getEffectUnionKey() {
        return `SpriteEffectWaterFlow_${this._is2Din3D}_${this._sampleFromRT}`;
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
        propBuffer[index + 4] = this._flowDirection.x;
        propBuffer[index + 5] = this._flowDirection.y;
        propBuffer[index + 6] = this._frequency;
        propBuffer[index + 7] = this._amplitude;
        index = this.calBufferIndex(idx, 2, textureWidth);
        propBuffer[index + 8] = this._speed;
        propBuffer[index + 9] = 0.0;
        propBuffer[index + 10] = 0.0;
        propBuffer[index + 11] = 1.0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0V2F0ZXJGbG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL3N0YXRpYy9jb21wL1Nwcml0ZUVmZmVjdFdhdGVyRmxvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBa0U7QUFDbEUsZ0NBQW9EO0FBQ3BELHlEQUFzRDtBQUV0RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUd6QyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLG1DQUFnQjtJQUEzRDs7UUFFVyxpQkFBWSxHQUFxQixJQUFJLENBQUM7UUFvQnJDLGVBQVUsR0FBVyxHQUFHLENBQUM7UUFzQnpCLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFzQjFCLFdBQU0sR0FBVyxHQUFHLENBQUM7UUFzQnJCLG1CQUFjLEdBQVMsSUFBSSxTQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBNERsRCxDQUFDO0lBaEpHLG1CQUFtQjtJQUVuQixJQUFXLFNBQVMsQ0FBQyxHQUFXO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBRXRCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBSUQsWUFBWTtJQUdaLG1CQUFtQjtJQUVuQixJQUFXLFNBQVMsQ0FBQyxHQUFXO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBRXRCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBSUQsWUFBWTtJQUdaLGVBQWU7SUFFZixJQUFXLEtBQUssQ0FBQyxHQUFXO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBRWxCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFJRCxZQUFZO0lBR1osdUJBQXVCO0lBRXZCLElBQVcsYUFBYSxDQUFDLEdBQVM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0IsSUFBSSwyQkFBcUIsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7YUFDSTtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFJRCxZQUFZO0lBR1osa0JBQWtCO0lBQ2xCOztPQUVHO0lBQ0gsSUFBdUIsVUFBVTtRQUM3QixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7T0FFRztJQUNnQixpQkFBaUI7UUFDaEMsT0FBTyx5QkFBeUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0UsQ0FBQztJQUVEOztPQUVHO0lBQ2dCLFlBQVksQ0FBQyxHQUFXLEVBQUUsWUFBb0IsRUFBRSxVQUF3QjtRQUN2RixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDdEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFbEQsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQzlDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3hDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUV4QyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM1QixVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM3QixVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDZ0IsWUFBWTtRQUMzQixJQUFJLEdBQUcsR0FBRyxJQUFJLGFBQVEsRUFBRSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxVQUFVLENBQ1Y7WUFDSSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsT0FBTyxFQUFFO2dCQUNMLGNBQWMsRUFBRSxJQUFJLENBQUMsYUFBYTthQUNyQztZQUNELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEMsQ0FDSixDQUFDO1FBRUYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25ELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUE7QUFsSkc7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQzsyREFDL0M7QUFJN0M7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO3NEQVUzRztBQU9EO0lBREMsUUFBUTt5REFDd0I7QUFNakM7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO3NEQVUxRztBQU9EO0lBREMsUUFBUTt5REFDeUI7QUFNbEM7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO2tEQVUxRztBQU9EO0lBREMsUUFBUTtxREFDb0I7QUFNN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7MERBVXhFO0FBT0Q7SUFEQyxRQUFROzZEQUNxQztBQXhGckMscUJBQXFCO0lBRGpDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztHQUNwQixxQkFBcUIsQ0FvSmpDO0FBcEpZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IsIENvbG9yLCBNYXRlcmlhbCwgVGV4dHVyZTJELCBWZWMyIH0gZnJvbSAnY2MnO1xyXG5pbXBvcnQgeyBERVYsIEVESVRPUl9OT1RfSU5fUFJFVklFVyB9IGZyb20gJ2NjL2Vudic7XHJcbmltcG9ydCB7IFNwcml0ZUVmZmVjdEJhc2UgfSBmcm9tICcuL1Nwcml0ZUVmZmVjdEJhc2UnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzKCdTcHJpdGVFZmZlY3RXYXRlckZsb3cnKVxyXG5leHBvcnQgY2xhc3MgU3ByaXRlRWZmZWN0V2F0ZXJGbG93IGV4dGVuZHMgU3ByaXRlRWZmZWN0QmFzZSB7XHJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHR5cGU6IFRleHR1cmUyRCwgdG9vbHRpcDogJ+aMh+WumuWZquWjsOiyvOWclicgfSlcclxuICAgIHB1YmxpYyBub2lzZVRleHR1cmU6IFRleHR1cmUyRCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIC8vI3JlZ2lvbiBmcmVxdWVuY3lcclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMTAsIDAuMDFdLCB0b29sdGlwOiAn5omt5puy6aKR546HJyB9KVxyXG4gICAgcHVibGljIHNldCBmcmVxdWVuY3kodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9mcmVxdWVuY3kgPSB2YWw7XHJcblxyXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgZnJlcXVlbmN5KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyZXF1ZW5jeTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX2ZyZXF1ZW5jeTogbnVtYmVyID0gMC4xO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBhbXBsaXR1ZGVcclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICfmia3mm7LluYXluqYnIH0pXHJcbiAgICBwdWJsaWMgc2V0IGFtcGxpdHVkZSh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2FtcGxpdHVkZSA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBhbXBsaXR1ZGUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYW1wbGl0dWRlO1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSBfYW1wbGl0dWRlOiBudW1iZXIgPSAwLjAyO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBzcGVlZFxyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogJ+aJreabsumAn+W6picgfSlcclxuICAgIHB1YmxpYyBzZXQgc3BlZWQodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zcGVlZCA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBzcGVlZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX3NwZWVkOiBudW1iZXIgPSAwLjE7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIGZsb3dEaXJlY3Rpb25cclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdG9vbHRpcDogJ+a1geWKqOaWueWQkScgfSlcclxuICAgIHB1YmxpYyBzZXQgZmxvd0RpcmVjdGlvbih2YWw6IFZlYzIpIHtcclxuICAgICAgICB0aGlzLl9mbG93RGlyZWN0aW9uLnNldCh2YWwpO1xyXG5cclxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGZsb3dEaXJlY3Rpb24oKTogVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zsb3dEaXJlY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9mbG93RGlyZWN0aW9uOiBWZWMyID0gbmV3IFZlYzIoMSwgMCk7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIG92ZXJyaWRlXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBnZXQgZmxvYXRVc2FnZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxMjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBnZXRFZmZlY3RVbmlvbktleSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgU3ByaXRlRWZmZWN0V2F0ZXJGbG93XyR7dGhpcy5faXMyRGluM0R9XyR7dGhpcy5fc2FtcGxlRnJvbVJUfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlUGFyYW1zKGlkeDogbnVtYmVyLCB0ZXh0dXJlV2lkdGg6IG51bWJlciwgcHJvcEJ1ZmZlcjogRmxvYXQzMkFycmF5KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDAsIHRleHR1cmVXaWR0aCk7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDBdID0gdGhpcy5fZWZmZWN0Q29sb3IuciAvIDI1NTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMV0gPSB0aGlzLl9lZmZlY3RDb2xvci5nIC8gMjU1O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAyXSA9IHRoaXMuX2VmZmVjdENvbG9yLmIgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDNdID0gdGhpcy5fZWZmZWN0Q29sb3IuYSAvIDI1NTtcclxuXHJcbiAgICAgICAgaW5kZXggPSB0aGlzLmNhbEJ1ZmZlckluZGV4KGlkeCwgMSwgdGV4dHVyZVdpZHRoKTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNF0gPSB0aGlzLl9mbG93RGlyZWN0aW9uLng7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDVdID0gdGhpcy5fZmxvd0RpcmVjdGlvbi55O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA2XSA9IHRoaXMuX2ZyZXF1ZW5jeTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgN10gPSB0aGlzLl9hbXBsaXR1ZGU7XHJcblxyXG4gICAgICAgIGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDIsIHRleHR1cmVXaWR0aCk7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDhdID0gdGhpcy5fc3BlZWQ7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDldID0gMC4wO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxMF0gPSAwLjA7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDExXSA9IDEuMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBpbml0TWF0ZXJpYWwoKTogTWF0ZXJpYWwge1xyXG4gICAgICAgIGxldCBtYXQgPSBuZXcgTWF0ZXJpYWwoKTtcclxuICAgICAgICBtYXQuaW5pdGlhbGl6ZShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXHJcbiAgICAgICAgICAgICAgICBkZWZpbmVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgU0FNUExFX0ZST01fUlQ6IHRoaXMuX3NhbXBsZUZyb21SVCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IHRoaXMuX2lzMkRpbjNEID8gMSA6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIG1hdC5zZXRQcm9wZXJ0eSgnbm9pc2VUZXh0dXJlJywgdGhpcy5ub2lzZVRleHR1cmUpO1xyXG4gICAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==