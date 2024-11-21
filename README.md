# gridjs-svelte

A Svelte wrapper component for [Grid.js](https://gridjs.io)

## Installation

```bash
npm install gridjs gridjs-svelte
```

## Usage

```html
<script>
	import { gridjs } from "gridjs-svelte";

	const data = [
		{ name: "John", email: "john@example.com" },
		{ name: "Mark", email: "mark@gmail.com" },
	];
</script>

<article use:gridjs={{ data }} />

<style global>
	@import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
</style>
```

or you can play [online](https://svelte.dev/playground) or with more [real world example](https://svelte.dev/playground)

> You can pass all Grid.js configs, refer to [Grid.js types](https://github.com/grid-js/gridjs/blob/master/src/config.ts) for specific configuration options.

---

**PRs are welcome!**
You noticed a bug, a possible improvement or whatever?
Any help is always appreciated, so don't hesitate opening one!

&copy; MIT License
