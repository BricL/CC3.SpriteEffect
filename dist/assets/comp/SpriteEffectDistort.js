"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SpriteEffectDistort_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectDistort = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
let SpriteEffectDistort = SpriteEffectDistort_1 = class SpriteEffectDistort extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this.noiseTexture = null;
        this._speed = 0.05;
        this._strength = 0.05;
    }
    isDirty(idx) {
        return SpriteEffectDistort_1._isPropDirty[idx];
    }
    setDirty(idx, val) {
        SpriteEffectDistort_1._isPropDirty[idx] = val;
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
    //#region strength
    set strength(val) {
        this._strength = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get strength() {
        return this._strength;
    }
    //#endregion
    //#region override
    /**
     * @override SpriteEffectBase
     */
    get countOfUsedFloats() {
        // return 10; // 手機上非2次幂的紋理會報錯
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
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;
        propBuffer[index + 4] = baseUV.x;
        propBuffer[index + 5] = baseUV.y;
        propBuffer[index + 6] = baseUV.z;
        propBuffer[index + 7] = baseUV.w;
        propBuffer[index + 8] = cc_1.lerp(0.0, 0.2, this._speed);
        propBuffer[index + 9] = cc_1.lerp(0.0, 0.2, this._strength);
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
SpriteEffectDistort._isPropDirty = [false, false, false];
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Texture2D, tooltip: '指定噪声貼圖' })
], SpriteEffectDistort.prototype, "noiseTexture", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '扭曲速度' })
], SpriteEffectDistort.prototype, "speed", null);
__decorate([
    property
], SpriteEffectDistort.prototype, "_speed", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '扭曲强度' })
], SpriteEffectDistort.prototype, "strength", null);
__decorate([
    property
], SpriteEffectDistort.prototype, "_strength", void 0);
SpriteEffectDistort = SpriteEffectDistort_1 = __decorate([
    ccclass('SpriteEffectDistort')
], SpriteEffectDistort);
exports.SpriteEffectDistort = SpriteEffectDistort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0RGlzdG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hc3NldHMvY29tcC9TcHJpdGVFZmZlY3REaXN0b3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQkFBZ0U7QUFDaEUsZ0NBQStDO0FBQy9DLHlEQUFzRDtBQUN0RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUl6QyxJQUFhLG1CQUFtQiwyQkFBaEMsTUFBYSxtQkFBb0IsU0FBUSxtQ0FBZ0I7SUFBekQ7O1FBWVcsaUJBQVksR0FBcUIsSUFBSSxDQUFDO1FBb0JyQyxXQUFNLEdBQVcsSUFBSSxDQUFDO1FBc0J0QixjQUFTLEdBQVcsSUFBSSxDQUFDO0lBd0RyQyxDQUFDO0lBM0dhLE9BQU8sQ0FBQyxHQUFXO1FBQ3pCLE9BQU8scUJBQW1CLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFUyxRQUFRLENBQUMsR0FBVyxFQUFFLEdBQVk7UUFDeEMscUJBQW1CLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNoRCxDQUFDO0lBS0QsZUFBZTtJQUVmLElBQVcsS0FBSyxDQUFDLEdBQVc7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFFbEIsSUFBSSwyQkFBcUIsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7YUFDSTtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUlELFlBQVk7SUFHWixrQkFBa0I7SUFFbEIsSUFBVyxRQUFRLENBQUMsR0FBVztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUVyQixJ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SyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztnREFVOUc7QUFPRDtJQURDLFFBQVE7bURBQ3FCO0FBTTlCO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzttREFVOUc7QUFPRDtJQURDLFFBQVE7c0RBQ3dCO0FBdER4QixtQkFBbUI7SUFEL0IsT0FBTyxDQUFDLHFCQUFxQixDQUFDO0dBQ2xCLG1CQUFtQixDQThHL0I7QUE5R1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciwgbGVycCwgbG9nLCBNYXRlcmlhbCwgVGV4dHVyZTJEIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgRURJVE9SX05PVF9JTl9QUkVWSUVXIH0gZnJvbSAnY2MvZW52JztcbmltcG9ydCB7IFNwcml0ZUVmZmVjdEJhc2UgfSBmcm9tICcuL1Nwcml0ZUVmZmVjdEJhc2UnO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuXG5AY2NjbGFzcygnU3ByaXRlRWZmZWN0RGlzdG9ydCcpXG5leHBvcnQgY2xhc3MgU3ByaXRlRWZmZWN0RGlzdG9ydCBleHRlbmRzIFNwcml0ZUVmZmVjdEJhc2Uge1xuICAgIHByaXZhdGUgc3RhdGljIF9pc1Byb3BEaXJ0eTogYm9vbGVhbltdID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2VdO1xuXG4gICAgcHJvdGVjdGVkIGlzRGlydHkoaWR4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIFNwcml0ZUVmZmVjdERpc3RvcnQuX2lzUHJvcERpcnR5W2lkeF07XG4gICAgfVxuICAgIFxuICAgIHByb3RlY3RlZCBzZXREaXJ0eShpZHg6IG51bWJlciwgdmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIFNwcml0ZUVmZmVjdERpc3RvcnQuX2lzUHJvcERpcnR5W2lkeF0gPSB2YWw7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0eXBlOiBUZXh0dXJlMkQsIHRvb2x0aXA6ICfmjIflrprlmarlo7DosrzlnJYnIH0pXG4gICAgcHVibGljIG5vaXNlVGV4dHVyZTogVGV4dHVyZTJEIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvLyNyZWdpb24gc3BlZWRcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgMS4wLCAwLjAxXSwgdG9vbHRpcDogJ+aJreabsumAn+W6picgfSlcbiAgICBwdWJsaWMgc2V0IHNwZWVkKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNwZWVkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9zcGVlZDogbnVtYmVyID0gMC4wNTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIHN0cmVuZ3RoXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAsIDEuMCwgMC4wMV0sIHRvb2x0aXA6ICfmia3mm7LlvLrluqYnIH0pXG4gICAgcHVibGljIHNldCBzdHJlbmd0aCh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zdHJlbmd0aCA9IHZhbDtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzdHJlbmd0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RyZW5ndGg7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfc3RyZW5ndGg6IG51bWJlciA9IDAuMDU7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBvdmVycmlkZVxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldCBjb3VudE9mVXNlZEZsb2F0cygpOiBudW1iZXIge1xuICAgICAgICAvLyByZXR1cm4gMTA7IC8vIOaJi+apn+S4iumdnjLmrKHluYLnmoTntIvnkIbmnIPloLHpjK9cbiAgICAgICAgcmV0dXJuIDE2O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldFByb3BzVW5pb25LZXkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY29uc3RydWN0b3IubmFtZX1fJHt0aGlzLl9pczJEaW4zRH1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVBhcmFtcyhpbmRleDogbnVtYmVyLCBwcm9wQnVmZmVyOiBGbG9hdDMyQXJyYXkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYmFzZVVWID0gdGhpcy5nZXRVVih0aGlzLnNwcml0ZUZyYW1lIS51dik7XG5cbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDBdID0gdGhpcy5fZWZmZWN0Q29sb3IuciAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDFdID0gdGhpcy5fZWZmZWN0Q29sb3IuZyAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDJdID0gdGhpcy5fZWZmZWN0Q29sb3IuYiAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDNdID0gdGhpcy5fZWZmZWN0Q29sb3IuYSAvIDI1NTtcblxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNF0gPSBiYXNlVVYueDtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDVdID0gYmFzZVVWLnk7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA2XSA9IGJhc2VVVi56O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgN10gPSBiYXNlVVYudztcblxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgOF0gPSBsZXJwKDAuMCwgMC4yLCB0aGlzLl9zcGVlZCk7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA5XSA9IGxlcnAoMC4wLCAwLjIsIHRoaXMuX3N0cmVuZ3RoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBpbml0TWF0ZXJpYWwoKTogTWF0ZXJpYWwge1xuICAgICAgICBsZXQgbWF0ID0gbmV3IE1hdGVyaWFsKCk7XG4gICAgICAgIG1hdC5pbml0aWFsaXplKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxuICAgICAgICAgICAgICAgIGRlZmluZXM6IHt9LFxuICAgICAgICAgICAgICAgIHRlY2huaXF1ZTogdGhpcy5faXMyRGluM0QgPyAxIDogMFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIG1hdC5zZXRQcm9wZXJ0eSgnbm9pc2VUZXh0dXJlJywgdGhpcy5ub2lzZVRleHR1cmUpO1xuICAgICAgICByZXR1cm4gbWF0O1xuICAgIH1cbn1cblxuIl19