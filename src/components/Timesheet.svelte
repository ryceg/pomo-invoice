<script lang="ts">
	import type { Pomo } from '$lib/Pomo';
	import { jobs } from '$lib/stores';
	import { entries, toUpperFirst } from '$lib/utils';
	import dayjs from 'dayjs';
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
</script>

<table class="table-auto">
	<thead>
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
			{@const previousI = i - 1}
			<tr class="items-center justify-center text-sm">
				<!-- Job, Client, Pomo -->
				{#each entries(show) as [key, value]}
					{#if value && (i === 0 || pomos[previousI][key] !== pomos[i][key])}
						<td class="px-2 text-sm font-light">
							{$jobs[pomo[key]]?.title || 'Loading...'}
						</td>
					{:else if value}
						<td />
					{/if}
				{/each}

				{#each pomo.timestamps as [start, end]}
					<!-- Date -->
					<td class="px-5">
						{#if i === 0 || dayjs(start).format('YYYY-MM-DD') !== dayjs(pomos[previousI].timestamps[0][0]).format('YYYY-MM-DD')}
							<DatePicker bind:date={start} />
						{:else}
							As above
						{/if}
					</td>
					<!-- Time started -->
					<td>
						<DatePicker format="hh:mm a" bind:date={start} />
					</td>
					<!-- Time Ended -->
					<td>
						<DatePicker format="hh:mm a" bind:date={end} />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
