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
interface PersonField {
  type: string
  label: string
  name: string
}
export const personFields: PersonField[] = [
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