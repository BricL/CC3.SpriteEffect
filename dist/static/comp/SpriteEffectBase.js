"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SpriteEffectBase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectBase = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const { ccclass, property } = cc_1._decorator;
let SpriteEffectBase = SpriteEffectBase_1 = class SpriteEffectBase extends cc_1.Sprite {
    constructor() {
        super(...arguments);
        this.effectAsset = null;
        this._instanceID = -1;
        this._effectColor = new cc_1.Color(255, 255, 255, 255);
        this._is2Din3D = false;
    }
    //#region effectColor
    set effectColor(val) {
        this._effectColor = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get effectColor() {
        return this._effectColor;
    }
    //#endregion
    //#region is2Din3D
    set is2Din3D(val) {
        this._is2Din3D = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get is2Din3D() {
        return this._is2Din3D;
    }
    //#endregion
    //#region methods
    /**
     * 4個float為一個pixel，需使用幾個pixel數量
     */
    get pixelsUsage() {
        const num = Math.ceil(this.floatUsage / 4.0);
        return num;
    }
    init(countOfProps) {
        const unionKey = this.getPropsUnionKey();
        cc_1.log(`init: ${unionKey}`);
        // Step1: 取的當前的effectIndex
        if (!SpriteEffectBase_1._s_effectMap.has(unionKey)) {
            const temp = new Array(768).fill(""); // R/G/B (0~255) => 256 * 3 = 768
            // temp[256] = temp[512] = "skip";
            SpriteEffectBase_1._s_effectMap.set(unionKey, temp);
        }
        let instanceID = SpriteEffectBase_1._s_effectMap.get(unionKey).findIndex((v) => v === this.node.uuid);
        if (instanceID === -1) {
            instanceID = SpriteEffectBase_1._s_effectMap.get(unionKey).findIndex((v) => v === "");
            if (instanceID === -1) {
                cc_1.error("Effect map is full!");
                return;
            }
        }
        this._instanceID = instanceID;
        SpriteEffectBase_1._s_effectMap.get(unionKey)[this._instanceID] = this.node.uuid;
        if (this.instanceGroupIdx === 0) {
            this.color = new cc_1.Color(this._instanceID, 0, 0, 255);
        }
        else if (this.instanceGroupIdx === 1) {
            this.color = new cc_1.Color(255, (this._instanceID - 255), 0, 255);
        }
        else if (this.instanceGroupIdx === 2) {
            this.color = new cc_1.Color(255, 255, (this._instanceID - 510), 255);
        }
        else {
            cc_1.error(`The prop group index, ${this.instanceGroupIdx}, is out of range!`);
            return;
        }
        // Step2: 初始化Effect props
        if (!SpriteEffectBase_1._s_effectProps.has(unionKey)) {
            const temp = new Array(3).fill(null); // Only use R/G/B 3 channels
            SpriteEffectBase_1._s_effectProps.set(unionKey, temp);
        }
        if (SpriteEffectBase_1._s_effectProps.get(unionKey)[this.instanceGroupIdx] === null) {
            const w = 256 * countOfProps;
            const h = 1;
            let propBuffer = new Float32Array(w * h * 4);
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const index = (y * w + x) * 4;
                    propBuffer[index] = 1;
                    propBuffer[index + 1] = 0;
                    propBuffer[index + 2] = 1;
                    propBuffer[index + 3] = 1;
                }
            }
            let propsTexture = new cc_1.Texture2D();
            propsTexture.setFilters(cc_1.Texture2D.Filter.NEAREST, cc_1.Texture2D.Filter.NEAREST);
            propsTexture.reset({
                width: w,
                height: h,
                format: cc_1.Texture2D.PixelFormat.RGBA32F,
                mipmapLevel: 0
            });
            propsTexture.uploadData(propBuffer);
            let mat = this.initMaterial();
            mat.setProperty('propsTexture', propsTexture);
            SpriteEffectBase_1._s_effectProps.get(unionKey)[this.instanceGroupIdx] = {
                mat: mat,
                propBuffer: propBuffer,
                propTexture: propsTexture,
                isDirty: false
            };
        }
        this.customMaterial = SpriteEffectBase_1._s_effectProps.get(unionKey)[this.instanceGroupIdx].mat;
    }
    reflashParams() {
        const unionKey = this.getPropsUnionKey();
        const index = this.getBufferIndex();
        const effectProps = SpriteEffectBase_1._s_effectProps.get(unionKey)[this.instanceGroupIdx];
        // Update the effect parameters from the derived class.
        this.updateParams(index, effectProps.propBuffer);
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            effectProps.propTexture.uploadData(effectProps.propBuffer);
        }
        else {
            effectProps.isDirty = true;
        }
    }
    /**
     * 每256個為一組
     */
    get instanceGroupIdx() {
        return Math.floor(this._instanceID / 256);
    }
    getUV(uv) {
        let minU = Math.min(uv[0], uv[2], uv[4], uv[6]);
        let minV = Math.min(uv[1], uv[3], uv[5], uv[7]);
        let maxU = Math.max(uv[0], uv[2], uv[4], uv[6]);
        let maxV = Math.max(uv[1], uv[3], uv[5], uv[7]);
        let width = maxU - minU;
        let height = maxV - minV;
        return new cc_1.Vec4(minU, minV, width, height);
    }
    getBufferIndex() {
        const offset = this._instanceID - (this.instanceGroupIdx * 256);
        return offset * (this.pixelsUsage * 4);
    }
    //#endregion
    //#region life cycle
    onLoad() {
        this.init(this.pixelsUsage);
    }
    start() {
        this.reflashParams();
    }
    onDestroy() {
        const unionKey = this.getPropsUnionKey();
        if (SpriteEffectBase_1._s_effectMap.has(unionKey)) {
            const index = SpriteEffectBase_1._s_effectMap.get(unionKey).findIndex((v) => v === this.node.uuid);
            if (index === -1) {
                cc_1.error("Effect index is not found!");
                return;
            }
            SpriteEffectBase_1._s_effectMap.get(unionKey)[index] = "";
        }
        else {
            cc_1.error(`The effect map of ${unionKey} is not found!`);
        }
    }
    lateUpdate(dt) {
        const unionKey = this.getPropsUnionKey();
        const effectProps = SpriteEffectBase_1._s_effectProps.get(unionKey)[this.instanceGroupIdx];
        if (effectProps.isDirty) {
            cc_1.log(`${this.constructor.name}'s effect props is DIRTY!`);
            effectProps.propTexture.uploadData(effectProps.propBuffer);
            effectProps.isDirty = false;
        }
    }
};
SpriteEffectBase._s_effectMap = new Map();
SpriteEffectBase._s_effectProps = new Map();
__decorate([
    property({ type: cc_1.EffectAsset, tooltip: '指定效果EffectAsset' })
], SpriteEffectBase.prototype, "effectAsset", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Color, tooltip: "My Color" })
], SpriteEffectBase.prototype, "effectColor", null);
__decorate([
    property
], SpriteEffectBase.prototype, "_effectColor", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '當使用RenderRoot2D時使用' })
], SpriteEffectBase.prototype, "is2Din3D", null);
__decorate([
    property
], SpriteEffectBase.prototype, "_is2Din3D", void 0);
SpriteEffectBase = SpriteEffectBase_1 = __decorate([
    ccclass('SpriteEffectBase')
], SpriteEffectBase);
exports.SpriteEffectBase = SpriteEffectBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9zdGF0aWMvY29tcC9TcHJpdGVFZmZlY3RCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQkFBbUc7QUFDbkcsZ0NBQStDO0FBQy9DLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBVXpDLElBQXNCLGdCQUFnQix3QkFBdEMsTUFBc0IsZ0JBQWlCLFNBQVEsV0FBTTtJQUFyRDs7UUFLVyxnQkFBVyxHQUF1QixJQUFJLENBQUM7UUFFcEMsZ0JBQVcsR0FBVyxDQUFDLENBQUMsQ0FBQztRQW9CekIsaUJBQVksR0FBVSxJQUFJLFVBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQXVCcEQsY0FBUyxHQUFZLEtBQUssQ0FBQztJQXFNekMsQ0FBQztJQTlPRyxxQkFBcUI7SUFFckIsSUFBVyxXQUFXLENBQUMsR0FBVTtRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUV4QixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVELElBQVcsV0FBVztRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUlELFlBQVk7SUFHWixrQkFBa0I7SUFFbEIsSUFBVyxRQUFRLENBQUMsR0FBWTtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUVyQixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4Qjth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O0dBQ04sZ0JBQWdCLENBdVByQztBQXZQcUIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29sb3IsIEVmZmVjdEFzc2V0LCBlcnJvciwgbG9nLCBNYXRlcmlhbCwgU3ByaXRlLCBUZXh0dXJlMkQsIFZlYzQgfSBmcm9tIFwiY2NcIjtcbmltcG9ydCB7IEVESVRPUl9OT1RfSU5fUFJFVklFVyB9IGZyb20gXCJjYy9lbnZcIjtcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbmV4cG9ydCB0eXBlIEVmZmVjdFByb3BzID0ge1xuICAgIG1hdDogTWF0ZXJpYWwgfCBudWxsO1xuICAgIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSB8IG51bGw7XG4gICAgcHJvcFRleHR1cmU6IFRleHR1cmUyRCB8IG51bGw7XG4gICAgaXNEaXJ0eTogYm9vbGVhbjtcbn1cblxuQGNjY2xhc3MoJ1Nwcml0ZUVmZmVjdEJhc2UnKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNwcml0ZUVmZmVjdEJhc2UgZXh0ZW5kcyBTcHJpdGUge1xuICAgIHByb3RlY3RlZCBzdGF0aWMgX3NfZWZmZWN0TWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuICAgIHByb3RlY3RlZCBzdGF0aWMgX3NfZWZmZWN0UHJvcHMgPSBuZXcgTWFwPHN0cmluZywgRWZmZWN0UHJvcHNbXT4oKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEVmZmVjdEFzc2V0LCB0b29sdGlwOiAn5oyH5a6a5pWI5p6cRWZmZWN0QXNzZXQnIH0pXG4gICAgcHVibGljIGVmZmVjdEFzc2V0OiBFZmZlY3RBc3NldCB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJvdGVjdGVkIF9pbnN0YW5jZUlEOiBudW1iZXIgPSAtMTtcblxuICAgIC8vI3JlZ2lvbiBlZmZlY3RDb2xvclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdHlwZTogQ29sb3IsIHRvb2x0aXA6IFwiTXkgQ29sb3JcIiB9KVxuICAgIHB1YmxpYyBzZXQgZWZmZWN0Q29sb3IodmFsOiBDb2xvcikge1xuICAgICAgICB0aGlzLl9lZmZlY3RDb2xvciA9IHZhbDtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBlZmZlY3RDb2xvcigpOiBDb2xvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZmZlY3RDb2xvcjtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcm90ZWN0ZWQgX2VmZmVjdENvbG9yOiBDb2xvciA9IG5ldyBDb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gaXMyRGluM0RcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHRvb2x0aXA6ICfnlbbkvb/nlKhSZW5kZXJSb290MkTmmYLkvb/nlKgnIH0pXG4gICAgcHVibGljIHNldCBpczJEaW4zRCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXMyRGluM0QgPSB2YWw7XG5cbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMucGl4ZWxzVXNhZ2UpO1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXMyRGluM0QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pczJEaW4zRDtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcm90ZWN0ZWQgX2lzMkRpbjNEOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBhYnN0cmFjdCBtZXRob2RzXG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogUmV0dXJuIHRoZSBjb3VudCBvZiB1c2VkIGZsb2F0cyBvZiB0aGUgZWZmZWN0LlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBnZXQgZmxvYXRVc2FnZSgpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3QgXG4gICAgICogR2VuZXJhdGUgYSBVbmlvbiBrZXkgZm9yIHRoZSBlZmZlY3QuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldFByb3BzVW5pb25LZXkoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogVXBkYXRlIHRoZSBlZmZlY3QgcGFyYW1ldGVycy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgdXBkYXRlUGFyYW1zKGluZGV4OiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBJbml0aWFsaXplIHRoZSBtYXRlcmlhbC5cbiAgICAgKiBAcmV0dXJucyBNYXRlcmlhbFxuICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGluaXRNYXRlcmlhbCgpOiBNYXRlcmlhbDtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIG1ldGhvZHNcbiAgICAvKipcbiAgICAgKiA05YCLZmxvYXTngrrkuIDlgItwaXhlbO+8jOmcgOS9v+eUqOW5vuWAi3BpeGVs5pW46YePXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldCBwaXhlbHNVc2FnZSgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBudW0gPSBNYXRoLmNlaWwodGhpcy5mbG9hdFVzYWdlIC8gNC4wKTtcbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdChjb3VudE9mUHJvcHM6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCB1bmlvbktleSA9IHRoaXMuZ2V0UHJvcHNVbmlvbktleSgpO1xuICAgICAgICBsb2coYGluaXQ6ICR7dW5pb25LZXl9YCk7XG5cbiAgICAgICAgLy8gU3RlcDE6IOWPlueahOeVtuWJjeeahGVmZmVjdEluZGV4XG4gICAgICAgIGlmICghU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuaGFzKHVuaW9uS2V5KSkge1xuICAgICAgICAgICAgY29uc3QgdGVtcCA9IG5ldyBBcnJheSg3NjgpLmZpbGwoXCJcIik7ICAvLyBSL0cvQiAoMH4yNTUpID0+IDI1NiAqIDMgPSA3NjhcbiAgICAgICAgICAgIC8vIHRlbXBbMjU2XSA9IHRlbXBbNTEyXSA9IFwic2tpcFwiO1xuICAgICAgICAgICAgU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuc2V0KHVuaW9uS2V5LCB0ZW1wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbnN0YW5jZUlEID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSEuZmluZEluZGV4KCh2KSA9PiB2ID09PSB0aGlzLm5vZGUudXVpZCk7XG4gICAgICAgIGlmIChpbnN0YW5jZUlEID09PSAtMSkge1xuICAgICAgICAgICAgaW5zdGFuY2VJRCA9IFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0TWFwLmdldCh1bmlvbktleSkhLmZpbmRJbmRleCgodikgPT4gdiA9PT0gXCJcIik7XG4gICAgICAgICAgICBpZiAoaW5zdGFuY2VJRCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBlcnJvcihcIkVmZmVjdCBtYXAgaXMgZnVsbCFcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2luc3RhbmNlSUQgPSBpbnN0YW5jZUlEO1xuXG4gICAgICAgIFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0TWFwLmdldCh1bmlvbktleSkhW3RoaXMuX2luc3RhbmNlSURdID0gdGhpcy5ub2RlLnV1aWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VHcm91cElkeCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IG5ldyBDb2xvcih0aGlzLl9pbnN0YW5jZUlELCAwLCAwLCAyNTUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaW5zdGFuY2VHcm91cElkeCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9IG5ldyBDb2xvcigyNTUsICh0aGlzLl9pbnN0YW5jZUlEIC0gMjU1KSwgMCwgMjU1KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmluc3RhbmNlR3JvdXBJZHggPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBuZXcgQ29sb3IoMjU1LCAyNTUsICh0aGlzLl9pbnN0YW5jZUlEIC0gNTEwKSwgMjU1KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yKGBUaGUgcHJvcCBncm91cCBpbmRleCwgJHt0aGlzLmluc3RhbmNlR3JvdXBJZHh9LCBpcyBvdXQgb2YgcmFuZ2UhYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGVwMjog5Yid5aeL5YyWRWZmZWN0IHByb3BzXG4gICAgICAgIGlmICghU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RQcm9wcy5oYXModW5pb25LZXkpKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gbmV3IEFycmF5KDMpLmZpbGwobnVsbCk7IC8vIE9ubHkgdXNlIFIvRy9CIDMgY2hhbm5lbHNcbiAgICAgICAgICAgIFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0UHJvcHMuc2V0KHVuaW9uS2V5LCB0ZW1wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChTcHJpdGVFZmZlY3RCYXNlLl9zX2VmZmVjdFByb3BzLmdldCh1bmlvbktleSkhW3RoaXMuaW5zdGFuY2VHcm91cElkeF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHcgPSAyNTYgKiBjb3VudE9mUHJvcHM7XG4gICAgICAgICAgICBjb25zdCBoID0gMTtcblxuICAgICAgICAgICAgbGV0IHByb3BCdWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KHcgKiBoICogNCk7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGg7IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdzsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKHkgKiB3ICsgeCkgKiA0O1xuICAgICAgICAgICAgICAgICAgICBwcm9wQnVmZmVyW2luZGV4XSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAyXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAzXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcHJvcHNUZXh0dXJlID0gbmV3IFRleHR1cmUyRCgpO1xuICAgICAgICAgICAgcHJvcHNUZXh0dXJlLnNldEZpbHRlcnMoVGV4dHVyZTJELkZpbHRlci5ORUFSRVNULCBUZXh0dXJlMkQuRmlsdGVyLk5FQVJFU1QpO1xuICAgICAgICAgICAgcHJvcHNUZXh0dXJlLnJlc2V0KHtcbiAgICAgICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGgsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBUZXh0dXJlMkQuUGl4ZWxGb3JtYXQuUkdCQTMyRixcbiAgICAgICAgICAgICAgICBtaXBtYXBMZXZlbDogMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwcm9wc1RleHR1cmUudXBsb2FkRGF0YShwcm9wQnVmZmVyKTtcblxuICAgICAgICAgICAgbGV0IG1hdCA9IHRoaXMuaW5pdE1hdGVyaWFsKCk7XG4gICAgICAgICAgICBtYXQuc2V0UHJvcGVydHkoJ3Byb3BzVGV4dHVyZScsIHByb3BzVGV4dHVyZSk7XG5cbiAgICAgICAgICAgIFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0UHJvcHMuZ2V0KHVuaW9uS2V5KSFbdGhpcy5pbnN0YW5jZUdyb3VwSWR4XSA9IHtcbiAgICAgICAgICAgICAgICBtYXQ6IG1hdCxcbiAgICAgICAgICAgICAgICBwcm9wQnVmZmVyOiBwcm9wQnVmZmVyLFxuICAgICAgICAgICAgICAgIHByb3BUZXh0dXJlOiBwcm9wc1RleHR1cmUsXG4gICAgICAgICAgICAgICAgaXNEaXJ0eTogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1c3RvbU1hdGVyaWFsID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RQcm9wcy5nZXQodW5pb25LZXkpIVt0aGlzLmluc3RhbmNlR3JvdXBJZHhdLm1hdDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVmbGFzaFBhcmFtcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdW5pb25LZXkgPSB0aGlzLmdldFByb3BzVW5pb25LZXkoKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEJ1ZmZlckluZGV4KCk7XG4gICAgICAgIGNvbnN0IGVmZmVjdFByb3BzID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RQcm9wcy5nZXQodW5pb25LZXkpIVt0aGlzLmluc3RhbmNlR3JvdXBJZHhdO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgZWZmZWN0IHBhcmFtZXRlcnMgZnJvbSB0aGUgZGVyaXZlZCBjbGFzcy5cbiAgICAgICAgdGhpcy51cGRhdGVQYXJhbXMoaW5kZXgsIGVmZmVjdFByb3BzLnByb3BCdWZmZXIhKTtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICBlZmZlY3RQcm9wcy5wcm9wVGV4dHVyZSEudXBsb2FkRGF0YShlZmZlY3RQcm9wcy5wcm9wQnVmZmVyISk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlZmZlY3RQcm9wcy5pc0RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOavjzI1NuWAi+eCuuS4gOe1hFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXQgaW5zdGFuY2VHcm91cElkeCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLl9pbnN0YW5jZUlEIC8gMjU2KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0VVYodXY6IG51bWJlcltdKTogVmVjNCB7XG4gICAgICAgIGxldCBtaW5VID0gTWF0aC5taW4odXZbMF0sIHV2WzJdLCB1dls0XSwgdXZbNl0pO1xuICAgICAgICBsZXQgbWluViA9IE1hdGgubWluKHV2WzFdLCB1dlszXSwgdXZbNV0sIHV2WzddKTtcblxuICAgICAgICBsZXQgbWF4VSA9IE1hdGgubWF4KHV2WzBdLCB1dlsyXSwgdXZbNF0sIHV2WzZdKTtcbiAgICAgICAgbGV0IG1heFYgPSBNYXRoLm1heCh1dlsxXSwgdXZbM10sIHV2WzVdLCB1dls3XSk7XG5cbiAgICAgICAgbGV0IHdpZHRoID0gbWF4VSAtIG1pblU7XG4gICAgICAgIGxldCBoZWlnaHQgPSBtYXhWIC0gbWluVjtcblxuICAgICAgICByZXR1cm4gbmV3IFZlYzQobWluVSwgbWluViwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEJ1ZmZlckluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuX2luc3RhbmNlSUQgLSAodGhpcy5pbnN0YW5jZUdyb3VwSWR4ICogMjU2KTtcbiAgICAgICAgcmV0dXJuIG9mZnNldCAqICh0aGlzLnBpeGVsc1VzYWdlICogNCk7XG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gbGlmZSBjeWNsZVxuICAgIG9uTG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0KHRoaXMucGl4ZWxzVXNhZ2UpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHVuaW9uS2V5ID0gdGhpcy5nZXRQcm9wc1VuaW9uS2V5KCk7XG5cbiAgICAgICAgaWYgKFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0TWFwLmhhcyh1bmlvbktleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSEuZmluZEluZGV4KCh2KSA9PiB2ID09PSB0aGlzLm5vZGUudXVpZCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IoXCJFZmZlY3QgaW5kZXggaXMgbm90IGZvdW5kIVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0TWFwLmdldCh1bmlvbktleSkhW2luZGV4XSA9IFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJvcihgVGhlIGVmZmVjdCBtYXAgb2YgJHt1bmlvbktleX0gaXMgbm90IGZvdW5kIWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGF0ZVVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHVuaW9uS2V5ID0gdGhpcy5nZXRQcm9wc1VuaW9uS2V5KCk7XG4gICAgICAgIGNvbnN0IGVmZmVjdFByb3BzID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RQcm9wcy5nZXQodW5pb25LZXkpIVt0aGlzLmluc3RhbmNlR3JvdXBJZHhdO1xuICAgICAgICBpZiAoZWZmZWN0UHJvcHMuaXNEaXJ0eSkge1xuICAgICAgICAgICAgbG9nKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0ncyBlZmZlY3QgcHJvcHMgaXMgRElSVFkhYCk7XG4gICAgICAgICAgICBlZmZlY3RQcm9wcy5wcm9wVGV4dHVyZSEudXBsb2FkRGF0YShlZmZlY3RQcm9wcy5wcm9wQnVmZmVyISk7XG4gICAgICAgICAgICBlZmZlY3RQcm9wcy5pc0RpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59Il19