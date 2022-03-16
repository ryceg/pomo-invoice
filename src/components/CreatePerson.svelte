<script lang="ts">
	import { Dialog, DialogOverlay, DialogTitle } from '@rgossiaux/svelte-headlessui';
	import Button from './Button.svelte';
	export let isOpen = false;
	let completeButton = null;

	function completeOrder() {
		// ...
	}
</script>

<Dialog open={isOpen} on:close={() => (isOpen = false)} initialFocus={completeButton}>
	<DialogOverlay class="bg-slate-600 fixed inset-0 w-full h-full overflow-y-auto bg-opacity-50" />
	<div
		class="rounded-2xl inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl"
	>
		<DialogTitle class="text-2xl font-bold">Create a Client</DialogTitle>

		<p>Your order is all ready!</p>
		<Button func={() => (isOpen = false)} text="close">Close</Button>
		<button on:click={completeOrder} bind:this={completeButton}> Complete order </button>
	</div>
</Dialog>
