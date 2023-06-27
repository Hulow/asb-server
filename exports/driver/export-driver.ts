import * as fs from 'fs';
import * as path from 'path';

import { ValidateInputJsonFile } from '../validate-input-json-file';
import { DriverClient, RegisterDriverResponse } from './driver-http-client';
import { RegisterDriverInput } from '../../src/driver/core/application/ports/in/register-driver.input-port';

export enum RegisterDriverPattern {
  brandName = 'brandName',
  productName = 'productName',
  driverType = 'driverType',
  manufacturingYear = 'manufacturingYear',
  nominalDiameter = 'nominalDiameter',
  nominalImpedance = 'nominalImpedance',
  continuousPowerHandling = 'continuousPowerHandling',
  ownerUid = 'ownerUid',
  cabinetUid = 'cabinetUid',
}

const registerDriverPattern = [
  RegisterDriverPattern.brandName,
  RegisterDriverPattern.productName,
  RegisterDriverPattern.driverType,
  RegisterDriverPattern.manufacturingYear,
  RegisterDriverPattern.nominalDiameter,
  RegisterDriverPattern.nominalImpedance,
  RegisterDriverPattern.continuousPowerHandling,
  RegisterDriverPattern.ownerUid,
  RegisterDriverPattern.cabinetUid,
];

export type RegisterDriverBody = RegisterDriverInput;

export class ExportDriver {
  constructor(
    private readonly inputsDirectory: string,
    private readonly registerDriverPattern: RegisterDriverPattern[],
  ) {
    this.inputsDirectory = path.join(__dirname, inputsDirectory);
    this.registerDriverPattern = registerDriverPattern;
  }

  async registerDriver(): Promise<RegisterDriverResponse> {
    const data = fs.readFileSync(this.inputsDirectory, 'utf8');
    const driverBody = JSON.parse(data) as RegisterDriverBody;
    await new ValidateInputJsonFile(driverBody, this.registerDriverPattern).validateInput();
    return await new DriverClient().registerDriver(driverBody);
  }
}
const INPUTS_DIRECTORY = './inputs/driver.json';

// run().catch((err) => console.log(err));
// async function run() {
//   const resp = await new ExportDriver(INPUTS_DIRECTORY, registerDriverPattern).registerDriver();
//   console.log(resp);
// }
