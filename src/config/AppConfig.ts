import { Color } from "three";

export interface AppConfig {
    camera: {
        fov: number;
        near: number;
        far: number;
    };
    renderer: {
        powerPreference: "high-performance" | "low-power" | "default";
    };
    scene: {
        background: Color;
    };
}
