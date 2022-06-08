import { BufferGeometry, Material, Mesh } from "three";

import { Scene } from "./scene";

export abstract class SceneObject extends Mesh<
    BufferGeometry,
    Material | Material[]
> {
    protected readonly scene: Scene;

    protected constructor(
        geometry?: BufferGeometry,
        material?: Material | Material[],
    ) {
        super(geometry, material);

        this.scene = Scene.Instance;
    }
}
