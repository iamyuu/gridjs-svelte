# gridjs-svelte

A Svelte wrapper component for [Grid.js](https://gridjs.io)

## Installation

```bash
npm install gridjs gridjs-svelte
```

## Usage

```html
<script>
	import Grid from "gridjs-svelte";

	const data = [
		{ name: "John", email: "john@example.com" },
		{ name: "Mark", email: "mark@gmail.com" },
	];
</script>

<Grid {data} />

<style global>
	@import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
</style>
```

> You can pass all Grid.js configs, refer to [Grid.js types](https://github.com/grid-js/gridjs/blob/master/src/config.ts) for specific configuration options.

## Example

- [Basic](https://svelte.dev/repl/3da1b239563843c4b76ab1b90115821c)
- [Custom Style](https://svelte.dev/repl/d6fffbcd8ce0409c8bdb4a7c2e7df63c)
- [Action Button](https://svelte.dev/repl/80eca12417414c7eabc79756c5a8f464)
- [Server side](https://svelte.dev/repl/e772220feac54e65b132615ac4d8eb09)
- [Event](https://svelte.dev/repl/318d3daa2ed2402cbeb965f7317c1071)
- [Plugin](https://svelte.dev/repl/9a066ccf55f54173bf5c6c8042142566)
- [HTML in cell](https://svelte.dev/repl/3c6d68ee5793465fb19b16b3d6831d57)
- [Svelte component in cell](https://svelte.dev/repl/e3247cb80c344f95b1fdd2853006f159)
- [forceRender](https://svelte.dev/repl/c779df2be3d64008b3b83fbd091df429)
- [Star Wars](https://svelte.dev/repl/0c77bee765c1458d825a4df13aefb5a4)

## Contributing

**PRs are welcome!**
You noticed a bug, a possible improvement or whatever?
Any help is always appreciated, so don't hesitate opening one!

### Get started (Devs)

```bash
git clone https://github.com/iamyuu/gridjs-svelte
cd gridjs-svelte
npm install
npm run dev:web
```

### Running the tests

```bash
npm test

# or on watch mode
npm run test:watch
```
