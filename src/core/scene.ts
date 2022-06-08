import {
    AmbientLight,
    Clock,
    DirectionalLight,
    Event,
    Object3D,
    Scene as TScene,
} from "three";

import { config } from "../config";
import { Cursor } from "./cursor";
import { Renderer } from "./renderer";
import { Camera } from "./camera";
import { Stats } from "./stats";
import { SceneObject } from "./sceneObject";

export class Scene extends TScene {
    private static instance: Scene;

    public readonly camera: Camera;
    public readonly renderer: Renderer;
    public readonly stats: Stats;
    public readonly cursor: Cursor;

    private readonly clock: Clock;

    private objects: SceneObject[] = [];
    private deltaTime = 0;

    public constructor() {
        super();

        Scene.instance = this;

        this.background = config.scene.backgroundColor;

        this.camera = new Camera();
        this.renderer = new Renderer();
        this.stats = new Stats();
        this.cursor = new Cursor();

        this.clock = new Clock();

        this.initLights();

        window.addEventListener("resize", () => this.handleResize(), false);

        this.clock.start();
    }

    public getDeltaTime(): number {
        return this.deltaTime;
    }

    public static getInstance(): Scene {
        return this.instance;
    }

    public animate(): void {
        requestAnimationFrame(() => this.animate());

        this.deltaTime = this.clock.getDelta();

        for (const object of this.objects) {
            object.update?.();
        }

        this.render();
        this.stats.update();
    }

    public add(...object: Object3D<Event>[]): this {
        super.add(...object);

        this.objects = this.children
            .filter((x) => x instanceof SceneObject)
            .map((x) => x as SceneObject);

        return this;
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
