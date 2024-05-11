"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectDissolve = void 0;
const cc_1 = require("cc");
const EffectBase_1 = require("./EffectBase");
const cc_2 = require("cc");
const cc_3 = require("cc");
const cc_4 = require("cc");
const cc_5 = require("cc");
const cc_6 = require("cc");
const { ccclass, property } = cc_1._decorator;
let EffectDissolve = class EffectDissolve extends EffectBase_1.EffectBase {
    constructor() {
        super(...arguments);
        this.noiseTexture = null;
        this._dissolveColor = new cc_2.Color(0, 0, 0, 1);
        this._factor = 0.5;
        this._softness = 0.1;
        this._width = 0.1;
        //#endregion
        this.play = true;
        this.duration = 1.0;
        this.loop = true;
        this.loop_delay = 0.0;
    }
    //#region dissolveColor
    get dissolveColor() {
        return this._dissolveColor;
    }
    set dissolveColor(val) {
        this._dissolveColor.set(val);
        this._setParamsDirty('_dissolveColor');
    }
    //#endregion
    //#region effectFactor
    get factor() {
        return this._factor;
    }
    set factor(val) {
        this._factor = val;
        this._setParamsDirty('_factor');
    }
    //#endregion
    //#region softness
    get softness() {
        return this._softness;
    }
    set softness(val) {
        this._softness = val;
        this._setParamsDirty('_softness');
    }
    //#endregion
    //#region width
    get width() {
        return this._width;
    }
    set width(val) {
        this._width = val;
        this._setParamsDirty('_width');
    }
    _instMaterial() {
        if (this.effectAsset) {
            let mat = new cc_4.Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                technique: this._is2Din3D ? 1 : 0
            });
            mat.setProperty('_noisetex', this.noiseTexture);
            this._setParams('_dissolveColor', mat.passes[0].getHandle('_dissolveColor'));
            this._setParams('_factor', mat.passes[0].getHandle('_factor'));
            this._setParams('_softness', mat.passes[0].getHandle('_softness'));
            this._setParams('_width', mat.passes[0].getHandle('_width'));
            this._sprite.customMaterial = mat;
            if (this.play) {
                setTimeout(() => {
                    this._play();
                }, 10);
            }
        }
    }
    _updateParams(key, idx) {
        var _a, _b, _c, _d;
        if (key === '_dissolveColor') {
            (_a = this._sprite.material) === null || _a === void 0 ? void 0 : _a.passes[0].setUniform(idx, this._dissolveColor);
        }
        else if (key === '_factor') {
            (_b = this._sprite.material) === null || _b === void 0 ? void 0 : _b.passes[0].setUniform(idx, this._factor);
        }
        else if (key === '_softness') {
            (_c = this._sprite.material) === null || _c === void 0 ? void 0 : _c.passes[0].setUniform(idx, this._softness);
        }
        else if (key === '_width') {
            (_d = this._sprite.material) === null || _d === void 0 ? void 0 : _d.passes[0].setUniform(idx, this._width);
        }
    }
    _play() {
        let tweenTarget = { factor: 0.0 };
        cc_6.tween(tweenTarget).to(this.duration, { factor: 1.0 }, {
            onUpdate: () => {
                this.factor = tweenTarget.factor;
            },
            onComplete: () => {
                if (this.loop) {
                    this.scheduleOnce(() => {
                        this._play();
                    }, this.loop_delay);
                }
            }
        }).start();
    }
};
__decorate([
    property({ type: cc_3.Texture2D, tooltip: "指定噪聲貼圖" })
], EffectDissolve.prototype, "noiseTexture", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, tooltip: "溶解顏色" })
], EffectDissolve.prototype, "dissolveColor", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, tooltip: "溶解顏色", visible: true })
], EffectDissolve.prototype, "_dissolveColor", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "溶解程度" })
], EffectDissolve.prototype, "factor", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "溶解程度", visible: true })
], EffectDissolve.prototype, "_factor", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "柔邊程度" })
], EffectDissolve.prototype, "softness", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "柔邊程度", visible: true })
], EffectDissolve.prototype, "_softness", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "溶解寬度" })
], EffectDissolve.prototype, "width", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0, 1, 0.01], tooltip: "溶解寬度", visible: true })
], EffectDissolve.prototype, "_width", void 0);
__decorate([
    property({ group: { name: "Anim", id: "2" }, tooltip: '是否自動撥放' })
], EffectDissolve.prototype, "play", void 0);
__decorate([
    property({ group: { name: "Anim", id: "2" }, type: cc_5.CCFloat, slide: true, range: [0.01, 10, 0.01], tooltip: '持续时间' })
], EffectDissolve.prototype, "duration", void 0);
__decorate([
    property({ group: { name: "Anim", id: "2" }, tooltip: '是否循环' })
], EffectDissolve.prototype, "loop", void 0);
__decorate([
    property({ group: { name: "Anim", id: "2" }, type: cc_5.CCFloat, slide: true, range: [0, 10, 0.1], tooltip: '循环间隔' })
], EffectDissolve.prototype, "loop_delay", void 0);
EffectDissolve = __decorate([
    ccclass('EffectDissolve')
], EffectDissolve);
exports.EffectDissolve = EffectDissolve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0RGlzc29sdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvYXNzZXRzL3NjcmlwdC9FZmZlY3REaXNzb2x2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQkFBZ0M7QUFDaEMsNkNBQTBDO0FBQzFDLDJCQUEyQjtBQUMzQiwyQkFBK0I7QUFDL0IsMkJBQThCO0FBQzlCLDJCQUE2QjtBQUM3QiwyQkFBMkI7QUFFM0IsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxlQUFVLENBQUM7QUFHekMsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLHVCQUFVO0lBQTlDOztRQUVXLGlCQUFZLEdBQXFCLElBQUksQ0FBQztRQWNyQyxtQkFBYyxHQUFVLElBQUksVUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBZ0I5QyxZQUFPLEdBQVcsR0FBRyxDQUFDO1FBZ0J0QixjQUFTLEdBQVcsR0FBRyxDQUFDO1FBZ0J4QixXQUFNLEdBQVcsR0FBRyxDQUFDO1FBQzdCLFlBQVk7UUFJTCxTQUFJLEdBQVksSUFBSSxDQUFDO1FBR3JCLGFBQVEsR0FBVyxHQUFHLENBQUM7UUFHdkIsU0FBSSxHQUFZLElBQUksQ0FBQztRQUdyQixlQUFVLEdBQVcsR0FBRyxDQUFDO0lBMERwQyxDQUFDO0lBcElHLHVCQUF1QjtJQUV2QixJQUFXLGFBQWE7UUFDcEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFXLGFBQWEsQ0FBQyxHQUFVO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBSUQsWUFBWTtJQUdaLHNCQUFzQjtJQUV0QixJQUFXLE1BQU07UUFDYixPQUFP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LENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztzREFDbEM7QUFNdEQ7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzRDQUcxRztBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOytDQUM1RjtBQU05QjtJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7OENBRzFHO0FBUUQ7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7aURBQzFGO0FBTWhDO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzsyQ0FHMUc7QUFRRDtJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs4Q0FDN0Y7QUFLN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7NENBQ3RDO0FBRzVCO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO2dEQUN2RjtBQUc5QjtJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs0Q0FDcEM7QUFHNUI7SUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7a0RBQ2pGO0FBOUV2QixjQUFjO0lBRDFCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztHQUNiLGNBQWMsQ0F3STFCO0FBeElZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVmZmVjdEJhc2UgfSBmcm9tICcuL0VmZmVjdEJhc2UnO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBUZXh0dXJlMkQgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IENDRmxvYXQgfSBmcm9tICdjYyc7XG5pbXBvcnQgeyB0d2VlbiB9IGZyb20gJ2NjJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuQGNjY2xhc3MoJ0VmZmVjdERpc3NvbHZlJylcbmV4cG9ydCBjbGFzcyBFZmZlY3REaXNzb2x2ZSBleHRlbmRzIEVmZmVjdEJhc2Uge1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFRleHR1cmUyRCwgdG9vbHRpcDogXCLmjIflrprlmarogbLosrzlnJZcIiB9KVxuICAgIHB1YmxpYyBub2lzZVRleHR1cmU6IFRleHR1cmUyRCB8IG51bGwgPSBudWxsO1xuXG4gICAgLy8jcmVnaW9uIGRpc3NvbHZlQ29sb3JcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHRvb2x0aXA6IFwi5rq26Kej6aGP6ImyXCIgfSlcbiAgICBwdWJsaWMgZ2V0IGRpc3NvbHZlQ29sb3IoKTogQ29sb3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzc29sdmVDb2xvcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGRpc3NvbHZlQ29sb3IodmFsOiBDb2xvcikge1xuICAgICAgICB0aGlzLl9kaXNzb2x2ZUNvbG9yLnNldCh2YWwpO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX2Rpc3NvbHZlQ29sb3InKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHRvb2x0aXA6IFwi5rq26Kej6aGP6ImyXCIsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9kaXNzb2x2ZUNvbG9yOiBDb2xvciA9IG5ldyBDb2xvcigwLCAwLCAwLCAxKTtcbiAgICAvLyNlbmRyZWdpb25cblxuXG4gICAgLy8jcmVnaW9uIGVmZmVjdEZhY3RvclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6IFwi5rq26Kej56iL5bqmXCIgfSlcbiAgICBwdWJsaWMgZ2V0IGZhY3RvcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmFjdG9yO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZmFjdG9yKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2ZhY3RvciA9IHZhbDtcbiAgICAgICAgdGhpcy5fc2V0UGFyYW1zRGlydHkoJ19mYWN0b3InKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEsIDAuMDFdLCB0b29sdGlwOiBcIua6tuino+eoi+W6plwiLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfZmFjdG9yOiBudW1iZXIgPSAwLjU7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiBzb2Z0bmVzc1xuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6IFwi5p+U6YKK56iL5bqmXCIgfSlcbiAgICBwdWJsaWMgZ2V0IHNvZnRuZXNzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zb2Z0bmVzcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNvZnRuZXNzKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NvZnRuZXNzID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX3NvZnRuZXNzJyk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJQcml2YXRlIFByb3BzXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogXCLmn5TpgornqIvluqZcIiwgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX3NvZnRuZXNzOiBudW1iZXIgPSAwLjE7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIC8vI3JlZ2lvbiB3aWR0aFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMCwgMSwgMC4wMV0sIHRvb2x0aXA6IFwi5rq26Kej5a+s5bqmXCIgfSlcbiAgICBwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHdpZHRoKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnX3dpZHRoJyk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJQcml2YXRlIFByb3BzXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLCAxLCAwLjAxXSwgdG9vbHRpcDogXCLmurbop6Plr6zluqZcIiwgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX3dpZHRoOiBudW1iZXIgPSAwLjE7XG4gICAgLy8jZW5kcmVnaW9uXG5cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiQW5pbVwiLCBpZDogXCIyXCIgfSwgdG9vbHRpcDogJ+aYr+WQpuiHquWLleaSpeaUvicgfSlcbiAgICBwdWJsaWMgcGxheTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIkFuaW1cIiwgaWQ6IFwiMlwiIH0sIHR5cGU6IENDRmxvYXQsIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMDEsIDEwLCAwLjAxXSwgdG9vbHRpcDogJ+aMgee7reaXtumXtCcgfSlcbiAgICBwdWJsaWMgZHVyYXRpb246IG51bWJlciA9IDEuMDtcblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiQW5pbVwiLCBpZDogXCIyXCIgfSwgdG9vbHRpcDogJ+aYr+WQpuW+queOrycgfSlcbiAgICBwdWJsaWMgbG9vcDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIkFuaW1cIiwgaWQ6IFwiMlwiIH0sIHR5cGU6IENDRmxvYXQsIHNsaWRlOiB0cnVlLCByYW5nZTogWzAsIDEwLCAwLjFdLCB0b29sdGlwOiAn5b6q546v6Ze06ZqUJyB9KVxuICAgIHB1YmxpYyBsb29wX2RlbGF5OiBudW1iZXIgPSAwLjA7XG5cblxuICAgIHByb3RlY3RlZCBfaW5zdE1hdGVyaWFsKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5lZmZlY3RBc3NldCkge1xuICAgICAgICAgICAgbGV0IG1hdCA9IG5ldyBNYXRlcmlhbCgpO1xuICAgICAgICAgICAgbWF0LmluaXRpYWxpemUoeyBcbiAgICAgICAgICAgICAgICBlZmZlY3RBc3NldDogdGhpcy5lZmZlY3RBc3NldCxcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IHRoaXMuX2lzMkRpbjNEID8gMSA6IDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWF0LnNldFByb3BlcnR5KCdfbm9pc2V0ZXgnLCB0aGlzLm5vaXNlVGV4dHVyZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX2Rpc3NvbHZlQ29sb3InLCBtYXQucGFzc2VzWzBdLmdldEhhbmRsZSgnX2Rpc3NvbHZlQ29sb3InKSk7XG4gICAgICAgICAgICB0aGlzLl9zZXRQYXJhbXMoJ19mYWN0b3InLCBtYXQucGFzc2VzWzBdLmdldEhhbmRsZSgnX2ZhY3RvcicpKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX3NvZnRuZXNzJywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ19zb2Z0bmVzcycpKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnX3dpZHRoJywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ193aWR0aCcpKTtcblxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5jdXN0b21NYXRlcmlhbCA9IG1hdDtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGxheSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5KCk7XG4gICAgICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF91cGRhdGVQYXJhbXMoa2V5OiBzdHJpbmcsIGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChrZXkgPT09ICdfZGlzc29sdmVDb2xvcicpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEubWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fZGlzc29sdmVDb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnX2ZhY3RvcicpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEubWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgdGhpcy5fZmFjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfc29mdG5lc3MnKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX3NvZnRuZXNzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfd2lkdGgnKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIHRoaXMuX3dpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3BsYXkoKTogdm9pZCB7XG4gICAgICAgIGxldCB0d2VlblRhcmdldCA9IHsgZmFjdG9yOiAwLjAgfTtcblxuICAgICAgICB0d2Vlbih0d2VlblRhcmdldCkudG8odGhpcy5kdXJhdGlvbiwgeyBmYWN0b3I6IDEuMCB9LCB7XG4gICAgICAgICAgICBvblVwZGF0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjdG9yID0gdHdlZW5UYXJnZXQuZmFjdG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5sb29wX2RlbGF5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgfVxufVxuXG5cbiJdfQ==