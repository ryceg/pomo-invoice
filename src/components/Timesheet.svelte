<script lang="ts">
	import type { Pomo } from '$lib/Pomo';
	import { jobs } from '$lib/stores';
	import { toUpperFirst } from '$lib/utils';
	import DatePicker from './DatePicker.svelte';
	export let pomos: Pomo[];
	export let show;
	show = {
		job: true,
		client: false,
		pomo: false,
		...show
	};
	let dateWidth: number;
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
				<!-- Job -->
				{#each Object.entries(show) as [key, value]}
					{#if value && (i === 0 || pomos[previousI][key] !== pomos[i][key])}
						<!-- {#if value} -->
						<td
							contenteditable="true"
							bind:innerHTML={$jobs[pomo[key]].title}
							class="px-2 text-sm font-light"
						>
							{$jobs[pomo[key]]?.title}
							<!-- {$jobs[pomo[key]].title} -->
						</td>
					{:else if value}
						<td />
					{/if}
				{/each}

				{#each pomo.timestamps as timestamp}
					<!-- Date -->
					<td class="px-5" bind:clientWidth={dateWidth}>
						{#if i === 0 || pomos[i - 1].timestamps[0][0].toLocaleString( 'en-AU', { weekday: 'short', day: 'numeric' } ) !== timestamp[0].toLocaleString( 'en-AU', { weekday: 'short', day: 'numeric' } )}
							<DatePicker bind:date={timestamp[0]} />
						{/if}
					</td>
					<!-- Time started -->
					<td>
						{timestamp[0].toLocaleString('en-AU', {
							minute: '2-digit',
							hour: '2-digit'
						})}
					</td>
					<!-- Time Ended -->
					<td>
						<DatePicker format="HHmma" bind:date={timestamp[1]} />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
