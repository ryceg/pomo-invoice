<script>
	import { random } from '$lib/random';
	import { jobs } from '$lib/stores';
	import {
		Listbox,
		ListboxButton,
		ListboxOption,
		ListboxOptions,
		Transition
	} from '@rgossiaux/svelte-headlessui';
	import { CheckIcon } from '@rgossiaux/svelte-heroicons/solid';
	let selectedJob = random(Object.values($jobs));
</script>

<div class="block text-sm font-medium leading-5 text-gray-700">Current Job</div>
<div class="flex items-center justify-center w-full px-12 py-2">
	<Listbox value={selectedJob} on:change={(e) => (selectedJob = e.detail)}>
		<ListboxButton
			class="focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default"
		>
			<svg
				class="inline w-5 h-5 text-gray-400"
				viewBox="0 0 20 20"
				fill="none"
				stroke="currentColor"
			>
				<path
					d="M7 7l3-3 3 3m0 6l-3 3-3-3"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			{selectedJob.title}
		</ListboxButton>
		<Transition
			enter="transition duration-100 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
		>
			<ListboxOptions>
				{#each Object.values($jobs) as job (job.id)}
					<!-- Use the `active` state to conditionally style the active (focused) option -->
					<!-- Use the `selected` state to conditionally style the selected option -->
					<ListboxOption
						value={job}
						disabled={job.isOpen}
						class={({ active, selected }) =>
							(active ? 'active text-white bg-blue-600' : 'text-gray-900') +
							' ' +
							(selected ? 'selected font-semibold' : 'font-normal') +
							' ' +
							'max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5'}
						let:selected
					>
						{#if selected}
							<CheckIcon class="w-5 h-5" />
						{/if}
						{job.title}
					</ListboxOption>
				{/each}
			</ListboxOptions>
		</Transition>
	</Listbox>
</div>
