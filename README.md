# gridjs-svelte

A Svelte wrapper component for [Grid.js](https://gridjs.io)

## Install

``` bash
npm install gridjs gridjs-svelte
```

## Usage

``` js
<script>
  import Grid from "gridjs-svelte"

  const data = [
    { name: "John", email: "john@example.com" },
    { name: "Mark", email: "mark@gmail.com" },
  ]
</script>

<style global>
  @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
</style>

<Grid {data} />
```

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
