'use strict';

import { autoAssignEffectAsset, reimportAsset } from "../../util";
import { Selector, base_sprite_update, spriteConst, sprite_template } from "./comp-Sprite";

export const template = `
${sprite_template}

<ui-section class="config" header="Effect Props" expand>
    <ui-prop type="dump" class="effectColor"></ui-prop>
    <ui-prop type="dump" class="is2Din3D"></ui-prop>
    <ui-button class="reload" style="height:24px;margin:16px 0;">Reload Asset</ui-button>

    <ui-prop type="dump" class="rChannelMin"></ui-prop>
    <ui-prop type="dump" class="rChannelMax"></ui-prop>
    <ui-prop type="dump" class="gChannelMin"></ui-prop>
    <ui-prop type="dump" class="gChannelMax"></ui-prop>
    <ui-prop type="dump" class="bChannelMin"></ui-prop>
    <ui-prop type="dump" class="bChannelMax"></ui-prop>
</ui-section>
`;

const effectConst = {
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
    reload: '.reload',
    rChannelMin: '.rChannelMin',
    rChannelMax: '.rChannelMax',
    gChannelMin: '.gChannelMin',
    gChannelMax: '.gChannelMax',
    bChannelMin: '.bChannelMin',
    bChannelMax: '.bChannelMax',
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
    this.$.rChannelMin.render(dump.value.rChannelMin);
    this.$.rChannelMax.render(dump.value.rChannelMax);
    this.$.gChannelMin.render(dump.value.gChannelMin);
    this.$.gChannelMax.render(dump.value.gChannelMax);
    this.$.bChannelMin.render(dump.value.bChannelMin);
    this.$.bChannelMax.render(dump.value.bChannelMax);
}

let isInit = false;

export async function ready(this: Selector<typeof $>) {
    this.$.reload.addEventListener("confirm", async () => {
        await autoAssignEffectAsset('SpriteEffectColorizing');
        await reimportAsset();
    });

    if (!isInit) {
        await autoAssignEffectAsset('SpriteEffectColorizing');
        await reimportAsset();
        isInit = true;
    }
}