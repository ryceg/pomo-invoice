

export class Pomo {
  constructor(base: Partial<Pomo>) {
    Object.assign(this, base);
  }
  id!: number
  job: number;
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
