<script>
	import Modal from "./Modal.svelte";

	export let row;
	export let cell;

	$: title = `Planet ${row._cells[0].data}`;

	let showModal = false;

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<button on:click={toggleModal}>See detail</button>

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

<style>
	button {
		background-color: #ffe300;
		padding: 0.5rem 1rem;
		border-width: 0;
		border-radius: 0.5rem;
		cursor: pointer;
	}
</style>
