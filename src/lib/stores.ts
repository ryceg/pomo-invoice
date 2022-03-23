import type { PersistentStore } from "@macfja/svelte-persistent-store";
import { addSerializableClass, localStorage, persist } from "@macfja/svelte-persistent-store";
import { writable } from 'svelte/store';
import { Job } from './Job';
import { Person } from './Person';
import { Pomo } from './Pomo';

addSerializableClass(Person)
export const clients: PersistentStore<Record<string, Person>> = persist(writable({}), localStorage(), 'clients')
export let clientsValue
clients.subscribe($clients => clientsValue = $clients)
addSerializableClass(Date)

addSerializableClass(Job)
export const jobs: PersistentStore<Record<string, Job>> = persist(writable({}), localStorage(), 'jobs')
export let jobsValue
jobs.subscribe($jobs => jobsValue = $jobs)
addSerializableClass(Pomo)
export const pomodoros: PersistentStore<Record<string, Pomo>> = persist(writable({}), localStorage(), 'pomodoros')
export let pomodorosValue
pomodoros.subscribe($pomodoros => pomodorosValue = $pomodoros)
export const current: PersistentStore<{
  job: string
  client: string
}> = persist(writable({
  job: '',
  client: ''
}), localStorage(), 'current')

export let currentValue
current.subscribe($current => currentValue = $current)