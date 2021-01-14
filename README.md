# gridjs-svelte

A Svelte wrapper component for [Grid.js](https://gridjs.io)

## Installation

``` bash
npm install gridjs gridjs-svelte
```

## Usage

> [Try it out in the browser](https://svelte.dev/repl/9a066ccf55f54173bf5c6c8042142566)

``` html
<script>
  import Grid from "gridjs-svelte"

  const data = [
    { name: "John", email: "john@example.com" },
    { name: "Mark", email: "mark@gmail.com" },
  ]
</script>

<Grid {data} />

<style global>
  @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
</style>
```

There is also an [example server side](https://svelte.dev/repl/e772220feac54e65b132615ac4d8eb09).

> You can pass all Grid.js configs, refer to [Grid.js documentation](https://gridjs.io/docs/config/data) for specific configuration options.

## How to get instance?

You can use `instance` and bind it with state, see how to [bindings component](https://svelte.dev/tutorial/component-bindings)

## Contributing

**PRs are welcome!**
You noticed a bug, a possible improvement or whatever?
Any help is always appreciated, so don't hesitate opening one!

### Get started (Devs)

```bash
git clone https://github.com/iamyuu/gridjs-svelte
cd gridjs-svelte
yarn
yarn storybook
```

### Running the tests

```bash
yarn test
```
