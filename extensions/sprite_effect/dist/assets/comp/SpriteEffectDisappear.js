"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectDisappear = exports.Direction = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
var Direction;
(function (Direction) {
    Direction[Direction["HORIZONTAL"] = 0] = "HORIZONTAL";
    Direction[Direction["VERTICAL"] = 1] = "VERTICAL";
})(Direction = exports.Direction || (exports.Direction = {}));
let SpriteEffectDisappear = class SpriteEffectDisappear extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this.secondSprite = null;
        this._dirMode = Direction.VERTICAL;
        this._offset = 0.0;
        this._soft = 0.0;
    }
    //#region toneMode
    set dirMode(val) {
        this._dirMode = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.init(this.countOfProps);
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }
    get dirMode() {
        return this._dirMode;
    }
    //#endregion
    //#region disappearOffset
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
    //#region translucentOffset
    set soft(val) {
        this._soft = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this._isPropDirty = true;
        }
    }
    get soft() {
        return this._soft;
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
        return `${this.constructor.name}_${this._is2Din3D}_${this._dirMode}`;
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
        propBuffer[index + 5] = this._soft;
    }
    /**
     * @override SpriteEffectBase
     */
    initMaterial() {
        let define_macro = {
            DIR_VERTICAL: true
        };
        switch (this._dirMode) {
            case Direction.HORIZONTAL:
                define_macro.DIR_VERTICAL = false;
                break;
            case Direction.VERTICAL:
                define_macro.DIR_VERTICAL = true;
                break;
        }
        let mat = new cc_1.Material();
        mat.initialize({
            effectAsset: this.effectAsset,
            defines: define_macro,
            technique: this._is2Din3D ? 1 : 0
        });
        mat.setProperty('secondSprite', this.secondSprite);
        return mat;
    }
};
__decorate([
    property({ type: cc_1.Texture2D, tooltip: '指定貼圖' })
], SpriteEffectDisappear.prototype, "secondSprite", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Enum(Direction), tooltip: '指定方向' })
], SpriteEffectDisappear.prototype, "dirMode", null);
__decorate([
    property
], SpriteEffectDisappear.prototype, "_dirMode", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '消失偏移' })
], SpriteEffectDisappear.prototype, "offset", null);
__decorate([
    property
], SpriteEffectDisappear.prototype, "_offset", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 0.5, 0.01], tooltip: '柔邊程度' })
], SpriteEffectDisappear.prototype, "soft", null);
__decorate([
    property
], SpriteEffectDisappear.prototype, "_soft", void 0);
SpriteEffectDisappear = __decorate([
    ccclass('SpriteEffectDisappear')
], SpriteEffectDisappear);
exports.SpriteEffectDisappear = SpriteEffectDisappear;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0RGlzYXBwZWFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2Fzc2V0cy9jb21wL1Nwcml0ZUVmZmVjdERpc2FwcGVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBa0U7QUFDbEUsZ0NBQW9EO0FBQ3BELHlEQUFzRDtBQUV0RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUV6QyxJQUFZLFNBR1g7QUFIRCxXQUFZLFNBQVM7SUFDakIscURBQVUsQ0FBQTtJQUNWLGlEQUFRLENBQUE7QUFDWixDQUFDLEVBSFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7QUFHRCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLG1DQUFnQjtJQUEzRDs7UUFFVyxpQkFBWSxHQUFxQixJQUFJLENBQUM7UUFvQnJDLGFBQVEsR0FBYyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBb0J6QyxZQUFPLEdBQVcsR0FBRyxDQUFDO1FBcUJ0QixVQUFLLEdBQVcsR0FBRyxDQUFDO0lBNkRoQyxDQUFDO0lBeEhHLGtCQUFrQjtJQUVsQixJQUFXLE9BQU8sQ0FBQyxHQUFjO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBRXBCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUlELFlBQVk7SUFFWix5QkFBeUI7SUFFekIsSUFBVyxNQUFNLENBQUMsR0FBVztRQUN6QixJ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RjtBQUk3QztJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO29EQVUvRjtBQU9EO0lBREMsUUFBUTt1REFDd0M7QUFLakQ7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO21EQVMxRztBQU9EO0lBREMsUUFBUTtzREFDcUI7QUFNOUI7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO2lEQVM1RztBQU9EO0lBREMsUUFBUTtvREFDbUI7QUEvRG5CLHFCQUFxQjtJQURqQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7R0FDcEIscUJBQXFCLENBNEhqQztBQTVIWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb2xvciwgRW51bSwgTWF0ZXJpYWwsIFRleHR1cmUyRCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IERFViwgRURJVE9SX05PVF9JTl9QUkVWSUVXIH0gZnJvbSAnY2MvZW52JztcbmltcG9ydCB7IFNwcml0ZUVmZmVjdEJhc2UgfSBmcm9tICcuL1Nwcml0ZUVmZmVjdEJhc2UnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBEaXJlY3Rpb24ge1xuICAgIEhPUklaT05UQUwsXG4gICAgVkVSVElDQUxcbn1cblxuQGNjY2xhc3MoJ1Nwcml0ZUVmZmVjdERpc2FwcGVhcicpXG5leHBvcnQgY2xhc3MgU3ByaXRlRWZmZWN0RGlzYXBwZWFyIGV4dGVuZHMgU3ByaXRlRWZmZWN0QmFzZSB7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogVGV4dHVyZTJELCB0b29sdGlwOiAn5oyH5a6a6LK85ZyWJyB9KVxuICAgIHB1YmxpYyBzZWNvbmRTcHJpdGU6IFRleHR1cmUyRCB8IG51bGwgPSBudWxsO1xuXG4gICAgLy8jcmVnaW9uIHRvbmVNb2RlXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0eXBlOiBFbnVtKERpcmVjdGlvbiksIHRvb2x0aXA6ICfmjIflrprmlrnlkJEnIH0pXG4gICAgcHVibGljIHNldCBkaXJNb2RlKHZhbDogRGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2Rpck1vZGUgPSB2YWw7XG5cbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMuY291bnRPZlByb3BzKTtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faXNQcm9wRGlydHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBkaXJNb2RlKCk6IERpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJNb2RlO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX2Rpck1vZGU6IERpcmVjdGlvbiA9IERpcmVjdGlvbi5WRVJUSUNBTDtcbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiBkaXNhcHBlYXJPZmZzZXRcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEsIDAuMDFdLCB0b29sdGlwOiAn5raI5aSx5YGP56e7JyB9KVxuICAgIHB1YmxpYyBzZXQgb2Zmc2V0KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX29mZnNldCA9IHZhbDtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lzUHJvcERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgb2Zmc2V0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfb2Zmc2V0OiBudW1iZXIgPSAwLjA7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiB0cmFuc2x1Y2VudE9mZnNldFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMC41LCAwLjAxXSwgdG9vbHRpcDogJ+aflOmCiueoi+W6picgfSlcbiAgICBwdWJsaWMgc2V0IHNvZnQodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc29mdCA9IHZhbDtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lzUHJvcERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc29mdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc29mdDtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9zb2Z0OiBudW1iZXIgPSAwLjA7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBvdmVycmlkZVxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldCBjb3VudE9mVXNlZEZsb2F0cygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gODtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRQcm9wc1VuaW9uS2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9XyR7dGhpcy5faXMyRGluM0R9XyR7dGhpcy5fZGlyTW9kZX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVBhcmFtcyhpbmRleDogbnVtYmVyLCBwcm9wQnVmZmVyOiBGbG9hdDMyQXJyYXkpOiB2b2lkIHtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDBdID0gdGhpcy5fZWZmZWN0Q29sb3IuciAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDFdID0gdGhpcy5fZWZmZWN0Q29sb3IuZyAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDJdID0gdGhpcy5fZWZmZWN0Q29sb3IuYiAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDNdID0gdGhpcy5fZWZmZWN0Q29sb3IuYSAvIDI1NTtcblxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNF0gPSB0aGlzLl9vZmZzZXQ7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA1XSA9IHRoaXMuX3NvZnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaW5pdE1hdGVyaWFsKCk6IE1hdGVyaWFsIHtcbiAgICAgICAgbGV0IGRlZmluZV9tYWNybyA9IHtcbiAgICAgICAgICAgIERJUl9WRVJUSUNBTDogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5fZGlyTW9kZSkge1xuICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uSE9SSVpPTlRBTDpcbiAgICAgICAgICAgICAgICBkZWZpbmVfbWFjcm8uRElSX1ZFUlRJQ0FMID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERpcmVjdGlvbi5WRVJUSUNBTDpcbiAgICAgICAgICAgICAgICBkZWZpbmVfbWFjcm8uRElSX1ZFUlRJQ0FMID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtYXQgPSBuZXcgTWF0ZXJpYWwoKTtcbiAgICAgICAgbWF0LmluaXRpYWxpemUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXG4gICAgICAgICAgICAgICAgZGVmaW5lczogZGVmaW5lX21hY3JvLFxuICAgICAgICAgICAgICAgIHRlY2huaXF1ZTogdGhpcy5faXMyRGluM0QgPyAxIDogMFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIG1hdC5zZXRQcm9wZXJ0eSgnc2Vjb25kU3ByaXRlJywgdGhpcy5zZWNvbmRTcHJpdGUpO1xuICAgICAgICByZXR1cm4gbWF0O1xuICAgIH1cbn1cblxuIl19