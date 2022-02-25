<script lang="ts">
	import type { Row, Cell } from "gridjs";
	import Modal from "./modal.svelte";

	export let row: Row;
	export let cell: Cell;

	$: title = `Planet ${row.cell(0).data}`;

	let showModal = false;

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<button class="btn" on:click={toggleModal}>See detail</button>

<!-- for demo purpose -->
{#if showModal}
	<Modal on:close={toggleModal}>
		<h2 slot="header">{title}</h2>

		<pre>
      {JSON.stringify(cell, null, 2)}
    </pre>

		<svelte:fragment slot="action">
			<button on:click={toggleModal}>Ok</button>
		</svelte:fragment>
	</Modal>
{/if}
