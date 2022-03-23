<script>
	import { calculatePomoTime } from '$lib/calculateTime';
	import { defaults } from '$lib/consts';
	import { createRandom } from '$lib/createRandom';
	import { clients, current, jobs, pomodoros } from '$lib/stores';
	import Button from '../components/Button.svelte';
	import CreateJob from '../components/CreateJob.svelte';
	import CreatePerson from '../components/CreatePerson.svelte';
	import HydrateDefaults from '../components/HydrateDefaults.svelte';
	import Pomodoro from '../components/Pomodoro.svelte';
	import SelectJob from '../components/SelectJob.svelte';
	let selectedJob = $jobs[$current.job];
	$: selectedJob;
	let isOpen = false;
	let jobIsOpen = false;
	$: relevantPomos = Object.values($pomodoros).filter((pomo) => {
		return pomo.job === $current.job;
	});

	function createSomeRandoms() {
		alert('Success');
		createRandom({
			jobs: 15,
			pomodoros: 15,
			clients: 15
		});
	}
</script>

<HydrateDefaults />
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
			<a sveltekit:prefetch href="/jobs/{$current.job}"
				>{$jobs[$current.job]?.title ||
					`${$clients[$jobs[$current.job]?.client]?.firstName}'s job` ||
					'Loading...'}
			</a>
		</div>
		<div class="font-light text-center text-gray-500">for</div>
		<div class="py-1 text-lg font-medium leading-5 text-center text-gray-700">
			<a sveltekit:prefetch href="/clients/{$clients[$jobs[$current.job]?.client]?.id}">
				{$clients[$jobs[$current.job]?.client]?.firstName || 'Loading...'}
			</a>
		</div>
	</div>
	<SelectJob />

	<div class="py-2">Total: {calculatePomoTime(relevantPomos)}</div>
	<div class="py-2">
		$: {calculatePomoTime(relevantPomos) *
			($jobs[$current.job]?.ratePerHour || defaults.ratePerHour)}
	</div>
	<button
		on:click={createSomeRandoms}
		class="bg-stone-500 hover:bg-stone-700 px-4 py-2 font-bold text-white rounded-full"
		>Create All</button
	>
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
