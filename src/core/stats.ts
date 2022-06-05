import TStats from "three/examples/jsm/libs/stats.module";

export class Stats {
    private readonly stats: TStats;

    public constructor() {
        this.stats = TStats();

        document.body.appendChild(this.stats.dom);
    }

    public update(): void {
        this.stats.update();
    }
}
