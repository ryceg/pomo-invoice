<script>
	import { calculatePomoTime } from '$lib/calculateTime';
	import { defaults } from '$lib/consts';
	import { createRandom } from '$lib/createRandom';
	import { findViaKey } from '$lib/find';
	import { random } from '$lib/random';
	import { clients, current, jobs, pomodoros } from '$lib/stores';
	import Button from '../components/Button.svelte';
	import CreateJob from '../components/CreateJob.svelte';
	import CreatePerson from '../components/CreatePerson.svelte';
	import Pomodoro from '../components/Pomodoro.svelte';
	import SelectJob from '../components/SelectJob.svelte';
	import { supabase } from '../supabase';
	$current.job = $current.job || $jobs[0].id;
	$current.client = $current.client || findViaKey($current.job, 'job').client;
	let selectedJob = $jobs[$current.job];
	$: selectedJob;
	let isOpen = false;
	let jobIsOpen = false;
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
	<div
		class="bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 p-4 text-5xl font-extrabold text-center text-transparent"
	>
		pomo-invoice
	</div>
</header>
<body>
	<Pomodoro />
	<div class="items-center justify-center text-sm">
		<div class="pt-4 text-2xl font-medium leading-5 text-center text-gray-700">
			<a sveltekit:prefetch href="/jobs/{$current.job}">{findViaKey($current.job, 'job').title} </a>
		</div>
		<div class="font-light text-center text-gray-500">for</div>
		<div class="py-1 text-lg font-medium leading-5 text-center text-gray-700">
			<a sveltekit:prefetch href="/clients/{findViaKey($current.job, 'job').client}">
				{findViaKey(findViaKey($current.job, 'job').client, 'client').firstName}
			</a>
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
