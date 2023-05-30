import * as fs from 'fs';
import * as path from 'path';

import {
  ValidateAndGetInputsDirectoryPath,
  FilesInputDirectory,
  FileExtension,
} from '../validate-and-get-inputs-directory-path';
import { InputFileName } from '../export-measurements';

describe('ValidateAndGetInputsDirectory', () => {
  let INPUT_DIRECTORY: string;
  const directory = './inputs';
  const testInputsDirectory = path.join(__dirname, directory);

  beforeEach(async () => {
    await createTestInputsDirectory();
  });

  afterEach(async () => {
    await cleanFilesDirectory();
    await deleteTestInputsDirectory();
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

  async function createTestInputsDirectory(): Promise<void> {
    if (!fs.existsSync(testInputsDirectory)) {
      return await fs.promises.mkdir(testInputsDirectory);
    }
  }

  async function deleteTestInputsDirectory(): Promise<void> {
    if (fs.existsSync(testInputsDirectory)) {
      return fs.promises.rmdir(testInputsDirectory);
    }
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
      const validateAndGetInputsDirectory = new ValidateAndGetInputsDirectoryPath(INPUT_DIRECTORY, inputFileName);
      const response = await validateAndGetInputsDirectory.validateAndGetInputsDirectoryPath();
      INPUT_DIRECTORY = './inputs';
      const getInputsDirectory: FilesInputDirectory = {
        txtFilePath: `${path.join(__dirname, INPUT_DIRECTORY)}/${inputFileName}${FileExtension.txt}`,
        jsonFilePath: `${path.join(__dirname, INPUT_DIRECTORY)}/${inputFileName}${FileExtension.json}`,
      };
      expect(response).toEqual(getInputsDirectory);
    });
  }

  it('should throw if directory does not exist', async () => {
    await createFilesDirectory(InputFileName.FrequencyResponse);
    INPUT_DIRECTORY = './unexisting_inputs';
    const validateAndGetInputsDirectory = new ValidateAndGetInputsDirectoryPath(
      INPUT_DIRECTORY,
      InputFileName.FrequencyResponse,
    );
    const response = validateAndGetInputsDirectory.validateAndGetInputsDirectoryPath();
    await expect(response).rejects.toThrow('Unable to find path directory');
  });

  it('should throw if directory is empty', async () => {
    INPUT_DIRECTORY = './__tests__/inputs';
    const validateAndGetInputsDirectory = new ValidateAndGetInputsDirectoryPath(
      INPUT_DIRECTORY,
      InputFileName.FrequencyResponse,
    );
    const response = validateAndGetInputsDirectory.validateAndGetInputsDirectoryPath();
    await expect(response).rejects.toThrow('Directory is empty');
  });

  it('should throw if directory has only one file', async () => {
    await createFilesDirectory(InputFileName.FrequencyResponse);
    await deleteFile(`${InputFileName.FrequencyResponse}${FileExtension.txt}`);
    INPUT_DIRECTORY = './__tests__/inputs';
    const validateAndGetInputsDirectory = new ValidateAndGetInputsDirectoryPath(
      INPUT_DIRECTORY,
      InputFileName.FrequencyResponse,
    );
    const response = validateAndGetInputsDirectory.validateAndGetInputsDirectoryPath();
    await expect(response).rejects.toThrow('Unable to process only one file');
  });

  it('should throw if directory has more than 2 files', async () => {
    await createFilesDirectory(InputFileName.FrequencyResponse);
    await createFilesDirectory(InputFileName.ImpedanceResponse);
    INPUT_DIRECTORY = './__tests__/inputs';
    const validateAndGetInputsDirectory = new ValidateAndGetInputsDirectoryPath(
      INPUT_DIRECTORY,
      InputFileName.FrequencyResponse,
    );
    const response = validateAndGetInputsDirectory.validateAndGetInputsDirectoryPath();
    await expect(response).rejects.toThrow('Unable to process more than two files');
  });

  it('should throw if directory files are under wrong extension', async () => {
    INPUT_DIRECTORY = './__tests__/inputs';
    await writeTestFile(`${testInputsDirectory}/${InputFileName.FrequencyResponse}${FileExtension.txt}`);
    await writeTestFile(`${testInputsDirectory}/${InputFileName.FrequencyResponse}.md`);
    const validateAndGetInputsDirectory = new ValidateAndGetInputsDirectoryPath(
      INPUT_DIRECTORY,
      InputFileName.FrequencyResponse,
    );
    const response = validateAndGetInputsDirectory.validateAndGetInputsDirectoryPath();
    await expect(response).rejects.toThrow('Files under wrong extension');
  });

  it('should throw if directory files are under wrong naming', async () => {
    INPUT_DIRECTORY = './__tests__/inputs';
    await writeTestFile(`${testInputsDirectory}/${InputFileName.FrequencyResponse}${FileExtension.txt}`);
    await writeTestFile(`${testInputsDirectory}/wrong-naming.json`);
    const validateAndGetInputsDirectory = new ValidateAndGetInputsDirectoryPath(
      INPUT_DIRECTORY,
      InputFileName.FrequencyResponse,
    );
    const response = validateAndGetInputsDirectory.validateAndGetInputsDirectoryPath();
    await expect(response).rejects.toThrow('Files under wrong naming');
  });
});
