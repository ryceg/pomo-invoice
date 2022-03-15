import { defaults, ratePerHour } from './consts';
import { createUUID } from './utils';


export class Invoice {
  id = createUUID();
  client: string;
  dateOfIssue = new Date();
  rate: number = ratePerHour;
  flatRate = defaults.flatRate;
  title = '';
  notes = '';
  isSent = false
  isPaid = false
}
