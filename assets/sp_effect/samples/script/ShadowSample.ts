import { _decorator, Component, EditBox, lerp, Node, Slider, Vec2 } from 'cc';
import { EffectShadow, ShadowType } from '../../script/EffectShadow';

const { ccclass, property } = _decorator;

@ccclass('ShadowSample')
export class ShadowSample extends Component {
    @property({ type: EffectShadow })
    public effect: EffectShadow = null;

    @property({ type: Slider })
    public xOffset: Slider = null;

    @property({ type: Slider })
    public yOffset: Slider = null;

    public xOffsetCallback(slider: Slider) {
        this.effect.offset = new Vec2(lerp(-1.0, 1.0, slider.progress), this.effect.offset.y);

        const editBox = slider.node.getComponentInChildren(EditBox);
        editBox.string = slider.progress.toFixed(2);
    }

    public yOffsetCallback(slider: Slider) {
        this.effect.offset = new Vec2(this.effect.offset.x, lerp(-1.0, 1.0, slider.progress));

        const editBox = slider.node.getComponentInChildren(EditBox);
        editBox.string = slider.progress.toFixed(2);
    }
    
    public shadowTypeCallback(event: TouchEvent) {
        const node = event.target as unknown as Node;
        let shadowType: ShadowType = ShadowType[node.name as keyof typeof ShadowType];
        this.effect.shadowType = shadowType;
    }

    start() {
        // X Offset 
        const xOffsetEditBox = this.xOffset.getComponentInChildren(EditBox);
        xOffsetEditBox.string = lerp(-1.0, 1.0, this.xOffset.progress).toFixed(2);

        // Y Offset 
        const yOffsetEditBox = this.yOffset.getComponentInChildren(EditBox);
        yOffsetEditBox.string = lerp(-1.0, 1.0, this.yOffset.progress).toFixed(2);
    }
}

