import { Impulse } from '../../../domain/impulse';

export const REGISTER_IMPULSE_INPUT_PORT = Symbol.for('RegisterImpulseInputPort');

export interface RegisterImpulseInput {
  ownerUid: string;
  cabinetUid: string;
  driverUid: string;
  measurements: string;
}

export interface RegisterImpulseInputPort {
  handler: (input: RegisterImpulseInput) => Promise<Impulse>;
}
