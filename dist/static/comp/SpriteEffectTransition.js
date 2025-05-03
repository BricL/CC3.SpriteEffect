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
        return `${this.constructor.name}_${this._is2Din3D}_${this._sampleFromRT}_${this._dirMode}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0VHJhbnNpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9zdGF0aWMvY29tcC9TcHJpdGVFZmZlY3RUcmFuc2l0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUEyRDtBQUMzRCxnQ0FBK0M7QUFDL0MseURBQXNEO0FBRXRELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBRXpDLElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNqQixxREFBVSxDQUFBO0lBQ1YsaURBQVEsQ0FBQTtBQUNaLENBQUMsRUFIVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUdwQjtBQUdELElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsbUNBQWdCO0lBQTVEOztRQUVXLGlCQUFZLEdBQXFCLElBQUksQ0FBQztRQXFCckMsYUFBUSxHQUFjLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFvQnpDLFlBQU8sR0FBVyxHQUFHLENBQUM7UUFxQnRCLFVBQUssR0FBVyxHQUFHLENBQUM7SUFrRWhDLENBQUM7SUE5SEcsa0JBQWtCO0lBRWxCLElBQVcsT0FBTyxDQUFDLEdBQWM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFFcEIsSUFBSSwyQkFBcUIsRUFBRTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUlELFlB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QUFFLE1BQU0sRUFBRSxDQUFDO2tEQVM1RztBQU9EO0lBREMsUUFBUTtxREFDbUI7QUFoRW5CLHNCQUFzQjtJQURsQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7R0FDckIsc0JBQXNCLENBa0lsQztBQWxJWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBFbnVtLCBNYXRlcmlhbCwgVGV4dHVyZTJEIH0gZnJvbSAnY2MnO1xyXG5pbXBvcnQgeyBFRElUT1JfTk9UX0lOX1BSRVZJRVcgfSBmcm9tICdjYy9lbnYnO1xyXG5pbXBvcnQgeyBTcHJpdGVFZmZlY3RCYXNlIH0gZnJvbSAnLi9TcHJpdGVFZmZlY3RCYXNlJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgZW51bSBEaXJlY3Rpb24ge1xyXG4gICAgSE9SSVpPTlRBTCxcclxuICAgIFZFUlRJQ0FMXHJcbn1cclxuXHJcbkBjY2NsYXNzKCdTcHJpdGVFZmZlY3RUcmFuc2l0aW9uJylcclxuZXhwb3J0IGNsYXNzIFNwcml0ZUVmZmVjdFRyYW5zaXRpb24gZXh0ZW5kcyBTcHJpdGVFZmZlY3RCYXNlIHtcclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFRleHR1cmUyRCwgdG9vbHRpcDogJ+aMh+WumuiyvOWclicgfSlcclxuICAgIHB1YmxpYyBzcHJpdGVGcmFtZTI6IFRleHR1cmUyRCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIC8vI3JlZ2lvbiB0b25lTW9kZVxyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0eXBlOiBFbnVtKERpcmVjdGlvbiksIHRvb2x0aXA6ICfmjIflrprmlrnlkJEnIH0pXHJcbiAgICBwdWJsaWMgc2V0IGRpck1vZGUodmFsOiBEaXJlY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl9kaXJNb2RlID0gdmFsO1xyXG5cclxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCh0aGlzLnBpeGVsc1VzYWdlKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMucGl4ZWxzVXNhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkaXJNb2RlKCk6IERpcmVjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpck1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9kaXJNb2RlOiBEaXJlY3Rpb24gPSBEaXJlY3Rpb24uVkVSVElDQUw7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvLyNyZWdpb24gZGlzYXBwZWFyT2Zmc2V0XHJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEsIDAuMDFdLCB0b29sdGlwOiAn5raI5aSx5YGP56e7JyB9KVxyXG4gICAgcHVibGljIHNldCBvZmZzZXQodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9vZmZzZXQgPSB2YWw7XHJcblxyXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgb2Zmc2V0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX29mZnNldDogbnVtYmVyID0gMC4wO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiB0cmFuc2x1Y2VudE9mZnNldFxyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAwLjUsIDAuMDFdLCB0b29sdGlwOiAn5p+U6YKK56iL5bqmJyB9KVxyXG4gICAgcHVibGljIHNldCBzb2Z0KHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fc29mdCA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzb2Z0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9zb2Z0OiBudW1iZXIgPSAwLjA7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIG92ZXJyaWRlXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBnZXQgZmxvYXRVc2FnZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldEVmZmVjdFVuaW9uS2V5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY29uc3RydWN0b3IubmFtZX1fJHt0aGlzLl9pczJEaW4zRH1fJHt0aGlzLl9zYW1wbGVGcm9tUlR9XyR7dGhpcy5fZGlyTW9kZX1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVBhcmFtcyhpZHg6IG51bWJlciwgdGV4dHVyZVdpZHRoOiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuY2FsQnVmZmVySW5kZXgoaWR4LCAwLCB0ZXh0dXJlV2lkdGgpO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAwXSA9IHRoaXMuX2VmZmVjdENvbG9yLnIgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDFdID0gdGhpcy5fZWZmZWN0Q29sb3IuZyAvIDI1NTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMl0gPSB0aGlzLl9lZmZlY3RDb2xvci5iIC8gMjU1O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAzXSA9IHRoaXMuX2VmZmVjdENvbG9yLmEgLyAyNTU7XHJcblxyXG4gICAgICAgIGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDEsIHRleHR1cmVXaWR0aCk7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDRdID0gdGhpcy5fb2Zmc2V0O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA1XSA9IHRoaXMuX3NvZnQ7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDZdID0gMC4wO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA3XSA9IDEuMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBpbml0TWF0ZXJpYWwoKTogTWF0ZXJpYWwge1xyXG4gICAgICAgIGxldCBkZWZpbmVfbWFjcm8gPSB7XHJcbiAgICAgICAgICAgIFNBTVBMRV9GUk9NX1JUOiB0aGlzLl9zYW1wbGVGcm9tUlQsXHJcbiAgICAgICAgICAgIERJUl9WRVJUSUNBTDogdHJ1ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fZGlyTW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIERpcmVjdGlvbi5IT1JJWk9OVEFMOlxyXG4gICAgICAgICAgICAgICAgZGVmaW5lX21hY3JvLkRJUl9WRVJUSUNBTCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLlZFUlRJQ0FMOlxyXG4gICAgICAgICAgICAgICAgZGVmaW5lX21hY3JvLkRJUl9WRVJUSUNBTCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXQgPSBuZXcgTWF0ZXJpYWwoKTtcclxuICAgICAgICBtYXQuaW5pdGlhbGl6ZShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXHJcbiAgICAgICAgICAgICAgICBkZWZpbmVzOiBkZWZpbmVfbWFjcm8sXHJcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IHRoaXMuX2lzMkRpbjNEID8gMSA6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIG1hdC5zZXRQcm9wZXJ0eSgnc3ByaXRlRnJhbWUyJywgdGhpcy5zcHJpdGVGcmFtZTIpO1xyXG4gICAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==