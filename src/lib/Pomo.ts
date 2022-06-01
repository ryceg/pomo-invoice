

export class Pomo {
  constructor(base: Partial<Pomo>) {
    Object.assign(this, base);
  }
  id = Math.floor(Math.random() * 100)
  job: number | null = null;
  timestamps: [Date, Date | null][] = [];
  invoiceLine = '';
  notes = '';
  // type: 'pomo' | 'short break' | 'long break' = 'pomo';
  // timeAccrued = 0
  // interval = setInterval(() => {
  //   this.timeAccrued--;
  //   if (this.timeAccrued <= 0) {
  //     clearInterval(this.interval);
  //   }
  // }, 1000);
  // start(): void {
  //   this.timestamps.push([new Date(), null]);
  //   setInterval(() => {
  //     if (this.timeAccrued === 25 * 60) {
  //       this.complete();
  //     }
  //     this.timeAccrued++;
  //   }, 1000);
  // }
  // pause(): void {
  //   this.timestamps[this.timestamps.length - 1][1] = new Date();
  // }
  // end(): void {
  //   this.timestamps[this.timestamps.length - 1][1] = new Date();
  // }
  // complete(): void {
  //   this.end();
  //   this.timeAccrued = 0;
  // }
}

interface PomoField {
  type: string
  label: string
  name: string
}

export const pomoFields: PomoField[] = [
  {
    type: 'datetime',
    label: 'Start Time',
    name: 'start'
  },
  {
    type: 'datetime',
    label: 'Finish Time',
    name: 'finish'
  },
  {
    type: 'text',
    label: 'Invoice Line',
    name: 'invoiceLine'
  },
  {
    type: 'text',
    label: 'Notes',
    name: 'notes'
  }
];