import { OrthographicCamera } from "three";

import { config } from "../config";

export class Camera extends OrthographicCamera {
    public constructor() {
        const aspect: number = window.innerWidth / window.innerHeight;

        super(
            -config.camera.size * aspect,
            config.camera.size * aspect,
            config.camera.size,
            -config.camera.size,
            config.camera.near,
            config.camera.far,
        );

        this.position.set(20, 20, 20);
        this.lookAt(0, 0, 0);
    }

    public updateCamera(): void {
        const aspect: number = window.innerWidth / window.innerHeight;

        this.left = -config.camera.size * aspect;
        this.right = config.camera.size * aspect;

        this.updateProjectionMatrix();
    }
}
