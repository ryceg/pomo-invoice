<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';
	import Button from './Button.svelte';
	export let isOpen = true;
	let completeButton = null;

	function completeOrder() {
		// ...
	}
</script>

<Transition show={isOpen}>
	<Dialog
		class="fixed inset-0 flex items-center justify-center"
		open={isOpen}
		on:close={() => (isOpen = false)}
		initialFocus={completeButton}
	>
		<TransitionChild
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<DialogOverlay
				class="bg-slate-600 fixed inset-0 w-full h-full overflow-y-auto bg-opacity-50"
				on:click={() => (isOpen = false)}
			/>
		</TransitionChild>
		<TransitionChild
			enter="ease-out duration-300"
			enterFrom="opacity-0 scale-95"
			enterTo="opacity-100 scale-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100 scale-100"
			leaveTo="opacity-0 scale-95"
		>
			<div
				class="rounded-2xl inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl"
			>
				<DialogTitle class="text-slate-900 text-lg font-medium leading-6"
					>Create a Client</DialogTitle
				>
				<div class="relative mb-4">
					<label for="email" class="text-sm leading-7 text-gray-600">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						class="focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none"
					/>
				</div>
				<Button
					classN="hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md"
					func={() => (isOpen = false)}>Close</Button
				>
				<Button func={() => (isOpen = false)}>Close</Button>
			</div>
		</TransitionChild>
	</Dialog>
</Transition>
