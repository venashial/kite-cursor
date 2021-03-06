import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import manifestJson from "rollup-plugin-manifest-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";
import json from "@rollup/plugin-json";
import del from "rollup-plugin-delete";

const manifestBase = {
  name: "Kite Cursor",
  description: pkg.description,
  version: pkg.version,
  homepage_url: pkg.homepage,
  icons: {
    48: "icons/48.png",
  },
  permissions: ["storage"],
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["loader.js"],
    },
  ],
};

export default [
  // Module
  {
    input: "./src/index.ts",
    output: {
      file: pkg.module,
      format: "es",
    },
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  },

  // Minified (for browser)
  {
    input: "./dist/module.js",
    output: [
      {
        name: "howLongUntilLunch",
        file: pkg.browser,
        format: "umd",
      },
    ],
    plugins: [terser()],
  },

  // Extension background
  {
    input: "./extension/background.ts",
    output: [
      {
        file: "dist/extension/v2/background.js",
        format: "umd",
      },
      {
        file: "dist/extension/v3/background.js",
        format: "es",
      },
    ],
    plugins: [typescript(), nodeResolve(), terser()],
  },

  // Extension loader
  {
    input: "./extension/loader.ts",
    output: [
      {
        file: "dist/extension/v2/loader.js",
        format: "umd",
        inlineDynamicImports: true,
      },
      {
        file: "dist/extension/v3/loader.js",
        format: "es",
        inlineDynamicImports: true,
      },
    ],
    plugins: [typescript(), nodeResolve(), terser()],
  },

  // Extension v2 manifest
  {
    input: "./rollup.config.js",
    output: [
      {
        file: "dist/extension/v2/temp",
      },
    ],
    plugins: [
      json(),
      manifestJson({
        input: "extension/manifest.json",
        output: "dist/extension/v2/manifest.json",
        minify: true,
        manifest: {
          ...manifestBase,
          manifest_version: 2,
          background: {
            scripts: ["background.js"],
          },
          browser_action: {
            browser_style: true,
            default_icon: {
              16: "icons/16.png",
              32: "icons/32.png",
            },
            default_title: "Kite Cursor",
          },
          browser_specific_settings: {
            gecko: {
              id: "{6e191de1-3729-4d14-a1a7-5afc5d09544f}",
            },
          },
        },
      }),
    ],
  },

  // Extension v3 manifest
  {
    input: "./rollup.config.js",
    output: [
      {
        file: "dist/extension/v3/temp",
      },
    ],
    plugins: [
      json(),
      manifestJson({
        input: "extension/manifest.json",
        output: "dist/extension/v3/manifest.json",
        minify: true,
        manifest: {
          ...manifestBase,
          manifest_version: 3,
          background: {
            service_worker: "background.js",
          },
          action: {
            browser_style: true,
            default_icon: {
              16: "icons/16.png",
              32: "icons/32.png",
            },
            default_title: "Kite Cursor",
          },
        },
      }),
    ],
  },

  // Copy extension icons
  {
    input: "./rollup.config.js",
    output: [],
    plugins: [
      json(),
      copy({
        targets: [
          { src: "extension/icons", dest: "dist/extension/v2" },
          { src: "extension/icons", dest: "dist/extension/v3" },
        ],
      }),
      // Delete temp files
      del({ targets: ["dist/extension/v2/temp", "dist/extension/v3/temp"] }),
    ],
  },

  // Module Types
  {
    input: "./dist/dts/index.d.ts",
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts()],
  },
];
