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
            this.init(this.pixelsUsage);
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
    get floatUsage() {
        return 8;
    }
    /**
     * @override SpriteEffectBase
     */
    getEffectUnionKey() {
        return `${this.constructor.name}_${this._is2Din3D}_${this._dirMode}`;
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
        propBuffer[index + 4] = this._offset;
        propBuffer[index + 5] = this._soft;
        propBuffer[index + 6] = 0.0;
        propBuffer[index + 7] = 1.0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0RGlzYXBwZWFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL3N0YXRpYy9jb21wL1Nwcml0ZUVmZmVjdERpc2FwcGVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBa0U7QUFDbEUsZ0NBQW9EO0FBQ3BELHlEQUFzRDtBQUV0RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUV6QyxJQUFZLFNBR1g7QUFIRCxXQUFZLFNBQVM7SUFDakIscURBQVUsQ0FBQTtJQUNWLGlEQUFRLENBQUE7QUFDWixDQUFDLEVBSFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7QUFHRCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLG1DQUFnQjtJQUEzRDs7UUFFVyxpQkFBWSxHQUFxQixJQUFJLENBQUM7UUFvQnJDLGFBQVEsR0FBYyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBb0J6QyxZQUFPLEdBQVcsR0FBRyxDQUFDO1FBcUJ0QixVQUFLLEdBQVcsR0FBRyxDQUFDO0lBaUVoQyxDQUFDO0lBNUhHLGtCQUFrQjtJQUVsQixJQUFXLE9BQU8sQ0FBQyxHQUFjO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBRXBCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQU07WUFDSCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFJRCxZQUFZO0lBRVoseUJBQXlCO0lBRXpCLElBQVcsTUFBTSxDQUFDLEdBQVc7UUFDekIsSUFBSSxD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QWdJakM7QUFoSVksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29sb3IsIEVudW0sIE1hdGVyaWFsLCBUZXh0dXJlMkQgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBERVYsIEVESVRPUl9OT1RfSU5fUFJFVklFVyB9IGZyb20gJ2NjL2Vudic7XG5pbXBvcnQgeyBTcHJpdGVFZmZlY3RCYXNlIH0gZnJvbSAnLi9TcHJpdGVFZmZlY3RCYXNlJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuZXhwb3J0IGVudW0gRGlyZWN0aW9uIHtcbiAgICBIT1JJWk9OVEFMLFxuICAgIFZFUlRJQ0FMXG59XG5cbkBjY2NsYXNzKCdTcHJpdGVFZmZlY3REaXNhcHBlYXInKVxuZXhwb3J0IGNsYXNzIFNwcml0ZUVmZmVjdERpc2FwcGVhciBleHRlbmRzIFNwcml0ZUVmZmVjdEJhc2Uge1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFRleHR1cmUyRCwgdG9vbHRpcDogJ+aMh+WumuiyvOWclicgfSlcbiAgICBwdWJsaWMgc2Vjb25kU3ByaXRlOiBUZXh0dXJlMkQgfCBudWxsID0gbnVsbDtcblxuICAgIC8vI3JlZ2lvbiB0b25lTW9kZVxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdHlwZTogRW51bShEaXJlY3Rpb24pLCB0b29sdGlwOiAn5oyH5a6a5pa55ZCRJyB9KVxuICAgIHB1YmxpYyBzZXQgZGlyTW9kZSh2YWw6IERpcmVjdGlvbikge1xuICAgICAgICB0aGlzLl9kaXJNb2RlID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdCh0aGlzLnBpeGVsc1VzYWdlKTtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGRpck1vZGUoKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpck1vZGU7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfZGlyTW9kZTogRGlyZWN0aW9uID0gRGlyZWN0aW9uLlZFUlRJQ0FMO1xuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uIGRpc2FwcGVhck9mZnNldFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICfmtojlpLHlgY/np7snIH0pXG4gICAgcHVibGljIHNldCBvZmZzZXQodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG9mZnNldCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2V0O1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX29mZnNldDogbnVtYmVyID0gMC4wO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gdHJhbnNsdWNlbnRPZmZzZXRcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDAuNSwgMC4wMV0sIHRvb2x0aXA6ICfmn5TpgornqIvluqYnIH0pXG4gICAgcHVibGljIHNldCBzb2Z0KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NvZnQgPSB2YWw7XG5cbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc29mdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc29mdDtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9zb2Z0OiBudW1iZXIgPSAwLjA7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBvdmVycmlkZVxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldCBmbG9hdFVzYWdlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiA4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldEVmZmVjdFVuaW9uS2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9XyR7dGhpcy5faXMyRGluM0R9XyR7dGhpcy5fZGlyTW9kZX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVBhcmFtcyhpZHg6IG51bWJlciwgdGV4dHVyZVdpZHRoOiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmNhbEJ1ZmZlckluZGV4KGlkeCwgMCwgdGV4dHVyZVdpZHRoKTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDBdID0gdGhpcy5fZWZmZWN0Q29sb3IuciAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDFdID0gdGhpcy5fZWZmZWN0Q29sb3IuZyAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDJdID0gdGhpcy5fZWZmZWN0Q29sb3IuYiAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDNdID0gdGhpcy5fZWZmZWN0Q29sb3IuYSAvIDI1NTtcblxuICAgICAgICBpbmRleCA9IHRoaXMuY2FsQnVmZmVySW5kZXgoaWR4LCAxLCB0ZXh0dXJlV2lkdGgpO1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNF0gPSB0aGlzLl9vZmZzZXQ7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA1XSA9IHRoaXMuX3NvZnQ7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA2XSA9IDAuMDtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDddID0gMS4wO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGluaXRNYXRlcmlhbCgpOiBNYXRlcmlhbCB7XG4gICAgICAgIGxldCBkZWZpbmVfbWFjcm8gPSB7XG4gICAgICAgICAgICBESVJfVkVSVElDQUw6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2Rpck1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLkhPUklaT05UQUw6XG4gICAgICAgICAgICAgICAgZGVmaW5lX21hY3JvLkRJUl9WRVJUSUNBTCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uVkVSVElDQUw6XG4gICAgICAgICAgICAgICAgZGVmaW5lX21hY3JvLkRJUl9WRVJUSUNBTCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWF0ID0gbmV3IE1hdGVyaWFsKCk7XG4gICAgICAgIG1hdC5pbml0aWFsaXplKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxuICAgICAgICAgICAgICAgIGRlZmluZXM6IGRlZmluZV9tYWNybyxcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IHRoaXMuX2lzMkRpbjNEID8gMSA6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBtYXQuc2V0UHJvcGVydHkoJ3NlY29uZFNwcml0ZScsIHRoaXMuc2Vjb25kU3ByaXRlKTtcbiAgICAgICAgcmV0dXJuIG1hdDtcbiAgICB9XG59XG5cbiJdfQ==