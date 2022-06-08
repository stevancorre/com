import { KeyNotFoundError } from "not-enough-errors";
import { BufferGeometry, Material, Mesh, Object3D } from "three";

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

    protected tryGetObjectByName(name: string): Object3D {
        const object: Object3D | undefined = this.scene.getObjectByName(name);
        if (object !== undefined) return object;

        throw new KeyNotFoundError(name, "Object not found");
    }

    public update?(): void;
}
