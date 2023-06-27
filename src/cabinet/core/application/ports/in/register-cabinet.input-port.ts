import { Cabinet } from '../../../domain/cabinet';

export const REGISTER_CABINET_INPUT_PORT = Symbol.for('RegisterCabinetInputPort');

export interface RegisterCabinetInput {
  brandName: string;
  productName: string;
  enclosureType: string;
  weight: number;
  dimension: string;
  manufacturingYear: number;
  description: string;
  ownerUid: string;
}

export interface RegisterCabinetInputPort {
  handler: (input: RegisterCabinetInput) => Promise<Cabinet>;
}
