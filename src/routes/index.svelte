<script>
	import { calculatePomoTime } from '$lib/calculateTime';
	import { Pomo } from '$lib/Pomo';
	import { random } from '$lib/random';
	import { clients, current, jobs, pomodoros } from '$lib/stores';
	import faker from '@faker-js/faker';
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
	if (
		Object.values($pomodoros).filter((pomo) => {
			return pomo.job === $current.job;
		}).length < 10
	) {
		for (let i = 0; i < random(1, 20); i++) {
			const date = faker.date.recent(10);
			// date that's 25 minutes after the first
			const secondDate = new Date(date.getTime() + 25 * 60 * 1000);
			const newPomo = new Pomo({
				timestamps: [[date, secondDate]],
				job: $current.job
			});
			$pomodoros[newPomo.id] = newPomo;
		}
	}
</script>

<HydrateDefaults />
<header>
	<div class="lg:text-5xl md:text-4xl text-3xl font-extrabold text-center text-red-500">
		pomo-invoice
	</div>
</header>
<body>
	<Pomodoro />
	<div class="items-center justify-center text-sm">
		<div class="font-medium text-2xl leading-5 text-gray-700 pt-4 text-center">
			<a href="./jobs/{$current.job}"
				>{$jobs[$current.job]?.title ||
					`${$clients[$jobs[$current.job]?.client]?.firstName}'s job` ||
					'Loading...'}
			</a>
		</div>
		<div class="font-light text-gray-500 text-center">for</div>
		<div class="font-medium leading-5 text-gray-700 py-1 text-center text-lg">
			<a href="./clients/{$clients[$jobs[$current.job]?.client]?.id}">
				{$clients[$jobs[$current.job]?.client]?.firstName || 'Loading...'}
			</a>
		</div>
	</div>
	<SelectJob />

	<div class="py-2">Total: {calculatePomoTime(relevantPomos)}</div>
	<div class="py-2">$: {calculatePomoTime(relevantPomos) * $jobs[$current.job].ratePerHour}</div>
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
