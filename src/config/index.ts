import { Color } from "three";

import { AppConfig } from "./AppConfig";

export const config: AppConfig = {
    camera: {
        size: 10,
        near: 0.25,
        far: 100,
    },
    renderer: {
        powerPreference: "high-performance",
    },
    scene: {
        backgroundColor: new Color("aqua"),
        lightColor: new Color(0xfffdd0),
    },
    cursor: {
        dotSpeed: 10,
        outlineSpeed: 0.9,
    },
};
