<script lang="ts">
	import { page } from '$app/stores';
	import { clients, jobs, pomodoros } from '$lib/stores';
	import Timesheet from '../../components/Timesheet.svelte';

	$: id = $page.params.id;
	console.log(id);
	$: selectedJob = $jobs[id];
	$: relevantPomos = Object.values($pomodoros).filter((pomo) => {
		return pomo.job === id;
	});
</script>

<h1
	class="bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 p-4 text-5xl font-extrabold text-transparent"
	contenteditable="true"
	bind:innerHTML={selectedJob.title}
>
	{selectedJob?.title || 'Loading'}
</h1>
for
<a href="/clients/{selectedJob.client}" class="py-8 font-bold"
	>{$clients[selectedJob.client].fullName || 'Loading'}</a
>
<Timesheet
	pomos={relevantPomos}
	show={{
		client: false,
		pomo: true,
		job: false
	}}
/>
