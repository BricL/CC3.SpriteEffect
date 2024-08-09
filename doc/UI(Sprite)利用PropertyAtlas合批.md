# UI(Sprite) 利用 Property Atlas 合批

依官方文件[【2D 渲染组件合批规则说明】](https://docs.cocos.com/creator/3.8/manual/zh/ui-system/components/engine/ui-batch.html#%E5%90%88%E6%89%B9%E6%96%B9%E6%B3%95%E8%AF%B4%E6%98%8E)，Sprite 一但使用 customMaterial 合批 (batch) 就會被拆分。而同 Shader 不同參數想合批，正統是將參數帶入頂點中。詳細做法論壇上的 bakabird 大大提供保母級的教程 [【分享】CocosCreator3.x 应用在UI(Sprite) 上的 shader(.effect) 的合批，通过自定义顶点参数](https://forum.cocos.org/t/topic/153963)。

但這方法需對 Sprite 的 4 種頂點宣告模式 (SIMPLE、SLICE、TILED、FILLED) 作實現。對我個人這種懶惰鬼來說是有那麼一點麻煩。

因此想到早期研發引擎時用過方法 `Propert Atlas` 將同 Shader 不同參數 pack 至一張貼圖，透過索引 (index) 於 Shader 取出所屬參數進行渲染，如此就能利用引擎本身的合批減少 drawcall。

對不同的 Shader 效果的參數還能有個統一的做法，想起來是不是有點甜?

### 實踐思路
* 一張 Shader `參數貼圖`，採用格式 RGBA32。
* 每個 Sprite 有代表自己的 index 傳入 Shader 中，以便取出自己所屬的參數。
* Component 依據 index 將參數存入`參數貼圖`中。

問題來了，如何產生 index 傳入 Shader 中？我想到最簡單的方法就是拿 Sprite.color 屬性當成 index，利用引擎原本就將該屬性綁定在頂點上的特性。

## 上代碼

* 繼承 Sprite Component

    ```typescript
    @ccclass('SpriteEffectBase')
    export class SpriteEffectBase extends Sprite { 
        ...
    }
    ```

* 建立一張 128x128 RGBA32F 的參數貼圖

    ```typescript
    @ccclass('SpriteEffectBase')
    export class SpriteEffectBase extends Sprite { 
        private static propsTexture: Texture2D | null = null;
        private static propBuffer: Float32Array | null = null;

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
    export class SpriteEffectBase extends Sprite {
        @property({ type: EffectAsset, tooltip: '指定效果EffectAsset' })
        public effectAsset: EffectAsset | null = null;
    
        private static propsTexture: Texture2D | null = null;
        private static propBuffer: Float32Array | null = null;

        onLoad() {
            ...
            let mat = new Material();
            mat.initialize(
                {
                    effectAsset: this.effectAsset,
                    defines: {},
                }
            );
            mat.setProperty('propsTexture', propsTexture);
            this.customMaterial = mat;
            ...
        }
        ...
    }
    ```
* 在 laterUpdate 時，若有參數有異動時進行更新

  ```typescript
  @ccclass('SpriteEffectBase')
  export class SpriteEffectBase extends Sprite {
      ...
      private static isDirty: boolean = false;
      ...
      lateUpdate(dt: number): void {    
            if (this.isDirty) {
                this.propsTexture.uploadData(this.propBuffer);
                this.isDirty = false;
            }
      }
  }
  ```


## 參考文獻
* [【分享】CocosCreator3.x 应用在UI(Sprite) 上的 shader(.effect) 的合批，通过自定义顶点参数](https://forum.cocos.org/t/topic/153963)

* [2D 渲染组件合批规则说明](https://docs.cocos.com/creator/3.8/manual/zh/ui-system/components/engine/ui-batch.html#%E5%90%88%E6%89%B9%E6%96%B9%E6%B3%95%E8%AF%B4%E6%98%8E)


