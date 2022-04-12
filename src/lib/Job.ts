import { defaults } from './consts';


export class Job {
  constructor(base: Partial<Job>) {
    Object.assign(this, base);
  }
  id = Math.floor(Math.random() * 100);
  client: number;
  ratePerHour: number = defaults.ratePerHour;
  flatRate = defaults.flatRate;
  expectedPomodoros = 2
  title = '';
  notes = '';
  isFinished = false;
  // pomodoros: Pomo[] = [];
  // start() {
  //   this.pomodoros.push(new Pomo());
  // }
  // stop() {
  //   this.pomodoros[this.pomodoros.length - 1][1] = new Date();
  // }
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