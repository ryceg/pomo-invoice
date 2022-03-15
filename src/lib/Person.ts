import { createUUID } from './utils';


export class Person {
  constructor(base: Partial<Person>) {
    Object.assign(this, base);
  }
  id = createUUID();
  firstName = '';
  lastName = '';
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  address = '';
  phone = '';
  email = '';
  notes = '';
}
