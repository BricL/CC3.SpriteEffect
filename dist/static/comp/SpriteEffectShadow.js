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
        return `${this.constructor.name}_${this._shadowType}_${this._sampleFromRT}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0U2hhZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL3N0YXRpYy9jb21wL1Nwcml0ZUVmZmVjdFNoYWRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBNkQ7QUFDN0QsZ0NBQStDO0FBQy9DLHlEQUFzRDtBQUV0RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUN6QyxJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDbEIsNkRBQWEsQ0FBQTtJQUNiLCtDQUFNLENBQUE7QUFDVixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFHRCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLG1DQUFnQjtJQUF4RDs7UUFvQlksZ0JBQVcsR0FBZSxVQUFVLENBQUMsYUFBYSxDQUFDO1FBc0JuRCxpQkFBWSxHQUFVLElBQUksVUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBc0I5QyxZQUFPLEdBQVMsSUFBSSxTQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBK0UvQyxDQUFDO0lBOUlHLG9CQUFvQjtJQUVwQixJQUFXLFVBQVUsQ0FBQyxHQUFlO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBRXZCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBSUQsWUFBWTtJQUdaLHFCQUFxQjtJQUVyQixJQUFXLFdBQVcsQ0FBQyxHQUFVO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBSUQsWUFBWTtJQUdaLGdCQUFnQjtJQUVoQixJQUFXLE1BQU0sQ0FBQyxHQUFTO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFJRCxZQUFZO0lBR1osa0JBQWtCO0lBQ2xCOztPQUVHO0lBQ0gsSUFBdUIsVUFBVTtRQUM3QixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7T0FFRztJQUNnQixpQkFBaUI7UUFDaEMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ2hGLENBQUM7SUFFRDs7T0FFRztJQUNnQixZQUFZLENBQUMsR0FBVyxFQUFFLFlBQW9CLEVBQUUsVUFBd0I7UUFDdkYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3RELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRWxELEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFbEQsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDdkMsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDaEQsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDaEQsdURBQXVEO1FBQ3ZELDhDQUE4QztRQUM5Qyw4Q0FBOEM7UUFDOUMsdURBQXVEO1FBQ3ZELHVEQUF1RDtRQUN2RCxXQUFXO1FBQ1gsc0RBQXNEO1FBQ3RELHNEQUFzRDtRQUN0RCxvQ0FBb0M7UUFDcEMsb0NBQW9DO1FBQ3BDLElBQUk7SUFDUixDQUFDO0lBRUQ7O09BRUc7SUFDZ0IsWUFBWTtRQUMzQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsUUFBUSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3RCLEtBQUssVUFBVSxDQUFDLGFBQWE7Z0JBQ3pCLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsTUFBTTtZQUNWLEtBQUssVUFBVSxDQUFDLE1BQU07Z0JBQ2xCLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsTUFBTTtTQUNiO1FBRUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxhQUFRLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsVUFBVSxDQUNWO1lBQ0ksV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUUsSUFBSSxDQUFDLGFBQWE7YUFDckM7WUFDRCxTQUFTLEVBQUUsU0FBUztTQUN2QixDQUNKLENBQUM7UUFDRixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSixDQUFBO0FBNUlHO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7b0RBV2hHO0FBT0Q7SUFEQyxRQUFRO3VEQUNrRDtBQU0zRDtJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztxREFVeEU7QUFPRDtJQURDLFFBQVE7d0RBQzZDO0FBTXREO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztnREFVN0Y7QUFPRDtJQURDLFFBQVE7bURBQ2tDO0FBaEVsQyxrQkFBa0I7SUFEOUIsT0FBTyxDQUFDLG9CQUFvQixDQUFDO0dBQ2pCLGtCQUFrQixDQStJOUI7QUEvSVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29sb3IsIEVudW0sIE1hdGVyaWFsLCBWZWMyIH0gZnJvbSAnY2MnO1xyXG5pbXBvcnQgeyBFRElUT1JfTk9UX0lOX1BSRVZJRVcgfSBmcm9tICdjYy9lbnYnO1xyXG5pbXBvcnQgeyBTcHJpdGVFZmZlY3RCYXNlIH0gZnJvbSAnLi9TcHJpdGVFZmZlY3RCYXNlJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XHJcbmV4cG9ydCBlbnVtIFNoYWRvd1R5cGUge1xyXG4gICAgTElNSVRFRF9CT1VORCxcclxuICAgIE5PUk1BTFxyXG59XHJcblxyXG5AY2NjbGFzcygnU3ByaXRlRWZmZWN0U2hhZG93JylcclxuZXhwb3J0IGNsYXNzIFNwcml0ZUVmZmVjdFNoYWRvdyBleHRlbmRzIFNwcml0ZUVmZmVjdEJhc2Uge1xyXG4gICAgLy8jcmVnaW9uIFNoYWRvd1R5cGVcclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdHlwZTogRW51bShTaGFkb3dUeXBlKSwgdG9vbHRpcDogXCLpmbDlvbHmqKHlvI9cIiB9KVxyXG4gICAgcHVibGljIHNldCBzaGFkb3dUeXBlKHZhbDogU2hhZG93VHlwZSkge1xyXG4gICAgICAgIHRoaXMuX3NoYWRvd1R5cGUgPSB2YWw7XHJcblxyXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMucGl4ZWxzVXNhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQodGhpcy5waXhlbHNVc2FnZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNoYWRvd1R5cGUoKTogU2hhZG93VHlwZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYWRvd1R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9zaGFkb3dUeXBlOiBTaGFkb3dUeXBlID0gU2hhZG93VHlwZS5MSU1JVEVEX0JPVU5EO1xyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuICAgIC8vI3JlZ2lvbiBTaGFkb3dDb2xvclxyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0b29sdGlwOiBcIumZsOW9semhj+iJslwiIH0pXHJcbiAgICBwdWJsaWMgc2V0IHNoYWRvd0NvbG9yKHZhbDogQ29sb3IpIHtcclxuICAgICAgICB0aGlzLl9zaGFkb3dDb2xvci5zZXQodmFsKTtcclxuXHJcbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNoYWRvd0NvbG9yKCk6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93Q29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9zaGFkb3dDb2xvcjogQ29sb3IgPSBuZXcgQ29sb3IoMCwgMCwgMCwgMS4wKTtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gT2Zmc2V0XHJcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHJhbmdlOiBbLTEsIDEsIDAuMDFdLCB0b29sdGlwOiBcIuWBj+enu+mHj1wiIH0pXHJcbiAgICBwdWJsaWMgc2V0IG9mZnNldCh2YWw6IFZlYzIpIHtcclxuICAgICAgICB0aGlzLl9vZmZzZXQuc2V0KHZhbCk7XHJcblxyXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBvZmZzZXQoKTogVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX29mZnNldDogVmVjMiA9IG5ldyBWZWMyKDAuMSwgMC4xKTtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gb3ZlcnJpZGVcclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldCBmbG9hdFVzYWdlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDEyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldEVmZmVjdFVuaW9uS2V5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY29uc3RydWN0b3IubmFtZX1fJHt0aGlzLl9zaGFkb3dUeXBlfV8ke3RoaXMuX3NhbXBsZUZyb21SVH1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVBhcmFtcyhpZHg6IG51bWJlciwgdGV4dHVyZVdpZHRoOiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuY2FsQnVmZmVySW5kZXgoaWR4LCAwLCB0ZXh0dXJlV2lkdGgpO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAwXSA9IHRoaXMuX2VmZmVjdENvbG9yLnIgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDFdID0gdGhpcy5fZWZmZWN0Q29sb3IuZyAvIDI1NTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMl0gPSB0aGlzLl9lZmZlY3RDb2xvci5iIC8gMjU1O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAzXSA9IHRoaXMuX2VmZmVjdENvbG9yLmEgLyAyNTU7XHJcblxyXG4gICAgICAgIGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDEsIHRleHR1cmVXaWR0aCk7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDRdID0gdGhpcy5fc2hhZG93Q29sb3IuciAvIDI1NTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNV0gPSB0aGlzLl9zaGFkb3dDb2xvci5nIC8gMjU1O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA2XSA9IHRoaXMuX3NoYWRvd0NvbG9yLmIgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDddID0gdGhpcy5fc2hhZG93Q29sb3IuYSAvIDI1NTtcclxuXHJcbiAgICAgICAgaW5kZXggPSB0aGlzLmNhbEJ1ZmZlckluZGV4KGlkeCwgMiwgdGV4dHVyZVdpZHRoKTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgOF0gPSB0aGlzLl9vZmZzZXQueDtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgOV0gPSB0aGlzLl9vZmZzZXQueTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTBdID0gdGhpcy5fb2Zmc2V0LnggKiAxMDAuMDtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTFdID0gdGhpcy5fb2Zmc2V0LnkgKiAxMDAuMDtcclxuICAgICAgICAvLyBpZiAodGhpcy5fc2hhZG93VHlwZSA9PT0gU2hhZG93VHlwZS5MSU1JVEVEX0JPVU5EKSB7XHJcbiAgICAgICAgLy8gICAgIHByb3BCdWZmZXJbaW5kZXggKyA4XSA9IHRoaXMuX29mZnNldC54O1xyXG4gICAgICAgIC8vICAgICBwcm9wQnVmZmVyW2luZGV4ICsgOV0gPSB0aGlzLl9vZmZzZXQueTtcclxuICAgICAgICAvLyAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDEwXSA9IHRoaXMuX29mZnNldC54ICogMTAwLjA7XHJcbiAgICAgICAgLy8gICAgIHByb3BCdWZmZXJbaW5kZXggKyAxMV0gPSB0aGlzLl9vZmZzZXQueSAqIDEwMC4wO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIHByb3BCdWZmZXJbaW5kZXggKyA4XSA9IHRoaXMuX29mZnNldC54ICogMTAwLjA7XHJcbiAgICAgICAgLy8gICAgIHByb3BCdWZmZXJbaW5kZXggKyA5XSA9IHRoaXMuX29mZnNldC55ICogMTAwLjA7XHJcbiAgICAgICAgLy8gICAgIHByb3BCdWZmZXJbaW5kZXggKyAxMF0gPSAwLjA7XHJcbiAgICAgICAgLy8gICAgIHByb3BCdWZmZXJbaW5kZXggKyAxMV0gPSAxLjA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGluaXRNYXRlcmlhbCgpOiBNYXRlcmlhbCB7XHJcbiAgICAgICAgbGV0IHRlY2huaXF1ZSA9IDA7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9zaGFkb3dUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2hhZG93VHlwZS5MSU1JVEVEX0JPVU5EOlxyXG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNoYWRvd1R5cGUuTk9STUFMOlxyXG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1hdCA9IG5ldyBNYXRlcmlhbCgpO1xyXG4gICAgICAgIG1hdC5pbml0aWFsaXplKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RBc3NldDogdGhpcy5lZmZlY3RBc3NldCxcclxuICAgICAgICAgICAgICAgIGRlZmluZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBTQU1QTEVfRlJPTV9SVDogdGhpcy5fc2FtcGxlRnJvbVJULFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRlY2huaXF1ZTogdGVjaG5pcXVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==