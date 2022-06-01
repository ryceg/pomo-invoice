<script lang="ts">
	import { findViaKey } from '$lib/find';
	import type { Pomo } from '$lib/Pomo';
	import { loadPomodoros, updatePomodoro } from '$lib/stores';
	import { entries, toUpperFirst } from '$lib/utils';
	import * as dayjs from 'dayjs';
	import DatePicker from './DatePicker.svelte';
	export let pomos: Pomo[];
	export let show: {
		job: boolean;
		client: boolean;
		pomo: boolean;
	};
	show = {
		job: true,
		client: false,
		pomo: false,
		...show
	};
	loadPomodoros();
</script>

<table class="table-auto">
	<thead class="sticky top-16 bottom-0 z-10 p-3 bg-white">
		<tr>
			{#each Object.entries(show) as [key, value]}
				{#if value}<th>{toUpperFirst(key)}</th>
				{/if}
			{/each}
			<th>Date</th>
			<th>Time Started</th>
			<th>Time Ended</th>
		</tr>
	</thead>

	<tbody>
		<!-- filter the values to the current job -->
		{#each pomos as pomo, i}
			{@const pomoJob = findViaKey(pomo.job, 'job')}
			{@const pomoClient = findViaKey(pomoJob.client, 'client')}
			{@const previousI = i - 1}
			<tr class="items-center justify-center text-sm">
				<!-- Job, Client, Pomo -->
				{#each entries(show) as [key, value]}
					{#if value && (i === 0 || pomos[previousI][key] !== pomo[key])}
						<td class="px-2 text-sm font-light sticky top-16 bottom-0 bg-white">
							{#if key === 'client'}
								{pomoClient?.firstName}
							{:else if key === 'pomo'}
								{pomo?.invoiceLine}
							{:else if key === 'job'}
								{pomoJob?.title}
							{/if}
						</td>
					{:else if value}
						<td />
					{/if}
				{/each}
				{#each pomo.timestamps as [start, end]}
					<!-- Date -->
					{#if i === 0 || dayjs(start).format('YYYY-MM-DD') !== dayjs(pomos[previousI].timestamps[0][0]).format('YYYY-MM-DD')}
						<td class="px-5 sticky top-16 bg-white">
							<!-- <DatePicker bind:date={start} /> -->
							{start}
							<input
								bind:value={start}
								on:change={() => updatePomodoro(pomo)}
								type="date"
								class="w-min selection:bg-red-500 selection:text-stone-50 px-1 rounded"
							/>
						</td>
					{:else}
						<td class="px-5">As above </td>
					{/if}
					<!-- Time started -->
					<td class="px-5 sticky top-20 bg-white">
						<DatePicker bind:date={start} />
						<!-- <input
							bind:value={start}
							on:change={() => updatePomodoro(pomo)}
							type="date"
							class="w-min selection:bg-red-500 selection:text-stone-50 px-1 rounded"
						/> -->
					</td>
					<!-- Time Ended -->
					<td class="px-5 sticky top-20 bg-white">
						<input
							bind:value={end}
							on:change={() => updatePomodoro(pomo)}
							type="date"
							class="w-min selection:bg-red-500 selection:text-stone-50 px-1 rounded"
						/>
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
