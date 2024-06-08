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
        this._effectIndex = -1;
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
            this.init(this.countOfProps);
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
    get countOfProps() {
        const num = Math.ceil(this.countOfUsedFloats / 4.0);
        return num;
    }
    init(countOfProps) {
        const unionKey = this.getPropsUnionKey();
        cc_1.log(`init: ${unionKey}`);
        // Step1: 取的當前的effectIndex
        if (!SpriteEffectBase_1._s_effectMap.has(unionKey)) {
            const temp = new Array(768).fill(""); // R/G/B (0~255) => 256 * 3 = 768
            SpriteEffectBase_1._s_effectMap.set(unionKey, temp);
        }
        this._effectIndex = SpriteEffectBase_1._s_effectMap.get(unionKey).findIndex((v) => v === this.node.uuid);
        if (this._effectIndex === -1) {
            this._effectIndex = SpriteEffectBase_1._s_effectMap.get(unionKey).findIndex((v) => v === "");
            if (this._effectIndex === -1) {
                cc_1.error("Effect map is full!");
                return;
            }
        }
        SpriteEffectBase_1._s_effectMap.get(unionKey)[this._effectIndex] = this.node.uuid;
        if (this.propGroupIdx === 0) {
            this.color = new cc_1.Color(this._effectIndex, 0, 0, 255);
        }
        else if (this.propGroupIdx === 1) {
            this.color = new cc_1.Color(255, (this._effectIndex - 256 + 1), 0, 255);
        }
        else if (this.propGroupIdx === 2) {
            this.color = new cc_1.Color(255, 255, (this._effectIndex - 256 - 256 + 1), 255);
        }
        else {
            cc_1.error(`The prop group index, ${this.propGroupIdx}, is out of range!`);
            return;
        }
        // Step2: 初始化Effect props
        if (!SpriteEffectBase_1._s_effectProps.has(unionKey)) {
            const temp = new Array(3).fill(null); // Only use R/G/B 3 channels
            SpriteEffectBase_1._s_effectProps.set(unionKey, temp);
        }
        if (SpriteEffectBase_1._s_effectProps.get(unionKey)[this.propGroupIdx] === null) {
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
            SpriteEffectBase_1._s_effectProps.get(unionKey)[this.propGroupIdx] = {
                mat: mat,
                propBuffer: propBuffer,
                propTexture: propsTexture
            };
        }
        this.customMaterial = SpriteEffectBase_1._s_effectProps.get(unionKey)[this.propGroupIdx].mat;
    }
    reflashParams() {
        const index = this.getBufferIndex();
        const effectProps = SpriteEffectBase_1._s_effectProps.get(this.getPropsUnionKey())[this.propGroupIdx];
        this.updateParams(index, effectProps.propBuffer);
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            effectProps.propTexture.uploadData(effectProps.propBuffer);
        }
        else {
            this.setDirty(this.propGroupIdx, true);
        }
    }
    get propGroupIdx() {
        return Math.floor(this._effectIndex / 256);
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
        let quotient = this._effectIndex / 256;
        let fractional = quotient - Math.floor(quotient);
        let x = Math.floor(fractional * (256 * this.countOfProps));
        const index = x * 4;
        return index;
    }
    //#endregion
    //#region life cycle
    onLoad() {
        this.init(this.countOfProps);
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
        if (this.isDirty(this.propGroupIdx)) {
            cc_1.log(`${this.constructor.name}'s effect props is DIRTY!`);
            const unionKey = this.getPropsUnionKey();
            const effectProps = SpriteEffectBase_1._s_effectProps.get(unionKey)[this.propGroupIdx];
            effectProps.propTexture.uploadData(effectProps.propBuffer);
            this.setDirty(this.propGroupIdx, false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hc3NldHMvY29tcC9TcHJpdGVFZmZlY3RCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQkFBbUc7QUFDbkcsZ0NBQStDO0FBQy9DLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBU3pDLElBQXNCLGdCQUFnQix3QkFBdEMsTUFBc0IsZ0JBQWlCLFNBQVEsV0FBTTtJQUFyRDs7UUFLVyxnQkFBVyxHQUF1QixJQUFJLENBQUM7UUFFcEMsaUJBQVksR0FBVyxDQUFDLENBQUMsQ0FBQztRQW9CMUIsaUJBQVksR0FBVSxJQUFJLFVBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQXVCcEQsY0FBUyxHQUFZLEtBQUssQ0FBQztJQWdNekMsQ0FBQztJQXpPRyxxQkFBcUI7SUFFckIsSUFBVyxXQUFXLENBQUMsR0FBVTtRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUV4QixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVELElBQVcsV0FBVztRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUlELFlBQVk7SUFHWixrQkFBa0I7SUFFbEIsSUFBVyxRQUFRLENBQUMsR0FBWTtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUVyQixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4Qjth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QUFFLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFDO2dEQVd0RjtBQU9EO0lBREMsUUFBUTttREFDNEI7QUFsRG5CLGdCQUFnQjtJQURyQyxPQUFPLENBQUMsa0JBQWtCLENBQUM7R0FDTixnQkFBZ0IsQ0FrUHJDO0FBbFBxQiw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb2xvciwgRWZmZWN0QXNzZXQsIGVycm9yLCBsb2csIE1hdGVyaWFsLCBTcHJpdGUsIFRleHR1cmUyRCwgVmVjNCB9IGZyb20gXCJjY1wiO1xuaW1wb3J0IHsgRURJVE9SX05PVF9JTl9QUkVWSUVXIH0gZnJvbSBcImNjL2VudlwiO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuZXhwb3J0IHR5cGUgRWZmZWN0UHJvcHMgPSB7XG4gICAgbWF0OiBNYXRlcmlhbCB8IG51bGw7XG4gICAgcHJvcEJ1ZmZlcjogRmxvYXQzMkFycmF5IHwgbnVsbDtcbiAgICBwcm9wVGV4dHVyZTogVGV4dHVyZTJEIHwgbnVsbDtcbn1cblxuQGNjY2xhc3MoJ1Nwcml0ZUVmZmVjdEJhc2UnKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNwcml0ZUVmZmVjdEJhc2UgZXh0ZW5kcyBTcHJpdGUge1xuICAgIHByb3RlY3RlZCBzdGF0aWMgX3NfZWZmZWN0TWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuICAgIHByb3RlY3RlZCBzdGF0aWMgX3NfZWZmZWN0UHJvcHMgPSBuZXcgTWFwPHN0cmluZywgRWZmZWN0UHJvcHNbXT4oKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEVmZmVjdEFzc2V0LCB0b29sdGlwOiAn5oyH5a6a5pWI5p6cRWZmZWN0QXNzZXQnIH0pXG4gICAgcHVibGljIGVmZmVjdEFzc2V0OiBFZmZlY3RBc3NldCB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJvdGVjdGVkIF9lZmZlY3RJbmRleDogbnVtYmVyID0gLTE7XG5cbiAgICAvLyNyZWdpb24gZWZmZWN0Q29sb3JcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHR5cGU6IENvbG9yLCB0b29sdGlwOiBcIk15IENvbG9yXCIgfSlcbiAgICBwdWJsaWMgc2V0IGVmZmVjdENvbG9yKHZhbDogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5fZWZmZWN0Q29sb3IgPSB2YWw7XG5cbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZWZmZWN0Q29sb3IoKTogQ29sb3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5fZWZmZWN0Q29sb3I7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJvdGVjdGVkIF9lZmZlY3RDb2xvcjogQ29sb3IgPSBuZXcgQ29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIGlzMkRpbjNEXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0b29sdGlwOiAn55W25L2/55SoUmVuZGVyUm9vdDJE5pmC5L2/55SoJyB9KVxuICAgIHB1YmxpYyBzZXQgaXMyRGluM0QodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2lzMkRpbjNEID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdCh0aGlzLmNvdW50T2ZQcm9wcyk7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpczJEaW4zRCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzMkRpbjNEO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIHByb3RlY3RlZCBfaXMyRGluM0Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIGFic3RyYWN0IG1ldGhvZHNcbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBSZXR1cm4gdGhlIGNvdW50IG9mIHVzZWQgZmxvYXRzIG9mIHRoZSBlZmZlY3QuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldCBjb3VudE9mVXNlZEZsb2F0cygpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3QgXG4gICAgICogR2VuZXJhdGUgYSBVbmlvbiBrZXkgZm9yIHRoZSBlZmZlY3QuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldFByb3BzVW5pb25LZXkoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogVXBkYXRlIHRoZSBlZmZlY3QgcGFyYW1ldGVycy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgdXBkYXRlUGFyYW1zKGluZGV4OiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBJbml0aWFsaXplIHRoZSBtYXRlcmlhbC5cbiAgICAgKiBAcmV0dXJucyBNYXRlcmlhbFxuICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGluaXRNYXRlcmlhbCgpOiBNYXRlcmlhbDtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBpc0RpcnR5KGlkeDogbnVtYmVyKTogYm9vbGVhbjtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc2V0RGlydHkoaWR4OiBudW1iZXIsIHZhbDogYm9vbGVhbik6IHZvaWQ7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBtZXRob2RzXG4gICAgcHJvdGVjdGVkIGdldCBjb3VudE9mUHJvcHMoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgbnVtID0gTWF0aC5jZWlsKHRoaXMuY291bnRPZlVzZWRGbG9hdHMgLyA0LjApO1xuICAgICAgICByZXR1cm4gbnVtO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0KGNvdW50T2ZQcm9wczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHVuaW9uS2V5ID0gdGhpcy5nZXRQcm9wc1VuaW9uS2V5KCk7XG4gICAgICAgIGxvZyhgaW5pdDogJHt1bmlvbktleX1gKTtcblxuICAgICAgICAvLyBTdGVwMTog5Y+W55qE55W25YmN55qEZWZmZWN0SW5kZXhcbiAgICAgICAgaWYgKCFTcHJpdGVFZmZlY3RCYXNlLl9zX2VmZmVjdE1hcC5oYXModW5pb25LZXkpKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gbmV3IEFycmF5KDc2OCkuZmlsbChcIlwiKTsgIC8vIFIvRy9CICgwfjI1NSkgPT4gMjU2ICogMyA9IDc2OFxuICAgICAgICAgICAgU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuc2V0KHVuaW9uS2V5LCB0ZW1wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VmZmVjdEluZGV4ID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSEuZmluZEluZGV4KCh2KSA9PiB2ID09PSB0aGlzLm5vZGUudXVpZCk7XG4gICAgICAgIGlmICh0aGlzLl9lZmZlY3RJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX2VmZmVjdEluZGV4ID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSEuZmluZEluZGV4KCh2KSA9PiB2ID09PSBcIlwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lZmZlY3RJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBlcnJvcihcIkVmZmVjdCBtYXAgaXMgZnVsbCFcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSFbdGhpcy5fZWZmZWN0SW5kZXhdID0gdGhpcy5ub2RlLnV1aWQ7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcEdyb3VwSWR4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gbmV3IENvbG9yKHRoaXMuX2VmZmVjdEluZGV4LCAwLCAwLCAyNTUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcEdyb3VwSWR4ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gbmV3IENvbG9yKDI1NSwgKHRoaXMuX2VmZmVjdEluZGV4IC0gMjU2ICsgMSksIDAsIDI1NSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wR3JvdXBJZHggPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBuZXcgQ29sb3IoMjU1LCAyNTUsICh0aGlzLl9lZmZlY3RJbmRleCAtIDI1NiAtIDI1NiArIDEpLCAyNTUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IoYFRoZSBwcm9wIGdyb3VwIGluZGV4LCAke3RoaXMucHJvcEdyb3VwSWR4fSwgaXMgb3V0IG9mIHJhbmdlIWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RlcDI6IOWIneWni+WMlkVmZmVjdCBwcm9wc1xuICAgICAgICBpZiAoIVNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0UHJvcHMuaGFzKHVuaW9uS2V5KSkge1xuICAgICAgICAgICAgY29uc3QgdGVtcCA9IG5ldyBBcnJheSgzKS5maWxsKG51bGwpOyAvLyBPbmx5IHVzZSBSL0cvQiAzIGNoYW5uZWxzXG4gICAgICAgICAgICBTcHJpdGVFZmZlY3RCYXNlLl9zX2VmZmVjdFByb3BzLnNldCh1bmlvbktleSwgdGVtcCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RQcm9wcy5nZXQodW5pb25LZXkpIVt0aGlzLnByb3BHcm91cElkeF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHcgPSAyNTYgKiBjb3VudE9mUHJvcHM7XG4gICAgICAgICAgICBjb25zdCBoID0gMTtcblxuICAgICAgICAgICAgbGV0IHByb3BCdWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KHcgKiBoICogNCk7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGg7IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdzsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKHkgKiB3ICsgeCkgKiA0O1xuICAgICAgICAgICAgICAgICAgICBwcm9wQnVmZmVyW2luZGV4XSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAyXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAzXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcHJvcHNUZXh0dXJlID0gbmV3IFRleHR1cmUyRCgpO1xuICAgICAgICAgICAgcHJvcHNUZXh0dXJlLnNldEZpbHRlcnMoVGV4dHVyZTJELkZpbHRlci5ORUFSRVNULCBUZXh0dXJlMkQuRmlsdGVyLk5FQVJFU1QpO1xuICAgICAgICAgICAgcHJvcHNUZXh0dXJlLnJlc2V0KHtcbiAgICAgICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGgsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBUZXh0dXJlMkQuUGl4ZWxGb3JtYXQuUkdCQTMyRixcbiAgICAgICAgICAgICAgICBtaXBtYXBMZXZlbDogMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwcm9wc1RleHR1cmUudXBsb2FkRGF0YShwcm9wQnVmZmVyKTtcblxuICAgICAgICAgICAgbGV0IG1hdCA9IHRoaXMuaW5pdE1hdGVyaWFsKCk7XG4gICAgICAgICAgICBtYXQuc2V0UHJvcGVydHkoJ3Byb3BzVGV4dHVyZScsIHByb3BzVGV4dHVyZSk7XG5cbiAgICAgICAgICAgIFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0UHJvcHMuZ2V0KHVuaW9uS2V5KSFbdGhpcy5wcm9wR3JvdXBJZHhdID0ge1xuICAgICAgICAgICAgICAgIG1hdDogbWF0LFxuICAgICAgICAgICAgICAgIHByb3BCdWZmZXI6IHByb3BCdWZmZXIsXG4gICAgICAgICAgICAgICAgcHJvcFRleHR1cmU6IHByb3BzVGV4dHVyZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VzdG9tTWF0ZXJpYWwgPSBTcHJpdGVFZmZlY3RCYXNlLl9zX2VmZmVjdFByb3BzLmdldCh1bmlvbktleSkhW3RoaXMucHJvcEdyb3VwSWR4XS5tYXQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlZmxhc2hQYXJhbXMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRCdWZmZXJJbmRleCgpO1xuICAgICAgICBjb25zdCBlZmZlY3RQcm9wcyA9IFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0UHJvcHMuZ2V0KHRoaXMuZ2V0UHJvcHNVbmlvbktleSgpKSFbdGhpcy5wcm9wR3JvdXBJZHhdO1xuICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtcyhpbmRleCwgZWZmZWN0UHJvcHMucHJvcEJ1ZmZlciEpO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIGVmZmVjdFByb3BzLnByb3BUZXh0dXJlIS51cGxvYWREYXRhKGVmZmVjdFByb3BzLnByb3BCdWZmZXIhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGlydHkodGhpcy5wcm9wR3JvdXBJZHgsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBwcm9wR3JvdXBJZHgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5fZWZmZWN0SW5kZXggLyAyNTYpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRVVih1djogbnVtYmVyW10pOiBWZWM0IHtcbiAgICAgICAgbGV0IG1pblUgPSBNYXRoLm1pbih1dlswXSwgdXZbMl0sIHV2WzRdLCB1dls2XSk7XG4gICAgICAgIGxldCBtaW5WID0gTWF0aC5taW4odXZbMV0sIHV2WzNdLCB1dls1XSwgdXZbN10pO1xuXG4gICAgICAgIGxldCBtYXhVID0gTWF0aC5tYXgodXZbMF0sIHV2WzJdLCB1dls0XSwgdXZbNl0pO1xuICAgICAgICBsZXQgbWF4ViA9IE1hdGgubWF4KHV2WzFdLCB1dlszXSwgdXZbNV0sIHV2WzddKTtcblxuICAgICAgICBsZXQgd2lkdGggPSBtYXhVIC0gbWluVTtcbiAgICAgICAgbGV0IGhlaWdodCA9IG1heFYgLSBtaW5WO1xuXG4gICAgICAgIHJldHVybiBuZXcgVmVjNChtaW5VLCBtaW5WLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0QnVmZmVySW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHF1b3RpZW50ID0gdGhpcy5fZWZmZWN0SW5kZXggLyAyNTY7XG4gICAgICAgIGxldCBmcmFjdGlvbmFsID0gcXVvdGllbnQgLSBNYXRoLmZsb29yKHF1b3RpZW50KTtcbiAgICAgICAgbGV0IHggPSBNYXRoLmZsb29yKGZyYWN0aW9uYWwgKiAoMjU2ICogdGhpcy5jb3VudE9mUHJvcHMpKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSB4ICogNDtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIGxpZmUgY3ljbGVcbiAgICBvbkxvYWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdCh0aGlzLmNvdW50T2ZQcm9wcyk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdW5pb25LZXkgPSB0aGlzLmdldFByb3BzVW5pb25LZXkoKTtcblxuICAgICAgICBpZiAoU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuaGFzKHVuaW9uS2V5KSkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBTcHJpdGVFZmZlY3RCYXNlLl9zX2VmZmVjdE1hcC5nZXQodW5pb25LZXkpIS5maW5kSW5kZXgoKHYpID0+IHYgPT09IHRoaXMubm9kZS51dWlkKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBlcnJvcihcIkVmZmVjdCBpbmRleCBpcyBub3QgZm91bmQhXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSFbaW5kZXhdID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yKGBUaGUgZWZmZWN0IG1hcCBvZiAke3VuaW9uS2V5fSBpcyBub3QgZm91bmQhYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsYXRlVXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXJ0eSh0aGlzLnByb3BHcm91cElkeCkpIHtcbiAgICAgICAgICAgIGxvZyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9J3MgZWZmZWN0IHByb3BzIGlzIERJUlRZIWApO1xuICAgICAgICAgICAgY29uc3QgdW5pb25LZXkgPSB0aGlzLmdldFByb3BzVW5pb25LZXkoKTtcbiAgICAgICAgICAgIGNvbnN0IGVmZmVjdFByb3BzID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RQcm9wcy5nZXQodW5pb25LZXkpIVt0aGlzLnByb3BHcm91cElkeF07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVmZmVjdFByb3BzLnByb3BUZXh0dXJlIS51cGxvYWREYXRhKGVmZmVjdFByb3BzLnByb3BCdWZmZXIhKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGlydHkodGhpcy5wcm9wR3JvdXBJZHgsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=