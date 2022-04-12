import { toTemporalInstant } from '@js-temporal/polyfill';
// @ts-ignore
Date.prototype.toTemporalInstant = toTemporalInstant;