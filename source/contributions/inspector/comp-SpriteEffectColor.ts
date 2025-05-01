'use strict';

import { assignEffectAsset, reimportAsset } from "../../util";
import { Selector, spriteConst, sprite_template, base_sprite_update } from "./comp-Sprite";

export const template = `
${sprite_template}

<ui-section class="config" header="Effect Props" expand>
    <ui-prop type="dump" class="effectAsset"></ui-prop>
    <ui-prop type="dump" class="effectColor"></ui-prop>
    <ui-prop type="dump" class="is2Din3D"></ui-prop>
    <ui-prop type="dump" class="sampleFromRT"></ui-prop>
    <ui-button class="reload" style="height:24px;margin:16px 0;">Reload Asset</ui-button>

    <ui-prop type="dump" class="toneMode"></ui-prop>
    <ui-prop type="dump" class="toneFactor"></ui-prop>
    <ui-prop type="dump" class="colorMode"></ui-prop>
    <ui-prop type="dump" class="colorFactor"></ui-prop>
    <ui-prop type="dump" class="blurMode"></ui-prop>
    <ui-prop type="dump" class="blurFactor"></ui-prop>
</ui-section>
`;

const effectConst = {
    effectAsset: '.effectAsset',
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    sampleFromRT: '.sampleFromRT',
    toneMode: '.toneMode',
    toneFactor: '.toneFactor',
    colorMode: '.colorMode',
    colorFactor: '.colorFactor',
    blurMode: '.blurMode',
    blurFactor: '.blurFactor',
    reload: '.reload',
}

export const $ = { ...spriteConst, ...effectConst };

export function update(this: Selector<typeof $>, dump: any) {
    base_sprite_update.call(this, dump);

    // effect props
    this.$.effectAsset.render(dump.value.effectAsset);
    this.$.effectColor.render(dump.value.effectColor);
    this.$.is2Din3D.render(dump.value.is2Din3D);
    this.$.sampleFromRT.render(dump.value.sampleFromRT);
    if (typeof this.$.reload.render === "function") {
        this.$.reload.render(dump.value.label);
    }

    this.$.toneMode.render(dump.value.toneMode);
    this.$.toneFactor.render(dump.value.toneFactor);
    this.$.colorMode.render(dump.value.colorMode);
    this.$.colorFactor.render(dump.value.colorFactor);
    this.$.blurMode.render(dump.value.blurMode);
    this.$.blurFactor.render(dump.value.blurFactor);
}

let isInit = false;

export async function ready(this: Selector<typeof $>) {
    this.$.reload.addEventListener("confirm", async () => {
        await assignEffectAsset('SpriteEffectColor');
        await reimportAsset();
    });

    if (!isInit) {
        // await autoAssignEffectAsset('SpriteEffectColor');
        // await reimportAsset();
        isInit = true;
    }
}