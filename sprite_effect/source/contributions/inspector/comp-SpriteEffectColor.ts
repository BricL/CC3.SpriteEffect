'use strict';

import { autoAssignEffectAsset, autoAssignTextureAsset } from "../../util";

type Selector<$> = { $: Record<keyof $, any | null> }

export const template = `
<ui-prop type="dump" class="spriteAtlas"></ui-prop>
<ui-prop type="dump" class="spriteFrame"></ui-prop>
<ui-prop type="dump" class="sizeMode"></ui-prop>
<ui-prop type="dump" class="type"></ui-prop>
<ui-prop type="dump" class="trim"></ui-prop>
<ui-prop type="dump" class="fillType"></ui-prop>
<ui-prop type="dump" class="fillCenter"></ui-prop>
<ui-prop type="dump" class="fillStart"></ui-prop>
<ui-prop type="dump" class="fillRange"></ui-prop>

<ui-section class="config" header="Effect Props" expand>
    <ui-prop type="dump" class="effectColor"></ui-prop>
    <ui-prop type="dump" class="is2Din3D"></ui-prop>
    <ui-button class="reload" style="height:24px;margin:16px 0;">Reload Asset</ui-button>

    <ui-prop type="dump" class="toneMode"></ui-prop>
    <ui-prop type="dump" class="toneFactor"></ui-prop>
    <ui-prop type="dump" class="colorMode"></ui-prop>
    <ui-prop type="dump" class="colorFactor"></ui-prop>
    <ui-prop type="dump" class="blurMode"></ui-prop>
    <ui-prop type="dump" class="blurFactor"></ui-prop>
</ui-section>
`;

const spriteConst = {
    spriteAtlas: '.spriteAtlas',
    spriteFrame: '.spriteFrame',
    sizeMode: '.sizeMode',
    type: '.type',
    trim: '.trim',
    fillType: '.fillType',
    fillCenter: '.fillCenter',
    fillStart: '.fillStart',
    fillRange: '.fillRange',
}

const effectConst = {
    effectColor: '.effectColor',
    is2Din3D: '.is2Din3D',
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
    // 使用 ui-porp 自动渲染，设置 prop 的 type 为 dump
    // render 传入一个 dump 数据，能够自动渲染出对应的界面
    // 自动渲染的界面修改后，能够自动提交数据

    // sprite props
    this.$.spriteAtlas.render(dump.value.spriteAtlas);
    this.$.spriteFrame.render(dump.value.spriteFrame);
    this.$.sizeMode.render(dump.value.sizeMode);
    this.$.type.render(dump.value.type);
    this.$.trim.render(dump.value.trim);
    this.$.fillType.render(dump.value.fillType);
    this.$.fillCenter.render(dump.value.fillCenter);
    this.$.fillStart.render(dump.value.fillStart);
    this.$.fillRange.render(dump.value.fillRange);

    if (dump.value.type.value == 0) {
        // trim only show when type is simple
        this.$.trim.removeAttribute('hidden');
    } else {
        this.$.trim.setAttribute('hidden', '');
    }

    if (dump.value.type.value == 3) {
        this.$.fillType.removeAttribute('hidden');
        this.$.fillCenter.removeAttribute('hidden');
        this.$.fillStart.removeAttribute('hidden');
        this.$.fillRange.removeAttribute('hidden');

        if (dump.value.fillType.value == 2) {
            // fillCenter only editable when fillType is radial
            this.$.fillCenter.removeAttribute('readonly');
        } else {
            this.$.fillCenter.setAttribute('readonly', '');
        }
    } else {
        this.$.fillType.setAttribute('hidden', '');
        this.$.fillCenter.setAttribute('hidden', '');
        this.$.fillStart.setAttribute('hidden', '');
        this.$.fillRange.setAttribute('hidden', '');
    }

    // effect props
    this.$.effectColor.render(dump.value.effectColor);
    this.$.is2Din3D.render(dump.value.is2Din3D);
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

export async function ready(this: Selector<typeof $>) {
    this.$.reload.addEventListener("confirm", async () => {
        const reloadTsFile_000 = await Editor.Message.request("asset-db", "reimport-asset", "853e8fbf-9769-49a8-b2d2-0016390b6953");

        // const effectCompName = 'SpriteEffectColor';
        // const uuids = Editor.Selection.getSelected('node');
        // const node = await Editor.Message.request('scene', 'query-node', uuids[0]);
        // if (!node) {
        //     console.warn(`未選中節點`);
        //     return;
        // }

        // const index = node.__comps__.findIndex((v: any) => v.type === effectCompName);
        // if (index === -1) {
        //     console.warn(`節點未掛載${effectCompName}組件`);
        //     return;
        // }

        // const effectFileName = effectCompName.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
        // const url = `db://assets/sprite_effect/effect/${effectFileName}.effect`;
        // console.log(`url: ${url}`);

        // const res = await Editor.Message.request('asset-db', 'query-asset-info', url);
        // await Editor.Message.request("asset-db", "reimport-asset", res!.uuid);
    });

    await autoAssignEffectAsset('SpriteEffectColor');
}