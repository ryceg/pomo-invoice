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
  rate: number = ratePerHour;
  flatRate = defaults.flatRate;
  expectedPomodoros = 2
  title = '';
  notes = '';
  isOpen = true;
}
