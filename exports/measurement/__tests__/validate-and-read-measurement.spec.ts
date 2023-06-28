import * as fs from 'fs';
import * as path from 'path';

import { InputFileName } from '../export-measurement';
import { ValidateAndReadMeasurement, MappedMeasurement } from '../validate-and-read-measurement';
import { FilesInputDirectory, FileExtension } from '../validate-and-get-inputs-directory-path';

describe('ValidateAndReadMeasurement', () => {
  let INPUT_DIRECTORY: string;
  const directory = './inputs-2';
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

  async function writeTextFile(inputTestFile: string, data: string): Promise<void> {
    if (!fs.existsSync(inputTestFile)) {
      await fs.promises.writeFile(inputTestFile, data);
    }
  }

  async function writeJsonFile(inputTestFile: string, metadata: object): Promise<void> {
    if (!fs.existsSync(inputTestFile)) {
      return await fs.promises.writeFile(inputTestFile, JSON.stringify(metadata));
    }
  }

  it('validates and read measurement', async () => {
    INPUT_DIRECTORY = path.join(__dirname, directory);
    const metadata = {
      ownerUid: '1',
      cabinetUid: '2',
      driverUid: '2',
    };
    await writeTextFile(
      `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.txt}`,
      'Testing .txt file',
    );
    await writeJsonFile(`${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.json}`, metadata);

    const filesInputDirectory: FilesInputDirectory = {
      jsonFilePath: `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.json}`,
      txtFilePath: `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.txt}`,
    };

    const response = new ValidateAndReadMeasurement(filesInputDirectory).validateAndReadMeasurement();
    const mappedMeasurement: MappedMeasurement = {
      ownerUid: '1',
      cabinetUid: '2',
      driverUid: '2',
      measurements: 'Testing .txt file',
    };
    await expect(response).resolves.toEqual(mappedMeasurement);
  });

  it('should throw if TXT file is empty', async () => {
    INPUT_DIRECTORY = path.join(__dirname, directory);
    const metadata = {
      ownerUid: '1',
      cabinetUid: '2',
      driverUid: '2',
    };
    await writeTextFile(`${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.txt}`, '');
    await writeJsonFile(`${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.json}`, metadata);

    const filesInputDirectory: FilesInputDirectory = {
      jsonFilePath: `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.json}`,
      txtFilePath: `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.txt}`,
    };

    const response = new ValidateAndReadMeasurement(filesInputDirectory).validateAndReadMeasurement();
    await expect(response).rejects.toThrow(`File is empty`);
  });

  it('should throw if JSON file is empty', async () => {
    INPUT_DIRECTORY = path.join(__dirname, directory);
    const metadata = {};
    await writeTextFile(
      `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.txt}`,
      'Testing .txt file',
    );
    await writeJsonFile(`${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.json}`, metadata);

    const filesInputDirectory: FilesInputDirectory = {
      jsonFilePath: `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.json}`,
      txtFilePath: `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.txt}`,
    };

    const response = new ValidateAndReadMeasurement(filesInputDirectory).validateAndReadMeasurement();
    await expect(response).rejects.toThrow(`File is empty`);
  });
  it('should throw if one key is missing from JSON file', async () => {
    INPUT_DIRECTORY = path.join(__dirname, directory);
    const metadata = {
      ownerUid: '1',
      cabinetUid: '2',
    };
    await writeTextFile(
      `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.txt}`,
      'Testing .txt file',
    );
    await writeJsonFile(`${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.json}`, metadata);

    const filesInputDirectory: FilesInputDirectory = {
      jsonFilePath: `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.json}`,
      txtFilePath: `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.txt}`,
    };

    const response = new ValidateAndReadMeasurement(filesInputDirectory).validateAndReadMeasurement();
    await expect(response).rejects.toThrow(`Missing driverUid`);
  });

  it('should throw if wrong data type from JSON file', async () => {
    INPUT_DIRECTORY = path.join(__dirname, directory);
    const metadata = {
      ownerUid: '1',
      cabinetUid: '2',
      driverUid: 3,
    };
    await writeTextFile(
      `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.txt}`,
      'Testing .txt file',
    );
    await writeJsonFile(`${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.json}`, metadata);

    const filesInputDirectory: FilesInputDirectory = {
      jsonFilePath: `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.json}`,
      txtFilePath: `${INPUT_DIRECTORY}/${InputFileName.ImpedanceResponse}${FileExtension.txt}`,
    };

    const response = new ValidateAndReadMeasurement(filesInputDirectory).validateAndReadMeasurement();
    await expect(response).rejects.toThrow(`Wrong data type from driverUid`);
  });
});
