<script>
	import Grid from "$lib/gridjs.svelte";
	import salaryPlugin from "../components/table-salary-plugin.js";

	const columns = ["Name", "Salary"];
	const data = [
		["John", Math.round(Math.random() * 100000)],
		["Mark", Math.round(Math.random() * 100000)],
		["Josh", Math.round(Math.random() * 100000)],
		["Sara", Math.round(Math.random() * 100000)],
		["Maria", Math.round(Math.random() * 100000)],
		["Cathryn", Math.round(Math.random() * 100000)],
		["Ottilie", Math.round(Math.random() * 100000)],
		["Crystel", Math.round(Math.random() * 100000)],
		["Katarina", Math.round(Math.random() * 100000)],
		["Reese", Math.round(Math.random() * 100000)],
		["Hanna", Math.round(Math.random() * 100000)],
		["Olaf", Math.round(Math.random() * 100000)],
		["Marguerite", Math.round(Math.random() * 100000)],
		["Ally", Math.round(Math.random() * 100000)],
		["Britney", Math.round(Math.random() * 100000)],
	];

	let config = {
		sort: true,
		search: true,
		pagination: true,
	};
</script>

<fieldset>
	<legend>Update the config</legend>

	{#each Object.keys(config) as configKey}
		<label>
			<input type="checkbox" bind:checked={config[configKey]} />
			{config[configKey] ? "Disable" : "Enable"}
			{configKey}
		</label>
	{/each}
</fieldset>

<Grid {columns} {data} plugins={[salaryPlugin]} {...config} />

<style global>
	@import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";

	fieldset {
		border-radius: 5px;
		border: 1px solid #d2d6dc;
	}

	fieldset > * + * {
		margin-right: 2.5rem;
	}

	legend {
		background-color: #f9fafb;
		color: #6b7280;
	}
</style>
