import {terser} from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

export default [
    // Browser
    {
        input: "index.ts",
        output: {
            name: "howLongUntilLunch",
            file: pkg.browser,
            format: "umd",
        },
        plugins: [typescript(), terser()],
    },

    // Extension
    {
        input: "index.ts",
        output: {
            name: "howLongUntilLunch",
            file: "extension/kite-cursor.js",
            format: "umd",
        },
        plugins: [typescript(), terser()],
    },
    // NPM package
    {
        input: "index.ts",
        sourcemap: "",
        output: [{file: pkg.module, format: "es"}],
        plugins: [typescript()],
    },
]