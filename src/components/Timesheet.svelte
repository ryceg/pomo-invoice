<script lang="ts">
	import type { Pomo } from '$lib/Pomo';
	import { jobs } from '$lib/stores';
	export let pomos: Pomo[];
	export let showJob: boolean = false;
</script>

<!-- filter the values to the current job -->
{#each pomos as pomo}
	{#if showJob}
		<div class="px-2 font-light">{$jobs[pomo.job].title}</div>
	{/if}
	<!-- {#each Object.values($pomodoros) as pomo} -->
	{#each pomo.timestamps as timestamp}
		<div class="items-center justify-center text-sm">
			<div class="font-medium leading-5 text-gray-700 py-6 inline">
				{timestamp[0].toLocaleString('en-AU', {
					weekday: 'short',
					day: 'numeric',
					month: 'numeric',
					minute: '2-digit',
					hour: '2-digit'
				})}
			</div>
			<div class="font-light text-gray-500 inline">to</div>
			<div class="font-medium leading-5 text-gray-700 py-6 inline">
				{timestamp[1].toLocaleString('en-AU', {
					minute: '2-digit',
					hour: '2-digit'
				})}
			</div>
		</div>
		<!-- ({$jobs[pomo.job]?.id || 'Loading...'}) vs {$current.job} -->
	{/each}
{/each}
