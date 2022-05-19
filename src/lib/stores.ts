import type { PostgrestError, User } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';
import { supabase } from '../supabase';
import type { Job } from './Job';
import type { Person } from './Person';
import type { Pomo } from './Pomo';


export const current: Writable<{
  client: number
  job: number
}> = writable({
  client: 0,
  job: 0
})
export const pomodoros: Writable<Pomo[]> = writable([])
export const loadPomodoros = async () => {
  const { data, error }: { data: Pomo[], error: PostgrestError } = await supabase.from('pomodoros').select()
  if (error) return console.error(error)
  pomodoros.set(data)
}

export const addPomodoro = async (pomodoro: Pomo) => {
  const { data, error }: { data: Pomo[], error: PostgrestError } = await supabase.from('pomodoros').insert(pomodoro)
  if (error) return console.error(error)
  pomodoros.update(cur => {
    const newPomodoros = [...cur, { ...pomodoro }]
    return newPomodoros
  })
}

export const deletePomodoro = async (id: number) => {
  const { error } = await supabase.from('pomodoros').delete().match({ id })
  if (error) return console.error(error)
  pomodoros.update(pomodoros => pomodoros.filter(client => client.id !== id))
}



export const clients: Writable<Person[]> = writable([])
export const loadClients = async () => {
  const { data, error }: { data: Person[], error: PostgrestError } = await supabase.from('clients').select()
  if (error) return console.error(error)
  clients.set(data)
}

export const addClient = async (client: Person) => {
  const { data, error }: { data: Person[], error: PostgrestError } = await supabase.from('clients').insert([client])
  if (error) return console.error(error)
  clients.update(cur => {
    const newClients = [...cur, { ...client }]
    return newClients
  })
}

export const deleteClient = async (id: number) => {
  const { error } = await supabase.from('clients').delete().match({ id })
  if (error) return console.error(error)
  clients.update(clients => clients.filter(client => client.id !== id))
}

export const updateClient = async (client: Person) => {
  const { data, error }: { data: Person[], error: PostgrestError } = await supabase.from('clients').update([client])
  if (error) return console.error(error)
  clients.update(clientsList => clientsList.filter(currentClient => {
    if (client.id === currentClient.id) return currentClient = client
  }))
}


export const jobs: Writable<Job[]> = writable([])
export const loadJobs = async () => {
  const { data, error }: { data: Job[], error: PostgrestError } = await supabase.from('jobs').select()
  if (error) return console.error(error)
  jobs.set(data)
}


export const addJob = async (job: Job) => {
  const { data, error }: { data: Job[], error: PostgrestError } = await supabase.from('jobs').insert([job])
  if (error) return console.error(error)
  jobs.update(cur => {
    const newJobs = [...cur, { ...job }]
    return newJobs
  })
}

export const deleteJob = async (id: number) => {
  const { error } = await supabase.from('jobs').delete().match({ id })
  if (error) return console.error(error)
  jobs.update(jobs => jobs.filter(job => job.id !== id))
}

export const updateJob = async (job: Job) => {
  const { data, error }: { data: Job[], error: PostgrestError } = await supabase.from('jobs').update([job])
  if (error) return console.error(error)
  jobs.update(jobsList => jobsList.filter(currentJob => {
    if (job.id === currentJob.id) return currentJob = job
  }))
}

loadClients()

loadJobs()

loadPomodoros()

/**
 * Tracks the user's state.
 */
export const user: Writable<boolean | User> = writable(false)