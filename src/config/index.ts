import { Color } from "three";

import { AppConfig } from "./AppConfig";

export const config: AppConfig = {
    camera: {
        size: 5,
        near: 0.25,
        far: 20,
    },
    renderer: {
        powerPreference: "high-performance",
    },
    scene: {
        background: new Color("aqua"),
    },
    cursor: {
        dotSpeed: 10,
        outlineSpeed: 0.9,
    },
};
