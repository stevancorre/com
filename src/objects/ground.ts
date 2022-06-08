import {
    BufferGeometry,
    BoxBufferGeometry,
    Material,
    MeshPhongMaterial,
} from "three";

import { GROUND_NAME } from "../constants";
import { SceneObject } from "../core/sceneObject";

export class Ground extends SceneObject {
    public constructor() {
        const geometry: BufferGeometry = new BoxBufferGeometry(10, 1, 10);
        const material: Material = new MeshPhongMaterial();

        super(geometry, material);

        this.name = GROUND_NAME;
        this.receiveShadow = true;
    }
}
