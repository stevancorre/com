import {
    BoxBufferGeometry,
    BufferGeometry,
    DirectionalLight,
    Material,
    Mesh,
    MeshPhongMaterial,
} from "three";
import { config } from "./config";

import { Scene } from "./core";

const scene: Scene = new Scene();

// objects
const geometry: BufferGeometry = new BoxBufferGeometry(10, 1, 10);
const material: Material = new MeshPhongMaterial({
    flatShading: true,
});

const cube: Mesh = new Mesh(geometry, material);

scene.add(cube);

// lights
const light1 = new DirectionalLight(config.scene.lightColor, 0.4);
light1.target = cube;
light1.position.set(10, 0, 0);
scene.add(light1);

const light2 = new DirectionalLight(config.scene.lightColor, 1);
light2.target = cube;
light2.position.set(0, 10, 0);
scene.add(light2);

const light3 = new DirectionalLight(config.scene.lightColor, 0.7);
light3.target = cube;
light3.position.set(0, 0, 10);
scene.add(light3);

// animate
scene.animate();
