import { addSerializableClass } from "@macfja/svelte-persistent-store";
import { writable } from 'svelte/store';
import { Job } from './Job';
import { Person } from './Person';
import { Pomo } from './Pomo';

addSerializableClass(Person)
export const clients = writable({})
export let clientsValue
clients.subscribe($clients => clientsValue = $clients)
addSerializableClass(Date)

addSerializableClass(Job)
export const jobs = writable({})
export let jobsValue
jobs.subscribe($jobs => jobsValue = $jobs)
addSerializableClass(Pomo)
export const pomodoros = writable({})
export let pomodorosValue
pomodoros.subscribe($pomodoros => pomodorosValue = $pomodoros)
export const current = writable({
  client: '',
  job: ''
})

export let currentValue
current.subscribe($current => currentValue = $current)