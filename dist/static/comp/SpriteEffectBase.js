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
        this._sampleFromRT = false;
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
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
    }
    get is2Din3D() {
        return this._is2Din3D;
    }
    //#endregion
    //#region sampleFromRT
    set sampleFromRT(val) {
        this._sampleFromRT = val;
        // this.resetMaterial({
        //     defines: {
        //         SAMPLE_FROM_RT: this._sampleFromRT,
        //     }
        // });
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
        else {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
    }
    get sampleFromRT() {
        return this._sampleFromRT;
    }
    /**
     * @abstract
     * Reset the material.
     * @returns void
     */
    resetMaterial(matInfo) {
        if (this.customMaterial) {
            this.customMaterial.copy(this.customMaterial, matInfo);
        }
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
        // Step1: 取的當前的effectIndex
        if (!SpriteEffectBase_1._s_effectMap.has(unionKey)) {
            cc_1.log(`init: ${unionKey} not found, create new one`);
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
        if (SpriteEffectBase_1._s_effectMap.has(unionKey) === false) {
            cc_1.error(`${this.constructor.name}: effect data not found!`);
            return;
        }
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
        super.onLoad();
        this.init(this.pixelsUsage);
    }
    start() {
        this.reflashParams();
    }
    onDestroy() {
        const unionKey = this.getEffectUnionKey();
        if (SpriteEffectBase_1._s_effectMap.has(unionKey) === false) {
            cc_1.error(`${this.constructor.name}: effect data not found!`);
            return;
        }
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
        if (SpriteEffectBase_1._s_effectMap.has(unionKey) === false) {
            cc_1.error(`${this.constructor.name}: effect data not found!`);
            return;
        }
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
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '當Sprite來源RenderTexture時使用' })
], SpriteEffectBase.prototype, "sampleFromRT", null);
__decorate([
    property
], SpriteEffectBase.prototype, "_sampleFromRT", void 0);
SpriteEffectBase = SpriteEffectBase_1 = __decorate([
    ccclass('SpriteEffectBase')
], SpriteEffectBase);
exports.SpriteEffectBase = SpriteEffectBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9zdGF0aWMvY29tcC9TcHJpdGVFZmZlY3RCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQkFBa0g7QUFDbEgsZ0NBQStDO0FBQy9DLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBY3pDLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDO0FBRzlCLElBQXNCLGdCQUFnQix3QkFBdEMsTUFBc0IsZ0JBQWlCLFNBQVEsV0FBTTtJQUFyRDs7UUFJVyxnQkFBVyxHQUF1QixJQUFJLENBQUM7UUFFcEMsZ0JBQVcsR0FBVyxDQUFDLENBQUMsQ0FBQztRQW9CekIsaUJBQVksR0FBVSxJQUFJLFVBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQXdCcEQsY0FBUyxHQUFZLEtBQUssQ0FBQztRQTBCM0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7SUFxTzdDLENBQUM7SUF6U0cscUJBQXFCO0lBRXJCLElBQVcsV0FBVyxDQUFDLEdBQVU7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFFeEIsSUFBSSwyQkFBcUIsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7YUFDSTtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxJQUFXLFdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFJRCxZQUFZO0lBR1osa0JBQWtCO0lBRWxCLElBQVcsUUFBUSxDQUFDLEdBQVk7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFFckIsSUFBSSwyQkFBcUIsRUFBRTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElB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QUFPLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQztvREFlN0Y7QUFPRDtJQURDLFFBQVE7dURBQ2dDO0FBNUV2QixnQkFBZ0I7SUFEckMsT0FBTyxDQUFDLGtCQUFrQixDQUFDO0dBQ04sZ0JBQWdCLENBaVRyQztBQWpUcUIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29sb3IsIEVmZmVjdEFzc2V0LCBlcnJvciwgSU1hdGVyaWFsSW5mbywgbG9nLCBNYXRlcmlhbCwgU3ByaXRlLCBUZXh0dXJlMkQsIFZlYzQgfSBmcm9tIFwiY2NcIjtcclxuaW1wb3J0IHsgRURJVE9SX05PVF9JTl9QUkVWSUVXIH0gZnJvbSBcImNjL2VudlwiO1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xyXG5cclxudHlwZSBFZmZlY3RQcm9wcyA9IHtcclxuICAgIG1hdDogTWF0ZXJpYWwgfCBudWxsO1xyXG4gICAgcHJvcEJ1ZmZlcjogRmxvYXQzMkFycmF5IHwgbnVsbDtcclxuICAgIHByb3BUZXh0dXJlOiBUZXh0dXJlMkQgfCBudWxsO1xyXG4gICAgaXNEaXJ0eTogYm9vbGVhbjtcclxufVxyXG5cclxudHlwZSBFZmZlY3REYXRhID0ge1xyXG4gICAgZGF0YTogRWZmZWN0UHJvcHNbXTtcclxuICAgIHV1aWRzOiBzdHJpbmdbXTtcclxufVxyXG5cclxuY29uc3QgUFJPUF9URVhUVVJFX1NJWkUgPSAxMjg7XHJcblxyXG5AY2NjbGFzcygnU3ByaXRlRWZmZWN0QmFzZScpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTcHJpdGVFZmZlY3RCYXNlIGV4dGVuZHMgU3ByaXRlIHtcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgX3NfZWZmZWN0TWFwID0gbmV3IE1hcDxzdHJpbmcsIEVmZmVjdERhdGE+KCk7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogRWZmZWN0QXNzZXQsIHRvb2x0aXA6ICfmjIflrprmlYjmnpxFZmZlY3RBc3NldCcgfSlcclxuICAgIHB1YmxpYyBlZmZlY3RBc3NldDogRWZmZWN0QXNzZXQgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2luc3RhbmNlSUQ6IG51bWJlciA9IC0xO1xyXG5cclxuICAgIC8vI3JlZ2lvbiBlZmZlY3RDb2xvclxyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0eXBlOiBDb2xvciwgdG9vbHRpcDogXCJNeSBDb2xvclwiIH0pXHJcbiAgICBwdWJsaWMgc2V0IGVmZmVjdENvbG9yKHZhbDogQ29sb3IpIHtcclxuICAgICAgICB0aGlzLl9lZmZlY3RDb2xvciA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVmZmVjdENvbG9yKCk6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZWZmZWN0Q29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcm90ZWN0ZWQgX2VmZmVjdENvbG9yOiBDb2xvciA9IG5ldyBDb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBpczJEaW4zRFxyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0b29sdGlwOiAn55W25L2/55SoUmVuZGVyUm9vdDJE5pmC5L2/55SoJyB9KVxyXG4gICAgcHVibGljIHNldCBpczJEaW4zRCh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9pczJEaW4zRCA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQodGhpcy5waXhlbHNVc2FnZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMucGl4ZWxzVXNhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpczJEaW4zRCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXMyRGluM0Q7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcm90ZWN0ZWQgX2lzMkRpbjNEOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAvLyNyZWdpb24gc2FtcGxlRnJvbVJUXHJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHRvb2x0aXA6ICfnlbZTcHJpdGXkvobmupBSZW5kZXJUZXh0dXJl5pmC5L2/55SoJyB9KVxyXG4gICAgcHVibGljIHNldCBzYW1wbGVGcm9tUlQodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2FtcGxlRnJvbVJUID0gdmFsO1xyXG4gICAgICAgIC8vIHRoaXMucmVzZXRNYXRlcmlhbCh7XHJcbiAgICAgICAgLy8gICAgIGRlZmluZXM6IHtcclxuICAgICAgICAvLyAgICAgICAgIFNBTVBMRV9GUk9NX1JUOiB0aGlzLl9zYW1wbGVGcm9tUlQsXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCh0aGlzLnBpeGVsc1VzYWdlKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMucGl4ZWxzVXNhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzYW1wbGVGcm9tUlQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NhbXBsZUZyb21SVDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByb3RlY3RlZCBfc2FtcGxlRnJvbVJUOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIGFic3RyYWN0IG1ldGhvZHNcclxuICAgIC8qKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBSZXR1cm4gdGhlIGNvdW50IG9mIHVzZWQgZmxvYXRzIG9mIHRoZSBlZmZlY3QuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBnZXQgZmxvYXRVc2FnZSgpOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAYWJzdHJhY3QgXHJcbiAgICAgKiBHZW5lcmF0ZSBhIFVuaW9uIGtleSBmb3IgdGhlIGVmZmVjdC5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldEVmZmVjdFVuaW9uS2V5KCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBhYnN0cmFjdFxyXG4gICAgICogVXBkYXRlIHRoZSBlZmZlY3QgcGFyYW1ldGVycy5cclxuICAgICAqL1xyXG4gICAgLy8gcHJvdGVjdGVkIGFic3RyYWN0IHVwZGF0ZVBhcmFtcyhpbmRleDogbnVtYmVyLCBwcm9wQnVmZmVyOiBGbG9hdDMyQXJyYXkpOiB2b2lkO1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHVwZGF0ZVBhcmFtcyhpZHg6IG51bWJlciwgdGV4dHVyZVdpZHRoOiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAYWJzdHJhY3RcclxuICAgICAqIEluaXRpYWxpemUgdGhlIG1hdGVyaWFsLlxyXG4gICAgICogQHJldHVybnMgTWF0ZXJpYWxcclxuICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgaW5pdE1hdGVyaWFsKCk6IE1hdGVyaWFsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGFic3RyYWN0XHJcbiAgICAgKiBSZXNldCB0aGUgbWF0ZXJpYWwuXHJcbiAgICAgKiBAcmV0dXJucyB2b2lkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCByZXNldE1hdGVyaWFsKG1hdEluZm86IElNYXRlcmlhbEluZm8pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jdXN0b21NYXRlcmlhbCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbU1hdGVyaWFsLmNvcHkodGhpcy5jdXN0b21NYXRlcmlhbCwgbWF0SW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBtZXRob2RzXHJcbiAgICAvKipcclxuICAgICAqIDTlgItmbG9hdOeCuuS4gOWAi3BpeGVs77yM6ZyA5L2/55So5bm+5YCLcGl4ZWzmlbjph49cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBwaXhlbHNVc2FnZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnBvdygyLCBNYXRoLmNlaWwoTWF0aC5sb2codGhpcy5mbG9hdFVzYWdlKSAvIE1hdGgubG9nKDIpKSkgLyA0O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjYWxCdWZmZXJJbmRleCh4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKHggKyAoeSAqIHcpKSAqIDQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXQocGl4ZWxzVXNhZ2U6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHVuaW9uS2V5ID0gdGhpcy5nZXRFZmZlY3RVbmlvbktleSgpO1xyXG5cclxuICAgICAgICAvLyBTdGVwMTog5Y+W55qE55W25YmN55qEZWZmZWN0SW5kZXhcclxuICAgICAgICBpZiAoIVNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0TWFwLmhhcyh1bmlvbktleSkpIHtcclxuICAgICAgICAgICAgbG9nKGBpbml0OiAke3VuaW9uS2V5fSBub3QgZm91bmQsIGNyZWF0ZSBuZXcgb25lYCk7XHJcbiAgICAgICAgICAgIGxldCBlZmZlY3REYXRhOiBFZmZlY3REYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgICAgICB1dWlkczogW11cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGVmZmVjdERhdGEuZGF0YS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG1hdDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHByb3BCdWZmZXI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwcm9wVGV4dHVyZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGlzRGlydHk6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0TWFwLnNldCh1bmlvbktleSwgZWZmZWN0RGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBlZmZlY3REYXRhID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSE7XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlSUQgPSBlZmZlY3REYXRhLnV1aWRzLmZpbmRJbmRleCgodikgPT4gdiA9PT0gdGhpcy5ub2RlLnV1aWQpO1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZUlEID09PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZUlEID0gZWZmZWN0RGF0YS51dWlkcy5maW5kSW5kZXgoKHYpID0+IHYgPT09IFwiXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2VJRCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlSUQgPSBlZmZlY3REYXRhLnV1aWRzLnB1c2godGhpcy5ub2RlLnV1aWQpIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZWZmZWN0RGF0YS5kYXRhLmxlbmd0aCA8IE1hdGguZmxvb3IodGhpcy5faW5zdGFuY2VJRCAvIFBST1BfVEVYVFVSRV9TSVpFKSArIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3REYXRhLmRhdGEucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcEJ1ZmZlcjogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcFRleHR1cmU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRGlydHk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0RGF0YS51dWlkc1t0aGlzLl9pbnN0YW5jZUlEXSA9IHRoaXMubm9kZS51dWlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpZHggPSBNYXRoLmZsb29yKHRoaXMuX2luc3RhbmNlSUQgLyBQUk9QX1RFWFRVUkVfU0laRSk7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IG5ldyBDb2xvcih0aGlzLl9pbnN0YW5jZUlEICUgUFJPUF9URVhUVVJFX1NJWkUsIHBpeGVsc1VzYWdlLCBQUk9QX1RFWFRVUkVfU0laRSwgMjU1KTtcclxuXHJcbiAgICAgICAgLy8gU3RlcDI6IOWIneWni+WMlkVmZmVjdCBwcm9wc1xyXG4gICAgICAgIGlmIChlZmZlY3REYXRhLmRhdGFbaWR4XS5tYXQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc3QgdyA9IFBST1BfVEVYVFVSRV9TSVpFO1xyXG4gICAgICAgICAgICBjb25zdCBoID0gcGl4ZWxzVXNhZ2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJvcEJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkodyAqIGggKiA0KTtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoOyB5KyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdzsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSAoeCArICh5ICogdykpICogNDtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wQnVmZmVyW2luZGV4XSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDFdID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMl0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAzXSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBwcm9wc1RleHR1cmUgPSBuZXcgVGV4dHVyZTJEKCk7XHJcbiAgICAgICAgICAgIHByb3BzVGV4dHVyZS5zZXRGaWx0ZXJzKFRleHR1cmUyRC5GaWx0ZXIuTkVBUkVTVCwgVGV4dHVyZTJELkZpbHRlci5ORUFSRVNUKTtcclxuICAgICAgICAgICAgcHJvcHNUZXh0dXJlLnJlc2V0KHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB3LFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBoLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBUZXh0dXJlMkQuUGl4ZWxGb3JtYXQuUkdCQTMyRixcclxuICAgICAgICAgICAgICAgIG1pcG1hcExldmVsOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcHJvcHNUZXh0dXJlLnVwbG9hZERhdGEocHJvcEJ1ZmZlcik7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWF0ID0gdGhpcy5pbml0TWF0ZXJpYWwoKTtcclxuICAgICAgICAgICAgbWF0LnNldFByb3BlcnR5KCdwcm9wc1RleHR1cmUnLCBwcm9wc1RleHR1cmUpO1xyXG5cclxuICAgICAgICAgICAgZWZmZWN0RGF0YS5kYXRhW2lkeF0gPSB7XHJcbiAgICAgICAgICAgICAgICBtYXQ6IG1hdCxcclxuICAgICAgICAgICAgICAgIHByb3BCdWZmZXI6IHByb3BCdWZmZXIsXHJcbiAgICAgICAgICAgICAgICBwcm9wVGV4dHVyZTogcHJvcHNUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgaXNEaXJ0eTogZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY3VzdG9tTWF0ZXJpYWwgPSBlZmZlY3REYXRhLmRhdGFbaWR4XS5tYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlZmxhc2hQYXJhbXMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdW5pb25LZXkgPSB0aGlzLmdldEVmZmVjdFVuaW9uS2V5KCk7XHJcbiAgICAgICAgaWYgKFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0TWFwLmhhcyh1bmlvbktleSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX06IGVmZmVjdCBkYXRhIG5vdCBmb3VuZCFgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcih0aGlzLl9pbnN0YW5jZUlEIC8gUFJPUF9URVhUVVJFX1NJWkUpO1xyXG4gICAgICAgIGNvbnN0IGVmZmVjdFByb3BzID0gU3ByaXRlRWZmZWN0QmFzZS5fc19lZmZlY3RNYXAuZ2V0KHVuaW9uS2V5KSEuZGF0YVtpZHhdO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIGVmZmVjdCBwYXJhbWV0ZXJzIGZyb20gdGhlIERFUklWRUQgY2xhc3MuXHJcbiAgICAgICAgdGhpcy51cGRhdGVQYXJhbXModGhpcy5faW5zdGFuY2VJRCAlIFBST1BfVEVYVFVSRV9TSVpFLCBQUk9QX1RFWFRVUkVfU0laRSAtIDEsIGVmZmVjdFByb3BzLnByb3BCdWZmZXIhKTtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICAvLyBJbiBFZGl0b3IgbW9kZSwgdXBsb2FkIHRoZSBkYXRhIGRpcmVjdGx5LlxyXG4gICAgICAgICAgICBlZmZlY3RQcm9wcy5wcm9wVGV4dHVyZSEudXBsb2FkRGF0YShlZmZlY3RQcm9wcy5wcm9wQnVmZmVyISk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBJbiBQcmV2aWV3IG1vZGUsIHdhaXQgZm9yIHRoZSBsYXRlVXBkYXRlIHRvIHVwbG9hZCB0aGUgZGF0YS5cclxuICAgICAgICAgICAgZWZmZWN0UHJvcHMuaXNEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+W5b6XIFNwcml0ZSDnmoQgVVYg5pyA5bCP44CB5pyA5aSn5YC85Y+K5a+s6auYXHJcbiAgICAgKiBAcGFyYW0gdXYgXHJcbiAgICAgKiBAcmV0dXJucyB2ZWM0IChtaW5VLCBtaW5WLCB3aWR0aCwgaGVpZ2h0KVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VVYodXY6IG51bWJlcltdKTogVmVjNCB7XHJcbiAgICAgICAgbGV0IG1pblUgPSBNYXRoLm1pbih1dlswXSwgdXZbMl0sIHV2WzRdLCB1dls2XSk7XHJcbiAgICAgICAgbGV0IG1pblYgPSBNYXRoLm1pbih1dlsxXSwgdXZbM10sIHV2WzVdLCB1dls3XSk7XHJcblxyXG4gICAgICAgIGxldCBtYXhVID0gTWF0aC5tYXgodXZbMF0sIHV2WzJdLCB1dls0XSwgdXZbNl0pO1xyXG4gICAgICAgIGxldCBtYXhWID0gTWF0aC5tYXgodXZbMV0sIHV2WzNdLCB1dls1XSwgdXZbN10pO1xyXG5cclxuICAgICAgICBsZXQgd2lkdGggPSBtYXhVIC0gbWluVTtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gbWF4ViAtIG1pblY7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVmVjNChtaW5VLCBtaW5WLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gbGlmZSBjeWNsZVxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdCh0aGlzLnBpeGVsc1VzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdW5pb25LZXkgPSB0aGlzLmdldEVmZmVjdFVuaW9uS2V5KCk7XHJcbiAgICAgICAgaWYgKFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0TWFwLmhhcyh1bmlvbktleSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX06IGVmZmVjdCBkYXRhIG5vdCBmb3VuZCFgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZWZmZWN0RGF0YSA9IFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0TWFwLmdldCh1bmlvbktleSkhO1xyXG4gICAgICAgIGNvbnN0IGlkeCA9IGVmZmVjdERhdGEudXVpZHMuZmluZEluZGV4KCh2KSA9PiB2ID09PSB0aGlzLm5vZGUudXVpZCk7XHJcblxyXG4gICAgICAgIGlmIChpZHggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIGVycm9yKFwiRWZmZWN0IGluZGV4IGlzIG5vdCBmb3VuZCFcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2VJRCA9IC0xO1xyXG4gICAgICAgICAgICBlZmZlY3REYXRhIS51dWlkc1tpZHhdID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGF0ZVVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdW5pb25LZXkgPSB0aGlzLmdldEVmZmVjdFVuaW9uS2V5KCk7XHJcbiAgICAgICAgaWYgKFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0TWFwLmhhcyh1bmlvbktleSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX06IGVmZmVjdCBkYXRhIG5vdCBmb3VuZCFgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZWZmZWN0RGF0YSA9IFNwcml0ZUVmZmVjdEJhc2UuX3NfZWZmZWN0TWFwLmdldCh1bmlvbktleSkhO1xyXG4gICAgICAgIGNvbnN0IGlkeCA9IE1hdGguZmxvb3IodGhpcy5faW5zdGFuY2VJRCAvIFBST1BfVEVYVFVSRV9TSVpFKTtcclxuICAgICAgICBjb25zdCBlZmZlY3RQcm9wcyA9IGVmZmVjdERhdGEuZGF0YVtpZHhdO1xyXG5cclxuICAgICAgICBpZiAoZWZmZWN0UHJvcHMuaXNEaXJ0eSkge1xyXG4gICAgICAgICAgICBlZmZlY3RQcm9wcy5wcm9wVGV4dHVyZSEudXBsb2FkRGF0YShlZmZlY3RQcm9wcy5wcm9wQnVmZmVyISk7XHJcbiAgICAgICAgICAgIGVmZmVjdFByb3BzLmlzRGlydHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=