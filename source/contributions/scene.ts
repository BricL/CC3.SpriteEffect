import { Camera, Canvas, director, find, Layers, Node } from "cc";

export function load() {

}

export function unload() {

}

export const methods = {
    addEffect(nameOfEffect: string) {
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

        let classID = '';
        if (nameOfEffect === 'SpriteEffectColor') {
            classID = 'c6496Bv0dxAApSoUg42h5Lz';
        }

        if (classID !== '') {
            Editor.Message.request('scene', 'create-component', {
                uuid: node.uuid,
                component: classID
            })
        }
        else {
            console.error('No class ID found for effect: ' + nameOfEffect);
        }
    }
}