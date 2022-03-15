const randomFn = (min: number, max: number): number => {
  return _random(min, max)
}
type RandomInput = number | number[] | string[]
export function random<T>(array: readonly T[]): T
export function random(max: number): number
export function random(min: number, max: number): number
export function random(min: any, max?: number): number | string {
  if (Array.isArray(min)) {
    // if there's only one element in the array, just return that.
    if (min.length === 1) return min[0]
    return min[randomFn(0, min.length - 1)]
  }
  if (typeof max === 'undefined') {
    return randomFn(0, min)
  }
  return randomFn(min, max)
}

/**
 * Uses alea for predicatable value generation.
 * // @todo merge prandom with random; all values are PRNG'd, so "random" is always going to be PRNG. Additionally, it should not need the seed as an argument, and instead get it from either a global, or the URL.
 * @returns a floored integer from a length of values,
 */
function aleaFn(targetValue: number, aleaFloat: number): number {
  return Math.floor(targetValue * aleaFloat)
}
export function prandom(target: RandomInput, aleaFloat: number): string | number {
  if (Array.isArray(target)) {
    const arrayPos = aleaFn(target.length, aleaFloat)
    return target[arrayPos]
  } else if (typeof target === 'number') {
    return aleaFn(target, aleaFloat)
  } else {
    throw new Error('Target supplied is not an array or a number!')
  }
}
/**
 * Returns a pseudo-random whole number (integer) within the given bounds.
 */
function _random(min: number, max: number) {
  if (!min && max) {
    min = 0
  } else if (min && !max) {
    max = min
    min = 0
  } else if (!min && !max) {
    throw new Error('_random called with insufficient parameters')
  }

  if (min > max) {
    [min, max] = [max, min]
  }
  // @todo make random use the seed
  return Math.floor(Math.random() * (max - min + 1)) + min
}
