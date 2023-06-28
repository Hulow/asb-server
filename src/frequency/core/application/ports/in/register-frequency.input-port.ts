import { Frequency } from '../../../domain/frequency';

export const REGISTER_FREQUENCY_INPUT_PORT = Symbol.for('RegisterFrequencyInputPort');

export interface RegisterFrequencyInput {
  ownerUid: string;
  cabinetUid: string;
  driverUid: string;
  measurements: string;
}

export interface RegisterFrequencyInputPort {
  handler: (input: RegisterFrequencyInput) => Promise<Frequency>;
}
