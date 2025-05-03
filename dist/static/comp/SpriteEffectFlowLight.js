"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectFlowLight = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
let SpriteEffectFlowLight = class SpriteEffectFlowLight extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this._lightColor = new cc_1.Color(1, 1, 1, 1);
        this._lightWidth = 0.5;
        this._soft = 0.7;
        this._offset = -8.0;
        this._rotation = 2.4;
    }
    //#region lightColor
    set lightColor(val) {
        this._lightColor.set(val);
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get lightColor() {
        return this._lightColor;
    }
    //#endregion
    //#region lightWidth
    set lightWidth(val) {
        this._lightWidth = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get lightWidth() {
        return this._lightWidth;
    }
    //#endregion
    //#region soft
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
    //#region offset
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
    //#region rotation
    set rotation(val) {
        this._rotation = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get rotation() {
        return this._rotation;
    }
    //#endregion
    //#region override
    /**
     * @override SpriteEffectBase
     */
    get floatUsage() {
        return 16;
    }
    /**
     * @override SpriteEffectBase
     */
    getEffectUnionKey() {
        return `SpriteEffectFlowLight_${this._is2Din3D}_${this._sampleFromRT}`;
    }
    /**
     * @override SpriteEffectBase
     */
    updateParams(idx, textureWidth, propBuffer) {
        const baseUV = this.getUV(this.spriteFrame.uv);
        let index = this.calBufferIndex(idx, 0, textureWidth);
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;
        index = this.calBufferIndex(idx, 1, textureWidth);
        propBuffer[index + 4] = baseUV.x;
        propBuffer[index + 5] = baseUV.y;
        propBuffer[index + 6] = baseUV.z;
        propBuffer[index + 7] = baseUV.w;
        index = this.calBufferIndex(idx, 2, textureWidth);
        propBuffer[index + 8] = this._lightColor.r / 255;
        propBuffer[index + 9] = this._lightColor.g / 255;
        propBuffer[index + 10] = this._lightColor.b / 255;
        propBuffer[index + 11] = this._lightColor.a / 255;
        index = this.calBufferIndex(idx, 3, textureWidth);
        propBuffer[index + 12] = this._lightWidth;
        propBuffer[index + 13] = this._soft;
        propBuffer[index + 14] = this._offset;
        propBuffer[index + 15] = this._rotation;
    }
    /**
     * @override SpriteEffectBase
     */
    initMaterial() {
        let mat = new cc_1.Material();
        mat.initialize({
            effectAsset: this.effectAsset,
            defines: {
                SAMPLE_FROM_RT: this._sampleFromRT,
            },
            technique: this._is2Din3D ? 1 : 0
        });
        return mat;
    }
};
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, tooltip: '流光颜色' })
], SpriteEffectFlowLight.prototype, "lightColor", null);
__decorate([
    property
], SpriteEffectFlowLight.prototype, "_lightColor", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.1, 2.0, 0.001], tooltip: '流光寬度' })
], SpriteEffectFlowLight.prototype, "lightWidth", null);
__decorate([
    property
], SpriteEffectFlowLight.prototype, "_lightWidth", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 10.0, 0.001], tooltip: '柔邊程度' })
], SpriteEffectFlowLight.prototype, "soft", null);
__decorate([
    property
], SpriteEffectFlowLight.prototype, "_soft", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [-3.0, 3.0, 0.001], tooltip: '偏移量' })
], SpriteEffectFlowLight.prototype, "offset", null);
__decorate([
    property
], SpriteEffectFlowLight.prototype, "_offset", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 6.28, 0.1], tooltip: '流光角度' })
], SpriteEffectFlowLight.prototype, "rotation", null);
__decorate([
    property
], SpriteEffectFlowLight.prototype, "_rotation", void 0);
SpriteEffectFlowLight = __decorate([
    ccclass('SpriteEffectFlowLight')
], SpriteEffectFlowLight);
exports.SpriteEffectFlowLight = SpriteEffectFlowLight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0Rmxvd0xpZ2h0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL3N0YXRpYy9jb21wL1Nwcml0ZUVmZmVjdEZsb3dMaWdodC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBaUQ7QUFDakQsZ0NBQW9EO0FBQ3BELHlEQUFzRDtBQUV0RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUd6QyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLG1DQUFnQjtJQUEzRDs7UUFrQlksZ0JBQVcsR0FBVSxJQUFJLFVBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQXFCM0MsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFxQjFCLFVBQUssR0FBVyxHQUFHLENBQUM7UUFxQnBCLFlBQU8sR0FBVyxDQUFDLEdBQUcsQ0FBQztRQXFCdkIsY0FBUyxHQUFXLEdBQUcsQ0FBQztJQW1FcEMsQ0FBQztJQXhLRyxvQkFBb0I7SUFFcEIsSUFBVyxVQUFVLENBQUMsR0FBVTtRQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxQixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUFNO1lBQ0gsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUlELFlBQVk7SUFHWixvQkFBb0I7SUFFcEIsSUFBVyxVQUFVLENBQUMsR0FBVztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUV2QixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUs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QUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO21EQVMvRztBQU9EO0lBREMsUUFBUTtzREFDc0I7QUFNL0I7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO3FEQVM5RztBQU9EO0lBREMsUUFBUTt3REFDdUI7QUF0R3ZCLHFCQUFxQjtJQURqQyxPQUFPLENBQUMsdUJBQXVCLENBQUM7R0FDcEIscUJBQXFCLENBeUtqQztBQXpLWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb2xvciwgTWF0ZXJpYWwgfSBmcm9tICdjYyc7XHJcbmltcG9ydCB7IERFViwgRURJVE9SX05PVF9JTl9QUkVWSUVXIH0gZnJvbSAnY2MvZW52JztcclxuaW1wb3J0IHsgU3ByaXRlRWZmZWN0QmFzZSB9IGZyb20gJy4vU3ByaXRlRWZmZWN0QmFzZSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3MoJ1Nwcml0ZUVmZmVjdEZsb3dMaWdodCcpXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGVFZmZlY3RGbG93TGlnaHQgZXh0ZW5kcyBTcHJpdGVFZmZlY3RCYXNlIHtcclxuICAgIC8vI3JlZ2lvbiBsaWdodENvbG9yXHJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHRvb2x0aXA6ICfmtYHlhYnpopzoibInIH0pXHJcbiAgICBwdWJsaWMgc2V0IGxpZ2h0Q29sb3IodmFsOiBDb2xvcikge1xyXG4gICAgICAgIHRoaXMuX2xpZ2h0Q29sb3Iuc2V0KHZhbCk7XHJcblxyXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGxpZ2h0Q29sb3IoKTogQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9saWdodENvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSBfbGlnaHRDb2xvcjogQ29sb3IgPSBuZXcgQ29sb3IoMSwgMSwgMSwgMSk7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIGxpZ2h0V2lkdGhcclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMC4xLCAyLjAsIDAuMDAxXSwgdG9vbHRpcDogJ+a1geWFieWvrOW6picgfSlcclxuICAgIHB1YmxpYyBzZXQgbGlnaHRXaWR0aCh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2xpZ2h0V2lkdGggPSB2YWw7XHJcblxyXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IGxpZ2h0V2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGlnaHRXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX2xpZ2h0V2lkdGg6IG51bWJlciA9IDAuNTtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gc29mdFxyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAsIDEwLjAsIDAuMDAxXSwgdG9vbHRpcDogJ+aflOmCiueoi+W6picgfSlcclxuICAgIHB1YmxpYyBzZXQgc29mdCh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3NvZnQgPSB2YWw7XHJcblxyXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IHNvZnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc29mdDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX3NvZnQ6IG51bWJlciA9IDAuNztcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gb2Zmc2V0XHJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWy0zLjAsIDMuMCwgMC4wMDFdLCB0b29sdGlwOiAn5YGP56e76YePJyB9KVxyXG4gICAgcHVibGljIHNldCBvZmZzZXQodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9vZmZzZXQgPSB2YWw7XHJcblxyXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IG9mZnNldCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9vZmZzZXQ6IG51bWJlciA9IC04LjA7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIHJvdGF0aW9uXHJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgNi4yOCwgMC4xXSwgdG9vbHRpcDogJ+a1geWFieinkuW6picgfSlcclxuICAgIHB1YmxpYyBzZXQgcm90YXRpb24odmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgcm90YXRpb24oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9yb3RhdGlvbjogbnVtYmVyID0gMi40O1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gb3ZlcnJpZGVcclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldCBmbG9hdFVzYWdlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDE2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldEVmZmVjdFVuaW9uS2V5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGBTcHJpdGVFZmZlY3RGbG93TGlnaHRfJHt0aGlzLl9pczJEaW4zRH1fJHt0aGlzLl9zYW1wbGVGcm9tUlR9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVQYXJhbXMoaWR4OiBudW1iZXIsIHRleHR1cmVXaWR0aDogbnVtYmVyLCBwcm9wQnVmZmVyOiBGbG9hdDMyQXJyYXkpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBiYXNlVVYgPSB0aGlzLmdldFVWKHRoaXMuc3ByaXRlRnJhbWUhLnV2KTtcclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDAsIHRleHR1cmVXaWR0aCk7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDBdID0gdGhpcy5fZWZmZWN0Q29sb3IuciAvIDI1NTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMV0gPSB0aGlzLl9lZmZlY3RDb2xvci5nIC8gMjU1O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAyXSA9IHRoaXMuX2VmZmVjdENvbG9yLmIgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDNdID0gdGhpcy5fZWZmZWN0Q29sb3IuYSAvIDI1NTtcclxuXHJcbiAgICAgICAgaW5kZXggPSB0aGlzLmNhbEJ1ZmZlckluZGV4KGlkeCwgMSwgdGV4dHVyZVdpZHRoKTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNF0gPSBiYXNlVVYueDtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNV0gPSBiYXNlVVYueTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNl0gPSBiYXNlVVYuejtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgN10gPSBiYXNlVVYudztcclxuXHJcbiAgICAgICAgaW5kZXggPSB0aGlzLmNhbEJ1ZmZlckluZGV4KGlkeCwgMiwgdGV4dHVyZVdpZHRoKTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgOF0gPSB0aGlzLl9saWdodENvbG9yLnIgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDldID0gdGhpcy5fbGlnaHRDb2xvci5nIC8gMjU1O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxMF0gPSB0aGlzLl9saWdodENvbG9yLmIgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDExXSA9IHRoaXMuX2xpZ2h0Q29sb3IuYSAvIDI1NTtcclxuXHJcbiAgICAgICAgaW5kZXggPSB0aGlzLmNhbEJ1ZmZlckluZGV4KGlkeCwgMywgdGV4dHVyZVdpZHRoKTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTJdID0gdGhpcy5fbGlnaHRXaWR0aDtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTNdID0gdGhpcy5fc29mdDtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTRdID0gdGhpcy5fb2Zmc2V0O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxNV0gPSB0aGlzLl9yb3RhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBpbml0TWF0ZXJpYWwoKTogTWF0ZXJpYWwge1xyXG4gICAgICAgIGxldCBtYXQgPSBuZXcgTWF0ZXJpYWwoKTtcclxuICAgICAgICBtYXQuaW5pdGlhbGl6ZShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXHJcbiAgICAgICAgICAgICAgICBkZWZpbmVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgU0FNUExFX0ZST01fUlQ6IHRoaXMuX3NhbXBsZUZyb21SVCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IHRoaXMuX2lzMkRpbjNEID8gMSA6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIG1hdDtcclxuICAgIH1cclxufVxyXG5cclxuIl19