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
        return `${this.constructor.name}_${this._shadowType}`;
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
            defines: {},
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0U2hhZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL3N0YXRpYy9jb21wL1Nwcml0ZUVmZmVjdFNoYWRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBNkQ7QUFDN0QsZ0NBQW9EO0FBQ3BELHlEQUFzRDtBQUV0RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUN6QyxJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDbEIsNkRBQWEsQ0FBQTtJQUNiLCtDQUFNLENBQUE7QUFDVixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFHRCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLG1DQUFnQjtJQUF4RDs7UUFtQlksZ0JBQVcsR0FBZSxVQUFVLENBQUMsYUFBYSxDQUFDO1FBc0JuRCxpQkFBWSxHQUFVLElBQUksVUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBc0I5QyxZQUFPLEdBQVMsSUFBSSxTQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBNkUvQyxDQUFDO0lBM0lHLG9CQUFvQjtJQUVwQixJQUFXLFVBQVUsQ0FBQyxHQUFlO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBRXZCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQU07WUFDSCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBSUQsWUFBWTtJQUdaLHFCQUFxQjtJQUVyQixJQUFXLFdBQVcsQ0FBQyxHQUFVO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBSUQsWUFBWTtJQUdaLGdCQUFnQjtJQUVoQixJQUFXLE1BQU0sQ0FBQyxHQUFTO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFJRCxZQUFZO0lBR1osa0JBQWtCO0lBQ2xCOztPQUVHO0lBQ0gsSUFBdUIsVUFBVTtRQUM3QixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7T0FFRztJQUNnQixpQkFBaUI7UUFDaEMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7O09BRUc7SUFDZ0IsWUFBWSxDQUFDLEdBQVcsRUFBRSxZQUFvQixFQUFFLFVBQXdCO1FBQ3ZGLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN0RCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUVsRCxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRWxELEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN2QyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hELFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2hELHVEQUF1RDtRQUN2RCw4Q0FBOEM7UUFDOUMsOENBQThDO1FBQzlDLHVEQUF1RDtRQUN2RCx1REFBdUQ7UUFDdkQsV0FBVztRQUNYLHNEQUFzRDtRQUN0RCxzREFBc0Q7UUFDdEQsb0NBQW9DO1FBQ3BDLG9DQUFvQztRQUNwQyxJQUFJO0lBQ1IsQ0FBQztJQUVEOztPQUVHO0lBQ2dCLFlBQVk7UUFDM0IsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN0QixLQUFLLFVBQVUsQ0FBQyxhQUFhO2dCQUN6QixTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLE1BQU07WUFDVixLQUFLLFVBQVUsQ0FBQyxNQUFNO2dCQUNsQixTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLE1BQU07U0FDYjtRQUVELElBQUksR0FBRyxHQUFHLElBQUksYUFBUSxFQUFFLENBQUM7UUFDekIsR0FBRyxDQUFDLFVBQVUsQ0FDVjtZQUNJLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixPQUFPLEVBQUUsRUFBRTtZQUNYLFNBQVMsRUFBRSxTQUFTO1NBQ3ZCLENBQ0osQ0FBQztRQUNGLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUE7QUF6SUc7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztvREFVaEc7QUFPRDtJQURDLFFBQVE7dURBQ2tEO0FBTTNEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO3FEQVV4RTtBQU9EO0lBREMsUUFBUTt3REFDNkM7QUFNdEQ7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO2dEQVU3RjtBQU9EO0lBREMsUUFBUTttREFDa0M7QUEvRGxDLGtCQUFrQjtJQUQ5QixPQUFPLENBQUMsb0JBQW9CLENBQUM7R0FDakIsa0JBQWtCLENBNEk5QjtBQTVJWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb2xvciwgRW51bSwgTWF0ZXJpYWwsIFZlYzIgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBERVYsIEVESVRPUl9OT1RfSU5fUFJFVklFVyB9IGZyb20gJ2NjL2Vudic7XG5pbXBvcnQgeyBTcHJpdGVFZmZlY3RCYXNlIH0gZnJvbSAnLi9TcHJpdGVFZmZlY3RCYXNlJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcbmV4cG9ydCBlbnVtIFNoYWRvd1R5cGUge1xuICAgIExJTUlURURfQk9VTkQsXG4gICAgTk9STUFMXG59XG5cbkBjY2NsYXNzKCdTcHJpdGVFZmZlY3RTaGFkb3cnKVxuZXhwb3J0IGNsYXNzIFNwcml0ZUVmZmVjdFNoYWRvdyBleHRlbmRzIFNwcml0ZUVmZmVjdEJhc2Uge1xuICAgIC8vI3JlZ2lvbiBTaGFkb3dUeXBlXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0eXBlOiBFbnVtKFNoYWRvd1R5cGUpLCB0b29sdGlwOiBcIumZsOW9seaooeW8j1wiIH0pXG4gICAgcHVibGljIHNldCBzaGFkb3dUeXBlKHZhbDogU2hhZG93VHlwZSkge1xuICAgICAgICB0aGlzLl9zaGFkb3dUeXBlID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdCh0aGlzLnBpeGVsc1VzYWdlKTtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNoYWRvd1R5cGUoKTogU2hhZG93VHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFkb3dUeXBlO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX3NoYWRvd1R5cGU6IFNoYWRvd1R5cGUgPSBTaGFkb3dUeXBlLkxJTUlURURfQk9VTkQ7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBTaGFkb3dDb2xvclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdG9vbHRpcDogXCLpmbDlvbHpoY/oibJcIiB9KVxuICAgIHB1YmxpYyBzZXQgc2hhZG93Q29sb3IodmFsOiBDb2xvcikge1xuICAgICAgICB0aGlzLl9zaGFkb3dDb2xvci5zZXQodmFsKTtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzaGFkb3dDb2xvcigpOiBDb2xvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFkb3dDb2xvcjtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9zaGFkb3dDb2xvcjogQ29sb3IgPSBuZXcgQ29sb3IoMCwgMCwgMCwgMS4wKTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIE9mZnNldFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgcmFuZ2U6IFstMSwgMSwgMC4wMV0sIHRvb2x0aXA6IFwi5YGP56e76YePXCIgfSlcbiAgICBwdWJsaWMgc2V0IG9mZnNldCh2YWw6IFZlYzIpIHtcbiAgICAgICAgdGhpcy5fb2Zmc2V0LnNldCh2YWwpO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG9mZnNldCgpOiBWZWMyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNldDtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9vZmZzZXQ6IFZlYzIgPSBuZXcgVmVjMigwLjEsIDAuMSk7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBvdmVycmlkZVxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldCBmbG9hdFVzYWdlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAxMjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBnZXRFZmZlY3RVbmlvbktleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfV8ke3RoaXMuX3NoYWRvd1R5cGV9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVQYXJhbXMoaWR4OiBudW1iZXIsIHRleHR1cmVXaWR0aDogbnVtYmVyLCBwcm9wQnVmZmVyOiBGbG9hdDMyQXJyYXkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDAsIHRleHR1cmVXaWR0aCk7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAwXSA9IHRoaXMuX2VmZmVjdENvbG9yLnIgLyAyNTU7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxXSA9IHRoaXMuX2VmZmVjdENvbG9yLmcgLyAyNTU7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAyXSA9IHRoaXMuX2VmZmVjdENvbG9yLmIgLyAyNTU7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAzXSA9IHRoaXMuX2VmZmVjdENvbG9yLmEgLyAyNTU7XG5cbiAgICAgICAgaW5kZXggPSB0aGlzLmNhbEJ1ZmZlckluZGV4KGlkeCwgMSwgdGV4dHVyZVdpZHRoKTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDRdID0gdGhpcy5fc2hhZG93Q29sb3IuciAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDVdID0gdGhpcy5fc2hhZG93Q29sb3IuZyAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDZdID0gdGhpcy5fc2hhZG93Q29sb3IuYiAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDddID0gdGhpcy5fc2hhZG93Q29sb3IuYSAvIDI1NTtcblxuICAgICAgICBpbmRleCA9IHRoaXMuY2FsQnVmZmVySW5kZXgoaWR4LCAyLCB0ZXh0dXJlV2lkdGgpO1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgOF0gPSB0aGlzLl9vZmZzZXQueDtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDldID0gdGhpcy5fb2Zmc2V0Lnk7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxMF0gPSB0aGlzLl9vZmZzZXQueCAqIDEwMC4wO1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTFdID0gdGhpcy5fb2Zmc2V0LnkgKiAxMDAuMDtcbiAgICAgICAgLy8gaWYgKHRoaXMuX3NoYWRvd1R5cGUgPT09IFNoYWRvd1R5cGUuTElNSVRFRF9CT1VORCkge1xuICAgICAgICAvLyAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDhdID0gdGhpcy5fb2Zmc2V0Lng7XG4gICAgICAgIC8vICAgICBwcm9wQnVmZmVyW2luZGV4ICsgOV0gPSB0aGlzLl9vZmZzZXQueTtcbiAgICAgICAgLy8gICAgIHByb3BCdWZmZXJbaW5kZXggKyAxMF0gPSB0aGlzLl9vZmZzZXQueCAqIDEwMC4wO1xuICAgICAgICAvLyAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDExXSA9IHRoaXMuX29mZnNldC55ICogMTAwLjA7XG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICBwcm9wQnVmZmVyW2luZGV4ICsgOF0gPSB0aGlzLl9vZmZzZXQueCAqIDEwMC4wO1xuICAgICAgICAvLyAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDldID0gdGhpcy5fb2Zmc2V0LnkgKiAxMDAuMDtcbiAgICAgICAgLy8gICAgIHByb3BCdWZmZXJbaW5kZXggKyAxMF0gPSAwLjA7XG4gICAgICAgIC8vICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTFdID0gMS4wO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5pdE1hdGVyaWFsKCk6IE1hdGVyaWFsIHtcbiAgICAgICAgbGV0IHRlY2huaXF1ZSA9IDA7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fc2hhZG93VHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTaGFkb3dUeXBlLkxJTUlURURfQk9VTkQ6XG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU2hhZG93VHlwZS5OT1JNQUw6XG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtYXQgPSBuZXcgTWF0ZXJpYWwoKTtcbiAgICAgICAgbWF0LmluaXRpYWxpemUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWZmZWN0QXNzZXQ6IHRoaXMuZWZmZWN0QXNzZXQsXG4gICAgICAgICAgICAgICAgZGVmaW5lczoge30sXG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlOiB0ZWNobmlxdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG1hdDtcbiAgICB9XG59XG5cbiJdfQ==