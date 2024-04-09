import { _decorator, Component, Node, Slider, Label, EditBox } from 'cc';
import { BlurMode, ColorMode, EffectColor, ToneMode } from '../../script/EffectColor';

const { ccclass, property } = _decorator;

@ccclass('ColorSample')
export class ColorSample extends Component {
    @property({ type: EffectColor })
    public effect: EffectColor = null;

    @property({ type: Slider })
    public toneSlider: Slider = null;

    @property({ type: Slider })
    public colorSlider: Slider = null;

    @property({ type: Slider })
    public blurSlider: Slider = null;

    public toneModeCallback(event: TouchEvent) {
        const node = event.target as unknown as Node;
        let toneMode: ToneMode = ToneMode[node.name as keyof typeof ToneMode];
        this.effect.toneMode = toneMode;
    }

    public colorModeCallback(event: TouchEvent) {
        const node = event.target as unknown as Node;
        let colorMode: ColorMode = ColorMode[node.name as keyof typeof ColorMode];
        this.effect.colorMode = colorMode;
    }

    public blurModeCallback(event: TouchEvent) {
        const node = event.target as unknown as Node;
        let blurMode: BlurMode = BlurMode[node.name as keyof typeof BlurMode];
        this.effect.blurMode = blurMode;
    }

    public toneFactorCallback(slider: Slider) {
        let toneFactor = slider.progress;
        this.effect.toneFactor = toneFactor;

        const label = slider.getComponentInChildren(Label);
        label.string = `Tone Factor`;

        const editBox = slider.node.getComponentInChildren(EditBox);
        editBox.string = toneFactor.toFixed(2);
    }

    public colorFactorCallback(slider: Slider) {
        let colorFactor = slider.progress;
        this.effect.colorFactor = colorFactor;

        const label = slider.getComponentInChildren(Label);
        label.string = `Color Factor`;

        const editBox = slider.node.getComponentInChildren(EditBox);
        editBox.string = colorFactor.toFixed(2);
    }

    public blurFactorCallback(slider: Slider) {
        let blurFactor = slider.progress;
        this.effect.blurFactor = blurFactor;

        const label = slider.getComponentInChildren(Label);
        label.string = `Blur Factor`;

        const editBox = slider.node.getComponentInChildren(EditBox);
        editBox.string = blurFactor.toFixed(2);
    }

    protected start(): void {
        this.toneSlider.getComponentInChildren(Label).string = `Tone Factor`;
        this.colorSlider.getComponentInChildren(Label).string = `Color Factor`;
        this.blurSlider.getComponentInChildren(Label).string = `Blur Factor`;

        this.effect.toneFactor = this.toneSlider.progress;
        this.effect.colorFactor = this.colorSlider.progress;
        this.effect.blurFactor = this.blurSlider.progress;
    }
}

