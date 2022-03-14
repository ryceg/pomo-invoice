/**
 * An alternative, stricter typed version of `Object.keys`.
 *
 * @example 
 * ```
 * const obj = { a: 0, b: 1 }
 * Object.keys(obj) // string[]
 * keys(obj) // "a" | "b"
 * ```
 */
export function keys<T>(object: T): (keyof T)[] {
  return Object.keys(object) as (keyof T)[]
}

export function entries<T>(object: T): [keyof T, T[keyof T]][] {
  return Object.entries(object) as [keyof T, T[keyof T]][]
}


export function fromEntries<T extends string, V>(object: [T, V][]): Record<T, V> {
  return Object.fromEntries(object) as Record<T, V>
}

export function values<T>(object: T): T[keyof T][] {
  return Object.values(object) as T[keyof T][]
}

/**
 * An alternative to `Object.assign`,
 * which asserts that the properties are added to the type.
 *
 * @example
 * ```
 * const obj = { a: 0, b: 1}
 * assign(obj, { c: 2 }) // Typescript now knows that c is available.
 * ```
 */
export function assign<T, S>(target: T, source: S): asserts target is T & S {
  Object.assign(target, source)
}

export const toUpperFirst = function <T extends string>(s: T): T {
  if (typeof s !== 'string') throw new Error(`toUpperFirst: ${s} is not a string.`)
  if (s.length === 0) return s
  return s.charAt(0).toUpperCase() + s.slice(1) as T
}