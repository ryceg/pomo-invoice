import { writable, type Writable } from 'svelte/store';
import { supabase } from '../supabase';
import type { Job } from './Job';
import type { Person } from './Person';
import type { Pomo } from './Pomo';


export const current: Writable<{
  client: string
  job: string
}> = writable({
  client: '',
  job: ''
})
export const pomodoros: Writable<Pomo[]> = writable([])
export const loadPomodoros = async () => {
  const { data, error } = await supabase.from('pomodoros').select()
  if (error) return console.error(error)
  pomodoros.set(data)
}



export const clients: Writable<Person[]> = writable([])
export const loadClients = async () => {
  const { data, error } = await supabase.from('clients').select()
  if (error) return console.error(error)
  clients.set(data)
}

export const addClient = async (client: Person) => {
  const { data, error } = await supabase.from('clients').insert([client])
  if (error) return console.error(error)
  clients.update(clients => [...clients, data])
}

export const deleteClient = async (id: string) => {
  const { error } = await supabase.from('clients').delete().match({ id })
  if (error) return console.error(error)
  clients.update(clients => clients.filter(job => job.id !== id))
}

export const updateClient = async (client: Person) => {
  const { data, error } = await supabase.from('clients').update([client])
  if (error) return console.error(error)
  clients.update(clients => clients.map(job => job.id === data.id ? data : job))
}


export const jobs: Writable<Job[]> = writable([])
export const loadJobs = async () => {
  const { data, error } = await supabase.from('jobs').select()
  if (error) return console.error(error)
  jobs.set(data)
}


export const addJob = async (job: Job) => {
  const { data, error } = await supabase.from('jobs').insert([job])
  if (error) return console.error(error)
  jobs.update(jobs => [...jobs, data])
}

export const deleteJob = async (id: string) => {
  const { error } = await supabase.from('jobs').delete().match({ id })
  if (error) return console.error(error)
  jobs.update(jobs => jobs.filter(job => job.id !== id))
}

export const updateJob = async (job: Job) => {
  const { data, error } = await supabase.from('jobs').update([job])
  if (error) return console.error(error)
  jobs.update(jobs => jobs.map(j => j.id === job.id ? data : j))
}