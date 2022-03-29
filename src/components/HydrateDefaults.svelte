<script lang="ts">
	import { Job } from '$lib/Job';
	import { Person } from '$lib/Person';
	import { Pomo } from '$lib/Pomo';
	import { random } from '$lib/random';
	import { clients, current, jobs, pomodoros } from '$lib/stores';
	import faker from '@faker-js/faker';
	if ($clients.length <= 1) {
		for (let i = 0; i < 10; i++) {
			const person = new Person({
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				address: faker.address.streetAddress(),
				phone: faker.phone.phoneNumber(),
				email: faker.internet.email(),
				notes: faker.lorem.paragraph()
			});
			$clients.push(person);
			$clients = $clients;
		}
	}
	if ($jobs.length <= 1) {
		for (let i = 0; i < 10; i++) {
			const job = new Job({
				client: random($clients).id,
				notes: faker.lorem.paragraph(),
				title: faker.company.catchPhrase()
			});
			$jobs.push(job);
			$jobs = $jobs;
		}
	}

	if (
		$pomodoros.filter((pomo) => {
			return pomo.job === $current.job;
		}).length < 10
	) {
		for (let i = 0; i < random(1, 40); i++) {
			$current.job = random(Object.keys($jobs));
			$current.client = $jobs[$current.job].client;
			const date: Date = faker.date.recent(10);
			// date that's 25 minutes after the first
			const secondDate: Date = new Date(date.getTime() + 25 * 60 * 1000);

			const newPomo = new Pomo({
				timestamps: [[date, secondDate]],
				job: $current.job,
				invoiceLine: faker.commerce.productName()
			});
			$pomodoros.push(newPomo);
			$pomodoros = $pomodoros;
		}
	}
</script>
