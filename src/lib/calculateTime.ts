import type { Pomo } from './Pomo';

export function calculatePomoTime(pomos: Pomo[]) {
  return (calculatePomoTimeMill(pomos) / 1000) / 60 / 60;
}

/**
 * 
 * @param pomos - The pomos to calculate the time for
 * @returns the total time, ignoring null values, in milliseconds
 */
export function calculatePomoTimeMill(pomos: Pomo[]): number {
  let time = 0;
  for (let i = 0; i < pomos.length; i++) {
    const pomo = pomos[i];
    if (pomo.timestamps.length === 0) continue;
    for (let j = 0; j < pomo.timestamps.length; j++) {
      const [start, end] = pomo.timestamps[j];
      if (end) {
        // time += end.getTime() - start.getTime();
      }
    }
  }
  return time;
}

