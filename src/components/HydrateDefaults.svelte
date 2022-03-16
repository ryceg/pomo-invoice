<script lang="ts">
	import { Job } from '$lib/Job';
	import { Person } from '$lib/Person';
	import { random } from '$lib/random';
	import { clients, jobs } from '$lib/stores';
	import faker from '@faker-js/faker';
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
				client: random(Object.keys($clients)),
				notes: faker.lorem.paragraph(),
				title: faker.company.catchPhrase()
			});
			$jobs[job.id] = job;
		}
	}
</script>
