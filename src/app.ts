import { Scene } from "./core/scene";
import { Ground } from "./objects/ground";
import { Player } from "./objects/player";

const scene: Scene = new Scene();

// objects
scene.add(new Ground());
scene.add(new Player());

// animate
scene.animate();
