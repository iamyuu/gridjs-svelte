<script>
	import { createEventDispatcher } from "svelte";

	let modal;

	const dispatch = createEventDispatcher();
	const close = () => dispatch("close");
</script>

<div class="modal-background" on:click={close} />

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
	<slot name="header" />
	<slot />
	<slot name="action" />
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%, -50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
	}
</style>
