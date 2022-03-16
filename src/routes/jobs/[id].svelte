<script lang="ts">
	import { page } from '$app/stores';
	import { jobs, pomodoros } from '$lib/stores';
	import Timesheet from '../../components/Timesheet.svelte';

	$: id = $page.params.id;
	console.log(id);
	$: selectedJob = $jobs[id];
	$: relevantPomos = Object.values($pomodoros).filter((pomo) => {
		return pomo.job === id;
	});
</script>

<h1>{selectedJob.title || 'Loading'}</h1>
{selectedJob.client || 'Loading'}
<Timesheet pomos={relevantPomos} />
