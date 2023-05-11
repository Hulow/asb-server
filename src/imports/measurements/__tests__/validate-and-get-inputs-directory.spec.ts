import * as fs from 'fs';
import * as path from 'path';

import {
  ValidateAndGetPathInputsDirectory,
  filesInputDirectory,
  FileExtension,
} from '../validate-and-get-path-inputs-directory';
import { InputFileName } from '../execute';

describe('ValidateAndGetInputsDirectory', () => {
  let INPUT_DIRECTORY: string;
  const directory = './inputs';
  const testInputsDirectory = path.join(__dirname, directory);

  afterEach(async () => {
    await cleanFilesDirectory();
  });

  async function cleanFilesDirectory(): Promise<void> {
    const files = await readFiles();
    files.map((file) => deleteFile(file));
  }

  async function readFiles(): Promise<string[]> {
    return await fs.promises.readdir(testInputsDirectory);
  }

  async function deleteFile(file: string): Promise<void> {
    return await fs.promises.unlink(`${testInputsDirectory}/${file}`);
  }

  async function createFilesDirectory(inputFileName: InputFileName): Promise<void> {
    for (const inputTestFile of [
      `${testInputsDirectory}/${inputFileName}.txt`,
      `${testInputsDirectory}/${inputFileName}.json`,
    ]) {
      await writeTestFile(inputTestFile);
    }
  }

  async function writeTestFile(inputTestFile: string): Promise<void> {
    await fs.promises.writeFile(inputTestFile, '');
  }

  const inputfileNames = [
    InputFileName.FrequencyResponse,
    InputFileName.ImpedanceResponse,
    InputFileName.ImpulseResponse,
  ];

  for (const inputFileName of inputfileNames) {
    it('validates and gets inputs directory', async () => {
      INPUT_DIRECTORY = './__tests__/inputs';
      await createFilesDirectory(inputFileName);
      const validateAndGetInputsDirectory = new ValidateAndGetPathInputsDirectory(INPUT_DIRECTORY, inputFileName);
      const response = await validateAndGetInputsDirectory.validateAndGetPathInputsDirectory();
      const getInputsDirectory: filesInputDirectory = {
        inputsDirectory: testInputsDirectory,
        fileInputs: {
          txtFile: `${inputFileName}${FileExtension.txt}`,
          jsonFile: `${inputFileName}${FileExtension.json}`,
        },
      };
      expect(response).toEqual(getInputsDirectory);
    });
  }

  it('should throw if directory does not exist', async () => {
    await createFilesDirectory(InputFileName.FrequencyResponse);
    INPUT_DIRECTORY = './unexisting_inputs';
    const validateAndGetInputsDirectory = new ValidateAndGetPathInputsDirectory(
      INPUT_DIRECTORY,
      InputFileName.FrequencyResponse,
    );
    const response = validateAndGetInputsDirectory.validateAndGetPathInputsDirectory();
    await expect(response).rejects.toThrow('Unable to find path directory');
  });

  it('should throw if directory is empty', async () => {
    INPUT_DIRECTORY = './__tests__/inputs';
    const validateAndGetInputsDirectory = new ValidateAndGetPathInputsDirectory(
      INPUT_DIRECTORY,
      InputFileName.FrequencyResponse,
    );
    const response = validateAndGetInputsDirectory.validateAndGetPathInputsDirectory();
    await expect(response).rejects.toThrow('Directory is empty');
  });

  it('should throw if directory has only one file', async () => {
    await createFilesDirectory(InputFileName.FrequencyResponse);
    await deleteFile(`${InputFileName.FrequencyResponse}${FileExtension.txt}`);
    INPUT_DIRECTORY = './__tests__/inputs';
    const validateAndGetInputsDirectory = new ValidateAndGetPathInputsDirectory(
      INPUT_DIRECTORY,
      InputFileName.FrequencyResponse,
    );
    const response = validateAndGetInputsDirectory.validateAndGetPathInputsDirectory();
    await expect(response).rejects.toThrow('Unable to process only one file');
  });

  it('should throw if directory has more than 2 files', async () => {
    await createFilesDirectory(InputFileName.FrequencyResponse);
    await createFilesDirectory(InputFileName.ImpedanceResponse);
    INPUT_DIRECTORY = './__tests__/inputs';
    const validateAndGetInputsDirectory = new ValidateAndGetPathInputsDirectory(
      INPUT_DIRECTORY,
      InputFileName.FrequencyResponse,
    );
    const response = validateAndGetInputsDirectory.validateAndGetPathInputsDirectory();
    await expect(response).rejects.toThrow('Unable to process more than two files');
  });

  it('should throw if directory files are under wrong extension', async () => {
    INPUT_DIRECTORY = './__tests__/inputs';
    await writeTestFile(`${testInputsDirectory}/${InputFileName.FrequencyResponse}${FileExtension.txt}`);
    await writeTestFile(`${testInputsDirectory}/${InputFileName.FrequencyResponse}.md`);
    const validateAndGetInputsDirectory = new ValidateAndGetPathInputsDirectory(
      INPUT_DIRECTORY,
      InputFileName.FrequencyResponse,
    );
    const response = validateAndGetInputsDirectory.validateAndGetPathInputsDirectory();
    await expect(response).rejects.toThrow('Files under wrong extension');
  });

  it('should throw if directory files are under wrong naming', async () => {
    INPUT_DIRECTORY = './__tests__/inputs';
    await writeTestFile(`${testInputsDirectory}/${InputFileName.FrequencyResponse}${FileExtension.txt}`);
    await writeTestFile(`${testInputsDirectory}/wrong-naming.json`);
    const validateAndGetInputsDirectory = new ValidateAndGetPathInputsDirectory(
      INPUT_DIRECTORY,
      InputFileName.FrequencyResponse,
    );
    const response = validateAndGetInputsDirectory.validateAndGetPathInputsDirectory();
    await expect(response).rejects.toThrow('Files under wrong naming');
  });
});
