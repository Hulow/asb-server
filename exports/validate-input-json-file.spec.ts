import { ValidateInputJsonFile } from './validate-input-json-file';

describe('ValidateInputJsonFile', () => {
  it('should throw if data and entityOptions are conformed', async () => {
    const entityOptions = ['key1', 'key2'];
    const data = {
      key1: 'test-1',
      key2: 'test-2',
    };
    const response = new ValidateInputJsonFile(data, entityOptions).validateInput();
    await expect(response).resolves.toEqual(undefined);
  });

  it('should throw if data length and entityOptions length are not equal', async () => {
    const entityOptions = ['key1', 'key2'];
    const data = {
      key1: 'test-1',
      key2: 'test-2',
      key3: 'test-3',
    };
    const response = new ValidateInputJsonFile(data, entityOptions).validateInput();
    await expect(response).rejects.toThrow('Unexpected input object length');
  });

  it('should throw if data has a wrong key', async () => {
    const entityOptions = ['key1', 'key2'];
    const data = {
      key1: 'test-1',
      wrongKey: 'test-2',
    };
    const response = new ValidateInputJsonFile(data, entityOptions).validateInput();
    await expect(response).rejects.toThrow('Wrong key from input object');
  });

  it('should throw if data has a wrong value type', async () => {
    const entityOptions = ['key1', 'key2'];
    const data = {
      key1: 'test-1',
      key2: 2,
    };
    const response = new ValidateInputJsonFile(data, entityOptions).validateInput();
    await expect(response).rejects.toThrow('Wrong value type is from input object');
  });
});
