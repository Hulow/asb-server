import { Impedance } from '../../../domain/impedance';

export const REGISTER_IMPEDANCE_INPUT_PORT = Symbol.for('RegisterImpedanceInputPort');

export interface RegisterImpedanceInput {
  ownerUid: string;
  cabinetUid: string;
  driverUid: string;
  measurements: string;
}

export interface RegisterImpedanceInputPort {
  handler: (input: RegisterImpedanceInput) => Promise<Impedance>;
}
