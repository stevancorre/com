import { Color } from "three";

export interface AppConfig {
    camera: {
        size: number;
        near: number;
        far: number;
    };
    renderer: {
        powerPreference: "high-performance" | "low-power" | "default";
    };
    scene: {
        backgroundColor: Color;
        lightColor: Color;
    };
    cursor: {
        dotSpeed: number;
        outlineSpeed: number;
    };
}
