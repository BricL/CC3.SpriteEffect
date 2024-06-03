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
        this._isPropDirty = false;
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
            this._isPropDirty = true;
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
            this._isPropDirty = true;
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
        cc_1.log(`Effect index is:${this._effectIndex}`);
        SpriteEffectBase_1._s_effectMap.get(unionKey)[this._effectIndex] = this.node.uuid;
        if (this.propGroupIdx === 0) {
            this.color = new cc_1.Color(this._effectIndex, 0, 0, 255);
        }
        else if (this.propGroupIdx === 1) {
            this.color = new cc_1.Color(0, this._effectIndex - 256, 0, 255);
        }
        else if (this.propGroupIdx === 2) {
            this.color = new cc_1.Color(0, 0, this._effectIndex - 256 - 256, 255);
        }
        else {
            cc_1.error(`The prop group index, ${this.propGroupIdx}, is out of range!`);
            return;
        }
        // Step2: 初始化Effect props
        if (!SpriteEffectBase_1._s_effectProps.has(unionKey)) {
            const temp = new Array(3).fill(null);
            SpriteEffectBase_1._s_effectProps.set(unionKey, temp);
        }
        if (SpriteEffectBase_1._s_effectProps.get(unionKey)[this.propGroupIdx] === null) {
            let propBuffer = new Float32Array((256 * countOfProps) * 1 * 4);
            for (let y = 0; y < 1; y++) {
                for (let x = 0; x < (256 * countOfProps); x++) {
                    const index = (y * (256 * countOfProps) + x) * 4;
                    propBuffer[index] = 1;
                    propBuffer[index + 1] = 0;
                    propBuffer[index + 2] = 1;
                    propBuffer[index + 3] = 1;
                }
            }
            let propsTexture = new cc_1.Texture2D();
            propsTexture.setFilters(cc_1.Texture2D.Filter.NEAREST, cc_1.Texture2D.Filter.NEAREST);
            propsTexture.reset({
                width: (256 * countOfProps),
                height: 1,
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
        effectProps.propTexture.uploadData(effectProps.propBuffer);
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
        if (this._isPropDirty) {
            cc_1.log(`${this.constructor.name}'s effect props is DIRTY!`);
            this.reflashParams();
            this._isPropDirty = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hc3NldHMvY29tcC9TcHJpdGVFZmZlY3RCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQkFBbUc7QUFDbkcsZ0NBQStDO0FBQy9DLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBU3pDLElBQXNCLGdCQUFnQix3QkFBdEMsTUFBc0IsZ0JBQWlCLFNBQVEsV0FBTTtJQUFyRDs7UUFLVyxnQkFBVyxHQUF1QixJQUFJLENBQUM7UUFFcEMsaUJBQVksR0FBVyxDQUFDLENBQUMsQ0FBQztRQUMxQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQW9COUIsaUJBQVksR0FBVSxJQUFJLFVBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQXVCcEQsY0FBUyxHQUFZLEtBQUssQ0FBQztJQWlMekMsQ0FBQztJQTFORyxxQkFBcUI7SUFFckIsSUFBVyxXQUFXLENBQUMsR0FBVTtRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUV4QixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBSUQsWUFBWTtJQUdaLGtCQUFrQjtJQUVsQixJQUFXLFFBQVEsQ0FBQyxHQUFZO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBRXJCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDN0Is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QUFRLGdCQUFnQixDQUFDLENBQUM7U0FDeEQ7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLEVBQVU7UUFDakIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLFFBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSwyQkFBMkIsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUM3QjtJQUNMLENBQUM7Q0FDSixDQUFBO0FBbk9vQiw2QkFBWSxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO0FBQzNDLCtCQUFjLEdBQUcsSUFBSSxHQUFHLEVBQXlCLENBQUM7QUFHbkU7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQVcsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztxREFDZDtBQU85QztJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO21EQVV6RjtBQU9EO0lBREMsUUFBUTtzREFDcUQ7QUFNOUQ7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQztnREFXdEY7QUFPRDtJQURDLFFBQVE7bURBQzRCO0FBbkRuQixnQkFBZ0I7SUFEckMsT0FBTyxDQUFDLGtCQUFrQixDQUFDO0dBQ04sZ0JBQWdCLENBb09yQztBQXBPcUIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29sb3IsIEVmZmVjdEFzc2V0LCBlcnJvciwgbG9nLCBNYXRlcmlhbCwgU3ByaXRlLCBUZXh0dXJlMkQsIFZlYzQgfSBmcm9tIFwiY2NcIjtcbmltcG9ydCB7IEVESVRPUl9OT1RfSU5fUFJFVklFVyB9IGZyb20gXCJjYy9lbnZcIjtcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbmV4cG9ydCB0eXBlIEVmZmVjdFByb3BzID0ge1xuICAgIG1hdDogTWF0ZXJpYWwgfCBudWxsO1xuICAgIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSB8IG51bGw7XG4gICAgcHJvcFRleHR1cmU6IFRleHR1cmUyRCB8IG51bGw7XG59XG5cbkBjY2NsYXNzKCdTcHJpdGVFZmZlY3RCYXNlJylcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTcHJpdGVFZmZlY3RCYXNlIGV4dGVuZHMgU3ByaXRlIHtcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9zX2VmZmVjdE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmdbXT4oKTtcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9zX2VmZmVjdFByb3BzID0gbmV3IE1hcDxzdHJpbmcsIEVmZmVjdFByb3BzW10+KCk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBFZmZlY3RBc3NldCwgdG9vbHRpcDogJ+aMh+WumuaViOaenEVmZmVjdEFzc2V0JyB9KVxuICAgIHB1YmxpYyBlZmZlY3RBc3NldDogRWZmZWN0QXNzZXQgfCBudWxsID0gbnVsbDtcblxuICAgIHByb3RlY3RlZCBfZWZmZWN0SW5kZXg6IG51bWJlciA9IC0xO1xuICAgIHByb3RlY3RlZCBfaXNQcm9wRGlydHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vI3JlZ2lvbiBlZmZlY3RDb2xvclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdHlwZTogQ29sb3IsIHRvb2x0aXA6IFwiTXkgQ29sb3JcIiB9KVxuICAgIHB1YmxpYyBzZXQgZWZmZWN0Q29sb3IodmFsOiBDb2xvcikge1xuICAgICAgICB0aGlzLl9lZmZlY3RDb2xvciA9IHZhbDtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lzUHJvcERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgZ2V0IGVmZmVjdENvbG9yKCk6IENvbG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VmZmVjdENvbG9yO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIHByb3RlY3RlZCBfZWZmZWN0Q29sb3I6IENvbG9yID0gbmV3IENvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSk7XG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICBcbiAgICAvLyNyZWdpb24gaXMyRGluM0RcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHRvb2x0aXA6ICfnlbbkvb/nlKhSZW5kZXJSb290MkTmmYLkvb/nlKgnIH0pXG4gICAgcHVibGljIHNldCBpczJEaW4zRCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXMyRGluM0QgPSB2YWw7XG5cbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMuY291bnRPZlByb3BzKTtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faXNQcm9wRGlydHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpczJEaW4zRCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzMkRpbjNEO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIHByb3RlY3RlZCBfaXMyRGluM0Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIGFic3RyYWN0IG1ldGhvZHNcbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBSZXR1cm4gdGhlIGNvdW50IG9mIHVzZWQgZmxvYXRzIG9mIHRoZSBlZmZlY3QuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldCBjb3VudE9mVXNlZEZsb2F0cygpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3QgXG4gICAgICogR2VuZXJhdGUgYSBVbmlvbiBrZXkgZm9yIHRoZSBlZmZlY3QuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldFByb3BzVW5pb25LZXkoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogVXBkYXRlIHRoZSBlZmZlY3QgcGFyYW1ldGVycy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgdXBkYXRlUGFyYW1zKGluZGV4OiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBJbml0aWFsaXplIHRoZSBtYXRlcmlhbC5cbiAgICAgKiBAcmV0dXJucyBNYXRlcmlhbFxuICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGluaXRNYXRlcmlhbCgpOiBNYXRlcmlhbDtcbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiBtZXRob2RzXG4gICAgcHJvdGVjdGVkIGdldCBjb3VudE9mUHJvcHMoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgbnVtID0gTWF0aC5jZWlsKHRoaXMuY291bnRPZlVzZWRGbG9hdHMgLyA0LjApO1xuICAgICAgICByZXR1cm4gbnVtO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0KGNvdW50T2ZQcm9wczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHVuaW9uS2V5ID0gdGhpcy5nZXRQcm9wc1VuaW9uS2V5KCk7XG4gICAgICAgIGxvZyhgaW5pdDogJHt1bmlvbktleX1gKTtcblxuICAgICAgICAvLyBTdGVwMTog5Y+W55qE55W25YmN55qEZWZmZWN0SW5kZXhcbiAgICAgICAgaWYgKCFTcHJpdGVFZmZlY3RCYXNlLl9zX2VmZmVjdE1hcC5oYXModW5pb25LZXkpKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gbmV3IEFycmF5KDc2OCkuZmlsbChcIlwiKTsgIC8vIFIvRy9CICgwfjI1NSkgPT4gMjU2ICogMyA9IDc2OFxuICAgICAgICAgICAgU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuc2V0KHVuaW9uS2V5LCB0ZW1wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VmZmVjdEluZGV4ID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSEuZmluZEluZGV4KCh2KSA9PiB2ID09PSB0aGlzLm5vZGUudXVpZCk7XG4gICAgICAgIGlmICh0aGlzLl9lZmZlY3RJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX2VmZmVjdEluZGV4ID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSEuZmluZEluZGV4KCh2KSA9PiB2ID09PSBcIlwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lZmZlY3RJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBlcnJvcihcIkVmZmVjdCBtYXAgaXMgZnVsbCFcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbG9nKGBFZmZlY3QgaW5kZXggaXM6JHt0aGlzLl9lZmZlY3RJbmRleH1gKTtcbiAgICAgICAgU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSFbdGhpcy5fZWZmZWN0SW5kZXhdID0gdGhpcy5ub2RlLnV1aWQ7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcEdyb3VwSWR4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gbmV3IENvbG9yKHRoaXMuX2VmZmVjdEluZGV4LCAwLCAwLCAyNTUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcEdyb3VwSWR4ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gbmV3IENvbG9yKDAsIHRoaXMuX2VmZmVjdEluZGV4IC0gMjU2LCAwLCAyNTUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcEdyb3VwSWR4ID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gbmV3IENvbG9yKDAsIDAsIHRoaXMuX2VmZmVjdEluZGV4IC0gMjU2IC0gMjU2LCAyNTUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IoYFRoZSBwcm9wIGdyb3VwIGluZGV4LCAke3RoaXMucHJvcEdyb3VwSWR4fSwgaXMgb3V0IG9mIHJhbmdlIWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RlcDI6IOWIneWni+WMlkVmZmVjdCBwcm9wc1xuICAgICAgICBpZiAoIVNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0UHJvcHMuaGFzKHVuaW9uS2V5KSkge1xuICAgICAgICAgICAgY29uc3QgdGVtcCA9IG5ldyBBcnJheSgzKS5maWxsKG51bGwpO1xuICAgICAgICAgICAgU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RQcm9wcy5zZXQodW5pb25LZXksIHRlbXApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0UHJvcHMuZ2V0KHVuaW9uS2V5KSFbdGhpcy5wcm9wR3JvdXBJZHhdID09PSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgcHJvcEJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkoKDI1NiAqIGNvdW50T2ZQcm9wcykgKiAxICogNCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAoMjU2ICogY291bnRPZlByb3BzKTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKHkgKiAoMjU2ICogY291bnRPZlByb3BzKSArIHgpICogNDtcbiAgICAgICAgICAgICAgICAgICAgcHJvcEJ1ZmZlcltpbmRleF0gPSAxO1xuICAgICAgICAgICAgICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMl0gPSAxO1xuICAgICAgICAgICAgICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgM10gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHByb3BzVGV4dHVyZSA9IG5ldyBUZXh0dXJlMkQoKTtcbiAgICAgICAgICAgIHByb3BzVGV4dHVyZS5zZXRGaWx0ZXJzKFRleHR1cmUyRC5GaWx0ZXIuTkVBUkVTVCwgVGV4dHVyZTJELkZpbHRlci5ORUFSRVNUKTtcbiAgICAgICAgICAgIHByb3BzVGV4dHVyZS5yZXNldCh7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICgyNTYgKiBjb3VudE9mUHJvcHMpLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IFRleHR1cmUyRC5QaXhlbEZvcm1hdC5SR0JBMzJGLFxuICAgICAgICAgICAgICAgIG1pcG1hcExldmVsOiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByb3BzVGV4dHVyZS51cGxvYWREYXRhKHByb3BCdWZmZXIpO1xuXG4gICAgICAgICAgICBsZXQgbWF0ID0gdGhpcy5pbml0TWF0ZXJpYWwoKTtcbiAgICAgICAgICAgIG1hdC5zZXRQcm9wZXJ0eSgncHJvcHNUZXh0dXJlJywgcHJvcHNUZXh0dXJlKTtcblxuICAgICAgICAgICAgU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RQcm9wcy5nZXQodW5pb25LZXkpIVt0aGlzLnByb3BHcm91cElkeF0gPSB7XG4gICAgICAgICAgICAgICAgbWF0OiBtYXQsXG4gICAgICAgICAgICAgICAgcHJvcEJ1ZmZlcjogcHJvcEJ1ZmZlcixcbiAgICAgICAgICAgICAgICBwcm9wVGV4dHVyZTogcHJvcHNUZXh0dXJlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXN0b21NYXRlcmlhbCA9IFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0UHJvcHMuZ2V0KHVuaW9uS2V5KSFbdGhpcy5wcm9wR3JvdXBJZHhdLm1hdDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVmbGFzaFBhcmFtcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEJ1ZmZlckluZGV4KCk7XG4gICAgICAgIGNvbnN0IGVmZmVjdFByb3BzID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RQcm9wcy5nZXQodGhpcy5nZXRQcm9wc1VuaW9uS2V5KCkpIVt0aGlzLnByb3BHcm91cElkeF07XG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1zKGluZGV4LCBlZmZlY3RQcm9wcy5wcm9wQnVmZmVyISk7XG4gICAgICAgIGVmZmVjdFByb3BzLnByb3BUZXh0dXJlIS51cGxvYWREYXRhKGVmZmVjdFByb3BzLnByb3BCdWZmZXIhKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHByb3BHcm91cElkeCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLl9lZmZlY3RJbmRleCAvIDI1Nik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFVWKHV2OiBudW1iZXJbXSk6IFZlYzQge1xuICAgICAgICBsZXQgbWluVSA9IE1hdGgubWluKHV2WzBdLCB1dlsyXSwgdXZbNF0sIHV2WzZdKTtcbiAgICAgICAgbGV0IG1pblYgPSBNYXRoLm1pbih1dlsxXSwgdXZbM10sIHV2WzVdLCB1dls3XSk7XG5cbiAgICAgICAgbGV0IG1heFUgPSBNYXRoLm1heCh1dlswXSwgdXZbMl0sIHV2WzRdLCB1dls2XSk7XG4gICAgICAgIGxldCBtYXhWID0gTWF0aC5tYXgodXZbMV0sIHV2WzNdLCB1dls1XSwgdXZbN10pO1xuXG4gICAgICAgIGxldCB3aWR0aCA9IG1heFUgLSBtaW5VO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gbWF4ViAtIG1pblY7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBWZWM0KG1pblUsIG1pblYsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRCdWZmZXJJbmRleCgpOiBudW1iZXIge1xuICAgICAgICBsZXQgcXVvdGllbnQgPSB0aGlzLl9lZmZlY3RJbmRleCAvIDI1NjtcbiAgICAgICAgbGV0IGZyYWN0aW9uYWwgPSBxdW90aWVudCAtIE1hdGguZmxvb3IocXVvdGllbnQpO1xuICAgICAgICBsZXQgeCA9IE1hdGguZmxvb3IoZnJhY3Rpb25hbCAqICgyNTYgKiB0aGlzLmNvdW50T2ZQcm9wcykpO1xuICAgICAgICBjb25zdCBpbmRleCA9IHggKiA0O1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uIGxpZmUgY3ljbGVcbiAgICBvbkxvYWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdCh0aGlzLmNvdW50T2ZQcm9wcyk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdW5pb25LZXkgPSB0aGlzLmdldFByb3BzVW5pb25LZXkoKTtcblxuICAgICAgICBpZiAoU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuaGFzKHVuaW9uS2V5KSkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBTcHJpdGVFZmZlY3RCYXNlLl9zX2VmZmVjdE1hcC5nZXQodW5pb25LZXkpIS5maW5kSW5kZXgoKHYpID0+IHYgPT09IHRoaXMubm9kZS51dWlkKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBlcnJvcihcIkVmZmVjdCBpbmRleCBpcyBub3QgZm91bmQhXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSFbaW5kZXhdID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yKGBUaGUgZWZmZWN0IG1hcCBvZiAke3VuaW9uS2V5fSBpcyBub3QgZm91bmQhYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsYXRlVXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzUHJvcERpcnR5KSB7XG4gICAgICAgICAgICBsb2coYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSdzIGVmZmVjdCBwcm9wcyBpcyBESVJUWSFgKTtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICAgICAgdGhpcy5faXNQcm9wRGlydHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=