import { createUUID } from './utils';


export class Pomo {
  constructor(base: Partial<Pomo>) {
    Object.assign(this, base);
  }
  id = createUUID();
  job: string;
  timestamps: [Date, Date | null][] = [];
  invoiceLine = '';
  notes = '';
  start() {
    this.timestamps.push([new Date(), null]);
  }
  end() {
    this.timestamps[this.timestamps.length - 1][1] = new Date();
  }
}
