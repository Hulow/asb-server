import { Owner } from '../../../domain/owner';

export const REGISTER_OWNER_INPUT_PORT = Symbol.for('RegisterOwnerInputPort');

export interface RegisterOwnerInput {
  firstName: string;
  lastName: string;
  ownername: string;
  email: string;
  phoneNumber: string;
  city: string;
  description: string;
}

export interface RegisterOwnerInputPort {
  handler: (input: RegisterOwnerInput) => Promise<Owner>;
}
