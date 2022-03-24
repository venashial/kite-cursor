# Kite Cursor!

*Make a little kite follow your cursor around!*

*Physics, gravity, and more included!*

*Comes in a dashing red, yellow, green, and blue!*

*Fly your kite with no fright with easy importing!*

### Usage

#### Vanilla JS

Add this script in your `<head>` element:
```html
<script src="https://cdn.jsdelivr.net/npm/kite-cursor/bin/browser.js"></script>
```

#### NPM (with Typescript)

Add this to anywhere TS gets run:
```ts
import 'kite-cursor'
```

#### NPM (without Typescript)

Add this to anywhere JS gets run:
```js
import 'kite-cursor/bin/module.js'
```

### Developing!

Install dependencies:

```sh
pnpm install
```

#### Commands:

```sh
pnpm dev # Run docs site locally for testing
```


```sh
pnpm package # Combines src/ into package
```


```sh
pnpm build # Build docs site
```

### Credits!

Thanks to @guerrillacontra for their [rope](https://codepen.io/guerrillacontra/pen/zJaREd) and [canvas lib](https://codepen.io/guerrillacontra/pen/zJaREd) codepens. This project uses that source code but refactored to use Typescript and specialized functions.