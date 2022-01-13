<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";
	import { Grid } from "gridjs";
	import type { UserConfig } from "gridjs";

	export let width: UserConfig["width"] = "100%";
	export let height: UserConfig["height"] = "auto";
	export let autoWidth: UserConfig["autoWidth"] = true;
	export let fixedHeader: UserConfig["fixedHeader"] = false;
	export let resizable: UserConfig["resizable"] = false;
	export let from: UserConfig["from"] = undefined;
	export let language: UserConfig["language"] = undefined;
	export let search: UserConfig["search"] = false;
	export let sort: UserConfig["sort"] = false;
	export let pagination: UserConfig["pagination"] = false;
	export let server: UserConfig["server"] = undefined;
	export let columns: UserConfig["columns"] = undefined;
	export let data: UserConfig["data"] = undefined;
	export let style: UserConfig["style"] = {};
	export let className: UserConfig["className"] = {};

	// https://github.com/grid-js/gridjs/blob/master/src/config.ts
	export const instance = new Grid({
		from,
		data,
		columns,
		server,
		search,
		sort,
		pagination,
		language,
		width,
		height,
		autoWidth,
		fixedHeader,
		resizable,
		style,
		className,
	});

	let node: Element;
	const dispatch = createEventDispatcher();

	// https://github.com/grid-js/gridjs/blob/master/src/view/table/events.ts
	instance.on("cellClick", (...args) => dispatch("cellClick", { ...args }));
	instance.on("rowClick", (...args) => dispatch("rowClick", { ...args }));

	// https://github.com/grid-js/gridjs/blob/master/src/view/events.ts
	instance.on("beforeLoad", () => dispatch("beforeLoad"));
	instance.on("load", data => dispatch("load", { ...data }));
	instance.on("ready", () => dispatch("ready"));

	onMount(() => {
		if (node) {
			instance.render(node);
		}
	});
</script>

<article bind:this={node} />
