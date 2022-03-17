<script lang="ts">
	import { page } from '$app/stores';
	import { clients, jobs, pomodoros } from '$lib/stores';
	import Timesheet from '../../components/Timesheet.svelte';

	$: id = $page.params.id;
	console.log($page);
	$: selectedClient = $clients[id];
	$: relevantJobs = Object.values($jobs).filter((job) => {
		return job.client === id;
	});
	$: jobIDs = relevantJobs.map((job) => {
		return job.id;
	});
	$: relevantPomos = Object.values($pomodoros).filter((pomo) => {
		return jobIDs.includes(pomo.job);
	});
</script>

<h1 contenteditable="true" bind:innerHTML={selectedClient.fullName}>
	{selectedClient.fullName || 'Loading'}
</h1>
<Timesheet pomos={relevantPomos} showJob={true} />
{#each relevantJobs as job}
	<div contenteditable="true" bind:innerHTML={job.title}>{job.title}</div>
{/each}
