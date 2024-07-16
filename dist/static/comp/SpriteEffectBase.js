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
const PROP_TEXTURE_SIZE = 128;
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
        return Math.pow(2, Math.ceil(Math.log(this.floatUsage) / Math.log(2))) / 4;
    }
    calBufferIndex(x, y, w) {
        return (x + (y * w)) * 4;
    }
    init(pixelsUsage) {
        const unionKey = this.getEffectUnionKey();
        cc_1.log(`init: ${unionKey}`);
        // Step1: 取的當前的effectIndex
        if (!SpriteEffectBase_1._s_effectMap.has(unionKey)) {
            let effectData = {
                data: [],
                uuids: []
            };
            effectData.data.push({
                mat: null,
                propBuffer: null,
                propTexture: null,
                isDirty: false,
            });
            SpriteEffectBase_1._s_effectMap.set(unionKey, effectData);
        }
        const effectData = SpriteEffectBase_1._s_effectMap.get(unionKey);
        this._instanceID = effectData.uuids.findIndex((v) => v === this.node.uuid);
        if (this._instanceID === -1) {
            this._instanceID = effectData.uuids.findIndex((v) => v === "");
            if (this._instanceID === -1) {
                this._instanceID = effectData.uuids.push(this.node.uuid) - 1;
                if (effectData.data.length < Math.floor(this._instanceID / PROP_TEXTURE_SIZE) + 1) {
                    effectData.data.push({
                        mat: null,
                        propBuffer: null,
                        propTexture: null,
                        isDirty: false,
                    });
                }
            }
            else {
                effectData.uuids[this._instanceID] = this.node.uuid;
            }
        }
        const idx = Math.floor(this._instanceID / PROP_TEXTURE_SIZE);
        this.color = new cc_1.Color(this._instanceID % PROP_TEXTURE_SIZE, pixelsUsage, PROP_TEXTURE_SIZE, 255);
        // Step2: 初始化Effect props
        if (effectData.data[idx].mat === null) {
            const w = PROP_TEXTURE_SIZE;
            const h = pixelsUsage;
            let propBuffer = new Float32Array(w * h * 4);
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const index = (x + (y * w)) * 4;
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
            effectData.data[idx] = {
                mat: mat,
                propBuffer: propBuffer,
                propTexture: propsTexture,
                isDirty: false
            };
        }
        this.customMaterial = effectData.data[idx].mat;
    }
    reflashParams() {
        const unionKey = this.getEffectUnionKey();
        const idx = Math.floor(this._instanceID / PROP_TEXTURE_SIZE);
        const effectProps = SpriteEffectBase_1._s_effectMap.get(unionKey).data[idx];
        // Update the effect parameters from the DERIVED class.
        this.updateParams(this._instanceID % PROP_TEXTURE_SIZE, PROP_TEXTURE_SIZE - 1, effectProps.propBuffer);
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            // In Editor mode, upload the data directly.
            effectProps.propTexture.uploadData(effectProps.propBuffer);
        }
        else {
            // In Preview mode, wait for the lateUpdate to upload the data.
            effectProps.isDirty = true;
        }
    }
    /**
     * 取得 Sprite 的 UV 最小、最大值及寬高
     * @param uv
     * @returns vec4 (minU, minV, width, height)
     */
    getUV(uv) {
        let minU = Math.min(uv[0], uv[2], uv[4], uv[6]);
        let minV = Math.min(uv[1], uv[3], uv[5], uv[7]);
        let maxU = Math.max(uv[0], uv[2], uv[4], uv[6]);
        let maxV = Math.max(uv[1], uv[3], uv[5], uv[7]);
        let width = maxU - minU;
        let height = maxV - minV;
        return new cc_1.Vec4(minU, minV, width, height);
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
        const unionKey = this.getEffectUnionKey();
        const effectData = SpriteEffectBase_1._s_effectMap.get(unionKey);
        const idx = effectData.uuids.findIndex((v) => v === this.node.uuid);
        if (idx === -1) {
            cc_1.error("Effect index is not found!");
        }
        else {
            this._instanceID = -1;
            effectData.uuids[idx] = "";
        }
    }
    lateUpdate(dt) {
        const unionKey = this.getEffectUnionKey();
        const effectData = SpriteEffectBase_1._s_effectMap.get(unionKey);
        const idx = Math.floor(this._instanceID / PROP_TEXTURE_SIZE);
        const effectProps = effectData.data[idx];
        if (effectProps.isDirty) {
            effectProps.propTexture.uploadData(effectProps.propBuffer);
            effectProps.isDirty = false;
        }
    }
};
SpriteEffectBase._s_effectMap = new Map();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9zdGF0aWMvY29tcC9TcHJpdGVFZmZlY3RCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQkFBbUc7QUFDbkcsZ0NBQStDO0FBQy9DLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBY3pDLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDO0FBRzlCLElBQXNCLGdCQUFnQix3QkFBdEMsTUFBc0IsZ0JBQWlCLFNBQVEsV0FBTTtJQUFyRDs7UUFJVyxnQkFBVyxHQUF1QixJQUFJLENBQUM7UUFFcEMsZ0JBQVcsR0FBVyxDQUFDLENBQUMsQ0FBQztRQW9CekIsaUJBQVksR0FBVSxJQUFJLFVBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQXVCcEQsY0FBUyxHQUFZLEtBQUssQ0FBQztJQTJNekMsQ0FBQztJQXBQRyxxQkFBcUI7SUFFckIsSUFBVyxXQUFXLENBQUMsR0FBVTtRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUV4QixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVELElBQVcsV0FBVztRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUlELFlBQVk7SUFHWixrQkFBa0I7SUFFbEIsSUFBVyxRQUFRLENBQUMsR0FBWTtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUVyQixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVC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QUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFekMsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3JCLFdBQVcsQ0FBQyxXQUFZLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFXLENBQUMsQ0FBQztZQUM3RCxXQUFXLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUMvQjtJQUNMLENBQUM7Q0FDSixDQUFBO0FBM1BvQiw2QkFBWSxHQUFHLElBQUksR0FBRyxFQUFzQixDQUFDO0FBRzlEO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFXLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLENBQUM7cURBQ2Q7QUFNOUM7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQzttREFVekY7QUFPRDtJQURDLFFBQVE7c0RBQ3FEO0FBTTlEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLENBQUM7Z0RBV3RGO0FBT0Q7SUFEQyxRQUFRO21EQUM0QjtBQWpEbkIsZ0JBQWdCO0lBRHJDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztHQUNOLGdCQUFnQixDQTRQckM7QUE1UHFCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IsIENvbG9yLCBFZmZlY3RBc3NldCwgZXJyb3IsIGxvZywgTWF0ZXJpYWwsIFNwcml0ZSwgVGV4dHVyZTJELCBWZWM0IH0gZnJvbSBcImNjXCI7XG5pbXBvcnQgeyBFRElUT1JfTk9UX0lOX1BSRVZJRVcgfSBmcm9tIFwiY2MvZW52XCI7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xuXG50eXBlIEVmZmVjdFByb3BzID0ge1xuICAgIG1hdDogTWF0ZXJpYWwgfCBudWxsO1xuICAgIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSB8IG51bGw7XG4gICAgcHJvcFRleHR1cmU6IFRleHR1cmUyRCB8IG51bGw7XG4gICAgaXNEaXJ0eTogYm9vbGVhbjtcbn1cblxudHlwZSBFZmZlY3REYXRhID0ge1xuICAgIGRhdGE6IEVmZmVjdFByb3BzW107XG4gICAgdXVpZHM6IHN0cmluZ1tdO1xufVxuXG5jb25zdCBQUk9QX1RFWFRVUkVfU0laRSA9IDEyODtcblxuQGNjY2xhc3MoJ1Nwcml0ZUVmZmVjdEJhc2UnKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNwcml0ZUVmZmVjdEJhc2UgZXh0ZW5kcyBTcHJpdGUge1xuICAgIHByb3RlY3RlZCBzdGF0aWMgX3NfZWZmZWN0TWFwID0gbmV3IE1hcDxzdHJpbmcsIEVmZmVjdERhdGE+KCk7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBFZmZlY3RBc3NldCwgdG9vbHRpcDogJ+aMh+WumuaViOaenEVmZmVjdEFzc2V0JyB9KVxuICAgIHB1YmxpYyBlZmZlY3RBc3NldDogRWZmZWN0QXNzZXQgfCBudWxsID0gbnVsbDtcblxuICAgIHByb3RlY3RlZCBfaW5zdGFuY2VJRDogbnVtYmVyID0gLTE7XG5cbiAgICAvLyNyZWdpb24gZWZmZWN0Q29sb3JcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHR5cGU6IENvbG9yLCB0b29sdGlwOiBcIk15IENvbG9yXCIgfSlcbiAgICBwdWJsaWMgc2V0IGVmZmVjdENvbG9yKHZhbDogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5fZWZmZWN0Q29sb3IgPSB2YWw7XG5cbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZWZmZWN0Q29sb3IoKTogQ29sb3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5fZWZmZWN0Q29sb3I7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJvdGVjdGVkIF9lZmZlY3RDb2xvcjogQ29sb3IgPSBuZXcgQ29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIGlzMkRpbjNEXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0b29sdGlwOiAn55W25L2/55SoUmVuZGVyUm9vdDJE5pmC5L2/55SoJyB9KVxuICAgIHB1YmxpYyBzZXQgaXMyRGluM0QodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2lzMkRpbjNEID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdCh0aGlzLnBpeGVsc1VzYWdlKTtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzMkRpbjNEKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXMyRGluM0Q7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJvdGVjdGVkIF9pczJEaW4zRDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gYWJzdHJhY3QgbWV0aG9kc1xuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIFJldHVybiB0aGUgY291bnQgb2YgdXNlZCBmbG9hdHMgb2YgdGhlIGVmZmVjdC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0IGZsb2F0VXNhZ2UoKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0IFxuICAgICAqIEdlbmVyYXRlIGEgVW5pb24ga2V5IGZvciB0aGUgZWZmZWN0LlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBnZXRFZmZlY3RVbmlvbktleSgpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBVcGRhdGUgdGhlIGVmZmVjdCBwYXJhbWV0ZXJzLlxuICAgICAqL1xuICAgIC8vIHByb3RlY3RlZCBhYnN0cmFjdCB1cGRhdGVQYXJhbXMoaW5kZXg6IG51bWJlciwgcHJvcEJ1ZmZlcjogRmxvYXQzMkFycmF5KTogdm9pZDtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgdXBkYXRlUGFyYW1zKGlkeDogbnVtYmVyLCB0ZXh0dXJlV2lkdGg6IG51bWJlciwgcHJvcEJ1ZmZlcjogRmxvYXQzMkFycmF5KTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEluaXRpYWxpemUgdGhlIG1hdGVyaWFsLlxuICAgICAqIEByZXR1cm5zIE1hdGVyaWFsXG4gICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgaW5pdE1hdGVyaWFsKCk6IE1hdGVyaWFsO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gbWV0aG9kc1xuICAgIC8qKlxuICAgICAqIDTlgItmbG9hdOeCuuS4gOWAi3BpeGVs77yM6ZyA5L2/55So5bm+5YCLcGl4ZWzmlbjph49cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0IHBpeGVsc1VzYWdlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLnBvdygyLCBNYXRoLmNlaWwoTWF0aC5sb2codGhpcy5mbG9hdFVzYWdlKSAvIE1hdGgubG9nKDIpKSkgLyA0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjYWxCdWZmZXJJbmRleCh4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICh4ICsgKHkgKiB3KSkgKiA0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0KHBpeGVsc1VzYWdlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdW5pb25LZXkgPSB0aGlzLmdldEVmZmVjdFVuaW9uS2V5KCk7XG4gICAgICAgIGxvZyhgaW5pdDogJHt1bmlvbktleX1gKTtcblxuICAgICAgICAvLyBTdGVwMTog5Y+W55qE55W25YmN55qEZWZmZWN0SW5kZXhcbiAgICAgICAgaWYgKCFTcHJpdGVFZmZlY3RCYXNlLl9zX2VmZmVjdE1hcC5oYXModW5pb25LZXkpKSB7XG4gICAgICAgICAgICBsZXQgZWZmZWN0RGF0YTogRWZmZWN0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgICAgICB1dWlkczogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGVmZmVjdERhdGEuZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBtYXQ6IG51bGwsXG4gICAgICAgICAgICAgICAgcHJvcEJ1ZmZlcjogbnVsbCxcbiAgICAgICAgICAgICAgICBwcm9wVGV4dHVyZTogbnVsbCxcbiAgICAgICAgICAgICAgICBpc0RpcnR5OiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBTcHJpdGVFZmZlY3RCYXNlLl9zX2VmZmVjdE1hcC5zZXQodW5pb25LZXksIGVmZmVjdERhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWZmZWN0RGF0YSA9IFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0TWFwLmdldCh1bmlvbktleSkhO1xuXG4gICAgICAgIHRoaXMuX2luc3RhbmNlSUQgPSBlZmZlY3REYXRhLnV1aWRzLmZpbmRJbmRleCgodikgPT4gdiA9PT0gdGhpcy5ub2RlLnV1aWQpO1xuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2VJRCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlSUQgPSBlZmZlY3REYXRhLnV1aWRzLmZpbmRJbmRleCgodikgPT4gdiA9PT0gXCJcIik7XG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2VJRCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZUlEID0gZWZmZWN0RGF0YS51dWlkcy5wdXNoKHRoaXMubm9kZS51dWlkKSAtIDE7XG5cbiAgICAgICAgICAgICAgICBpZiAoZWZmZWN0RGF0YS5kYXRhLmxlbmd0aCA8IE1hdGguZmxvb3IodGhpcy5faW5zdGFuY2VJRCAvIFBST1BfVEVYVFVSRV9TSVpFKSArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0RGF0YS5kYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcEJ1ZmZlcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BUZXh0dXJlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNEaXJ0eTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWZmZWN0RGF0YS51dWlkc1t0aGlzLl9pbnN0YW5jZUlEXSA9IHRoaXMubm9kZS51dWlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcih0aGlzLl9pbnN0YW5jZUlEIC8gUFJPUF9URVhUVVJFX1NJWkUpO1xuICAgICAgICB0aGlzLmNvbG9yID0gbmV3IENvbG9yKHRoaXMuX2luc3RhbmNlSUQgJSBQUk9QX1RFWFRVUkVfU0laRSwgcGl4ZWxzVXNhZ2UsIFBST1BfVEVYVFVSRV9TSVpFLCAyNTUpO1xuXG4gICAgICAgIC8vIFN0ZXAyOiDliJ3lp4vljJZFZmZlY3QgcHJvcHNcbiAgICAgICAgaWYgKGVmZmVjdERhdGEuZGF0YVtpZHhdLm1hdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgdyA9IFBST1BfVEVYVFVSRV9TSVpFO1xuICAgICAgICAgICAgY29uc3QgaCA9IHBpeGVsc1VzYWdlO1xuXG4gICAgICAgICAgICBsZXQgcHJvcEJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkodyAqIGggKiA0KTtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgaDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB3OyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSAoeCArICh5ICogdykpICogNDtcbiAgICAgICAgICAgICAgICAgICAgcHJvcEJ1ZmZlcltpbmRleF0gPSAxO1xuICAgICAgICAgICAgICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMl0gPSAxO1xuICAgICAgICAgICAgICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgM10gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHByb3BzVGV4dHVyZSA9IG5ldyBUZXh0dXJlMkQoKTtcbiAgICAgICAgICAgIHByb3BzVGV4dHVyZS5zZXRGaWx0ZXJzKFRleHR1cmUyRC5GaWx0ZXIuTkVBUkVTVCwgVGV4dHVyZTJELkZpbHRlci5ORUFSRVNUKTtcbiAgICAgICAgICAgIHByb3BzVGV4dHVyZS5yZXNldCh7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBoLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogVGV4dHVyZTJELlBpeGVsRm9ybWF0LlJHQkEzMkYsXG4gICAgICAgICAgICAgICAgbWlwbWFwTGV2ZWw6IDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcm9wc1RleHR1cmUudXBsb2FkRGF0YShwcm9wQnVmZmVyKTtcblxuICAgICAgICAgICAgbGV0IG1hdCA9IHRoaXMuaW5pdE1hdGVyaWFsKCk7XG4gICAgICAgICAgICBtYXQuc2V0UHJvcGVydHkoJ3Byb3BzVGV4dHVyZScsIHByb3BzVGV4dHVyZSk7XG5cbiAgICAgICAgICAgIGVmZmVjdERhdGEuZGF0YVtpZHhdID0ge1xuICAgICAgICAgICAgICAgIG1hdDogbWF0LFxuICAgICAgICAgICAgICAgIHByb3BCdWZmZXI6IHByb3BCdWZmZXIsXG4gICAgICAgICAgICAgICAgcHJvcFRleHR1cmU6IHByb3BzVGV4dHVyZSxcbiAgICAgICAgICAgICAgICBpc0RpcnR5OiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VzdG9tTWF0ZXJpYWwgPSBlZmZlY3REYXRhLmRhdGFbaWR4XS5tYXQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlZmxhc2hQYXJhbXMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHVuaW9uS2V5ID0gdGhpcy5nZXRFZmZlY3RVbmlvbktleSgpO1xuICAgICAgICBjb25zdCBpZHggPSBNYXRoLmZsb29yKHRoaXMuX2luc3RhbmNlSUQgLyBQUk9QX1RFWFRVUkVfU0laRSk7XG4gICAgICAgIGNvbnN0IGVmZmVjdFByb3BzID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSEuZGF0YVtpZHhdO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgZWZmZWN0IHBhcmFtZXRlcnMgZnJvbSB0aGUgREVSSVZFRCBjbGFzcy5cbiAgICAgICAgdGhpcy51cGRhdGVQYXJhbXModGhpcy5faW5zdGFuY2VJRCAlIFBST1BfVEVYVFVSRV9TSVpFLCBQUk9QX1RFWFRVUkVfU0laRSAtIDEsIGVmZmVjdFByb3BzLnByb3BCdWZmZXIhKTtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICAvLyBJbiBFZGl0b3IgbW9kZSwgdXBsb2FkIHRoZSBkYXRhIGRpcmVjdGx5LlxuICAgICAgICAgICAgZWZmZWN0UHJvcHMucHJvcFRleHR1cmUhLnVwbG9hZERhdGEoZWZmZWN0UHJvcHMucHJvcEJ1ZmZlciEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gSW4gUHJldmlldyBtb2RlLCB3YWl0IGZvciB0aGUgbGF0ZVVwZGF0ZSB0byB1cGxvYWQgdGhlIGRhdGEuXG4gICAgICAgICAgICBlZmZlY3RQcm9wcy5pc0RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWPluW+lyBTcHJpdGUg55qEIFVWIOacgOWwj+OAgeacgOWkp+WAvOWPiuWvrOmrmFxuICAgICAqIEBwYXJhbSB1diBcbiAgICAgKiBAcmV0dXJucyB2ZWM0IChtaW5VLCBtaW5WLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRVVih1djogbnVtYmVyW10pOiBWZWM0IHtcbiAgICAgICAgbGV0IG1pblUgPSBNYXRoLm1pbih1dlswXSwgdXZbMl0sIHV2WzRdLCB1dls2XSk7XG4gICAgICAgIGxldCBtaW5WID0gTWF0aC5taW4odXZbMV0sIHV2WzNdLCB1dls1XSwgdXZbN10pO1xuXG4gICAgICAgIGxldCBtYXhVID0gTWF0aC5tYXgodXZbMF0sIHV2WzJdLCB1dls0XSwgdXZbNl0pO1xuICAgICAgICBsZXQgbWF4ViA9IE1hdGgubWF4KHV2WzFdLCB1dlszXSwgdXZbNV0sIHV2WzddKTtcblxuICAgICAgICBsZXQgd2lkdGggPSBtYXhVIC0gbWluVTtcbiAgICAgICAgbGV0IGhlaWdodCA9IG1heFYgLSBtaW5WO1xuXG4gICAgICAgIHJldHVybiBuZXcgVmVjNChtaW5VLCBtaW5WLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBsaWZlIGN5Y2xlXG4gICAgb25Mb2FkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXQodGhpcy5waXhlbHNVc2FnZSk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdW5pb25LZXkgPSB0aGlzLmdldEVmZmVjdFVuaW9uS2V5KCk7XG4gICAgICAgIGNvbnN0IGVmZmVjdERhdGEgPSBTcHJpdGVFZmZlY3RCYXNlLl9zX2VmZmVjdE1hcC5nZXQodW5pb25LZXkpITtcbiAgICAgICAgY29uc3QgaWR4ID0gZWZmZWN0RGF0YS51dWlkcy5maW5kSW5kZXgoKHYpID0+IHYgPT09IHRoaXMubm9kZS51dWlkKTtcblxuICAgICAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgICAgICAgZXJyb3IoXCJFZmZlY3QgaW5kZXggaXMgbm90IGZvdW5kIVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlSUQgPSAtMTtcbiAgICAgICAgICAgIGVmZmVjdERhdGEhLnV1aWRzW2lkeF0gPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGF0ZVVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHVuaW9uS2V5ID0gdGhpcy5nZXRFZmZlY3RVbmlvbktleSgpO1xuICAgICAgICBjb25zdCBlZmZlY3REYXRhID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSE7XG5cbiAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcih0aGlzLl9pbnN0YW5jZUlEIC8gUFJPUF9URVhUVVJFX1NJWkUpO1xuICAgICAgICBjb25zdCBlZmZlY3RQcm9wcyA9IGVmZmVjdERhdGEuZGF0YVtpZHhdO1xuXG4gICAgICAgIGlmIChlZmZlY3RQcm9wcy5pc0RpcnR5KSB7XG4gICAgICAgICAgICBlZmZlY3RQcm9wcy5wcm9wVGV4dHVyZSEudXBsb2FkRGF0YShlZmZlY3RQcm9wcy5wcm9wQnVmZmVyISk7XG4gICAgICAgICAgICBlZmZlY3RQcm9wcy5pc0RpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59Il19