<script lang="ts">
	import { page } from '$app/stores';
	import Timesheet from '$lib/components/Timesheet.svelte';
	import { findViaKey } from '$lib/find';
	import { jobs, pomodoros } from '$lib/stores';

	$: id = parseInt($page.params.id);
	console.log($page);
	$: selectedClient = findViaKey(id, 'client');
	$: relevantJobs = $jobs.filter((job) => {
		return job.client === id;
	});
	$: jobIDs = relevantJobs.map((job) => {
		return job.id;
	});
	$: relevantPomos = $pomodoros.filter((pomo) => {
		return jobIDs.includes(pomo.job);
	});
</script>

<h1
	class="sticky top-0 bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 p-4 text-5xl font-extrabold text-transparent"
>
	{`${selectedClient?.firstName} ${selectedClient?.lastName}` || 'Loading'}
</h1>
<Timesheet pomos={relevantPomos} show={{ job: true, pomo: true, client: false }} />
