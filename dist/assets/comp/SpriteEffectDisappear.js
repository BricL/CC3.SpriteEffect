"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SpriteEffectDisappear_1;
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
let SpriteEffectDisappear = SpriteEffectDisappear_1 = class SpriteEffectDisappear extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this.secondSprite = null;
        this._dirMode = Direction.VERTICAL;
        this._offset = 0.0;
        this._soft = 0.0;
    }
    isDirty(idx) {
        return SpriteEffectDisappear_1._isPropDirty[idx];
    }
    setDirty(idx, val) {
        SpriteEffectDisappear_1._isPropDirty[idx] = val;
    }
    //#region toneMode
    set dirMode(val) {
        this._dirMode = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.init(this.countOfProps);
            this.reflashParams();
        }
        else {
            this.reflashParams();
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
            this.reflashParams();
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
            this.reflashParams();
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
SpriteEffectDisappear._isPropDirty = [false, false, false];
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
SpriteEffectDisappear = SpriteEffectDisappear_1 = __decorate([
    ccclass('SpriteEffectDisappear')
], SpriteEffectDisappear);
exports.SpriteEffectDisappear = SpriteEffectDisappear;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0RGlzYXBwZWFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL2Fzc2V0cy9jb21wL1Nwcml0ZUVmZmVjdERpc2FwcGVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkJBQWtFO0FBQ2xFLGdDQUFvRDtBQUNwRCx5REFBc0Q7QUFFdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxlQUFVLENBQUM7QUFFekMsSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ2pCLHFEQUFVLENBQUE7SUFDVixpREFBUSxDQUFBO0FBQ1osQ0FBQyxFQUhXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBR3BCO0FBR0QsSUFBYSxxQkFBcUIsNkJBQWxDLE1BQWEscUJBQXNCLFNBQVEsbUNBQWdCO0lBQTNEOztRQWNXLGlCQUFZLEdBQXFCLElBQUksQ0FBQztRQW9CckMsYUFBUSxHQUFjLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFvQnpDLFlBQU8sR0FBVyxHQUFHLENBQUM7UUFxQnRCLFVBQUssR0FBVyxHQUFHLENBQUM7SUE2RGhDLENBQUM7SUFySWEsT0FBTyxDQUFDLEdBQVc7UUFDekIsT0FBTyx1QkFBcUIsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVTLFFBQVEsQ0FBQyxHQUFXLEVBQUUsR0FBWTtRQUN4Qyx1QkFBcUIsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ2xELENBQUM7SUFPRCxrQkFBa0I7SUFFbEIsSUFBVyxPQUFPLENBQUMsR0FBYztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUVwQixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FB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b250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IsIENvbG9yLCBFbnVtLCBNYXRlcmlhbCwgVGV4dHVyZTJEIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgREVWLCBFRElUT1JfTk9UX0lOX1BSRVZJRVcgfSBmcm9tICdjYy9lbnYnO1xuaW1wb3J0IHsgU3ByaXRlRWZmZWN0QmFzZSB9IGZyb20gJy4vU3ByaXRlRWZmZWN0QmFzZSc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbmV4cG9ydCBlbnVtIERpcmVjdGlvbiB7XG4gICAgSE9SSVpPTlRBTCxcbiAgICBWRVJUSUNBTFxufVxuXG5AY2NjbGFzcygnU3ByaXRlRWZmZWN0RGlzYXBwZWFyJylcbmV4cG9ydCBjbGFzcyBTcHJpdGVFZmZlY3REaXNhcHBlYXIgZXh0ZW5kcyBTcHJpdGVFZmZlY3RCYXNlIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfaXNQcm9wRGlydHk6IGJvb2xlYW5bXSA9IFtmYWxzZSwgZmFsc2UsIGZhbHNlXTtcblxuICAgIHByb3RlY3RlZCBpc0RpcnR5KGlkeDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBTcHJpdGVFZmZlY3REaXNhcHBlYXIuX2lzUHJvcERpcnR5W2lkeF07XG4gICAgfVxuICAgIFxuICAgIHByb3RlY3RlZCBzZXREaXJ0eShpZHg6IG51bWJlciwgdmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIFNwcml0ZUVmZmVjdERpc2FwcGVhci5faXNQcm9wRGlydHlbaWR4XSA9IHZhbDtcbiAgICB9XG5cblxuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogVGV4dHVyZTJELCB0b29sdGlwOiAn5oyH5a6a6LK85ZyWJyB9KVxuICAgIHB1YmxpYyBzZWNvbmRTcHJpdGU6IFRleHR1cmUyRCB8IG51bGwgPSBudWxsO1xuXG4gICAgLy8jcmVnaW9uIHRvbmVNb2RlXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0eXBlOiBFbnVtKERpcmVjdGlvbiksIHRvb2x0aXA6ICfmjIflrprmlrnlkJEnIH0pXG4gICAgcHVibGljIHNldCBkaXJNb2RlKHZhbDogRGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2Rpck1vZGUgPSB2YWw7XG5cbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMuY291bnRPZlByb3BzKTtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGRpck1vZGUoKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpck1vZGU7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfZGlyTW9kZTogRGlyZWN0aW9uID0gRGlyZWN0aW9uLlZFUlRJQ0FMO1xuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uIGRpc2FwcGVhck9mZnNldFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICfmtojlpLHlgY/np7snIH0pXG4gICAgcHVibGljIHNldCBvZmZzZXQodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG9mZnNldCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2V0O1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX29mZnNldDogbnVtYmVyID0gMC4wO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gdHJhbnNsdWNlbnRPZmZzZXRcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDAuNSwgMC4wMV0sIHRvb2x0aXA6ICfmn5TpgornqIvluqYnIH0pXG4gICAgcHVibGljIHNldCBzb2Z0KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NvZnQgPSB2YWw7XG5cbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc29mdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc29mdDtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9zb2Z0OiBudW1iZXIgPSAwLjA7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBvdmVycmlkZVxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldCBjb3VudE9mVXNlZEZsb2F0cygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gODtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRQcm9wc1VuaW9uS2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9XyR7dGhpcy5faXMyRGluM0R9XyR7dGhpcy5fZGlyTW9kZX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVBhcmFtcyhpbmRleDogbnVtYmVyLCBwcm9wQnVmZmVyOiBGbG9hdDMyQXJyYXkpOiB2b2lkIHtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDBdID0gdGhpcy5fZWZmZWN0Q29sb3IuciAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDFdID0gdGhpcy5fZWZmZWN0Q29sb3IuZyAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDJdID0gdGhpcy5fZWZmZWN0Q29sb3IuYiAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDNdID0gdGhpcy5fZWZmZWN0Q29sb3IuYSAvIDI1NTtcblxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNF0gPSB0aGlzLl9vZmZzZXQ7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA1XSA9IHRoaXMuX3NvZnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaW5pdE1hdGVyaWFsKCk6IE1hdGVyaWFsIHtcbiAgICAgICAgbGV0IGRlZmluZV9tYWNybyA9IHtcbiAgICAgICAgICAgIERJUl9WRVJUSUNBTDogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5fZGlyTW9kZSkge1xuICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uSE9SSVpPTlRBTDpcbiAgICAgICAgICAgICAgICBkZWZpbmVfbWFjcm8uRElSX1ZFUlRJQ0FMID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERpcmVjdGlvbi5WRVJUSUNBTDpcbiAgICAgICAgICAgICAgICBkZWZpbmVfbWFjcm8uRElSX1ZFUlRJQ0FMID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtYXQgPSBuZXcgTWF0ZXJpYWwoKTtcbiAgICAgICAgbWF0LmluaXRpYWxpemUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXG4gICAgICAgICAgICAgICAgZGVmaW5lczogZGVmaW5lX21hY3JvLFxuICAgICAgICAgICAgICAgIHRlY2huaXF1ZTogdGhpcy5faXMyRGluM0QgPyAxIDogMFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIG1hdC5zZXRQcm9wZXJ0eSgnc2Vjb25kU3ByaXRlJywgdGhpcy5zZWNvbmRTcHJpdGUpO1xuICAgICAgICByZXR1cm4gbWF0O1xuICAgIH1cbn1cblxuIl19