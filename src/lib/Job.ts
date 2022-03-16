import { defaults, ratePerHour } from './consts';
import { createUUID } from './utils';


export class Job {
  constructor(base: Partial<Job>) {
    Object.assign(this, base);
  }
  id = createUUID();
  client: string;
  date: {
    start: Date;
    end: Date | null;
  };
  ratePerHour: number = ratePerHour;
  flatRate = defaults.flatRate;
  expectedPomodoros = 2
  title = '';
  notes = '';
  isOpen = true;
}

interface JobField {
  type: string
  label: string
  name: string
  placeholder?: number
}

export const jobFields: JobField[] = [
  {
    type: 'text',
    label: 'Title of Job',
    name: 'title'
  },
  {
    type: 'number',
    label: 'Expected Pomodoros',
    name: 'expectedPomodoros',
    placeholder: defaults.expectedPomodoros
  },
  {
    type: 'number',
    label: 'Rate per hour',
    name: 'ratePerHour',
    placeholder: defaults.ratePerHour
  },
  {
    type: 'number',
    label: 'Flat Rate',
    name: 'flatRate',
    placeholder: defaults.flatRate
  },
  {
    type: 'textfield',
    label: 'Notes',
    name: 'notes'
  }
]