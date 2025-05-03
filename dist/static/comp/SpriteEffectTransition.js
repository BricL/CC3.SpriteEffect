"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectTransition = exports.Direction = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
var Direction;
(function (Direction) {
    Direction[Direction["HORIZONTAL"] = 0] = "HORIZONTAL";
    Direction[Direction["VERTICAL"] = 1] = "VERTICAL";
})(Direction = exports.Direction || (exports.Direction = {}));
let SpriteEffectTransition = class SpriteEffectTransition extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this.spriteFrame2 = null;
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
            this.init(this.pixelsUsage);
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
        return `SpriteEffectTransition_${this._is2Din3D}_${this._sampleFromRT}_${this._dirMode}`;
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
            SAMPLE_FROM_RT: this._sampleFromRT,
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
        mat.setProperty('spriteFrame2', this.spriteFrame2);
        return mat;
    }
};
__decorate([
    property({ type: cc_1.Texture2D, tooltip: '指定貼圖' })
], SpriteEffectTransition.prototype, "spriteFrame2", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Enum(Direction), tooltip: '指定方向' })
], SpriteEffectTransition.prototype, "dirMode", null);
__decorate([
    property
], SpriteEffectTransition.prototype, "_dirMode", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: '消失偏移' })
], SpriteEffectTransition.prototype, "offset", null);
__decorate([
    property
], SpriteEffectTransition.prototype, "_offset", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 0.5, 0.01], tooltip: '柔邊程度' })
], SpriteEffectTransition.prototype, "soft", null);
__decorate([
    property
], SpriteEffectTransition.prototype, "_soft", void 0);
SpriteEffectTransition = __decorate([
    ccclass('SpriteEffectTransition')
], SpriteEffectTransition);
exports.SpriteEffectTransition = SpriteEffectTransition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0VHJhbnNpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9zdGF0aWMvY29tcC9TcHJpdGVFZmZlY3RUcmFuc2l0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUEyRDtBQUMzRCxnQ0FBK0M7QUFDL0MseURBQXNEO0FBRXRELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBRXpDLElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNqQixxREFBVSxDQUFBO0lBQ1YsaURBQVEsQ0FBQTtBQUNaLENBQUMsRUFIVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUdwQjtBQUdELElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsbUNBQWdCO0lBQTVEOztRQUVXLGlCQUFZLEdBQXFCLElBQUksQ0FBQztRQXFCckMsYUFBUSxHQUFjLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFvQnpDLFlBQU8sR0FBVyxHQUFHLENBQUM7UUFxQnRCLFVBQUssR0FBVyxHQUFHLENBQUM7SUFrRWhDLENBQUM7SUE5SEcsa0JBQWtCO0lBRWxCLElBQVcsT0FBTyxDQUFDLEdBQWM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFFcEIsSUFBSSwyQkFBcUIsRUFBRTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUlELFlB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T0Q7SUFEQyxRQUFRO3FEQUNtQjtBQWhFbkIsc0JBQXNCO0lBRGxDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztHQUNyQixzQkFBc0IsQ0FrSWxDO0FBbElZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IsIEVudW0sIE1hdGVyaWFsLCBUZXh0dXJlMkQgfSBmcm9tICdjYyc7XHJcbmltcG9ydCB7IEVESVRPUl9OT1RfSU5fUFJFVklFVyB9IGZyb20gJ2NjL2Vudic7XHJcbmltcG9ydCB7IFNwcml0ZUVmZmVjdEJhc2UgfSBmcm9tICcuL1Nwcml0ZUVmZmVjdEJhc2UnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBlbnVtIERpcmVjdGlvbiB7XHJcbiAgICBIT1JJWk9OVEFMLFxyXG4gICAgVkVSVElDQUxcclxufVxyXG5cclxuQGNjY2xhc3MoJ1Nwcml0ZUVmZmVjdFRyYW5zaXRpb24nKVxyXG5leHBvcnQgY2xhc3MgU3ByaXRlRWZmZWN0VHJhbnNpdGlvbiBleHRlbmRzIFNwcml0ZUVmZmVjdEJhc2Uge1xyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogVGV4dHVyZTJELCB0b29sdGlwOiAn5oyH5a6a6LK85ZyWJyB9KVxyXG4gICAgcHVibGljIHNwcml0ZUZyYW1lMjogVGV4dHVyZTJEIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgLy8jcmVnaW9uIHRvbmVNb2RlXHJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHR5cGU6IEVudW0oRGlyZWN0aW9uKSwgdG9vbHRpcDogJ+aMh+WumuaWueWQkScgfSlcclxuICAgIHB1YmxpYyBzZXQgZGlyTW9kZSh2YWw6IERpcmVjdGlvbikge1xyXG4gICAgICAgIHRoaXMuX2Rpck1vZGUgPSB2YWw7XHJcblxyXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMucGl4ZWxzVXNhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQodGhpcy5waXhlbHNVc2FnZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRpck1vZGUoKTogRGlyZWN0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlyTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX2Rpck1vZGU6IERpcmVjdGlvbiA9IERpcmVjdGlvbi5WRVJUSUNBTDtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vI3JlZ2lvbiBkaXNhcHBlYXJPZmZzZXRcclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6ICfmtojlpLHlgY/np7snIH0pXHJcbiAgICBwdWJsaWMgc2V0IG9mZnNldCh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX29mZnNldCA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBvZmZzZXQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSBfb2Zmc2V0OiBudW1iZXIgPSAwLjA7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIHRyYW5zbHVjZW50T2Zmc2V0XHJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDAuNSwgMC4wMV0sIHRvb2x0aXA6ICfmn5TpgornqIvluqYnIH0pXHJcbiAgICBwdWJsaWMgc2V0IHNvZnQodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zb2Z0ID0gdmFsO1xyXG5cclxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNvZnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc29mdDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX3NvZnQ6IG51bWJlciA9IDAuMDtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gb3ZlcnJpZGVcclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldCBmbG9hdFVzYWdlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0RWZmZWN0VW5pb25LZXkoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYFNwcml0ZUVmZmVjdFRyYW5zaXRpb25fJHt0aGlzLl9pczJEaW4zRH1fJHt0aGlzLl9zYW1wbGVGcm9tUlR9XyR7dGhpcy5fZGlyTW9kZX1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVBhcmFtcyhpZHg6IG51bWJlciwgdGV4dHVyZVdpZHRoOiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuY2FsQnVmZmVySW5kZXgoaWR4LCAwLCB0ZXh0dXJlV2lkdGgpO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAwXSA9IHRoaXMuX2VmZmVjdENvbG9yLnIgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDFdID0gdGhpcy5fZWZmZWN0Q29sb3IuZyAvIDI1NTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMl0gPSB0aGlzLl9lZmZlY3RDb2xvci5iIC8gMjU1O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAzXSA9IHRoaXMuX2VmZmVjdENvbG9yLmEgLyAyNTU7XHJcblxyXG4gICAgICAgIGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDEsIHRleHR1cmVXaWR0aCk7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDRdID0gdGhpcy5fb2Zmc2V0O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA1XSA9IHRoaXMuX3NvZnQ7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDZdID0gMC4wO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA3XSA9IDEuMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBpbml0TWF0ZXJpYWwoKTogTWF0ZXJpYWwge1xyXG4gICAgICAgIGxldCBkZWZpbmVfbWFjcm8gPSB7XHJcbiAgICAgICAgICAgIFNBTVBMRV9GUk9NX1JUOiB0aGlzLl9zYW1wbGVGcm9tUlQsXHJcbiAgICAgICAgICAgIERJUl9WRVJUSUNBTDogdHJ1ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fZGlyTW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIERpcmVjdGlvbi5IT1JJWk9OVEFMOlxyXG4gICAgICAgICAgICAgICAgZGVmaW5lX21hY3JvLkRJUl9WRVJUSUNBTCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLlZFUlRJQ0FMOlxyXG4gICAgICAgICAgICAgICAgZGVmaW5lX21hY3JvLkRJUl9WRVJUSUNBTCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXQgPSBuZXcgTWF0ZXJpYWwoKTtcclxuICAgICAgICBtYXQuaW5pdGlhbGl6ZShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXHJcbiAgICAgICAgICAgICAgICBkZWZpbmVzOiBkZWZpbmVfbWFjcm8sXHJcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IHRoaXMuX2lzMkRpbjNEID8gMSA6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIG1hdC5zZXRQcm9wZXJ0eSgnc3ByaXRlRnJhbWUyJywgdGhpcy5zcHJpdGVGcmFtZTIpO1xyXG4gICAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==