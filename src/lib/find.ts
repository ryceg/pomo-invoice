import { get } from 'svelte/store';
import type { Job } from './Job';
import type { Person } from './Person';
import type { Pomo } from './Pomo';
import { clients, jobs, pomodoros } from './stores';

export function findViaKey(key: number, type: 'pomo' | 'pomodoro' | 'client' | 'job'): Pomo | Person | Job {
  switch (type) {
    case 'client':
      return get(clients).find(item => item.id === key) as Person;
    case 'job':
      return get(jobs).find(item => item.id === key) as Job;
    case 'pomo':
    case 'pomodoro':
      return get(pomodoros).find(item => item.id === key) as Pomo;
  }
}