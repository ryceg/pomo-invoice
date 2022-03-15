import { createUUID } from './utils';


export class Pomo {
  id = createUUID();
  associatedJob: string;
  timestamps: [Date, Date][] = [];
  invoiceLine = '';
  notes = '';
}
