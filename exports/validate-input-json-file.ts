/* eslint-disable */

export class ValidateInputJsonFile {
  constructor(private readonly data: object, private readonly entityOptions: string[]) {
    this.data = data;
    this.entityOptions = entityOptions;
  }

  async validateInput(): Promise<void> {
    const keys: string[] = Object.keys(this.data);
    this.validateInputLength(keys);
    this.validateInputKeys(keys);
    this.validateInputValue();
  }

  private validateInputLength(keys: string[]): void {
    if (this.entityOptions.length !== keys.length) throw new Error('Unexpected input object length');
  }

  private validateInputKeys(keys: string[]): void {
    for (const key of keys) {
      this.validateKey(key);
    }
  }

  private validateKey(key: string): void {
    if (!this.entityOptions.includes(key)) throw new Error('Wrong key from input object');
  }

  private validateInputValue(): void {
    const values = Object.values(this.data) as string[];
    for (const value of values) {
      this.validateValue(value);
    }
  }

  private validateValue(value: string | number): void {
    if (typeof value !== 'string') throw new Error('Wrong value type is from input object');
  }
}
