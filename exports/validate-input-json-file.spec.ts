import { ValidateInputJsonFile } from './validate-input-json-file';
import { RegisterOwnerPattern } from './owner/export-owner';
describe('ValidateInputJsonFile', () => {
  it('should throw if data and entityOptions are conformed', async () => {
    const registerEntityOptions = [RegisterOwnerPattern.firstName, RegisterOwnerPattern.lastName];
    const data = {
      firstName: 'first-name',
      lastName: 'last-name',
    };
    const response = new ValidateInputJsonFile(data, registerEntityOptions).validateInput();
    await expect(response).resolves.toEqual(undefined);
  });

  it('should throw if data length and entityOptions length are not equal', async () => {
    const registerEntityOptions = [RegisterOwnerPattern.firstName, RegisterOwnerPattern.lastName];
    const data = {
      firstName: 'first-name',
      lastName: 'last-name',
      ownername: 'ownername',
    };
    const response = new ValidateInputJsonFile(data, registerEntityOptions).validateInput();
    await expect(response).rejects.toThrow('Unexpected input object length');
  });

  it('should throw if data has a wrong key', async () => {
    const registerEntityOptions = [RegisterOwnerPattern.firstName, RegisterOwnerPattern.lastName];
    const data = {
      firstName: 'first-name',
      wrongKey: 'wrong-value',
    };
    const response = new ValidateInputJsonFile(data, registerEntityOptions).validateInput();
    await expect(response).rejects.toThrow('Wrong key from input object');
  });

  it('should throw if data has a wrong value type', async () => {
    const registerEntityOptions = [RegisterOwnerPattern.firstName, RegisterOwnerPattern.lastName];
    const data = {
      firstName: 'first-name',
      lastName: 2,
    };
    const response = new ValidateInputJsonFile(data, registerEntityOptions).validateInput();
    await expect(response).rejects.toThrow('Wrong value type is from input object');
  });
});
