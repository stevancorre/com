import { sRGBEncoding, WebGLRenderer } from "three";

import { config } from "../config";

export class Renderer extends WebGLRenderer {
    public constructor() {
        super({
            antialias: true,
            alpha: true,
            powerPreference: config.renderer.powerPreference,
        });

        this.outputEncoding = sRGBEncoding;
        this.setPixelRatio(window.devicePixelRatio);
        this.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.domElement);
    }
}
