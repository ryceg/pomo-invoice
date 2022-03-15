import { addSerializableClass, localStorage, persist, type PersistentStore } from "@macfja/svelte-persistent-store";
import { writable } from 'svelte/store';
import { Job } from './Job';
import { Person } from './Person';

addSerializableClass(Person)
export const clients: PersistentStore<Record<string, Person>> = persist(writable({}), localStorage(), 'clients')



addSerializableClass(Job)
export const jobs: PersistentStore<Record<string, Job>> = persist(writable({}), localStorage(), 'jobs')
