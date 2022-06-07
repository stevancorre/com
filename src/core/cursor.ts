import { Vector2 } from "three";

import { config } from "../config";
import { Scene } from "./scene";

export class Cursor {
    private mousePosition!: Vector2;

    private dot: HTMLElement;
    private outline: HTMLElement;

    private dotPosition: Vector2 = new Vector2(-1, -1);
    private outlinePosition: Vector2 = new Vector2();

    public constructor() {
        this.dot = document.getElementById("cursor-dot") as HTMLElement;
        this.outline = document.getElementById("cursor-outline") as HTMLElement;

        window.addEventListener(
            "mousemove",
            (e) => this.updateMousePosition(e),
            false,
        );
    }

    public render(): void {
        if (this.mousePosition === undefined) return;

        // if last position is unknown
        if (this.dotPosition.equals(new Vector2(-1, -1))) {
            this.dotPosition = this.mousePosition.clone();
            this.outlinePosition = this.mousePosition.clone();
        } else {
            this.calculateNextPositions();
        }

        this.updatePositions();
    }

    private calculateNextPositions(): void {
        const cursorDiff: Vector2 = this.mousePosition
            .clone()
            .sub(this.dotPosition);
        const outlineDiff: Vector2 = this.mousePosition
            .clone()
            .sub(this.outlinePosition);

        this.dotPosition.add(
            cursorDiff.multiplyScalar(config.cursor.dotSpeed * Scene.DeltaTime),
        );
        this.outlinePosition.add(
            outlineDiff.multiplyScalar(
                config.cursor.dotSpeed *
                    Scene.DeltaTime *
                    config.cursor.outlineSpeed,
            ),
        );
    }

    private updatePositions(): void {
        this.dot.style.left = this.dotPosition.x + "px";
        this.dot.style.top = this.dotPosition.y + "px";

        this.outline.style.left = this.outlinePosition.x + "px";
        this.outline.style.top = this.outlinePosition.y + "px";
    }

    private updateMousePosition(event: MouseEvent): void {
        this.mousePosition = new Vector2(event.pageX, event.pageY);
    }
}
