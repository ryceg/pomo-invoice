import { writable, type Writable } from 'svelte/store';
import { supabase } from '../supabase';
import type { Job } from './Job';
import type { Person } from './Person';
import type { Pomo } from './Pomo';

export const loadJobs = async () => {
  const { data, error } = await supabase.from('jobs').select()
  if (error) return console.error(error)
  jobs.set(data)
}

export const clients: Writable<Person[]> = writable([])
export const jobs: Writable<Job[]> = writable([])
export const pomodoros: Writable<Pomo[]> = writable([])
export const current: Writable<{
  client: string
  job: string
}> = writable({
  client: '',
  job: ''
})
