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

<h1
	class="text-5xl p-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600"
	contenteditable="true"
	bind:innerHTML={selectedClient.fullName}
>
	{selectedClient.fullName || 'Loading'}
</h1>
<Timesheet pomos={relevantPomos} show={{ job: true }} />
