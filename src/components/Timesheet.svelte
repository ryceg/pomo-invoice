<script lang="ts">
	import type { Pomo } from '$lib/Pomo';
	import { jobs } from '$lib/stores';
	export let pomos: Pomo[];
	export let showJob: boolean = false;
	let dateWidth: number;
</script>

<table class="table-auto">
	<thead>
		<tr>
			<th>Job</th>
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
				{#if showJob && (i === 0 || pomos[previousI].job !== pomos[i].job)}
					<td
						contenteditable="true"
						bind:innerHTML={$jobs[pomo.job].title}
						class="px-2 font-light text-sm"
					>
						{$jobs[pomo.job].title}
					</td>
				{:else}
					<td />
				{/if}
				{#each pomo.timestamps as timestamp}
					<!-- Date -->
					<td class="px-5" bind:clientWidth={dateWidth}>
						{#if i === 0 || pomos[i - 1].timestamps[0][0].toLocaleString( 'en-AU', { weekday: 'short', day: 'numeric' } ) !== timestamp[0].toLocaleString( 'en-AU', { weekday: 'short', day: 'numeric' } )}
							{#if dateWidth > 125}
								{timestamp[0].toLocaleString('en-AU', {
									weekday: 'long',
									day: 'numeric',
									month: 'numeric'
								})}
							{:else if dateWidth > 100}
								{timestamp[0].toLocaleString('en-AU', {
									weekday: 'short',
									day: 'numeric',
									month: 'numeric'
								})}
							{:else}
								{timestamp[0].toLocaleString('en-AU', {
									day: 'numeric',
									month: 'numeric'
								})}
							{/if}
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
						{timestamp[1].toLocaleString('en-AU', {
							minute: '2-digit',
							hour: '2-digit'
						})}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
