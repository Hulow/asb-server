/* eslint-disable */
import { RegisterOwnerPattern } from './owner/export-owner';
import { RegisterDriverPattern } from './driver/export-driver';
import { RegisterCabinetPattern } from './cabinet/export-cabinet';

export type RegisterEntityOptions = RegisterOwnerPattern | RegisterCabinetPattern | RegisterDriverPattern;

export class ValidateInputJsonFile {
  constructor(private readonly data: object, private readonly registerEntityOptions: RegisterEntityOptions[]) {
    this.data = data;
    this.registerEntityOptions = registerEntityOptions;
  }

  async validateInput(): Promise<void> {
    const inputKeys: string[] = Object.keys(this.data);
    this.validateInputLength(inputKeys);
    this.validateInputKeys(inputKeys);
    this.validateInputValue();
  }

  private validateInputLength(keys: string[]): void {
    if (this.registerEntityOptions.length !== keys.length) throw new Error('Unexpected input object length');
  }

  private validateInputKeys(keys: string[]): void {
    for (const key of keys) {
      this.validateKey(key);
    }
  }

  private validateKey(key: any): void {
    if (!this.registerEntityOptions.includes(key)) throw new Error('Wrong key from input object');
  }

  private validateInputValue(): void {
    const values = Object.values(this.data) as string[];
    for (const value of values) {
      this.validateValue(value);
    }
  }

  private validateValue(value: string | number): void {
    if (typeof value !== 'string' && typeof value !== 'number')
      throw new Error('Wrong value type is from input object');
  }
}
