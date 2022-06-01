<script>
	import { findViaKey } from '$lib/find';
	import { random } from '$lib/random';
	import { current, jobs } from '$lib/stores';
	import {
		Listbox,
		ListboxButton,
		ListboxOption,
		ListboxOptions,
		Transition
	} from '@rgossiaux/svelte-headlessui';
	import { CheckIcon } from '@rgossiaux/svelte-heroicons/solid';
	if (!$current.job) {
		$current.job = random($jobs)?.id || null;
	}
	export const selected = findViaKey($current.job, 'job');
</script>

<div
	class=" relative flex items-center justify-center w-full py-2 pl-3 text-left transition duration-150 ease-in-out"
>
	{#if !$current?.job}
		Create a job!
	{:else}
		<Listbox value={$current.job} on:change={(e) => ($current.job = e.detail.id)}>
			<ListboxButton
				class="focus:outline-none focus:shadow-outline-red focus:border-red-300 sm:text-sm sm:leading-5 pr-13 relative w-full py-2 pl-3 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default"
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
				{findViaKey($current.job, 'job')?.title || 'Select a job'}
			</ListboxButton>
			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<ListboxOptions class="space-y-2 border-2 rounded">
					{#if $jobs}
						{#each $jobs as job (job.id)}
							<!-- Use the `active` state to conditionally style the active (focused) option -->
							<!-- Use the `selected` state to conditionally style the selected option -->
							<ListboxOption
								value={job}
								disabled={!job.isFinished}
								class={({ active, selected }) =>
									(active && selected
										? 'active selected font-semibold bg-red-700 text-white'
										: ' ') +
									(active ? 'active text-white bg-red-600' : 'text-stone-800') +
									' ' +
									(selected
										? 'selected font-semibold bg-stone-100 text-stone-900'
										: 'font-normal') +
									' ' +
									'max-h-60 py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5'}
								let:selected
								let:active
							>
								{#if selected}
									<CheckIcon class="inline w-5 h-5" />
								{/if}
								{job.title}
							</ListboxOption>
						{/each}
					{/if}
				</ListboxOptions>
			</Transition>
		</Listbox>
	{/if}
</div>
