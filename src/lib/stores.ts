import { writable } from 'svelte/store';
import { defaults, ratePerHour } from './consts';
import { createUUID } from './utils';

export const clients = writable()

export class Pomo {
  timestamps: [Date, Date][] = []
}

export class Client {
  id = createUUID()
  firstName = ''
  lastName = ''
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
  address = ''
  phone = ''
  email = ''
  notes = ''
}

export class Job {
  client: string
  date: {
    start: Date
    end: Date | null
  }
  rate: number = ratePerHour
  flatRate = defaults.flatRate
  notes: string
}