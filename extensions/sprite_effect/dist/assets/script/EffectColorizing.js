"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectColorizing = void 0;
const cc_1 = require("cc");
const EffectBase_1 = require("./EffectBase");
const { ccclass, property } = cc_1._decorator;
let EffectColorizing = class EffectColorizing extends EffectBase_1.EffectBase {
    constructor() {
        super(...arguments);
        this._rChannelMin = 0;
        this._rChannelMax = 1;
        this._gChannelMin = 0;
        this._gChannelMax = 1;
        this._bChannelMin = 0;
        this._bChannelMax = 1;
    }
    // #region rChannel
    get rChannelMin() {
        return this._rChannelMin;
    }
    set rChannelMin(val) {
        this._rChannelMin = val;
        this._setParamsDirty('rChannel');
    }
    get rChannelMax() {
        return this._rChannelMax;
    }
    set rChannelMax(val) {
        this._rChannelMax = val;
        this._setParamsDirty('rChannel');
    }
    // #endregion
    // #region gChannel
    get gChannelMin() {
        return this._gChannelMin;
    }
    set gChannelMin(val) {
        this._gChannelMin = val;
        this._setParamsDirty('gChannel');
    }
    get gChannelMax() {
        return this._gChannelMax;
    }
    set gChannelMax(val) {
        this._gChannelMax = val;
        this._setParamsDirty('gChannel');
    }
    // #endregion
    // #region bChannel
    get bChannelMin() {
        return this._bChannelMin;
    }
    set bChannelMin(val) {
        this._bChannelMin = val;
        this._setParamsDirty('bChannel');
    }
    get bChannelMax() {
        return this._bChannelMax;
    }
    set bChannelMax(val) {
        this._bChannelMax = val;
        this._setParamsDirty('bChannel');
    }
    // #endregion
    _instMaterial() {
        if (this.effectAsset) {
            let mat = new cc_1.Material();
            mat.initialize({
                effectAsset: this.effectAsset,
                technique: this._is2Din3D ? 1 : 0
            });
            this._setParams('rChannel', mat.passes[0].getHandle('rChannel'));
            this._setParams('gChannel', mat.passes[0].getHandle('gChannel'));
            this._setParams('bChannel', mat.passes[0].getHandle('bChannel'));
            this._sprite.customMaterial = mat;
        }
        else {
            cc_1.error(`${this.constructor.name}: effectAsset or noise texture is null`);
        }
    }
    _updateParams(key, idx) {
        var _a, _b, _c;
        if (key === 'rChannel') {
            (_a = this._sprite.material) === null || _a === void 0 ? void 0 : _a.passes[0].setUniform(idx, new cc_1.Vec2(this._rChannelMin, this._rChannelMax));
        }
        else if (key === 'gChannel') {
            (_b = this._sprite.material) === null || _b === void 0 ? void 0 : _b.passes[0].setUniform(idx, new cc_1.Vec2(this._gChannelMin, this._gChannelMax));
        }
        else if (key === 'bChannel') {
            (_c = this._sprite.material) === null || _c === void 0 ? void 0 : _c.passes[0].setUniform(idx, new cc_1.Vec2(this._bChannelMin, this._bChannelMax));
        }
    }
};
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定R通道Remap顏色最小值' })
], EffectColorizing.prototype, "rChannelMin", null);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定R通道Remap顏色最大值' })
], EffectColorizing.prototype, "rChannelMax", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定R通道Remap顏色最小值', visible: true })
], EffectColorizing.prototype, "_rChannelMin", void 0);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定R通道Remap顏色最大值', visible: true })
], EffectColorizing.prototype, "_rChannelMax", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定G通道Remap顏色最小值' })
], EffectColorizing.prototype, "gChannelMin", null);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定G通道填Remap顏色最大值' })
], EffectColorizing.prototype, "gChannelMax", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定G通道Remap顏色最小值', visible: true })
], EffectColorizing.prototype, "_gChannelMin", void 0);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定G通道Remap顏色最大值', visible: true })
], EffectColorizing.prototype, "_gChannelMax", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定B通道Remap顏色最小值' })
], EffectColorizing.prototype, "bChannelMin", null);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定B通道Remap顏色最大值' })
], EffectColorizing.prototype, "bChannelMax", null);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定B通道Remap顏色最小值', visible: true })
], EffectColorizing.prototype, "_bChannelMin", void 0);
__decorate([
    property({ group: { name: "Private Props", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '指定B通道Remap顏色最大值', visible: true })
], EffectColorizing.prototype, "_bChannelMax", void 0);
EffectColorizing = __decorate([
    ccclass('EffectColorizing')
], EffectColorizing);
exports.EffectColorizing = EffectColorizing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWZmZWN0Q29sb3JpemluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hc3NldHMvc2NyaXB0L0VmZmVjdENvbG9yaXppbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQXdFO0FBQ3hFLDZDQUEwQztBQUMxQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLGVBQVUsQ0FBQztBQUd6QyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLHVCQUFVO0lBQWhEOztRQXVCWSxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUV6QixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQXlCekIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFFekIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUF5QnpCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO0lBaUNyQyxDQUFDO0lBL0dHLG1CQUFtQjtJQUVuQixJQUFXLFdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFXLFdBQVcsQ0FBQyxHQUFXO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUdELElBQVcsV0FBVztRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQVcsV0FBVyxDQUFDLEdBQVc7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBTUQsYUFBYTtJQUViLG1CQUFtQjtJQUVuQixJQUFXLFdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFXLFdBQVcsQ0FBQyxHQUFXO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUdELElBQVcsV0FBVztRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQVcsV0FBVyxDQUFDLEdBQVc7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBTUQsYUFBYTtJQUViLG1CQUFtQjtJQUVuQixJQUFXLFdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFXLFdBQVcsQ0FBQyxHQUFXO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUdELElBQVcsV0FBVztRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQVcsV0FBVyxDQUFDLEdBQVc7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBTUQsYUFBYTtJQUVILGFBQWE7UUFDbkIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksR0FBRyxHQUFHLElBQUksYUFBUSxFQUFFLENBQUM7WUFDekIsR0FBRyxDQUFDLFVBQVUsQ0FBQztnQkFDWCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLE9BQVEsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO1NBQ3RDO2FBQ0k7WUFDRCxVQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksd0NBQXdDLENBQUMsQ0FBQztTQUMzRTtJQUNMLENBQUM7SUFFUyxhQUFhLENBQUMsR0FBVyxFQUFFLEdBQVc7O1FBQzVDLElBQUksR0FBRyxLQUFLLFVBQVUsRUFBRTtZQUNwQixNQUFBLElBQUksQ0FBQyxPQUFRLENBQUMsUUFBUSwwQ0FBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxTQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUNyRzthQUNJLElBQUksR0FBRyxLQUFLLFVBQVUsRUFBRTtZQUN6QixNQUFBLElBQUksQ0FBQyxPQUFRLENBQUMsUUFBUSwwQ0FBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxTQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUNyRzthQUNJLElBQUksR0FBRyxLQUFLLFVBQVUsRUFBRTtZQUN6QixNQUFBLElBQUksQ0FBQyxPQUFRLENBQUMsUUFBUSwwQ0FBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxTQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUNyRztJQUNMLENBQUM7Q0FDSixDQUFBO0FBN0dHO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDO21EQUd6SDtBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDO21EQUd6SDtBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7c0RBQ3hHO0FBRWpDO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7c0RBQ3hHO0FBS2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDO21EQUd6SDtBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxDQUFDO21EQUcxSDtBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7c0RBQ3hHO0FBRWpDO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7c0RBQ3hHO0FBS2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDO21EQUd6SDtBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDO21EQUd6SDtBQVFEO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7c0RBQ3hHO0FBRWpDO0lBREMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7c0RBQ3hHO0FBL0V4QixnQkFBZ0I7SUFENUIsT0FBTyxDQUFDLGtCQUFrQixDQUFDO0dBQ2YsZ0JBQWdCLENBZ0g1QjtBQWhIWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZGVjb3JhdG9yLCBDb21wb25lbnQsIGVycm9yLCBNYXRlcmlhbCwgTm9kZSwgVmVjMiB9IGZyb20gJ2NjJztcbmltcG9ydCB7IEVmZmVjdEJhc2UgfSBmcm9tICcuL0VmZmVjdEJhc2UnO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuQGNjY2xhc3MoJ0VmZmVjdENvbG9yaXppbmcnKVxuZXhwb3J0IGNsYXNzIEVmZmVjdENvbG9yaXppbmcgZXh0ZW5kcyBFZmZlY3RCYXNlIHtcbiAgICAvLyAjcmVnaW9uIHJDaGFubmVsXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAsIDEuMCwgMC4wMV0sIHRvb2x0aXA6ICfmjIflrppS6YCa6YGTUmVtYXDpoY/oibLmnIDlsI/lgLwnIH0pXG4gICAgcHVibGljIGdldCByQ2hhbm5lbE1pbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fckNoYW5uZWxNaW47XG4gICAgfVxuXG4gICAgcHVibGljIHNldCByQ2hhbm5lbE1pbih2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9yQ2hhbm5lbE1pbiA9IHZhbDtcbiAgICAgICAgdGhpcy5fc2V0UGFyYW1zRGlydHkoJ3JDaGFubmVsJyk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAsIDEuMCwgMC4wMV0sIHRvb2x0aXA6ICfmjIflrppS6YCa6YGTUmVtYXDpoY/oibLmnIDlpKflgLwnIH0pXG4gICAgcHVibGljIGdldCByQ2hhbm5lbE1heCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fckNoYW5uZWxNYXg7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCByQ2hhbm5lbE1heCh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9yQ2hhbm5lbE1heCA9IHZhbDtcbiAgICAgICAgdGhpcy5fc2V0UGFyYW1zRGlydHkoJ3JDaGFubmVsJyk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJQcml2YXRlIFByb3BzXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAsIDEuMCwgMC4wMV0sIHRvb2x0aXA6ICfmjIflrppS6YCa6YGTUmVtYXDpoY/oibLmnIDlsI/lgLwnLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfckNoYW5uZWxNaW46IG51bWJlciA9IDA7XG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJQcml2YXRlIFByb3BzXCIsIGlkOiBcIjFcIiB9LCBzbGlkZTogdHJ1ZSwgcmFuZ2U6IFswLjAsIDEuMCwgMC4wMV0sIHRvb2x0aXA6ICfmjIflrppS6YCa6YGTUmVtYXDpoY/oibLmnIDlpKflgLwnLCB2aXNpYmxlOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfckNoYW5uZWxNYXg6IG51bWJlciA9IDE7XG4gICAgLy8gI2VuZHJlZ2lvblxuXG4gICAgLy8gI3JlZ2lvbiBnQ2hhbm5lbFxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMC4wLCAxLjAsIDAuMDFdLCB0b29sdGlwOiAn5oyH5a6aR+mAmumBk1JlbWFw6aGP6Imy5pyA5bCP5YC8JyB9KVxuICAgIHB1YmxpYyBnZXQgZ0NoYW5uZWxNaW4oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dDaGFubmVsTWluO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZ0NoYW5uZWxNaW4odmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZ0NoYW5uZWxNaW4gPSB2YWw7XG4gICAgICAgIHRoaXMuX3NldFBhcmFtc0RpcnR5KCdnQ2hhbm5lbCcpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMC4wLCAxLjAsIDAuMDFdLCB0b29sdGlwOiAn5oyH5a6aR+mAmumBk+Whq1JlbWFw6aGP6Imy5pyA5aSn5YC8JyB9KVxuICAgIHB1YmxpYyBnZXQgZ0NoYW5uZWxNYXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dDaGFubmVsTWF4O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZ0NoYW5uZWxNYXgodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZ0NoYW5uZWxNYXggPSB2YWw7XG4gICAgICAgIHRoaXMuX3NldFBhcmFtc0RpcnR5KCdnQ2hhbm5lbCcpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMC4wLCAxLjAsIDAuMDFdLCB0b29sdGlwOiAn5oyH5a6aR+mAmumBk1JlbWFw6aGP6Imy5pyA5bCP5YC8JywgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX2dDaGFubmVsTWluOiBudW1iZXIgPSAwO1xuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiUHJpdmF0ZSBQcm9wc1wiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMC4wLCAxLjAsIDAuMDFdLCB0b29sdGlwOiAn5oyH5a6aR+mAmumBk1JlbWFw6aGP6Imy5pyA5aSn5YC8JywgdmlzaWJsZTogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX2dDaGFubmVsTWF4OiBudW1iZXIgPSAxO1xuICAgIC8vICNlbmRyZWdpb25cblxuICAgIC8vICNyZWdpb24gYkNoYW5uZWxcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgMS4wLCAwLjAxXSwgdG9vbHRpcDogJ+aMh+WumkLpgJrpgZNSZW1hcOmhj+iJsuacgOWwj+WAvCcgfSlcbiAgICBwdWJsaWMgZ2V0IGJDaGFubmVsTWluKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iQ2hhbm5lbE1pbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGJDaGFubmVsTWluKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2JDaGFubmVsTWluID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnYkNoYW5uZWwnKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlNldHRlci9HZXR0ZXJcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgMS4wLCAwLjAxXSwgdG9vbHRpcDogJ+aMh+WumkLpgJrpgZNSZW1hcOmhj+iJsuacgOWkp+WAvCcgfSlcbiAgICBwdWJsaWMgZ2V0IGJDaGFubmVsTWF4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iQ2hhbm5lbE1heDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGJDaGFubmVsTWF4KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2JDaGFubmVsTWF4ID0gdmFsO1xuICAgICAgICB0aGlzLl9zZXRQYXJhbXNEaXJ0eSgnYkNoYW5uZWwnKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgMS4wLCAwLjAxXSwgdG9vbHRpcDogJ+aMh+WumkLpgJrpgZNSZW1hcOmhj+iJsuacgOWwj+WAvCcsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9iQ2hhbm5lbE1pbjogbnVtYmVyID0gMDtcbiAgICBAcHJvcGVydHkoeyBncm91cDogeyBuYW1lOiBcIlByaXZhdGUgUHJvcHNcIiwgaWQ6IFwiMVwiIH0sIHNsaWRlOiB0cnVlLCByYW5nZTogWzAuMCwgMS4wLCAwLjAxXSwgdG9vbHRpcDogJ+aMh+WumkLpgJrpgZNSZW1hcOmhj+iJsuacgOWkp+WAvCcsIHZpc2libGU6IHRydWUgfSlcbiAgICBwcml2YXRlIF9iQ2hhbm5lbE1heDogbnVtYmVyID0gMTtcbiAgICAvLyAjZW5kcmVnaW9uXG5cbiAgICBwcm90ZWN0ZWQgX2luc3RNYXRlcmlhbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZWZmZWN0QXNzZXQpIHtcbiAgICAgICAgICAgIGxldCBtYXQgPSBuZXcgTWF0ZXJpYWwoKTtcbiAgICAgICAgICAgIG1hdC5pbml0aWFsaXplKHtcbiAgICAgICAgICAgICAgICBlZmZlY3RBc3NldDogdGhpcy5lZmZlY3RBc3NldCxcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IHRoaXMuX2lzMkRpbjNEID8gMSA6IDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9zZXRQYXJhbXMoJ3JDaGFubmVsJywgbWF0LnBhc3Nlc1swXS5nZXRIYW5kbGUoJ3JDaGFubmVsJykpO1xuICAgICAgICAgICAgdGhpcy5fc2V0UGFyYW1zKCdnQ2hhbm5lbCcsIG1hdC5wYXNzZXNbMF0uZ2V0SGFuZGxlKCdnQ2hhbm5lbCcpKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFBhcmFtcygnYkNoYW5uZWwnLCBtYXQucGFzc2VzWzBdLmdldEhhbmRsZSgnYkNoYW5uZWwnKSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEuY3VzdG9tTWF0ZXJpYWwgPSBtYXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9OiBlZmZlY3RBc3NldCBvciBub2lzZSB0ZXh0dXJlIGlzIG51bGxgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfdXBkYXRlUGFyYW1zKGtleTogc3RyaW5nLCBpZHg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoa2V5ID09PSAnckNoYW5uZWwnKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUhLm1hdGVyaWFsPy5wYXNzZXNbMF0uc2V0VW5pZm9ybShpZHgsIG5ldyBWZWMyKHRoaXMuX3JDaGFubmVsTWluLCB0aGlzLl9yQ2hhbm5lbE1heCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ2dDaGFubmVsJykge1xuICAgICAgICAgICAgdGhpcy5fc3ByaXRlIS5tYXRlcmlhbD8ucGFzc2VzWzBdLnNldFVuaWZvcm0oaWR4LCBuZXcgVmVjMih0aGlzLl9nQ2hhbm5lbE1pbiwgdGhpcy5fZ0NoYW5uZWxNYXgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdiQ2hhbm5lbCcpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSEubWF0ZXJpYWw/LnBhc3Nlc1swXS5zZXRVbmlmb3JtKGlkeCwgbmV3IFZlYzIodGhpcy5fYkNoYW5uZWxNaW4sIHRoaXMuX2JDaGFubmVsTWF4KSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==