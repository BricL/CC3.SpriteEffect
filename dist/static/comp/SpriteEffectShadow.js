"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectShadow = exports.ShadowType = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
var ShadowType;
(function (ShadowType) {
    ShadowType[ShadowType["LIMITED_BOUND"] = 0] = "LIMITED_BOUND";
    ShadowType[ShadowType["NORMAL"] = 1] = "NORMAL";
})(ShadowType = exports.ShadowType || (exports.ShadowType = {}));
let SpriteEffectShadow = class SpriteEffectShadow extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this._shadowType = ShadowType.LIMITED_BOUND;
        this._shadowColor = new cc_1.Color(0, 0, 0, 1.0);
        this._offset = new cc_1.Vec2(0.1, 0.1);
    }
    //#region ShadowType
    set shadowType(val) {
        this._shadowType = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
        else {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
    }
    get shadowType() {
        return this._shadowType;
    }
    //#endregion
    //#region ShadowColor
    set shadowColor(val) {
        this._shadowColor.set(val);
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get shadowColor() {
        return this._shadowColor;
    }
    //#endregion
    //#region Offset
    set offset(val) {
        this._offset.set(val);
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
    //#region override
    /**
     * @override SpriteEffectBase
     */
    get floatUsage() {
        return 12;
    }
    /**
     * @override SpriteEffectBase
     */
    getEffectUnionKey() {
        return `SpriteEffectShadow_${this._shadowType}_${this._sampleFromRT}`;
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
        propBuffer[index + 4] = this._shadowColor.r / 255;
        propBuffer[index + 5] = this._shadowColor.g / 255;
        propBuffer[index + 6] = this._shadowColor.b / 255;
        propBuffer[index + 7] = this._shadowColor.a / 255;
        index = this.calBufferIndex(idx, 2, textureWidth);
        propBuffer[index + 8] = this._offset.x;
        propBuffer[index + 9] = this._offset.y;
        propBuffer[index + 10] = this._offset.x * 100.0;
        propBuffer[index + 11] = this._offset.y * 100.0;
        // if (this._shadowType === ShadowType.LIMITED_BOUND) {
        //     propBuffer[index + 8] = this._offset.x;
        //     propBuffer[index + 9] = this._offset.y;
        //     propBuffer[index + 10] = this._offset.x * 100.0;
        //     propBuffer[index + 11] = this._offset.y * 100.0;
        // } else {
        //     propBuffer[index + 8] = this._offset.x * 100.0;
        //     propBuffer[index + 9] = this._offset.y * 100.0;
        //     propBuffer[index + 10] = 0.0;
        //     propBuffer[index + 11] = 1.0;
        // }
    }
    /**
     * @override SpriteEffectBase
     */
    initMaterial() {
        let technique = 0;
        switch (this._shadowType) {
            case ShadowType.LIMITED_BOUND:
                technique = 0;
                break;
            case ShadowType.NORMAL:
                technique = 1;
                break;
        }
        let mat = new cc_1.Material();
        mat.initialize({
            effectAsset: this.effectAsset,
            defines: {
                SAMPLE_FROM_RT: this._sampleFromRT,
            },
            technique: technique
        });
        return mat;
    }
};
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Enum(ShadowType), tooltip: "陰影模式" })
], SpriteEffectShadow.prototype, "shadowType", null);
__decorate([
    property
], SpriteEffectShadow.prototype, "_shadowType", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, tooltip: "陰影顏色" })
], SpriteEffectShadow.prototype, "shadowColor", null);
__decorate([
    property
], SpriteEffectShadow.prototype, "_shadowColor", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, range: [-1, 1, 0.01], tooltip: "偏移量" })
], SpriteEffectShadow.prototype, "offset", null);
__decorate([
    property
], SpriteEffectShadow.prototype, "_offset", void 0);
SpriteEffectShadow = __decorate([
    ccclass('SpriteEffectShadow')
], SpriteEffectShadow);
exports.SpriteEffectShadow = SpriteEffectShadow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0U2hhZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL3N0YXRpYy9jb21wL1Nwcml0ZUVmZmVjdFNoYWRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBNkQ7QUFDN0QsZ0NBQStDO0FBQy9DLHlEQUFzRDtBQUV0RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUN6QyxJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDbEIsNkRBQWEsQ0FBQTtJQUNiLCtDQUFNLENBQUE7QUFDVixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFHRCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLG1DQUFnQjtJQUF4RDs7UUFvQlksZ0JBQVcsR0FBZSxVQUFVLENBQUMsYUFBYSxDQUFDO1FBc0JuRCxpQkFBWSxHQUFVLElBQUksVUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBc0I5QyxZQUFPLEdBQVMsSUFBSSxTQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBK0UvQyxDQUFDO0lBOUlHLG9CQUFvQjtJQUVwQixJQUFXLFVBQVUsQ0FBQyxHQUFlO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBRXZCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBSUQsWUFBWTtJQUdaLHFCQUFxQjtJQUVyQixJQUFXLFdBQVcsQ0FBQyxHQUFVO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBSUQsWUFBWTtJQUdaLGdCQUFnQjtJQUVoQixJQUFXLE1BQU0sQ0FBQyxHQUFTO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFJRCxZQUFZO0lBR1osa0JBQWtCO0lBQ2xCOztPQUVHO0lBQ0gsSUFBdUIsVUFBVTtRQUM3QixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7T0FFRztJQUNnQixpQkFBaUI7UUFDaEMsT0FBTyxzQkFBc0IsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUUsQ0FBQztJQUVEOztPQUVHO0lBQ2dCLFlBQVksQ0FBQyxHQUFXLEVBQUUsWUFBb0IsRUFBRSxVQUF3QjtRQUN2RixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDdEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFbEQsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUVsRCxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDdkMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN2QyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoRCxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoRCx1REFBdUQ7UUFDdkQsOENBQThDO1FBQzlDLDhDQUE4QztRQUM5Qyx1REFBdUQ7UUFDdkQsdURBQXVEO1FBQ3ZELFdBQVc7UUFDWCxzREFBc0Q7UUFDdEQsc0RBQXNEO1FBQ3RELG9DQUFvQztRQUNwQyxvQ0FBb0M7UUFDcEMsSUFBSTtJQUNSLENBQUM7SUFFRDs7T0FFRztJQUNnQixZQUFZO1FBQzNCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdEIsS0FBSyxVQUFVLENBQUMsYUFBYTtnQkFDekIsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDZCxNQUFNO1lBQ1YsS0FBSyxVQUFVLENBQUMsTUFBTTtnQkFDbEIsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDZCxNQUFNO1NBQ2I7UUFFRCxJQUFJLEdBQUcsR0FBRyxJQUFJLGFBQVEsRUFBRSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxVQUFVLENBQ1Y7WUFDSSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsT0FBTyxFQUFFO2dCQUNMLGNBQWMsRUFBRSxJQUFJLENBQUMsYUFBYTthQUNyQztZQUNELFNBQVMsRUFBRSxTQUFTO1NBQ3ZCLENBQ0osQ0FBQztRQUNGLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUE7QUE1SUc7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztvREFXaEc7QUFPRDtJQURDLFFBQVE7dURBQ2tEO0FBTTNEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO3FEQVV4RTtBQU9EO0lBREMsUUFBUTt3REFDNkM7QUFNdEQ7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO2dEQVU3RjtBQU9EO0lBREMsUUFBUTttREFDa0M7QUFoRWxDLGtCQUFrQjtJQUQ5QixPQUFPLENBQUMsb0JBQW9CLENBQUM7R0FDakIsa0JBQWtCLENBK0k5QjtBQS9JWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb2xvciwgRW51bSwgTWF0ZXJpYWwsIFZlYzIgfSBmcm9tICdjYyc7XHJcbmltcG9ydCB7IEVESVRPUl9OT1RfSU5fUFJFVklFVyB9IGZyb20gJ2NjL2Vudic7XHJcbmltcG9ydCB7IFNwcml0ZUVmZmVjdEJhc2UgfSBmcm9tICcuL1Nwcml0ZUVmZmVjdEJhc2UnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcclxuZXhwb3J0IGVudW0gU2hhZG93VHlwZSB7XHJcbiAgICBMSU1JVEVEX0JPVU5ELFxyXG4gICAgTk9STUFMXHJcbn1cclxuXHJcbkBjY2NsYXNzKCdTcHJpdGVFZmZlY3RTaGFkb3cnKVxyXG5leHBvcnQgY2xhc3MgU3ByaXRlRWZmZWN0U2hhZG93IGV4dGVuZHMgU3ByaXRlRWZmZWN0QmFzZSB7XHJcbiAgICAvLyNyZWdpb24gU2hhZG93VHlwZVxyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0eXBlOiBFbnVtKFNoYWRvd1R5cGUpLCB0b29sdGlwOiBcIumZsOW9seaooeW8j1wiIH0pXHJcbiAgICBwdWJsaWMgc2V0IHNoYWRvd1R5cGUodmFsOiBTaGFkb3dUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5fc2hhZG93VHlwZSA9IHZhbDtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQodGhpcy5waXhlbHNVc2FnZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCh0aGlzLnBpeGVsc1VzYWdlKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2hhZG93VHlwZSgpOiBTaGFkb3dUeXBlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93VHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX3NoYWRvd1R5cGU6IFNoYWRvd1R5cGUgPSBTaGFkb3dUeXBlLkxJTUlURURfQk9VTkQ7XHJcbiAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgLy8jcmVnaW9uIFNoYWRvd0NvbG9yXHJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHRvb2x0aXA6IFwi6Zmw5b2x6aGP6ImyXCIgfSlcclxuICAgIHB1YmxpYyBzZXQgc2hhZG93Q29sb3IodmFsOiBDb2xvcikge1xyXG4gICAgICAgIHRoaXMuX3NoYWRvd0NvbG9yLnNldCh2YWwpO1xyXG5cclxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2hhZG93Q29sb3IoKTogQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFkb3dDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX3NoYWRvd0NvbG9yOiBDb2xvciA9IG5ldyBDb2xvcigwLCAwLCAwLCAxLjApO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBPZmZzZXRcclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgcmFuZ2U6IFstMSwgMSwgMC4wMV0sIHRvb2x0aXA6IFwi5YGP56e76YePXCIgfSlcclxuICAgIHB1YmxpYyBzZXQgb2Zmc2V0KHZhbDogVmVjMikge1xyXG4gICAgICAgIHRoaXMuX29mZnNldC5zZXQodmFsKTtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG9mZnNldCgpOiBWZWMyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSBfb2Zmc2V0OiBWZWMyID0gbmV3IFZlYzIoMC4xLCAwLjEpO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBvdmVycmlkZVxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0IGZsb2F0VXNhZ2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0RWZmZWN0VW5pb25LZXkoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYFNwcml0ZUVmZmVjdFNoYWRvd18ke3RoaXMuX3NoYWRvd1R5cGV9XyR7dGhpcy5fc2FtcGxlRnJvbVJUfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlUGFyYW1zKGlkeDogbnVtYmVyLCB0ZXh0dXJlV2lkdGg6IG51bWJlciwgcHJvcEJ1ZmZlcjogRmxvYXQzMkFycmF5KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDAsIHRleHR1cmVXaWR0aCk7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDBdID0gdGhpcy5fZWZmZWN0Q29sb3IuciAvIDI1NTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMV0gPSB0aGlzLl9lZmZlY3RDb2xvci5nIC8gMjU1O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAyXSA9IHRoaXMuX2VmZmVjdENvbG9yLmIgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDNdID0gdGhpcy5fZWZmZWN0Q29sb3IuYSAvIDI1NTtcclxuXHJcbiAgICAgICAgaW5kZXggPSB0aGlzLmNhbEJ1ZmZlckluZGV4KGlkeCwgMSwgdGV4dHVyZVdpZHRoKTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNF0gPSB0aGlzLl9zaGFkb3dDb2xvci5yIC8gMjU1O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA1XSA9IHRoaXMuX3NoYWRvd0NvbG9yLmcgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDZdID0gdGhpcy5fc2hhZG93Q29sb3IuYiAvIDI1NTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgN10gPSB0aGlzLl9zaGFkb3dDb2xvci5hIC8gMjU1O1xyXG5cclxuICAgICAgICBpbmRleCA9IHRoaXMuY2FsQnVmZmVySW5kZXgoaWR4LCAyLCB0ZXh0dXJlV2lkdGgpO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA4XSA9IHRoaXMuX29mZnNldC54O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA5XSA9IHRoaXMuX29mZnNldC55O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxMF0gPSB0aGlzLl9vZmZzZXQueCAqIDEwMC4wO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxMV0gPSB0aGlzLl9vZmZzZXQueSAqIDEwMC4wO1xyXG4gICAgICAgIC8vIGlmICh0aGlzLl9zaGFkb3dUeXBlID09PSBTaGFkb3dUeXBlLkxJTUlURURfQk9VTkQpIHtcclxuICAgICAgICAvLyAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDhdID0gdGhpcy5fb2Zmc2V0Lng7XHJcbiAgICAgICAgLy8gICAgIHByb3BCdWZmZXJbaW5kZXggKyA5XSA9IHRoaXMuX29mZnNldC55O1xyXG4gICAgICAgIC8vICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTBdID0gdGhpcy5fb2Zmc2V0LnggKiAxMDAuMDtcclxuICAgICAgICAvLyAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDExXSA9IHRoaXMuX29mZnNldC55ICogMTAwLjA7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDhdID0gdGhpcy5fb2Zmc2V0LnggKiAxMDAuMDtcclxuICAgICAgICAvLyAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDldID0gdGhpcy5fb2Zmc2V0LnkgKiAxMDAuMDtcclxuICAgICAgICAvLyAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDEwXSA9IDAuMDtcclxuICAgICAgICAvLyAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDExXSA9IDEuMDtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5pdE1hdGVyaWFsKCk6IE1hdGVyaWFsIHtcclxuICAgICAgICBsZXQgdGVjaG5pcXVlID0gMDtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX3NoYWRvd1R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTaGFkb3dUeXBlLkxJTUlURURfQk9VTkQ6XHJcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2hhZG93VHlwZS5OT1JNQUw6XHJcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWUgPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWF0ID0gbmV3IE1hdGVyaWFsKCk7XHJcbiAgICAgICAgbWF0LmluaXRpYWxpemUoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxyXG4gICAgICAgICAgICAgICAgZGVmaW5lczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFNBTVBMRV9GUk9NX1JUOiB0aGlzLl9zYW1wbGVGcm9tUlQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlOiB0ZWNobmlxdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIG1hdDtcclxuICAgIH1cclxufVxyXG5cclxuIl19