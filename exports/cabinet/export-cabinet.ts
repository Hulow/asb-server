import * as fs from 'fs';
import * as path from 'path';

import { ValidateInputJsonFile } from '../validate-input-json-file';
import { CabinetClient, RegisterCabinetResponse } from './cabinet-http-client';
import { RegisterCabinetInput } from '../../src/cabinet/core/application/ports/in/register-cabinet.input-port';

export enum RegisterCabinetPattern {
  brandName = 'brandName',
  productName = 'productName',
  enclosureType = 'enclosureType',
  weight = 'weight',
  dimension = 'dimension',
  manufacturingYear = 'manufacturingYear',
  description = 'description',
  ownerUid = 'ownerUid',
}
const registerCabinetPattern = [
  RegisterCabinetPattern.brandName,
  RegisterCabinetPattern.productName,
  RegisterCabinetPattern.enclosureType,
  RegisterCabinetPattern.weight,
  RegisterCabinetPattern.dimension,
  RegisterCabinetPattern.manufacturingYear,
  RegisterCabinetPattern.description,
  RegisterCabinetPattern.ownerUid,
];

export type RegisterCabinetBody = RegisterCabinetInput;

export class ExportCabinet {
  constructor(
    private readonly inputsDirectory: string,
    private readonly registerCabinetPattern: RegisterCabinetPattern[],
  ) {
    this.inputsDirectory = path.join(__dirname, inputsDirectory);
    this.registerCabinetPattern = registerCabinetPattern;
  }

  async registerCabinet(): Promise<RegisterCabinetResponse> {
    const data = fs.readFileSync(this.inputsDirectory, 'utf8');
    const cabinetBody = JSON.parse(data) as RegisterCabinetBody;
    await new ValidateInputJsonFile(cabinetBody, this.registerCabinetPattern).validateInput();
    return await new CabinetClient().registerCabinet(cabinetBody);
  }
}
const INPUTS_DIRECTORY = './inputs/cabinet.json';

// run().catch((err) => console.log(err));
// async function run() {
//   const resp = await new ExportCabinet(INPUTS_DIRECTORY, registerCabinetPattern).registerCabinet();
//   console.log(resp);
// }
