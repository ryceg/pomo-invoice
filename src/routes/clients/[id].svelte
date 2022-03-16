<script lang="ts">
	import { page } from '$app/stores';
	import { clients, jobs, pomodoros } from '$lib/stores';
	import Timesheet from '../../components/Timesheet.svelte';

	$: id = $page.params.id;
	console.log(id);
	$: selectedClient = $clients[id];
	$: relevantJobs = Object.values($jobs).filter((job) => {
		return job.client === id;
	});
	$: jobIDs = Object.keys(relevantJobs);
	$: relevantPomos = Object.values($pomodoros).filter((pomo) => {
		return jobIDs.includes(pomo.job);
	});
</script>

<h1>{selectedClient.fullName || 'Loading'}</h1>
<Timesheet pomos={relevantPomos} showJob={true} />
{JSON.stringify(relevantPomos)}
{#each relevantJobs as job}
	<div>{job.title}</div>
{/each}
