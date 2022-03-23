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
  type: 'pomo' | 'short break' | 'long break' = 'pomo';
  timeAccrued = 0
  interval = setInterval(() => {
    this.timeAccrued--;
    if (this.timeAccrued <= 0) {
      clearInterval(this.interval);
    }
  }, 1000);
  start() {
    this.timestamps.push([new Date(), null]);
    setInterval(() => {
      if (this.timeAccrued === 25 * 60) {
        this.complete();
      }
      this.timeAccrued++;
    }, 1000);
  }
  pause() {
    this.timestamps[this.timestamps.length - 1][1] = new Date();
  }
  end() {
    this.timestamps[this.timestamps.length - 1][1] = new Date();
  }
  complete() {
    this.end();
    this.timeAccrued = 0;

  }
}
