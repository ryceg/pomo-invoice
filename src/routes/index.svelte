<script>
	import { calculatePomoTime } from '$lib/calculateTime';
	import Button from '$lib/components/Button.svelte';
	import CreateJob from '$lib/components/CreateJob.svelte';
	import CreatePerson from '$lib/components/CreatePerson.svelte';
	import Pomodoro from '$lib/components/Pomodoro.svelte';
	import SelectJob from '$lib/components/SelectJob.svelte';
	import { defaults } from '$lib/consts';
	import { createRandom } from '$lib/createRandom';
	import { findViaKey } from '$lib/find';
	import { random } from '$lib/random';
	import { clients, current, jobs, pomodoros } from '$lib/stores';
	import { supabase } from '../supabase';
	$current.job = $current.job || $jobs[0].id;
	$: selectedJob = findViaKey($current.job, 'job');
	$current.client = $current.client || selectedJob.client;
	$: selectedJob;
	$: selectedClient = findViaKey($current.client, 'client');
	$: isOpen = false;
	$: jobIsOpen = false;
	$: relevantPomos = $pomodoros.filter((pomo) => {
		return pomo.job === $current.job;
	});
	console.log(supabase);
	function createSomeRandoms() {
		alert('Success');
		createRandom({
			clients: 4,
			jobs: 2,
			pomodoros: 45
		});
	}
</script>

<!-- <HydrateDefaults /> -->
<header>
	<h1
		class="bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 p-4 text-5xl font-extrabold text-center text-transparent"
	>
		pomo-invoice
	</h1>
</header>
<body>
	<Pomodoro />
	<div class="items-center justify-center text-sm">
		<div class="pt-4 text-2xl font-medium leading-5 text-center text-gray-700">
			<a sveltekit:prefetch href="/jobs/{$current.job}">{selectedJob.title} </a>
		</div>
		<div class="font-light text-center text-gray-500">for</div>
		<div class="py-1 text-lg font-medium leading-5 text-center text-gray-700">
			{#if selectedClient?.firstName}
				<a sveltekit:prefetch href="/clients/{selectedJob.client}">
					{selectedClient.firstName}
				</a>
			{:else}
				Client not selected.
			{/if}
		</div>
	</div>
	<SelectJob />

	<div class="py-2">Total: {calculatePomoTime(relevantPomos) || 0}</div>
	<div class="py-2">
		$: {calculatePomoTime(relevantPomos) *
			(findViaKey($current.job, 'job')?.ratePerHour || defaults.ratePerHour)}
	</div>
	<button
		on:click={createSomeRandoms}
		class="bg-stone-500 hover:bg-stone-700 px-4 py-2 font-bold text-white rounded-full"
		>Create All</button
	>
	{JSON.stringify(findViaKey($current.job, 'job'))}
	{JSON.stringify(random($clients))}
	<div class="bottom-4 fixed justify-center">
		<Button
			func={() => {
				isOpen = !isOpen;
			}}
			>Create Client
			<CreatePerson {isOpen} />
		</Button>
		<Button
			func={() => {
				jobIsOpen = !jobIsOpen;
			}}
		>
			Create Job
			<CreateJob isOpen={jobIsOpen} />
		</Button>
	</div>
</body>
