# gridjs-svelte

A Svelte wrapper component for [Grid.js](https://gridjs.io)

## Installation

```bash
npm install gridjs gridjs-svelte
```

## Usage

> [Try it out in the browser](https://svelte.dev/repl/9a066ccf55f54173bf5c6c8042142566)

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

Check the [example](https://github.com/iamyuu/gridjs-svelte/blob/main/src/routes/index.svelte) for more detail.

> You can pass all Grid.js configs, refer to [Grid.js types](https://github.com/grid-js/gridjs/blob/master/src/config.ts) for specific configuration options.

## How to get instance?

You can use `instance` and bind it with state, you can check the example [here](https://svelte.dev/repl/c779df2be3d64008b3b83fbd091df429?version=3.38.0) or you can see tutorial for how to [bindings component](https://svelte.dev/tutorial/component-bindings).

```diff
<script>
  import Grid from "gridjs-svelte"

+  let grid

  const data = [
    { name: "John", email: "john@example.com" },
    { name: "Mark", email: "mark@gmail.com" },
  ]
</script>

- <Grid {data} />
+ <Grid bind:instance={grid} {data} />
```

## How to add plugin?

> [Try it out in the browser](https://svelte.dev/repl/9a066ccf55f54173bf5c6c8042142566?version=3.38.0)

1. Write a plugin, you can see how to write the plugin on [plugin basic](https://gridjs.io/docs/plugin/writing-plugin) section.
2. Put the list of plugins into `plugins` props.

```diff
- <Grid {data} />
+ <Grid {data} plugins={[awesomePlugin]} />
```

> NOTE: if you want to create an advanced plugin, you need to know [React](https://reactjs.org) because Grid.js uses [preact](https://preactjs.com) (an alternative React). If you need help to create an advanced plugin, you can open [discussions](https://github.com/iamyuu/gridjs-svelte/discussions/new) maybe I can help.

## How to formatting cell with Svelte component?

> [Try it out in the browser](https://svelte.dev/repl/e3247cb80c344f95b1fdd2853006f159?version=3.38.0)

```html
<script>
	import Grid from "gridjs-svelte";
	import { SvelteWrapper } from "gridjs-svelte/plugins";
	import AwesomeComponent from "./components/awesome-component.svelte";

	const columns = [
		"Name",
		{
			name: "Email",
			plugin: {
				component: SvelteWrapper,
				props: {
					component: AwesomeComponent,
				},
			},
		},
	];

	const data = [
		{ name: "John", email: "john@example.com" },
		{ name: "Mark", email: "mark@gmail.com" },
	];
</script>

<Grid {data} {columns} />
```

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
