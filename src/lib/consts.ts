export const ratePerHour = 66
export const defaults = {
  ratePerHour: ratePerHour,
  flatRate: 0,
  expectedPomodoros: 2
}

export const minutesToSeconds = (minutes: number): number => minutes * 60;
export const secondsToMinutes = (seconds: number): number => Math.floor(seconds / 60);
export const padWithZeroes = (number: number): string => number.toString().padStart(2, '0');
export const State = { idle: 'idle', inProgress: 'in progress', resting: 'resting', pause: 'paused' };

export const POMODORO_S = minutesToSeconds(25);
export const LONG_BREAK_S = minutesToSeconds(20);
export const SHORT_BREAK_S = minutesToSeconds(5);

export function formatTime(timeInSeconds: number): string {
  const minutes = secondsToMinutes(timeInSeconds);
  const remainingSeconds = timeInSeconds % 60;
  return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
}