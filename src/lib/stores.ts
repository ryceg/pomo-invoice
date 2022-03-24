import { writable, type Writable } from 'svelte/store';
import type { Job } from './Job';
import type { Person } from './Person';
import type { Pomo } from './Pomo';

export const clients: Writable<Record<string, Person>> = writable({})
export const jobs: Writable<Record<string, Job>> = writable({})
export const pomodoros: Writable<Record<string, Pomo>> = writable({})
export const current: Writable<{
  client: string
  job: string
}> = writable({
  client: '',
  job: ''
})
