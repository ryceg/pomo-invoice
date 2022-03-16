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

export const formFields = [
  {
    type: 'text',
    label: 'First Name',
    name: 'firstName'
  },
  {
    type: 'text',
    label: 'Last Name',
    name: 'lastName'
  },
  {
    type: 'email',
    label: 'Email',
    name: 'email'
  },
  {
    type: 'text',
    label: 'Phone',
    name: 'phone'
  },
  {
    type: 'text',
    label: 'Address',
    name: 'address'
  },
  {
    type: 'text',
    label: 'Notes',
    name: 'notes'
  }
];