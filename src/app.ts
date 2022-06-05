import { BoxBufferGeometry, MeshBasicMaterial, Mesh } from "three";

import { Scene } from "./core";

const scene: Scene = new Scene();

const geometry = new BoxBufferGeometry(1, 1, 1);
const material = new MeshBasicMaterial();
const cube = new Mesh(geometry, material);

scene.add(cube);

scene.animate();
