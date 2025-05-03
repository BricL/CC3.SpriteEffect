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
        return `SpriteEffectTest_${this._is2Din3D}_${this._sampleFromRT}`;
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
            defines: {
                SAMPLE_FROM_RT: this._sampleFromRT,
            },
            technique: this._is2Din3D ? 1 : 0
        });
        return mat;
    }
};
SpriteEffectTest = __decorate([
    ccclass('SpriteEffectTest')
], SpriteEffectTest);
exports.SpriteEffectTest = SpriteEffectTest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0VGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9zdGF0aWMvY29tcC9TcHJpdGVFZmZlY3RUZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUFpRDtBQUVqRCx5REFBc0Q7QUFDdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxlQUFVLENBQUM7QUFJekMsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxtQ0FBZ0I7SUFDbEQsa0JBQWtCO0lBQ2xCOztPQUVHO0lBQ0gsSUFBdUIsVUFBVTtRQUM3QixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRDs7T0FFRztJQUNnQixpQkFBaUI7UUFDaEMsT0FBTyxvQkFBb0IsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdEUsQ0FBQztJQUVEOztPQUVHO0lBQ2dCLFlBQVksQ0FBQyxHQUFXLEVBQUUsWUFBb0IsRUFBRSxVQUF3QjtRQUN2RixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDdEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEQsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDdEQsQ0FBQztJQUVEOztPQUVHO0lBQ2dCLFlBQVk7UUFDM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxhQUFRLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsVUFBVSxDQUNWO1lBQ0ksV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUUsSUFBSSxDQUFDLGFBQWE7YUFDckM7WUFDRCxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDLENBQ0osQ0FBQztRQUNGLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUE7QUEzQ1ksZ0JBQWdCO0lBRDVCLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztHQUNmLGdCQUFnQixDQTJDNUI7QUEzQ1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29sb3IsIE1hdGVyaWFsIH0gZnJvbSAnY2MnO1xyXG5pbXBvcnQgeyBERVYsIEVESVRPUl9OT1RfSU5fUFJFVklFVyB9IGZyb20gJ2NjL2Vudic7XHJcbmltcG9ydCB7IFNwcml0ZUVmZmVjdEJhc2UgfSBmcm9tICcuL1Nwcml0ZUVmZmVjdEJhc2UnO1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xyXG5cclxuXHJcbkBjY2NsYXNzKCdTcHJpdGVFZmZlY3RUZXN0JylcclxuZXhwb3J0IGNsYXNzIFNwcml0ZUVmZmVjdFRlc3QgZXh0ZW5kcyBTcHJpdGVFZmZlY3RCYXNlIHtcclxuICAgIC8vI3JlZ2lvbiBvdmVycmlkZVxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0IGZsb2F0VXNhZ2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gNDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBvdmVycmlkZSBTcHJpdGVFZmZlY3RCYXNlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBnZXRFZmZlY3RVbmlvbktleSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgU3ByaXRlRWZmZWN0VGVzdF8ke3RoaXMuX2lzMkRpbjNEfV8ke3RoaXMuX3NhbXBsZUZyb21SVH1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVBhcmFtcyhpZHg6IG51bWJlciwgdGV4dHVyZVdpZHRoOiBudW1iZXIsIHByb3BCdWZmZXI6IEZsb2F0MzJBcnJheSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuY2FsQnVmZmVySW5kZXgoaWR4LCAwLCB0ZXh0dXJlV2lkdGgpO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAwXSA9IHRoaXMuX2VmZmVjdENvbG9yLnIgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDFdID0gdGhpcy5fZWZmZWN0Q29sb3IuZyAvIDI1NTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMl0gPSB0aGlzLl9lZmZlY3RDb2xvci5iIC8gMjU1O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAzXSA9IHRoaXMuX2VmZmVjdENvbG9yLmEgLyAyNTU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5pdE1hdGVyaWFsKCk6IE1hdGVyaWFsIHtcclxuICAgICAgICBsZXQgbWF0ID0gbmV3IE1hdGVyaWFsKCk7XHJcbiAgICAgICAgbWF0LmluaXRpYWxpemUoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxyXG4gICAgICAgICAgICAgICAgZGVmaW5lczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFNBTVBMRV9GUk9NX1JUOiB0aGlzLl9zYW1wbGVGcm9tUlQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlOiB0aGlzLl9pczJEaW4zRCA/IDEgOiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==