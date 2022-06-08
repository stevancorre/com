import { AmbientLight, Clock, DirectionalLight, Scene as TScene } from "three";

import { config } from "../config";
import { Cursor } from "./cursor";
import { Renderer } from "./renderer";
import { Camera } from "./camera";
import { Stats } from "./stats";

export class Scene extends TScene {
    public readonly camera: Camera;
    public readonly renderer: Renderer;
    public readonly stats: Stats;
    public readonly cursor: Cursor;

    private static readonly clock: Clock = new Clock();
    private static instance: Scene;
    private static deltaTime: number;

    public constructor() {
        super();

        this.background = config.scene.backgroundColor;

        this.camera = new Camera();
        this.renderer = new Renderer();
        this.stats = new Stats();
        this.cursor = new Cursor();

        this.initLights();

        window.addEventListener("resize", () => this.handleResize(), false);

        Scene.instance = this;

        Scene.clock.start();
    }

    public static get DeltaTime(): number {
        return this.deltaTime;
    }

    public static get Instance(): Scene {
        return this.instance;
    }

    public animate(): void {
        requestAnimationFrame(() => this.animate());

        Scene.deltaTime = Scene.clock.getDelta();

        this.render();
        this.stats.update();
    }

    private initLights() {
        const light = new DirectionalLight(config.scene.lightColor, 0.9);
        light.castShadow = true;
        light.position.set(-10, 20, 10);

        light.shadow.camera.left = -20;
        light.shadow.camera.right = 20;
        light.shadow.camera.top = 20;
        light.shadow.camera.bottom = -20;

        light.shadow.mapSize.x = 4096;
        light.shadow.mapSize.y = 4096;

        const ambiant = new AmbientLight(config.scene.lightColor, 0.2);

        this.add(light, ambiant);
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
