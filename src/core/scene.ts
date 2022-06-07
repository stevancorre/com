import { Clock, Scene as TScene } from "three";

import { config } from "../config";
import { Camera, Renderer, Stats } from ".";
import { Cursor } from "./cursor";

export class Scene extends TScene {
    public readonly camera: Camera;
    public readonly renderer: Renderer;
    public readonly stats: Stats;
    public readonly cursor: Cursor;

    private static readonly clock: Clock = new Clock();
    private static deltaTime: number;

    public constructor() {
        super();

        this.background = config.scene.backgroundColor;

        this.camera = new Camera();
        this.renderer = new Renderer();
        this.stats = new Stats();
        this.cursor = new Cursor();

        window.addEventListener("resize", () => this.handleResize(), false);

        Scene.clock.start();
    }

    public static get DeltaTime(): number {
        return this.deltaTime;
    }

    public animate(): void {
        requestAnimationFrame(() => this.animate());

        Scene.deltaTime = Scene.clock.getDelta();

        this.render();
        this.stats.update();
    }

    private render(): void {
        this.renderer.render(this, this.camera);
        this.cursor.render();
    }

    private handleResize() {
        this.camera.updateCamera();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.render();
    }
}
