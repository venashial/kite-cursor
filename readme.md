# Kite Cursor! <img alt="Video showing the kite following the cursor" align="right" src="https://user-images.githubusercontent.com/44736536/160082205-e8da9516-f5bc-4262-bed9-0ff9ed4f2aea.gif" />

[Try it out on the DEMO → ![](extension/icons/16.png)](https://kite.venashial.design/)

_Make a little kite follow your cursor around!_

_Physics, gravity, and more included!_

_Comes in a dashing red, yellow, green, and blue!_

_Fly your kite with no fright with easy importing!_

## 🧩 Browser extension

### Firefox

Install the Firefox extension from the [Kite Cursor page on Firefox Addons.](https://addons.mozilla.org/en-US/firefox/addon/kite-cursor/)

### Chrome, Edge, & Brave

> The extension is currently under review on the Chrome Web Store. For now, you have to build the project locally, and install the unpacked extension from the folder `dist/extension/v3`

## 🚚 Import usage

### NPM

Install it:

```bash
npm install kite-curor
```

Add this to start `KiteCursor`:

```js
import { KiteCursor } from "kite-cursor";

new KiteCursor();
```

### Plain JS

> There are currently no plain JS imports. You can import an older version with: `<script src="https://cdn.jsdelivr.net/npm/kite-cursor@0.0.1/bin/minified.js"></script>`

## 💻 Developing

First, make sure [NodeJS](https://nodejs.org/en/download/package-manager/) & [pnpm](https://pnpm.io/installation#nodejs-is-preinstalled) are installed, then run:

```sh
pnpm install # Install dependencies
```

### Packaging extension

Package the extension by running:

```sh
pnpm package
```

Then, compress the outputs to `.zips`:

- `dist/extension/v2` for Firefox
- `dist/extension/v2` for Chromium

### Development commands:

```sh
pnpm dev # Run docs site locally for testing
pnpm package # Combines src/ into package
pnpm docs:build # Build docs site
```

## 👥 Credits

Thanks to [@guerrillacontra](https://github.com/guerrillacontra/) for their [rope](https://codepen.io/guerrillacontra/pen/zJaREd) and [canvas lib](https://codepen.io/guerrillacontra/pen/zJaREd) codepens. This project uses that source code but refactored to use Typescript and specialized functions. Plus the fun kite parts!
