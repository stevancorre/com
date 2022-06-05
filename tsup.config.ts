import { defineConfig } from "tsup";

export default defineConfig({
    name: "tsup",
    target: "node16",
    entry: ["src/ts/app.ts"],
    minify: true,
    sourcemap: true,
    outDir: "dist",
});
