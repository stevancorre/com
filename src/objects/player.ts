import {
    BufferGeometry,
    Intersection,
    Material,
    Object3D,
    Raycaster,
    MeshPhongMaterial,
    BoxBufferGeometry,
} from "three";

import { GROUND_NAME } from "../constants";
import { SceneObject } from "../core/sceneObject";

export class Player extends SceneObject {
    private readonly raycaster: Raycaster = new Raycaster();
    private readonly ground: Object3D;

    public constructor() {
        const geometry: BufferGeometry = new BoxBufferGeometry(1, 1, 1);
        const material: Material = new MeshPhongMaterial();

        super(geometry, material);

        this.castShadow = true;
        this.receiveShadow = true;

        window.addEventListener("click", (e) => this.onMouseClick(e));

        this.ground = this.tryGetObjectByName(GROUND_NAME);
    }

    private onMouseClick(e: MouseEvent): void {
        this.raycaster.setFromCamera(
            {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            },
            this.scene.camera,
        );

        const hit: Intersection | undefined = this.raycaster.intersectObject(
            this.ground,
        )[0];
        if (hit === undefined) return;

        this.position.set(hit.point.x, 1, hit.point.z);
    }
}
