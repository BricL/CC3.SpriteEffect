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
    get floatUsage() {
        return 4;
    }
    /**
     * @override SpriteEffectBase
     */
    getEffectUnionKey() {
        return `${this.constructor.name}_${this._is2Din3D}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0VGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9zdGF0aWMvY29tcC9TcHJpdGVFZmZlY3RUZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUFpRDtBQUVqRCx5REFBc0Q7QUFDdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxlQUFVLENBQUM7QUFJekMsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxtQ0FBZ0I7SUFDbEQsa0JBQWtCO0lBQ2xCOztPQUVHO0lBQ0gsSUFBdUIsVUFBVTtRQUM3QixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRDs7T0FFRztJQUNnQixpQkFBaUI7UUFDaEMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7O09BRUc7SUFDZ0IsWUFBWSxDQUFDLEdBQVcsRUFBRSxZQUFvQixFQUFFLFVBQXdCO1FBQ3ZGLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN0RCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsRCxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7O09BRUc7SUFDZ0IsWUFBWTtRQUMzQixJQUFJLEdBQUcsR0FBRyxJQUFJLGFBQVEsRUFBRSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxVQUFVLENBQ1Y7WUFDSSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsT0FBTyxFQUFFLEVBQUU7WUFDWCxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDLENBQ0osQ0FBQztRQUNGLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUE7QUF6Q1ksZ0JBQWdCO0lBRDVCLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztHQUNmLGdCQUFnQixDQXlDNUI7QUF6Q1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29sb3IsIE1hdGVyaWFsIH0gZnJvbSAnY2MnO1xuaW1wb3J0IHsgREVWLCBFRElUT1JfTk9UX0lOX1BSRVZJRVcgfSBmcm9tICdjYy9lbnYnO1xuaW1wb3J0IHsgU3ByaXRlRWZmZWN0QmFzZSB9IGZyb20gJy4vU3ByaXRlRWZmZWN0QmFzZSc7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xuXG5cbkBjY2NsYXNzKCdTcHJpdGVFZmZlY3RUZXN0JylcbmV4cG9ydCBjbGFzcyBTcHJpdGVFZmZlY3RUZXN0IGV4dGVuZHMgU3ByaXRlRWZmZWN0QmFzZSB7XG4gICAgLy8jcmVnaW9uIG92ZXJyaWRlXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0IGZsb2F0VXNhZ2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0RWZmZWN0VW5pb25LZXkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY29uc3RydWN0b3IubmFtZX1fJHt0aGlzLl9pczJEaW4zRH1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVBhcmFtcyhpZHg6IG51bWJlciwgdGV4dHVyZVdpZHRoOiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmNhbEJ1ZmZlckluZGV4KGlkeCwgMCwgdGV4dHVyZVdpZHRoKTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDBdID0gdGhpcy5fZWZmZWN0Q29sb3IuciAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDFdID0gdGhpcy5fZWZmZWN0Q29sb3IuZyAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDJdID0gdGhpcy5fZWZmZWN0Q29sb3IuYiAvIDI1NTtcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDNdID0gdGhpcy5fZWZmZWN0Q29sb3IuYSAvIDI1NTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBpbml0TWF0ZXJpYWwoKTogTWF0ZXJpYWwge1xuICAgICAgICBsZXQgbWF0ID0gbmV3IE1hdGVyaWFsKCk7XG4gICAgICAgIG1hdC5pbml0aWFsaXplKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxuICAgICAgICAgICAgICAgIGRlZmluZXM6IHt9LFxuICAgICAgICAgICAgICAgIHRlY2huaXF1ZTogdGhpcy5faXMyRGluM0QgPyAxIDogMFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbWF0O1xuICAgIH1cbn1cblxuIl19