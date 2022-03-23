import { Job } from '$lib/Job';
import { Person } from '$lib/Person';
import { Pomo } from '$lib/Pomo';
import { random } from '$lib/random';
import { clients, current, jobs, pomodoros } from '$lib/stores';
import faker from '@faker-js/faker';
import { keys } from './utils';

type ClassTypes = 'jobs' | 'clients' | 'pomodoros'
export function createRandom(amounts: Record<ClassTypes, number>) {
  console.log(amounts)
  for (const type of keys(amounts)) {
    switch (type) {
      case 'jobs':
        createJob(amounts[type]);
        break;
      case 'clients':
        createPerson(amounts[type]);
        break;
      case 'pomodoros':
        createPomo(amounts[type]);
        break;
    }
  }
}

function createPerson(amount = 1) {
  for (let i = 0; i < amount; i++) {
    const person = new Person({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      notes: faker.lorem.paragraph()
    });
  }
}

function createJob(amount = 1) {
  for (let i = 0; i < amount; i++) {
    const job = new Job({
      client: random(Object.keys(clients)),
      notes: faker.lorem.paragraph(),
      title: faker.company.catchPhrase()
    });
    jobs[job.id] = job;
  }
}

function createPomo(amount = 1) {

  for (let i = 0; i < 50; i++) {
    current.job = random(Object.keys(jobs));
    current.client = jobs[current.job].client;
    const date: Date = faker.date.recent(10);
    // date that's 25 minutes after the first
    const secondDate: Date = new Date(date.getTime() + (25 * 60 * 1000));

    const newPomo = new Pomo({
      timestamps: [[date, secondDate]],
      job: random(Object.keys(jobs)),
      invoiceLine: faker.commerce.productName(),
    });
    pomodoros[newPomo.id] = newPomo;
  }
}