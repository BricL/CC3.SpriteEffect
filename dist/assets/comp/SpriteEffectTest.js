"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectTest = void 0;
const cc_1 = require("cc");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
let SpriteEffectTest = class SpriteEffectTest extends SpriteEffectBase_1.SpriteEffectBase {
    //#region override
    /**
     * @override SpriteEffectBase
     */
    get countOfUsedFloats() {
        return 4;
    }
    /**
     * @override SpriteEffectBase
     */
    getPropsUnionKey() {
        return `${this.constructor.name}_${this._is2Din3D}`;
    }
    /**
     * @override SpriteEffectBase
     */
    updateParams(index, propBuffer) {
        propBuffer[index + 0] = this._effectColor.r / 255;
        propBuffer[index + 1] = this._effectColor.g / 255;
        propBuffer[index + 2] = this._effectColor.b / 255;
        propBuffer[index + 3] = this._effectColor.a / 255;
    }
    /**
     * @override SpriteEffectBase
     */
    initMaterial() {
        let mat = new cc_1.Material();
        mat.initialize({
            effectAsset: this.effectAsset,
            defines: {},
            technique: this._is2Din3D ? 1 : 0
        });
        return mat;
    }
};
SpriteEffectTest = __decorate([
    ccclass('SpriteEffectTest')
], SpriteEffectTest);
exports.SpriteEffectTest = SpriteEffectTest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0VGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9hc3NldHMvY29tcC9TcHJpdGVFZmZlY3RUZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUFpRDtBQUVqRCx5REFBc0Q7QUFDdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxlQUFVLENBQUM7QUFJekMsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxtQ0FBZ0I7SUFDbEQsa0JBQWtCO0lBQ2xCOztPQUVHO0lBQ0gsSUFBYyxpQkFBaUI7UUFDM0IsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQ7O09BRUc7SUFDTyxnQkFBZ0I7UUFDdEIsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxZQUFZLENBQUMsS0FBYSxFQUFFLFVBQXdCO1FBQzFELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7T0FFRztJQUNPLFlBQVk7UUFDbEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxhQUFRLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsVUFBVSxDQUNWO1lBQ0ksV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQyxDQUNKLENBQUM7UUFDRixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSixDQUFBO0FBeENZLGdCQUFnQjtJQUQ1QixPQUFPLENBQUMsa0JBQWtCLENBQUM7R0FDZixnQkFBZ0IsQ0F3QzVCO0FBeENZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IsIENvbG9yLCBNYXRlcmlhbCB9IGZyb20gJ2NjJztcbmltcG9ydCB7IERFViwgRURJVE9SX05PVF9JTl9QUkVWSUVXIH0gZnJvbSAnY2MvZW52JztcbmltcG9ydCB7IFNwcml0ZUVmZmVjdEJhc2UgfSBmcm9tICcuL1Nwcml0ZUVmZmVjdEJhc2UnO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuXG5AY2NjbGFzcygnU3ByaXRlRWZmZWN0VGVzdCcpXG5leHBvcnQgY2xhc3MgU3ByaXRlRWZmZWN0VGVzdCBleHRlbmRzIFNwcml0ZUVmZmVjdEJhc2Uge1xuICAgIC8vI3JlZ2lvbiBvdmVycmlkZVxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldCBjb3VudE9mVXNlZEZsb2F0cygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gNDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRQcm9wc1VuaW9uS2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9XyR7dGhpcy5faXMyRGluM0R9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCB1cGRhdGVQYXJhbXMoaW5kZXg6IG51bWJlciwgcHJvcEJ1ZmZlcjogRmxvYXQzMkFycmF5KTogdm9pZCB7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAwXSA9IHRoaXMuX2VmZmVjdENvbG9yLnIgLyAyNTU7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxXSA9IHRoaXMuX2VmZmVjdENvbG9yLmcgLyAyNTU7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAyXSA9IHRoaXMuX2VmZmVjdENvbG9yLmIgLyAyNTU7XG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAzXSA9IHRoaXMuX2VmZmVjdENvbG9yLmEgLyAyNTU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaW5pdE1hdGVyaWFsKCk6IE1hdGVyaWFsIHtcbiAgICAgICAgbGV0IG1hdCA9IG5ldyBNYXRlcmlhbCgpO1xuICAgICAgICBtYXQuaW5pdGlhbGl6ZShcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlZmZlY3RBc3NldDogdGhpcy5lZmZlY3RBc3NldCxcbiAgICAgICAgICAgICAgICBkZWZpbmVzOiB7fSxcbiAgICAgICAgICAgICAgICB0ZWNobmlxdWU6IHRoaXMuX2lzMkRpbjNEID8gMSA6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG1hdDtcbiAgICB9XG59XG5cbiJdfQ==