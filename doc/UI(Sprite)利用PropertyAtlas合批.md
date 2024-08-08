# UI(Sprite) 利用 Property Atlas 合批

依據官方文件[【2D 渲染组件合批规则说明】](https://docs.cocos.com/creator/3.8/manual/zh/ui-system/components/engine/ui-batch.html#%E5%90%88%E6%89%B9%E6%96%B9%E6%B3%95%E8%AF%B4%E6%98%8E)，Sprite Component 一但使用了 Customer Material，合批(batch)就會被拆分。若同 shader 不同 properties 想合批(batch)，正統方法是將 properties 帶入 sprite 的頂點參數中。詳細的做法 bakabird 大大已經在論壇提供了保母及的教程方案 [【分享】CocosCreator3.x 应用在UI(Sprite) 上的 shader(.effect) 的合批，通过自定义顶点参数](https://forum.cocos.org/t/topic/153963)。

但，這個方法需要對 sprite 有4種 (SIMPLE、SLICE、TILED、FILLED) 不同的頂點宣告方式 (當然如果只用到 SIMPLE 就不需要) 都要實現。

個人是比較懶惰的那種開發者，想到早期研發引擎的方法 `Propert Atlas`，將同 Shader 不同參數 pack 至一張貼圖，再透過索引於 Shader 中取出所屬參數進行渲染，就能利用引擎本身的合批 (batch) 減少 drawcall 數量。

## 實踐思路
* 一張儲存 Shader 參數的貼圖，這裡採用格式 RGBA32 讓參數的儲存精度更廣、通用些。
* 每個 Sprite 需有個代表自己的 index 傳入 Shader 中，以便於著色器中取出自己的參數。
* 將 Component 中參數依據 index 存入參數貼圖中。

### 如何產生 index 並傳入 Shader 中？

由於不想改動 Sprite 的頂點屬性，因此這裡我們偷雞一下用原本就屬於 Sprite 的 color 屬性，將 index 編碼存入其中，這也是為什麼選擇繼承 Sprite 而非另一個 Component 來實踐。


## 上代碼

* 繼承 Sprite Component

    ```typescript
    @ccclass('SpriteEffectBase')
    export abstract class SpriteEffectBase extends Sprite { 
        ...
    }
    ```

* 建立一張 128x128 RGBA32F 的參數貼圖

    ```typescript
    @ccclass('SpriteEffectBase')
    export abstract class SpriteEffectBase extends Sprite { 
        private propsTexture: Texture2D | null = null;
        private propBuffer: Float32Array | null = null;

        onLoad() {
            const w = 128;
            const h = 128;
            this.propBuffer = new Float32Array(w * h * 4);

            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const index = (x + (y * w)) * 4;
                    this.propBuffer[index] = 1;
                    this.propBuffer[index + 1] = 0;
                    this.propBuffer[index + 2] = 1;
                    this.propBuffer[index + 3] = 1;
                }
            }

            this.propsTexture = new Texture2D();
            this.propsTexture.setFilters(Texture2D.Filter.NEAREST,
                                         Texture2D.Filter.NEAREST);
            this.propsTexture.reset({
                width: w,
                height: h,
                format: Texture2D.PixelFormat.RGBA32F,
                mipmapLevel: 0
            });

            this.propsTexture.uploadData(this.propBuffer);
        }
        ...
    }
    ```

* 建立客制材質，綁定 `propsTexture` 指定至 customMaterial 參數。

    ```typescript
    @ccclass('SpriteEffectBase')
    export abstract class SpriteEffectBase extends Sprite { 
        private propsTexture: Texture2D | null = null;
        private propBuffer: Float32Array | null = null;

        onLoad() {
            ...
            let mat = this.initMaterial();
            mat.setProperty('propsTexture', propsTexture);
            this.customMaterial = mat;
            ...
        }
        ...
    }
    ```


## 參考文獻
* [【分享】CocosCreator3.x 应用在UI(Sprite) 上的 shader(.effect) 的合批，通过自定义顶点参数](https://forum.cocos.org/t/topic/153963)

* [2D 渲染组件合批规则说明](https://docs.cocos.com/creator/3.8/manual/zh/ui-system/components/engine/ui-batch.html#%E5%90%88%E6%89%B9%E6%96%B9%E6%B3%95%E8%AF%B4%E6%98%8E)


