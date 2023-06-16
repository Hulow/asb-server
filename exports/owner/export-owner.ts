import * as fs from 'fs';
import * as path from 'path';

import { ValidateInputJsonFile } from '../validate-input-json-file';
import { OwnerClient, RegisterOwnerResponse } from './owner-http-client';
import { RegisterOwnerInput } from '../../src/owner/core/application/ports/in/register-owner.input-port';

export enum RegisterOwnerPattern {
  firstName = 'firstName',
  lastName = 'lastName',
  ownername = 'ownername',
  email = 'email',
  phoneNumber = 'phoneNumber',
  city = 'city',
  description = 'description',
}

const registerOwnerPattern = [
  RegisterOwnerPattern.firstName,
  RegisterOwnerPattern.lastName,
  RegisterOwnerPattern.ownername,
  RegisterOwnerPattern.email,
  RegisterOwnerPattern.phoneNumber,
  RegisterOwnerPattern.city,
  RegisterOwnerPattern.description,
];

export type RegisterOwnerBody = RegisterOwnerInput;

export class ExportOwner {
  constructor(private readonly inputsDirectory: string, private readonly registerOwnerPattern: RegisterOwnerPattern[]) {
    this.inputsDirectory = path.join(__dirname, inputsDirectory);
    this.registerOwnerPattern = registerOwnerPattern;
  }

  async registerOwner(): Promise<RegisterOwnerResponse> {
    const data = fs.readFileSync(this.inputsDirectory, 'utf8');
    const ownerBody = JSON.parse(data) as RegisterOwnerBody;
    await new ValidateInputJsonFile(ownerBody, this.registerOwnerPattern).validateInput();
    return await new OwnerClient().registerOwner(ownerBody);
  }
}
const INPUTS_DIRECTORY = './inputs/owner.json';

// run().catch((err) => console.log(err));
// async function run() {
//   const resp = await new ExportOwner(INPUTS_DIRECTORY, registerOwnerPattern).registerOwner();
//   console.log(resp);
// }
