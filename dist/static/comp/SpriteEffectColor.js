"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectColor = exports.BlurMode = exports.ColorMode = exports.ToneMode = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
var ToneMode;
(function (ToneMode) {
    ToneMode[ToneMode["GRAY"] = 0] = "GRAY";
    ToneMode[ToneMode["NEGA"] = 1] = "NEGA";
    ToneMode[ToneMode["SEPIA"] = 2] = "SEPIA";
    ToneMode[ToneMode["NORMAL"] = 3] = "NORMAL";
})(ToneMode = exports.ToneMode || (exports.ToneMode = {}));
var ColorMode;
(function (ColorMode) {
    ColorMode[ColorMode["ADD"] = 0] = "ADD";
    ColorMode[ColorMode["SUB"] = 1] = "SUB";
    ColorMode[ColorMode["FILL"] = 2] = "FILL";
    ColorMode[ColorMode["MULT"] = 3] = "MULT";
})(ColorMode = exports.ColorMode || (exports.ColorMode = {}));
var BlurMode;
(function (BlurMode) {
    BlurMode[BlurMode["NONE"] = 0] = "NONE";
    BlurMode[BlurMode["GAUSSIAN"] = 1] = "GAUSSIAN";
})(BlurMode = exports.BlurMode || (exports.BlurMode = {}));
let SpriteEffectColor = class SpriteEffectColor extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this._toneMode = ToneMode.NORMAL;
        this._toneFactor = 1.0;
        this._colorMode = ColorMode.MULT;
        this._colorFactor = 1.0;
        this._blurMode = BlurMode.NONE;
        this._blurFactor = 1.0;
    }
    //#region toneMode
    set toneMode(val) {
        this._toneMode = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get toneMode() {
        return this._toneMode;
    }
    //#endregion
    //#region toneFactor
    set toneFactor(val) {
        this._toneFactor = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get toneFactor() {
        return this._toneFactor;
    }
    //#endregion
    //#region colorMode
    set colorMode(val) {
        this._colorMode = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get colorMode() {
        return this._colorMode;
    }
    //#endregion
    //#region colorFactor
    set colorFactor(val) {
        this._colorFactor = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get colorFactor() {
        return this._colorFactor;
    }
    //#endregion
    //#region blurMode
    set blurMode(val) {
        this._blurMode = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.init(this.pixelsUsage);
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get blurMode() {
        return this._blurMode;
    }
    //#endregion
    //#region blurFactor
    set blurFactor(val) {
        this._blurFactor = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get blurFactor() {
        return this._blurFactor;
    }
    //#endregion
    //#region override
    get floatUsage() {
        return 13;
    }
    getEffectUnionKey() {
        const unionKey = `${this.constructor.name}_${this._is2Din3D}_${this._toneMode}_${this._colorMode}_${this._blurMode}`;
        return unionKey;
    }
    /**
     * @override SpriteEffectBase
     */
    updateParams(idx, textureWidth, propBuffer) {
        const baseUV = this.getUV(this.spriteFrame.uv);
        let blurTextureSize = new cc_1.Vec2(100, 100);
        if (this.spriteFrame) {
            blurTextureSize.x = Math.floor(this.spriteFrame.width * baseUV.z);
            blurTextureSize.y = Math.floor(this.spriteFrame.height * baseUV.w);
        }
        else {
            blurTextureSize.x = this.node.getComponent(cc_1.UITransform).contentSize.width;
            blurTextureSize.y = this.node.getComponent(cc_1.UITransform).contentSize.height;
        }
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
        propBuffer[index + 8] = blurTextureSize.x;
        propBuffer[index + 9] = blurTextureSize.y;
        propBuffer[index + 10] = 0.0;
        propBuffer[index + 11] = 1.0;
        index = this.calBufferIndex(idx, 3, textureWidth);
        propBuffer[index + 12] = this.toneFactor;
        propBuffer[index + 13] = this.colorFactor;
        propBuffer[index + 14] = this.blurFactor;
        propBuffer[index + 15] = 1.0;
    }
    /**
     * @override SpriteEffectBase
     */
    initMaterial() {
        let mat = new cc_1.Material();
        let define_macro = {
            USE_BLUR: false,
            IS_GRAY: false,
            IS_NEGA: false,
            IS_SEPIA: false,
            IS_ADD: false,
            IS_SUB: false,
            IS_FILL: false,
            IS_MULT: true
        };
        switch (this._toneMode) {
            case ToneMode.GRAY:
                define_macro.IS_GRAY = true;
                break;
            case ToneMode.NEGA:
                define_macro.IS_NEGA = true;
                break;
            case ToneMode.SEPIA:
                define_macro.IS_SEPIA = true;
                break;
        }
        ;
        switch (this._colorMode) {
            case ColorMode.ADD:
                define_macro.IS_ADD = true;
                break;
            case ColorMode.SUB:
                define_macro.IS_SUB = true;
                break;
            case ColorMode.FILL:
                define_macro.IS_FILL = true;
                break;
            case ColorMode.MULT:
                define_macro.IS_MULT = true;
                break;
        }
        switch (this._blurMode) {
            case BlurMode.NONE:
                define_macro.USE_BLUR = false;
                break;
            case BlurMode.GAUSSIAN:
                define_macro.USE_BLUR = true;
                break;
        }
        mat.initialize({
            effectAsset: this.effectAsset,
            defines: define_macro,
            technique: this._is2Din3D ? 1 : 0
        });
        return mat;
    }
};
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Enum(ToneMode), tooltip: "色調模式" })
], SpriteEffectColor.prototype, "toneMode", null);
__decorate([
    property({ type: cc_1.Enum(ToneMode) })
], SpriteEffectColor.prototype, "_toneMode", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "色調程度" })
], SpriteEffectColor.prototype, "toneFactor", null);
__decorate([
    property
], SpriteEffectColor.prototype, "_toneFactor", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Enum(ColorMode), tooltip: "顏色模式" })
], SpriteEffectColor.prototype, "colorMode", null);
__decorate([
    property({ type: cc_1.Enum(ColorMode) })
], SpriteEffectColor.prototype, "_colorMode", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "顏色程度" })
], SpriteEffectColor.prototype, "colorFactor", null);
__decorate([
    property
], SpriteEffectColor.prototype, "_colorFactor", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Enum(BlurMode), tooltip: "模糊模式" })
], SpriteEffectColor.prototype, "blurMode", null);
__decorate([
    property({ type: cc_1.Enum(BlurMode) })
], SpriteEffectColor.prototype, "_blurMode", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: "模糊程度" })
], SpriteEffectColor.prototype, "blurFactor", null);
__decorate([
    property
], SpriteEffectColor.prototype, "_blurFactor", void 0);
SpriteEffectColor = __decorate([
    ccclass('SpriteEffectColor')
], SpriteEffectColor);
exports.SpriteEffectColor = SpriteEffectColor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0Q29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2Uvc3RhdGljL2NvbXAvU3ByaXRlRWZmZWN0Q29sb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQW1GO0FBQ25GLGdDQUErQztBQUMvQyx5REFBc0Q7QUFFdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxlQUFVLENBQUM7QUFFekMsSUFBWSxRQUtYO0FBTEQsV0FBWSxRQUFRO0lBQ2hCLHVDQUFJLENBQUE7SUFDSix1Q0FBSSxDQUFBO0lBQ0oseUNBQUssQ0FBQTtJQUNMLDJDQUFNLENBQUE7QUFDVixDQUFDLEVBTFcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFLbkI7QUFFRCxJQUFZLFNBS1g7QUFMRCxXQUFZLFNBQVM7SUFDakIsdUNBQUcsQ0FBQTtJQUNILHVDQUFHLENBQUE7SUFDSCx5Q0FBSSxDQUFBO0lBQ0oseUNBQUksQ0FBQTtBQUNSLENBQUMsRUFMVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUtwQjtBQUVELElBQVksUUFHWDtBQUhELFdBQVksUUFBUTtJQUNoQix1Q0FBSSxDQUFBO0lBQ0osK0NBQVEsQ0FBQTtBQUNaLENBQUMsRUFIVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUduQjtBQUdELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsbUNBQWdCO0lBQXZEOztRQW1CWSxjQUFTLEdBQWEsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQW9CdEMsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFxQjFCLGVBQVUsR0FBYyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBb0J2QyxpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQXFCM0IsY0FBUyxHQUFhLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFvQnBDLGdCQUFXLEdBQVcsR0FBRyxDQUFDO0lBbUh0QyxDQUFD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Q0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRWxELEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNqQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDakMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRWpDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUMxQyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM3QixVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUU3QixLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFlB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Q0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzttREFTOUc7QUFPRDtJQURDLFFBQVE7c0RBQ3lCO0FBekh6QixpQkFBaUI7SUFEN0IsT0FBTyxDQUFDLG1CQUFtQixDQUFDO0dBQ2hCLGlCQUFpQixDQTRPN0I7QUE1T1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciwgRW51bSwgbG9nLCBNYXRlcmlhbCwgVGV4dHVyZTJELCBVSVRyYW5zZm9ybSwgVmVjMiB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVESVRPUl9OT1RfSU5fUFJFVklFVyB9IGZyb20gJ2NjL2Vudic7XG5pbXBvcnQgeyBTcHJpdGVFZmZlY3RCYXNlIH0gZnJvbSAnLi9TcHJpdGVFZmZlY3RCYXNlJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuZXhwb3J0IGVudW0gVG9uZU1vZGUge1xuICAgIEdSQVksXG4gICAgTkVHQSxcbiAgICBTRVBJQSxcbiAgICBOT1JNQUxcbn1cblxuZXhwb3J0IGVudW0gQ29sb3JNb2RlIHtcbiAgICBBREQsXG4gICAgU1VCLFxuICAgIEZJTEwsXG4gICAgTVVMVFxufVxuXG5leHBvcnQgZW51bSBCbHVyTW9kZSB7XG4gICAgTk9ORSxcbiAgICBHQVVTU0lBTlxufVxuXG5AY2NjbGFzcygnU3ByaXRlRWZmZWN0Q29sb3InKVxuZXhwb3J0IGNsYXNzIFNwcml0ZUVmZmVjdENvbG9yIGV4dGVuZHMgU3ByaXRlRWZmZWN0QmFzZSB7XG4gICAgLy8jcmVnaW9uIHRvbmVNb2RlXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0eXBlOiBFbnVtKFRvbmVNb2RlKSwgdG9vbHRpcDogXCLoibLoqr/mqKHlvI9cIiB9KVxuICAgIHB1YmxpYyBzZXQgdG9uZU1vZGUodmFsOiBUb25lTW9kZSkge1xuICAgICAgICB0aGlzLl90b25lTW9kZSA9IHZhbDtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLmluaXQodGhpcy5waXhlbHNVc2FnZSk7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB0b25lTW9kZSgpOiBUb25lTW9kZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b25lTW9kZTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBFbnVtKFRvbmVNb2RlKSB9KVxuICAgIHByaXZhdGUgX3RvbmVNb2RlOiBUb25lTW9kZSA9IFRvbmVNb2RlLk5PUk1BTDtcbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiB0b25lRmFjdG9yXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogXCLoibLoqr/nqIvluqZcIiB9KVxuICAgIHB1YmxpYyBzZXQgdG9uZUZhY3Rvcih2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90b25lRmFjdG9yID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRvbmVGYWN0b3IoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvbmVGYWN0b3I7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfdG9uZUZhY3RvcjogbnVtYmVyID0gMS4wO1xuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uIGNvbG9yTW9kZVxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdHlwZTogRW51bShDb2xvck1vZGUpLCB0b29sdGlwOiBcIumhj+iJsuaooeW8j1wiIH0pXG4gICAgcHVibGljIHNldCBjb2xvck1vZGUodmFsOiBDb2xvck1vZGUpIHtcbiAgICAgICAgdGhpcy5fY29sb3JNb2RlID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdCh0aGlzLnBpeGVsc1VzYWdlKTtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNvbG9yTW9kZSgpOiBDb2xvck1vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3JNb2RlO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEVudW0oQ29sb3JNb2RlKSB9KVxuICAgIHByaXZhdGUgX2NvbG9yTW9kZTogQ29sb3JNb2RlID0gQ29sb3JNb2RlLk1VTFQ7XG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gY29sb3JGYWN0b3JcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEsIDAuMDFdLCB0b29sdGlwOiBcIumhj+iJsueoi+W6plwiIH0pXG4gICAgcHVibGljIHNldCBjb2xvckZhY3Rvcih2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9jb2xvckZhY3RvciA9IHZhbDtcblxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjb2xvckZhY3RvcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3JGYWN0b3I7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfY29sb3JGYWN0b3I6IG51bWJlciA9IDEuMDtcbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiBibHVyTW9kZVxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgdHlwZTogRW51bShCbHVyTW9kZSksIHRvb2x0aXA6IFwi5qih57OK5qih5byPXCIgfSlcbiAgICBwdWJsaWMgc2V0IGJsdXJNb2RlKHZhbDogQmx1ck1vZGUpIHtcbiAgICAgICAgdGhpcy5fYmx1ck1vZGUgPSB2YWw7XG5cbiAgICAgICAgaWYgKEVESVRPUl9OT1RfSU5fUFJFVklFVykge1xuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMucGl4ZWxzVXNhZ2UpO1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlZmxhc2hQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYmx1ck1vZGUoKTogQmx1ck1vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmx1ck1vZGU7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogRW51bShCbHVyTW9kZSkgfSlcbiAgICBwcml2YXRlIF9ibHVyTW9kZTogQmx1ck1vZGUgPSBCbHVyTW9kZS5OT05FO1xuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uIGJsdXJGYWN0b3JcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgMS4wLCAwLjAxXSwgdG9vbHRpcDogXCLmqKHns4rnqIvluqZcIiB9KVxuICAgIHB1YmxpYyBzZXQgYmx1ckZhY3Rvcih2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9ibHVyRmFjdG9yID0gdmFsO1xuXG4gICAgICAgIGlmIChFRElUT1JfTk9UX0lOX1BSRVZJRVcpIHtcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGJsdXJGYWN0b3IoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JsdXJGYWN0b3I7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfYmx1ckZhY3RvcjogbnVtYmVyID0gMS4wO1xuICAgIC8vI2VuZHJlZ2lvblxuXG5cbiAgICAvLyNyZWdpb24gb3ZlcnJpZGVcbiAgICBwcm90ZWN0ZWQgZ2V0IGZsb2F0VXNhZ2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDEzO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRFZmZlY3RVbmlvbktleSgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB1bmlvbktleSA9IGAke3RoaXMuY29uc3RydWN0b3IubmFtZX1fJHt0aGlzLl9pczJEaW4zRH1fJHt0aGlzLl90b25lTW9kZX1fJHt0aGlzLl9jb2xvck1vZGV9XyR7dGhpcy5fYmx1ck1vZGV9YDtcbiAgICAgICAgcmV0dXJuIHVuaW9uS2V5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVBhcmFtcyhpZHg6IG51bWJlciwgdGV4dHVyZVdpZHRoOiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQge1xuICAgICAgICBjb25zdCBiYXNlVVYgPSB0aGlzLmdldFVWKHRoaXMuc3ByaXRlRnJhbWUhLnV2KTtcblxuICAgICAgICBsZXQgYmx1clRleHR1cmVTaXplID0gbmV3IFZlYzIoMTAwLCAxMDApO1xuICAgICAgICBpZiAodGhpcy5zcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgYmx1clRleHR1cmVTaXplLnggPSBNYXRoLmZsb29yKHRoaXMuc3ByaXRlRnJhbWUud2lkdGggKiBiYXNlVVYueik7XG4gICAgICAgICAgICBibHVyVGV4dHVyZVNpemUueSA9IE1hdGguZmxvb3IodGhpcy5zcHJpdGVGcmFtZS5oZWlnaHQgKiBiYXNlVVYudyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBibHVyVGV4dHVyZVNpemUueCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoVUlUcmFuc2Zvcm0pIS5jb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgICAgIGJsdXJUZXh0dXJlU2l6ZS55ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChVSVRyYW5zZm9ybSkhLmNvbnRlbnRTaXplLmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuY2FsQnVmZmVySW5kZXgoaWR4LCAwLCB0ZXh0dXJlV2lkdGgpO1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMF0gPSB0aGlzLl9lZmZlY3RDb2xvci5yIC8gMjU1O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMV0gPSB0aGlzLl9lZmZlY3RDb2xvci5nIC8gMjU1O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMl0gPSB0aGlzLl9lZmZlY3RDb2xvci5iIC8gMjU1O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgM10gPSB0aGlzLl9lZmZlY3RDb2xvci5hIC8gMjU1O1xuXG4gICAgICAgIGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDEsIHRleHR1cmVXaWR0aCk7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA0XSA9IGJhc2VVVi54O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgNV0gPSBiYXNlVVYueTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDZdID0gYmFzZVVWLno7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA3XSA9IGJhc2VVVi53O1xuXG4gICAgICAgIGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDIsIHRleHR1cmVXaWR0aCk7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA4XSA9IGJsdXJUZXh0dXJlU2l6ZS54O1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgOV0gPSBibHVyVGV4dHVyZVNpemUueTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDEwXSA9IDAuMDtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDExXSA9IDEuMDtcblxuICAgICAgICBpbmRleCA9IHRoaXMuY2FsQnVmZmVySW5kZXgoaWR4LCAzLCB0ZXh0dXJlV2lkdGgpO1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTJdID0gdGhpcy50b25lRmFjdG9yO1xuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTNdID0gdGhpcy5jb2xvckZhY3RvcjtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDE0XSA9IHRoaXMuYmx1ckZhY3RvcjtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDE1XSA9IDEuMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBpbml0TWF0ZXJpYWwoKTogTWF0ZXJpYWwge1xuICAgICAgICBsZXQgbWF0ID0gbmV3IE1hdGVyaWFsKCk7XG4gICAgICAgIGxldCBkZWZpbmVfbWFjcm8gPSB7XG4gICAgICAgICAgICBVU0VfQkxVUjogZmFsc2UsXG4gICAgICAgICAgICBJU19HUkFZOiBmYWxzZSxcbiAgICAgICAgICAgIElTX05FR0E6IGZhbHNlLFxuICAgICAgICAgICAgSVNfU0VQSUE6IGZhbHNlLFxuICAgICAgICAgICAgSVNfQUREOiBmYWxzZSxcbiAgICAgICAgICAgIElTX1NVQjogZmFsc2UsXG4gICAgICAgICAgICBJU19GSUxMOiBmYWxzZSxcbiAgICAgICAgICAgIElTX01VTFQ6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuX3RvbmVNb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFRvbmVNb2RlLkdSQVk6XG4gICAgICAgICAgICAgICAgZGVmaW5lX21hY3JvLklTX0dSQVkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUb25lTW9kZS5ORUdBOlxuICAgICAgICAgICAgICAgIGRlZmluZV9tYWNyby5JU19ORUdBID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVG9uZU1vZGUuU0VQSUE6XG4gICAgICAgICAgICAgICAgZGVmaW5lX21hY3JvLklTX1NFUElBID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2NvbG9yTW9kZSkge1xuICAgICAgICAgICAgY2FzZSBDb2xvck1vZGUuQUREOlxuICAgICAgICAgICAgICAgIGRlZmluZV9tYWNyby5JU19BREQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDb2xvck1vZGUuU1VCOlxuICAgICAgICAgICAgICAgIGRlZmluZV9tYWNyby5JU19TVUIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDb2xvck1vZGUuRklMTDpcbiAgICAgICAgICAgICAgICBkZWZpbmVfbWFjcm8uSVNfRklMTCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENvbG9yTW9kZS5NVUxUOlxuICAgICAgICAgICAgICAgIGRlZmluZV9tYWNyby5JU19NVUxUID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAodGhpcy5fYmx1ck1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgQmx1ck1vZGUuTk9ORTpcbiAgICAgICAgICAgICAgICBkZWZpbmVfbWFjcm8uVVNFX0JMVVIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQmx1ck1vZGUuR0FVU1NJQU46XG4gICAgICAgICAgICAgICAgZGVmaW5lX21hY3JvLlVTRV9CTFVSID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIG1hdC5pbml0aWFsaXplKHtcbiAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxuICAgICAgICAgICAgZGVmaW5lczogZGVmaW5lX21hY3JvLFxuICAgICAgICAgICAgdGVjaG5pcXVlOiB0aGlzLl9pczJEaW4zRCA/IDEgOiAwXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBtYXQ7XG4gICAgfVxufSJdfQ==