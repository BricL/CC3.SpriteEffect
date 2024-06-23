'use strict';

import { assignEffectAsset, reimportAsset } from "../../util";
import { Selector, base_sprite_update, spriteConst, sprite_template } from "./comp-Sprite";

export const template = `
${sprite_template}

<ui-section class="config" header="Effect Props" expand>
    <ui-prop type="dump" class="effectColor"></ui-prop>
    <ui-prop type="dump" class="is2Din3D"></ui-prop>
    <ui-button class="reload" style="height:24px;margin:16px 0;">Reload Asset</ui-button>

    <ui-prop type="dump" class="noiseTexture"></ui-prop>
    <ui-prop type="dump" class="frequency"></ui-prop>
    <ui-prop type="dump" class="amplitude"></ui-prop>
    <ui-prop type="dump" class="speed"></ui-prop>
    <ui-prop type="dump" class="flowDirection"></ui-prop>
</ui-section>
`;

const effectConst = {
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    reload: '.reload',
    noiseTexture: '.noiseTexture',
    frequency: '.frequency',
    amplitude: '.amplitude',
    speed: '.speed',
    flowDirection: '.flowDirection',
}

export const $ = { ...spriteConst, ...effectConst };

export function update(this: Selector<typeof $>, dump: any) {
    base_sprite_update.call(this, dump);

    // effect props
    this.$.effectColor.render(dump.value.effectColor);
    this.$.is2Din3D.render(dump.value.is2Din3D);
    if (typeof this.$.reload.render === "function") {
        this.$.reload.render(dump.value.label);
    }

    this.$.noiseTexture.render(dump.value.noiseTexture);
    this.$.frequency.render(dump.value.frequency);
    this.$.amplitude.render(dump.value.amplitude);
    this.$.speed.render(dump.value.speed);
    this.$.flowDirection.render(dump.value.flowDirection);
}

let isInit = false;

export async function ready(this: Selector<typeof $>) {
    this.$.reload.addEventListener("confirm", async () => {
        await assignEffectAsset('SpriteEffectWaterFlow');
        await reimportAsset();
    });

    if (!isInit) {
        await assignEffectAsset('SpriteEffectWaterFlow');
        await reimportAsset();
        isInit = true;
    }
}