<script lang="ts">
	import { Job, jobFields } from '$lib/Job';
	import { clients, jobs } from '$lib/stores';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';
	export let isOpen = true;
	let newJob = {};
	$: newJob;
	function createJob() {
		const job = new Job(newJob);
		$jobs[job.id] = job;
		$jobs = $jobs;
		isOpen = false;
	}
</script>

<Transition show={isOpen}>
	<Dialog
		class="fixed inset-0 flex items-center justify-center"
		open={isOpen}
		on:close={() => (isOpen = false)}
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
				class="bg-stone-600 fixed inset-0 w-full h-full overflow-y-auto bg-opacity-50"
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
				<DialogTitle class="text-stone-900 text-lg font-medium leading-6">Create a Job</DialogTitle>
				<div class="relative mb-4">
					<label for={'client'} class="text-sm leading-7 text-gray-600">Client</label>
					<select
						id={'client'}
						name={'client'}
						bind:value={newJob['client']}
						class="focus:border-stone-500 focus:ring-2 focus:ring-stone-200 border-stone-300 w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border rounded outline-none"
					>
						<option value="null">--</option>
						{#each Object.values($clients) as client}
							<option value={client.id}>{client.fullName}</option>
						{/each}
					</select>
					{#each jobFields as field}
						<label for={field.name} class="text-sm leading-7 text-gray-600">{field.label}</label>
						<input
							id={field.name}
							name={field.name}
							placeholder={field?.placeholder?.toString()}
							bind:value={newJob[field.name]}
							class="focus:border-stone-500 focus:ring-2 focus:ring-stone-200 border-stone-300 w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border rounded outline-none"
						/>
					{/each}
				</div>
				<button
					class="hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md"
					on:click={createJob}>Create</button
				>
				<button on:click={() => (isOpen = false)}>Close</button>
			</div>
		</TransitionChild>
	</Dialog>
</Transition>
