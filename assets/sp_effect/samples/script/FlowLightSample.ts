import { _decorator, Component, EditBox, Label, lerp, Node, Slider } from 'cc';
import { EffectFlowLight } from '../../script/EffectFlowLight';

const { ccclass, property } = _decorator;

@ccclass('FlowLightSample')
export class FlowLightSample extends Component {
    @property({ type: EffectFlowLight })
    public effect: EffectFlowLight = null;

    @property({ type: Slider })
    public lightWidth: Slider = null;

    @property({ type: Slider })
    public soft: Slider = null;

    @property({ type: Slider })
    public offset: Slider = null;

    @property({ type: Slider })
    public rotation: Slider = null;

    public lightWidthCallback(slider: Slider) {
        let value = lerp(0.0, 2.0, slider.progress);
        this.effect.lightWidth = value;

        const editBox = slider.node.getComponentInChildren(EditBox);
        editBox.string = value.toFixed(2);
    }

    public softCallback(slider: Slider) {
        let value = lerp(0.0, 10.0, slider.progress);
        this.effect.soft = value;

        const editBox = slider.node.getComponentInChildren(EditBox);
        editBox.string = value.toFixed(2);
    }

    public offsetCallback(slider: Slider) {
        let value = lerp(-3.0, 3.0, slider.progress);
        this.effect.offset = value;

        const editBox = slider.node.getComponentInChildren(EditBox);
        editBox.string = value.toFixed(2);
    }

    public rotationCallback(slider: Slider) {
        let value = lerp(0.0, 6.28, slider.progress);
        this.effect.rotation = value;

        const editBox = slider.node.getComponentInChildren(EditBox);
        editBox.string = value.toFixed(2);
    }

    start() {
        // Light Width
        this.lightWidth.progress = this.effect.lightWidth/2.0;

        const lightWidthLabel = this.lightWidth.getComponentInChildren(Label);
        lightWidthLabel.string = `Light Width`;

        const lightWidthEditBox = this.lightWidth.node.getComponentInChildren(EditBox);
        lightWidthEditBox.string = this.effect.lightWidth.toFixed(2);

        // Soft
        this.soft.progress = this.effect.soft/10.0;

        const softLabel = this.soft.getComponentInChildren(Label);
        softLabel.string = `Soft`;

        const softEditBox = this.soft.node.getComponentInChildren(EditBox);
        softEditBox.string = this.effect.soft.toFixed(2);

        // Offset
        this.offset.progress = ((this.effect.offset/3.0) + 1.0) / 2.0;

        const offsetLabel = this.offset.getComponentInChildren(Label);
        offsetLabel.string = `Offset`;

        const offsetEditBox = this.offset.node.getComponentInChildren(EditBox);
        offsetEditBox.string = this.effect.offset.toFixed(2);

        // Rotation
        this.rotation.progress = this.effect.rotation/6.28;

        const rotationLabel = this.rotation.getComponentInChildren(Label);
        rotationLabel.string = `Rotation`;

        const rotationEditBox = this.rotation.node.getComponentInChildren(EditBox);
        rotationEditBox.string = this.effect.rotation.toFixed(2);
    }
}

