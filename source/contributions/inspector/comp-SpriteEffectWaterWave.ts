'use strict';

import { assignEffectAsset, reimportAsset } from "../../util";
import { Selector, base_sprite_update, spriteConst, sprite_template } from "./comp-Sprite";

export const template = `
${sprite_template}

<ui-section class="config" header="Effect Props" expand>
    <ui-prop type="dump" class="effectAsset"></ui-prop>
    <ui-prop type="dump" class="effectColor"></ui-prop>
    <ui-prop type="dump" class="is2Din3D"></ui-prop>
    <ui-button class="reload" style="height:24px;margin:16px 0;">Reload Asset</ui-button>
    <ui-prop type="dump" class="offset"></ui-prop>
    <ui-prop type="dump" class="waveWidth"></ui-prop>
    <ui-prop type="dump" class="waveHeight"></ui-prop>
    <ui-prop type="dump" class="waveSpeed"></ui-prop>
</ui-section>
`;

const effectConst = {
    effectAsset: '.effectAsset',
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    reload: '.reload',
    offset: '.offset',
    waveWidth: '.waveWidth',
    waveHeight: '.waveHeight',
    waveSpeed: '.waveSpeed',
}

export const $ = { ...spriteConst, ...effectConst };

export function update(this: Selector<typeof $>, dump: any) {
    base_sprite_update.call(this, dump);

    // effect props
    this.$.effectAsset.render(dump.value.effectAsset);
    this.$.effectColor.render(dump.value.effectColor);
    this.$.is2Din3D.render(dump.value.is2Din3D);
    if (typeof this.$.reload.render === "function") {
        this.$.reload.render(dump.value.label);
    }
    this.$.offset.render(dump.value.offset);
    this.$.waveWidth.render(dump.value.waveWidth);
    this.$.waveHeight.render(dump.value.waveHeight);
    this.$.waveSpeed.render(dump.value.waveSpeed);
}

let isInit = false;

export async function ready(this: Selector<typeof $>) {
    this.$.reload.addEventListener("confirm", async () => {
        await assignEffectAsset('SpriteEffectWaterWave');
        await reimportAsset();
    });

    if (!isInit) {
        // await assignEffectAsset('SpriteEffectWaterWave');
        // await reimportAsset();
        isInit = true;
    }
}