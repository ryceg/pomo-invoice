<script>
	import { Job } from '$lib/Job';
	import { Person } from '$lib/Person';
	import { random } from '$lib/random';
	import { clients, jobs } from '$lib/stores';
	import faker from '@faker-js/faker';
	import Button from '../components/Button.svelte';
	import Pomodoro from '../components/Pomodoro.svelte';
	import SelectJob from '../components/SelectJob.svelte';
	if (Object.keys($clients).length <= 1) {
		for (let i = 0; i < 10; i++) {
			const person = new Person({
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				address: faker.address.streetAddress(),
				phone: faker.phone.phoneNumber(),
				email: faker.internet.email(),
				notes: faker.lorem.paragraph()
			});
			$clients[person.id] = person;
			$clients = $clients;
		}
	}
	if (Object.keys($jobs).length <= 1) {
		for (let i = 0; i < 10; i++) {
			const job = new Job({
				client: random(Object.keys(clients)),
				notes: faker.lorem.paragraph(),
				title: faker.company.catchPhrase()
			});
			$jobs[job.id] = job;
		}
	}
	let selectedJob;
</script>

<body>
	<h1 class="lg:text-5xl md:text-4xl text-3xl font-extrabold text-center text-blue-500">
		pomo-invoice
	</h1>
	<Pomodoro />
	<p class="py-16">
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam eos alias delectus,
	</p>
	<SelectJob />

	<div class="bottom-4 fixed justify-center">
		<Button text="Create invoice" />
		<Button text="Export invoices" />
		<Button text="Import invoices" />
		<Button text="Create client" />
	</div>
</body>
