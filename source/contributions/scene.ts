import { Camera, Canvas, director, find, Layers, Node } from "cc";
import { assignEffectAsset, reimportAsset } from "../util";

const classIdMap: { [key: string]: string } = {
    ["SpriteEffectColor"]: 'c6496Bv0dxAApSoUg42h5Lz',
    ["SpriteEffectColorizing"]: '20603zBoKFLN4Q5V6kEd9S7',
    ["SpriteEffectTransition"]: '6f463dQDhFIn5aLdZNtGpuS',
    ["SpriteEffectDissolve"]: '18a89aWE/xKVqkaiGTOi3+S',
    ["SpriteEffectDistort"]: 'c3398hqo91I14qg5Yx9QMZ0',
    ["SpriteEffectFlowLight"]: 'fad028dNo1AO7/Ha84/lbRO',
    ["SpriteEffectGaussianBlur"]: 'b4cd9DMOSZDZJNBTtka9K8l',
    ["SpriteEffectShadow"]: '6acadLrR85GG5gtfeWP+eMN',
    ["SpriteEffectTest"]: '0c212nm0DhIKqodQ9hpgPQf',
    ["SpriteEffectWaterFlow"]: '76000uzo1VDjKouHxxGxirw',
    ["SpriteEffectWaterRipple"]: '4cb70X8jgtA6YJR2wD9bTyI',
    ["SpriteEffectWaterWave"]: 'e7c2fH4W0BPXKTIAIKn2ff5',
}

export function load() {

}

export function unload() {

}

export const methods = {
    async addEffect(nameOfEffect: string) {
        console.log(`Adding effect: ${nameOfEffect}`);

        let canvasNode: Node | null = null;
        const rootNode = director.getScene() as Node;

        for (const childNode of rootNode.children) {
            if (childNode.getComponent(Canvas)) {
                canvasNode = childNode;
                break;
            }
        }

        if (!canvasNode) {
            canvasNode = new Node();
            canvasNode.setParent(rootNode);
            canvasNode.name = 'Canvas';
            canvasNode.layer = Layers.Enum.UI_2D;
            let canvasComp = canvasNode.addComponent(Canvas);

            let camNode = new Node();
            camNode.setParent(canvasNode);
            camNode.name = 'Camera';
            camNode.layer = Layers.Enum.UI_2D;
            let camComp = camNode.addComponent(Camera);
            camComp.priority = 65535;
            camComp.visibility = Layers.Enum.UI_2D | Layers.Enum.UI_3D;
            camComp.projection = Camera.ProjectionType.ORTHO;

            canvasComp.cameraComponent = camComp;
        }

        let nameOfCount = 0;
        for (const childNode of canvasNode.children) {
            if (childNode.name.includes(nameOfEffect)) {
                nameOfCount++;
            }
        }

        let node = new Node();
        node.setParent(canvasNode);
        node.name = nameOfCount === 0 ? nameOfEffect : `${nameOfEffect}-${nameOfCount.toString().padStart(3, '0')}`;
        node.layer = Layers.Enum.UI_2D;

        let classID = classIdMap[nameOfEffect] || '';
        if (classID !== '') {
            await Editor.Message.request('scene', 'create-component', {
                uuid: node.uuid,
                component: classID
            });

            const res = await assignEffectAsset(nameOfEffect, node.uuid);
            if (res) {
                reimportAsset();
                console.log(`Effect自動掛載成功`);
            }
            else {
                console.log(`Effect自動掛載失敗`);
            }
        }
        else {
            console.error('No class ID found for effect: ' + nameOfEffect);
        }
    }
}