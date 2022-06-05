import { PerspectiveCamera } from "three";

import { config } from "../config";

export class Camera extends PerspectiveCamera {
    public constructor() {
        super(
            config.camera.fov,
            window.innerWidth / window.innerHeight,
            config.camera.near,
            config.camera.far,
        );

        this.position.set(1, 1, 1);
        this.lookAt(0, 0, 0);
    }
}
