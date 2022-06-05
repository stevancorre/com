import { Color } from "three";

import { AppConfig } from "./AppConfig";

export const config: AppConfig = {
    camera: {
        fov: 45,
        near: 0.25,
        far: 20,
    },
    renderer: {
        powerPreference: "high-performance",
    },
    scene: {
        background: new Color("aqua"),
    },
};
