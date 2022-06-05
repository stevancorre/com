import { Scene as TScene } from "three";

import { config } from "../config";
import { Camera, Renderer, Stats } from ".";

export class Scene extends TScene {
    public readonly camera: Camera;
    public readonly renderer: Renderer;
    public readonly stats: Stats;

    public constructor() {
        super();

        this.background = config.scene.background;

        this.camera = new Camera();
        this.renderer = new Renderer();
        this.stats = new Stats();

        window.addEventListener("resize", () => this.handleResize(), false);
    }

    public animate(): void {
        requestAnimationFrame(() => this.animate());

        this.render();
        this.stats.update();
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
