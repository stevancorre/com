import {
    BufferGeometry,
    Intersection,
    Material,
    Object3D,
    Raycaster,
    MeshPhongMaterial,
    BoxBufferGeometry,
    Vector3,
} from "three";
import { config } from "../config";

import { GROUND_NAME } from "../constants";
import { SceneObject } from "../core/sceneObject";

export class Player extends SceneObject {
    private readonly raycaster: Raycaster = new Raycaster();
    private readonly ground: Object3D;

    private targetPosition?: Vector3;

    public constructor() {
        const geometry: BufferGeometry = new BoxBufferGeometry(1, 1, 1);
        const material: Material = new MeshPhongMaterial();

        super(geometry, material);

        this.castShadow = true;
        this.receiveShadow = true;

        window.addEventListener("click", (e) => this.onMouseClick(e));

        this.ground = this.tryGetObjectByName(GROUND_NAME);
        this.position.set(0, 1, 0);
    }

    public update(): void {
        if (this.targetPosition === undefined) return;

        const targetNormalizedVector = new Vector3(0, 0, 0);
        targetNormalizedVector.x = this.targetPosition.x - this.position.x;
        targetNormalizedVector.y = this.targetPosition.y - this.position.y;
        targetNormalizedVector.z = this.targetPosition.z - this.position.z;
        targetNormalizedVector.normalize();

        const step: number = config.player.speed * this.scene.getDeltaTime();
        this.translateOnAxis(targetNormalizedVector, step);

        if (this.position.distanceTo(this.targetPosition) < 0.1) {
            this.position.copy(this.targetPosition);
            this.targetPosition = undefined;
        }
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
        if (hit === undefined || hit.point.y < 0.49) return;

        this.targetPosition = new Vector3(hit.point.x, 1, hit.point.z);
    }
}
