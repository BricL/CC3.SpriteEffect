import { _decorator, Component, EditBox, lerp, Node, Slider } from 'cc';
import { EffectGaussianBlur } from '../../script/EffectGaussianBlur';

const { ccclass, property } = _decorator;

@ccclass('GaussianBlurSample')
export class GaussianBlurSample extends Component {
    @property({ type: EffectGaussianBlur })
    public effect: EffectGaussianBlur = null;

    @property({ type: Slider })
    public blur: Slider = null;

    public blurCallback(slider: Slider) {
        this.effect.blur = lerp(0.0, 1.0, slider.progress);

        const editBox = slider.node.getComponentInChildren(EditBox);
        editBox.string = slider.progress.toFixed(2);
    }

    start() {
       this.blur.progress = this.effect.blur;

       const speedLabel = this.blur.getComponentInChildren(EditBox);
       speedLabel.string = `Blur`;

       const speedEditBox = this.blur.getComponentInChildren(EditBox);
       speedEditBox.string = this.effect.blur.toFixed(2);
    }
}

