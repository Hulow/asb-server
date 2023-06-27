import { Driver } from '../../../domain/driver';

export const REGISTER_DRIVER_INPUT_PORT = Symbol.for('RegisterDriverInputPort');

export interface RegisterDriverInput {
  brandName: string;
  productName: string;
  driverType: string;
  manufacturingYear: number;
  nominalDiameter: number;
  nominalImpedance: number;
  continuousPowerHandling: number;
  ownerUid: string;
  cabinetUid: string;
}

export interface RegisterDriverInputPort {
  handler: (input: RegisterDriverInput) => Promise<Driver>;
}
