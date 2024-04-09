import { _decorator, Component, EditBox, lerp, Node, Slider } from 'cc';
import { EffectDistort } from '../../script/EffectDistort';

const { ccclass, property } = _decorator;

@ccclass('DistortSample')
export class DistortSample extends Component {
    @property({ type: EffectDistort })
    public effect: EffectDistort = null;

    @property({ type: Slider })
    public speed: Slider = null;

    @property({ type: Slider })
    public strength: Slider = null;

    public speedCallback(slider: Slider) {
        this.effect.speed = lerp(0.01, 0.1, slider.progress);

        const editBox = slider.node.getComponentInChildren(EditBox);
        editBox.string = slider.progress.toFixed(2);
    }

    public strengthCallback(slider: Slider) {
        this.effect.strength = lerp(0.01, 0.1, slider.progress);

        const editBox = slider.node.getComponentInChildren(EditBox);
        editBox.string = slider.progress.toFixed(2);
    }

    start() {
        // Speed
        this.speed.progress = (this.effect.speed - 0.01) / (0.1 - 0.01);

        const speedLabel = this.speed.getComponentInChildren(EditBox);
        speedLabel.string = `Speed`;

        const speedEditBox = this.speed.getComponentInChildren(EditBox);
        speedEditBox.string = this.effect.speed.toFixed(2);

        // Strength
        this.strength.progress = (this.effect.strength - 0.01) / (0.1 - 0.01);

        const strengthLabel = this.strength.getComponentInChildren(EditBox);
        strengthLabel.string = `Strength`;

        const strengthEditBox = this.strength.getComponentInChildren(EditBox);
        strengthEditBox.string = this.effect.strength.toFixed(2);
    }
}

