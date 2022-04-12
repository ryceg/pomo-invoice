<script lang="ts">
	import { page } from '$app/stores';
	import { findViaKey } from '$lib/find';
	import { pomodoros } from '$lib/stores';
	import Timesheet from '../../components/Timesheet.svelte';

	$: id = parseInt($page.params.id);
	console.log(id);
	$: selectedJob = findViaKey(id, 'job');
	$: relevantPomos = $pomodoros.filter((pomo) => {
		return pomo.job === id;
	});
	$: jobClient = findViaKey(selectedJob.client, 'client');
</script>

<h1
	class="sticky top-0 bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 p-4 text-5xl font-extrabold text-transparent"
	contenteditable="true"
	bind:innerHTML={selectedJob.title}
>
	{selectedJob?.title || 'Loading'}
</h1>
for
<a href="/clients/{selectedJob.client}" class="py-8 font-bold"
	>{`${jobClient.firstName} ${jobClient.lastName}` || 'Loading'}</a
>
<Timesheet
	pomos={relevantPomos}
	show={{
		client: false,
		pomo: true,
		job: false
	}}
/>
