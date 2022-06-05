import { Scene as TScene } from "three";

import { config } from "../config";
import { Camera, Renderer } from ".";

export class Scene extends TScene {
    public readonly camera: Camera;
    public readonly renderer: Renderer;

    public constructor() {
        super();

        this.background = config.scene.background;

        this.camera = new Camera();
        this.renderer = new Renderer();

        window.addEventListener("resize", () => this.handleResize(), false);
    }

    public animate(): void {
        requestAnimationFrame(() => this.animate());

        this.render();
    }

    private render(): void {
        this.renderer.render(this, this.camera);
    }

    private handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.render();
    }
}
