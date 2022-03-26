# Kite Cursor! <img alt="Video showing the kite following the cursor" align="right" src="https://user-images.githubusercontent.com/44736536/160082205-e8da9516-f5bc-4262-bed9-0ff9ed4f2aea.gif" />

[Try it out on the DEMO → ![](extension/icons/16.png)](https://kite.venashial.design/)

_Make a little kite follow your cursor around!_

_Physics, gravity, and more included!_

_Comes in a dashing red, yellow, green, and blue!_

_Fly your kite with no fright with easy importing!_

### Browser extension

#### Firefox

Install the Firefox extension from [Kite Cursor page on Firefox Addons.](https://addons.mozilla.org/en-US/firefox/addon/kite-cursor/)

_Chrome, Edge, & others coming soon ![](extension/icons/16.png)_

### Import usage

#### Vanilla JS (~4kb)

Add this script to the bottom of your `<body>` element:

```html
<script src="https://cdn.jsdelivr.net/npm/kite-cursor/bin/minified.js"></script>
```

#### NPM (with Typescript)

Add this to anywhere TS gets run:

```ts
import "kite-cursor";
```

#### NPM (without Typescript)

Add this to anywhere JS gets run:

```js
import "kite-cursor/bin/module.js";
```

## Developing!

First, make sure [NodeJS](https://nodejs.org/en/download/package-manager/) & [pnpm](https://pnpm.io/installation#nodejs-is-preinstalled) are installed, then run:

```sh
pnpm install # Install dependencies
```

#### Available commands:

```sh
pnpm dev # Run docs site locally for testing
pnpm package # Combines src/ into package
pnpm docs:build # Build docs site
```

### Packaging extension

First minify `index.ts` to `extension/kite-cursor.js` with:

```sh
pnpm package
```

Then, compress all the files in `extension` to a `.zip`.

## Credits!

Thanks to [@guerrillacontra](https://github.com/guerrillacontra/) for their [rope](https://codepen.io/guerrillacontra/pen/zJaREd) and [canvas lib](https://codepen.io/guerrillacontra/pen/zJaREd) codepens. This project uses that source code but refactored to use Typescript and specialized functions. Plus the fun kite parts!
