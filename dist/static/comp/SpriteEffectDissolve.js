"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectDissolve = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
let SpriteEffectDissolve = class SpriteEffectDissolve extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this.noiseTexture = null;
        this._dissolveColor = new cc_1.Color(0, 0, 0, 1);
        this._factor = 0.5;
        this._softness = 0.1;
        this._width = 0.1;
    }
    //#region dissolveColor
    set dissolveColor(val) {
        this._dissolveColor.set(val);
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get dissolveColor() {
        return this._dissolveColor;
    }
    //#endregion
    //#region effectFactor
    set factor(val) {
        this._factor = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get factor() {
        return this._factor;
    }
    //#endregion
    //#region softness
    set softness(val) {
        this._softness = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get softness() {
        return this._softness;
    }
    //#endregion
    //#region width
    set width(val) {
        this._width = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get width() {
        return this._width;
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
        propBuffer[index + 4] = this._dissolveColor.r / 255;
        propBuffer[index + 5] = this._dissolveColor.g / 255;
        propBuffer[index + 6] = this._dissolveColor.b / 255;
        propBuffer[index + 7] = this._dissolveColor.a / 255;
        propBuffer[index + 8] = this._factor;
        propBuffer[index + 9] = this._softness;
        propBuffer[index + 10] = this._width;
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
    property({ type: cc_1.Texture2D, tooltip: "指定噪聲貼圖" })
], SpriteEffectDissolve.prototype, "noiseTexture", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, tooltip: "溶解顏色" })
], SpriteEffectDissolve.prototype, "dissolveColor", null);
__decorate([
    property
], SpriteEffectDissolve.prototype, "_dissolveColor", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "溶解程度" })
], SpriteEffectDissolve.prototype, "factor", null);
__decorate([
    property
], SpriteEffectDissolve.prototype, "_factor", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "柔邊程度" })
], SpriteEffectDissolve.prototype, "softness", null);
__decorate([
    property
], SpriteEffectDissolve.prototype, "_softness", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "溶解寬度" })
], SpriteEffectDissolve.prototype, "width", null);
__decorate([
    property
], SpriteEffectDissolve.prototype, "_width", void 0);
SpriteEffectDissolve = __decorate([
    ccclass('SpriteEffectDissolve')
], SpriteEffectDissolve);
exports.SpriteEffectDissolve = SpriteEffectDissolve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0RGlzc29sdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2Uvc3RhdGljL2NvbXAvU3ByaXRlRWZmZWN0RGlzc29sdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQTREO0FBQzVELGdDQUFvRDtBQUNwRCx5REFBc0Q7QUFDdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxlQUFVLENBQUM7QUFJekMsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxtQ0FBZ0I7SUFBMUQ7O1FBRVcsaUJBQVksR0FBcUIsSUFBSSxDQUFDO1FBb0JyQyxtQkFBYyxHQUFVLElBQUksVUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBc0I5QyxZQUFPLEdBQVcsR0FBRyxDQUFDO1FBc0J0QixjQUFTLEdBQVcsR0FBRyxDQUFDO1FBc0J4QixXQUFNLEdBQVcsR0FBRyxDQUFDO0lBcURqQyxDQUFDO0lBeklHLHVCQUF1QjtJQUV2QixJQUFXLGFBQWEsQ0FBQyxHQUFVO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBSUQsWUFBWTtJQUdaLHNCQUFzQjtJQUV0QixJQUFXLE1BQU0sQ0FBQyxHQUFXO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBRW5CLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NB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ZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO2lEQVUxRztBQU9EO0lBREMsUUFBUTtvREFDb0I7QUF4RnBCLG9CQUFvQjtJQURoQyxPQUFPLENBQUMsc0JBQXNCLENBQUM7R0FDbkIsb0JBQW9CLENBNkloQztBQTdJWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb2xvciwgTWF0ZXJpYWwsIFRleHR1cmUyRCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IERFViwgRURJVE9SX05PVF9JTl9QUkVWSUVXIH0gZnJvbSAnY2MvZW52JztcbmltcG9ydCB7IFNwcml0ZUVmZmVjdEJhc2UgfSBmcm9tICcuL1Nwcml0ZUVmZmVjdEJhc2UnO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuXG5AY2NjbGFzcygnU3ByaXRlRWZmZWN0RGlzc29sdmUnKVxuZXhwb3J0IGNsYXNzIFNwcml0ZUVmZmVjdERpc3NvbHZlIGV4dGVuZHMgU3ByaXRlRWZmZWN0QmFzZSB7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogVGV4dHVyZTJELCB0b29sdGlwOiBcIuaMh+WumuWZquiBsuiyvOWcllwiIH0pXG4gICAgcHVibGljIG5vaXNlVGV4dHVyZTogVGV4dHVyZTJEIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvLyNyZWdpb24gZGlzc29sdmVDb2xvclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdG9vbHRpcDogXCLmurbop6PpoY/oibJcIiB9KVxuICAgIHB1YmxpYyBzZXQgZGlzc29sdmVDb2xvcih2YWw6IENvbG9yKSB7XG4gICAgICAgIHRoaXMuX2Rpc3NvbHZlQ29sb3Iuc2V0KHZhbCk7XG5cbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZGlzc29sdmVDb2xvcigpOiBDb2xvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNzb2x2ZUNvbG9yO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX2Rpc3NvbHZlQ29sb3I6IENvbG9yID0gbmV3IENvbG9yKDAsIDAsIDAsIDEpO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gZWZmZWN0RmFjdG9yXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogXCLmurbop6PnqIvluqZcIiB9KVxuICAgIHB1YmxpYyBzZXQgZmFjdG9yKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2ZhY3RvciA9IHZhbDtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBmYWN0b3IoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZhY3RvcjtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9mYWN0b3I6IG51bWJlciA9IDAuNTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIHNvZnRuZXNzXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogXCLmn5TpgornqIvluqZcIiB9KVxuICAgIHB1YmxpYyBzZXQgc29mdG5lc3ModmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc29mdG5lc3MgPSB2YWw7XG5cbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc29mdG5lc3MoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvZnRuZXNzO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX3NvZnRuZXNzOiBudW1iZXIgPSAwLjE7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiB3aWR0aFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6IFwi5rq26Kej5a+s5bqmXCIgfSlcbiAgICBwdWJsaWMgc2V0IHdpZHRoKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF93aWR0aDogbnVtYmVyID0gMC4xO1xuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uIG92ZXJyaWRlXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0IGZsb2F0VXNhZ2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDE2O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldFByb3BzVW5pb25LZXkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY29uc3RydWN0b3IubmFtZX1fJHt0aGlzLl9pczJEaW4zRH1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVBhcmFtcyhpbmRleDogbnVtYmVyLCBwcm9wQnVmZmVyOiBGbG9hdDMyQXJyYXkpOiB2b2lkIHtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDBdID0gdGhpcy5fZWZmZWN0Q29sb3IuciAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDFdID0gdGhpcy5fZWZmZWN0Q29sb3IuZyAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDJdID0gdGhpcy5fZWZmZWN0Q29sb3IuYiAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDNdID0gdGhpcy5fZWZmZWN0Q29sb3IuYSAvIDI1NTtcblxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNF0gPSB0aGlzLl9kaXNzb2x2ZUNvbG9yLnIgLyAyNTU7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA1XSA9IHRoaXMuX2Rpc3NvbHZlQ29sb3IuZyAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDZdID0gdGhpcy5fZGlzc29sdmVDb2xvci5iIC8gMjU1O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgN10gPSB0aGlzLl9kaXNzb2x2ZUNvbG9yLmEgLyAyNTU7XG5cbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDhdID0gdGhpcy5fZmFjdG9yO1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgOV0gPSB0aGlzLl9zb2Z0bmVzcztcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDEwXSA9IHRoaXMuX3dpZHRoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGluaXRNYXRlcmlhbCgpOiBNYXRlcmlhbCB7XG4gICAgICAgIGxldCBtYXQgPSBuZXcgTWF0ZXJpYWwoKTtcbiAgICAgICAgbWF0LmluaXRpYWxpemUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXG4gICAgICAgICAgICAgICAgZGVmaW5lczoge30sXG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlOiB0aGlzLl9pczJEaW4zRCA/IDEgOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgbWF0LnNldFByb3BlcnR5KCdub2lzZVRleHR1cmUnLCB0aGlzLm5vaXNlVGV4dHVyZSk7XG4gICAgICAgIHJldHVybiBtYXQ7XG4gICAgfVxufVxuXG4iXX0=