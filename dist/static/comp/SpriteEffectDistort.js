"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteEffectDistort = void 0;
const cc_1 = require("cc");
const env_1 = require("cc/env");
const SpriteEffectBase_1 = require("./SpriteEffectBase");
const { ccclass, property } = cc_1._decorator;
let SpriteEffectDistort = class SpriteEffectDistort extends SpriteEffectBase_1.SpriteEffectBase {
    constructor() {
        super(...arguments);
        this.noiseTexture = null;
        this._speed = 0.05;
        this._strength = 0.05;
    }
    //#region speed
    set speed(val) {
        this._speed = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get speed() {
        return this._speed;
    }
    //#endregion
    //#region strength
    set strength(val) {
        this._strength = val;
        if (env_1.EDITOR_NOT_IN_PREVIEW) {
            this.reflashParams();
        }
        else {
            this.reflashParams();
        }
    }
    get strength() {
        return this._strength;
    }
    //#endregion
    //#region override
    /**
     * @override SpriteEffectBase
     */
    get floatUsage() {
        // return 10; // 手機上非2次幂的紋理會報錯
        return 16;
    }
    /**
     * @override SpriteEffectBase
     */
    getEffectUnionKey() {
        return `SpriteEffectDistort_${this._is2Din3D}_${this._sampleFromRT}`;
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
        propBuffer[index + 8] = cc_1.lerp(0.0, 0.2, this._speed);
        propBuffer[index + 9] = cc_1.lerp(0.0, 0.2, this._strength);
        propBuffer[index + 10] = 0.0;
        propBuffer[index + 11] = 1.0;
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
        mat.setProperty('noiseTexture', this.noiseTexture);
        return mat;
    }
};
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, type: cc_1.Texture2D, tooltip: '指定噪声貼圖' })
], SpriteEffectDistort.prototype, "noiseTexture", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '扭曲速度' })
], SpriteEffectDistort.prototype, "speed", null);
__decorate([
    property
], SpriteEffectDistort.prototype, "_speed", void 0);
__decorate([
    property({ group: { name: "Setter/Getter", id: "1" }, slide: true, range: [0.0, 1.0, 0.01], tooltip: '扭曲强度' })
], SpriteEffectDistort.prototype, "strength", null);
__decorate([
    property
], SpriteEffectDistort.prototype, "_strength", void 0);
SpriteEffectDistort = __decorate([
    ccclass('SpriteEffectDistort')
], SpriteEffectDistort);
exports.SpriteEffectDistort = SpriteEffectDistort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ByaXRlRWZmZWN0RGlzdG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9zdGF0aWMvY29tcC9TcHJpdGVFZmZlY3REaXN0b3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJCQUFnRTtBQUNoRSxnQ0FBK0M7QUFDL0MseURBQXNEO0FBQ3RELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBVSxDQUFDO0FBSXpDLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsbUNBQWdCO0lBQXpEOztRQUVXLGlCQUFZLEdBQXFCLElBQUksQ0FBQztRQW9CckMsV0FBTSxHQUFXLElBQUksQ0FBQztRQXNCdEIsY0FBUyxHQUFXLElBQUksQ0FBQztJQStEckMsQ0FBQztJQXZHRyxlQUFlO0lBRWYsSUFBVyxLQUFLLENBQUMsR0FBVztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUVsQixJQUFJLDJCQUFxQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVELElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBSUQsWUFBWTtJQUdaLGtCQUFrQjtJQUVsQixJQUFXLFFBQVEsQ0FBQyxHQUFXO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBRXJCLElBQUksMkJBQXFCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFJRCxZQUFZO0lBR1os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QUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO3lEQUMvQztBQUk3QztJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7Z0RBVTlHO0FBT0Q7SUFEQyxRQUFRO21EQUNxQjtBQU05QjtJQURDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7bURBVTlHO0FBT0Q7SUFEQyxRQUFRO3NEQUN3QjtBQTVDeEIsbUJBQW1CO0lBRC9CLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztHQUNsQixtQkFBbUIsQ0EyRy9CO0FBM0dZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IsIGxlcnAsIGxvZywgTWF0ZXJpYWwsIFRleHR1cmUyRCB9IGZyb20gJ2NjJztcclxuaW1wb3J0IHsgRURJVE9SX05PVF9JTl9QUkVWSUVXIH0gZnJvbSAnY2MvZW52JztcclxuaW1wb3J0IHsgU3ByaXRlRWZmZWN0QmFzZSB9IGZyb20gJy4vU3ByaXRlRWZmZWN0QmFzZSc7XHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XHJcblxyXG5cclxuQGNjY2xhc3MoJ1Nwcml0ZUVmZmVjdERpc3RvcnQnKVxyXG5leHBvcnQgY2xhc3MgU3ByaXRlRWZmZWN0RGlzdG9ydCBleHRlbmRzIFNwcml0ZUVmZmVjdEJhc2Uge1xyXG4gICAgQHByb3BlcnR5KHsgZ3JvdXA6IHsgbmFtZTogXCJTZXR0ZXIvR2V0dGVyXCIsIGlkOiBcIjFcIiB9LCB0eXBlOiBUZXh0dXJlMkQsIHRvb2x0aXA6ICfmjIflrprlmarlo7DosrzlnJYnIH0pXHJcbiAgICBwdWJsaWMgbm9pc2VUZXh0dXJlOiBUZXh0dXJlMkQgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAvLyNyZWdpb24gc3BlZWRcclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMC4wLCAxLjAsIDAuMDFdLCB0b29sdGlwOiAn5omt5puy6YCf5bqmJyB9KVxyXG4gICAgcHVibGljIHNldCBzcGVlZCh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3NwZWVkID0gdmFsO1xyXG5cclxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3BlZWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3BlZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9zcGVlZDogbnVtYmVyID0gMC4wNTtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gc3RyZW5ndGhcclxuICAgIEBwcm9wZXJ0eSh7IGdyb3VwOiB7IG5hbWU6IFwiU2V0dGVyL0dldHRlclwiLCBpZDogXCIxXCIgfSwgc2xpZGU6IHRydWUsIHJhbmdlOiBbMC4wLCAxLjAsIDAuMDFdLCB0b29sdGlwOiAn5omt5puy5by65bqmJyB9KVxyXG4gICAgcHVibGljIHNldCBzdHJlbmd0aCh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3N0cmVuZ3RoID0gdmFsO1xyXG5cclxuICAgICAgICBpZiAoRURJVE9SX05PVF9JTl9QUkVWSUVXKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmbGFzaFBhcmFtcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZsYXNoUGFyYW1zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3RyZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RyZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9zdHJlbmd0aDogbnVtYmVyID0gMC4wNTtcclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAvLyNyZWdpb24gb3ZlcnJpZGVcclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldCBmbG9hdFVzYWdlKCk6IG51bWJlciB7XHJcbiAgICAgICAgLy8gcmV0dXJuIDEwOyAvLyDmiYvmqZ/kuIrpnZ4y5qyh5bmC55qE57SL55CG5pyD5aCx6YyvXHJcbiAgICAgICAgcmV0dXJuIDE2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG92ZXJyaWRlIFNwcml0ZUVmZmVjdEJhc2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldEVmZmVjdFVuaW9uS2V5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGBTcHJpdGVFZmZlY3REaXN0b3J0XyR7dGhpcy5faXMyRGluM0R9XyR7dGhpcy5fc2FtcGxlRnJvbVJUfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlUGFyYW1zKGlkeDogbnVtYmVyLCB0ZXh0dXJlV2lkdGg6IG51bWJlciwgcHJvcEJ1ZmZlcjogRmxvYXQzMkFycmF5KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgYmFzZVVWID0gdGhpcy5nZXRVVih0aGlzLnNwcml0ZUZyYW1lIS51dik7XHJcblxyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuY2FsQnVmZmVySW5kZXgoaWR4LCAwLCB0ZXh0dXJlV2lkdGgpO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAwXSA9IHRoaXMuX2VmZmVjdENvbG9yLnIgLyAyNTU7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDFdID0gdGhpcy5fZWZmZWN0Q29sb3IuZyAvIDI1NTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMl0gPSB0aGlzLl9lZmZlY3RDb2xvci5iIC8gMjU1O1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAzXSA9IHRoaXMuX2VmZmVjdENvbG9yLmEgLyAyNTU7XHJcblxyXG4gICAgICAgIGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDEsIHRleHR1cmVXaWR0aCk7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDRdID0gYmFzZVVWLng7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDVdID0gYmFzZVVWLnk7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDZdID0gYmFzZVVWLno7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDddID0gYmFzZVVWLnc7XHJcblxyXG4gICAgICAgIGluZGV4ID0gdGhpcy5jYWxCdWZmZXJJbmRleChpZHgsIDIsIHRleHR1cmVXaWR0aCk7XHJcbiAgICAgICAgcHJvcEJ1ZmZlcltpbmRleCArIDhdID0gbGVycCgwLjAsIDAuMiwgdGhpcy5fc3BlZWQpO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyA5XSA9IGxlcnAoMC4wLCAwLjIsIHRoaXMuX3N0cmVuZ3RoKTtcclxuICAgICAgICBwcm9wQnVmZmVyW2luZGV4ICsgMTBdID0gMC4wO1xyXG4gICAgICAgIHByb3BCdWZmZXJbaW5kZXggKyAxMV0gPSAxLjA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAb3ZlcnJpZGUgU3ByaXRlRWZmZWN0QmFzZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5pdE1hdGVyaWFsKCk6IE1hdGVyaWFsIHtcclxuICAgICAgICBsZXQgbWF0ID0gbmV3IE1hdGVyaWFsKCk7XHJcbiAgICAgICAgbWF0LmluaXRpYWxpemUoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVmZmVjdEFzc2V0OiB0aGlzLmVmZmVjdEFzc2V0LFxyXG4gICAgICAgICAgICAgICAgZGVmaW5lczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFNBTVBMRV9GUk9NX1JUOiB0aGlzLl9zYW1wbGVGcm9tUlQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGVjaG5pcXVlOiB0aGlzLl9pczJEaW4zRCA/IDEgOiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBtYXQuc2V0UHJvcGVydHkoJ25vaXNlVGV4dHVyZScsIHRoaXMubm9pc2VUZXh0dXJlKTtcclxuICAgICAgICByZXR1cm4gbWF0O1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=