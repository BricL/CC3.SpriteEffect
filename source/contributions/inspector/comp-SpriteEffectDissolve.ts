'use strict';

import { autoAssignEffectAsset, reimportAsset } from "../../util";
import { base_sprite_update, spriteConst, sprite_template } from "./comp-Sprite";

type Selector<T> = { $: Record<keyof T, any | null> }

export const template = `
${sprite_template}

<ui-section class="config" header="Effect Props" expand>
    <ui-prop type="dump" class="effectColor"></ui-prop>
    <ui-prop type="dump" class="is2Din3D"></ui-prop>
    <ui-button class="reload" style="height:24px;margin:16px 0;">Reload Asset</ui-button>

    <ui-prop type="dump" class="noiseTexture"></ui-prop>
    <ui-prop type="dump" class="dissolveColor"></ui-prop>
    <ui-prop type="dump" class="factor"></ui-prop>
    <ui-prop type="dump" class="softness"></ui-prop>
    <ui-prop type="dump" class="width"></ui-prop>
</ui-section>
`;

const effectConst = {
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    reload: '.reload',

    noiseTexture: '.noiseTexture',
    dissolveColor: '.dissolveColor',
    factor: '.factor',
    softness: '.softness',
    width: '.width',
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
    this.$.dissolveColor.render(dump.value.dissolveColor);
    this.$.factor.render(dump.value.factor);
    this.$.softness.render(dump.value.softness);
    this.$.width.render(dump.value.width);
}

let isInit = false;

export async function ready(this: Selector<typeof $>) {
    this.$.reload.addEventListener("confirm", async () => {
        await autoAssignEffectAsset('SpriteEffectDissolve');
        await reimportAsset();
    });

    if (!isInit) {
        await autoAssignEffectAsset('SpriteEffectDissolve');
        await reimportAsset();
        isInit = true;
    }
}