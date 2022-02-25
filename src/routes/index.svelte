<script>
	import { h, PluginPosition } from "gridjs";
	import Grid from "$lib/gridjs.svelte";
	import Planet from "../components/planet.svelte";
	import { SvelteWrapper } from "$lib/plugins";

	const headingPlugin = {
		id: "heading",
		position: PluginPosition.Header,
		component: () => h("h1", { style: { width: "100%" } }, "Star Wars Peoples"),
	};

	const className = {
		error: "error",
	};

	const style = {
		table: {
			width: "100%",
		},
		header: {
			display: "flex",
			alignItems: "center",
			flexDirection: "row-reverse",
		},
	};

	const language = {
		search: {
			placeholder: "Find people",
		},
	};

	const server = {
		url: "https://swapi.dev/api/people",
		total: data => data.count,
		then: data => data.results.map(people => [people.name, people.gender, people.homeworld, people.url]),
	};

	const columns = [
		"Name",
		{
			name: "Gnder",
			width: "10%",
			formatter: cell => {
				if (cell === "n/a") {
					return "???";
				}

				return cell.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
			},
		},
		{
			name: "Planet",
			width: "15%",
			plugin: {
				component: SvelteWrapper,
				props: {
					component: Planet,
				},
			},
		},
		{
			name: "Action",
			width: "10%",
			formatter: (cell, _row) => {
				return h(
					"button",
					{
						className: "btn",
						onClick: () => alert(`See the detail on ${cell}`),
					},
					"Detail",
				);
			},
		},
	];

	const pagination = {
		enabled: true,
		limit: 10,
		server: {
			// https://github.com/grid-js/gridjs/issues/84
			url: (prev, page) => `${prev}${prev.includes("?") ? "&" : "?"}page=${page + 1}`,
		},
	};

	const search = {
		enabled: true,
		server: {
			url: (prev, keyword) => `${prev}?search=${keyword}`,
		},
	};

	function onReady() {
		console.log("🚀 ~ Grid.js is ready");
	}

	function onLoad(event) {
		console.table("🚀 ~ currently rendered items:", event.detail._rows);
	}

	function onBeforeLoad() {
		console.log("🚀 ~ fired onBeforeLoad function");
	}

	function onCellClick(event) {
		const [_pointerEvent, { data }] = Object.values(event.detail);
		console.log(`🚀 ~ clicked cell:`, data);
	}

	function onRowClick(event) {
		const [_pointerEvent, row] = Object.values(event.detail);
		console.log(`🚀 ~ clicked row:`, row.cell(0).data, row.cell(3).data);
	}
</script>

<Grid
	{search}
	{columns}
	{server}
	{pagination}
	{language}
	{className}
	{style}
	plugins={[headingPlugin]}
	on:ready={onReady}
	on:load={onLoad}
	on:beforeLoad={onBeforeLoad}
	on:cellClick={onCellClick}
	on:rowClick={onRowClick}
/>

<style global>
	@import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";

	:root {
		--primary-color: #ffe300;
		--error-color: red;
	}

	.btn {
		background-color: var(--primary-color);
		padding: 0.5rem 1rem;
		border-width: 0;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	.error {
		color: var(--error-color);
	}
</style>
