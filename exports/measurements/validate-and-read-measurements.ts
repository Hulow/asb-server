import * as fs from 'fs';
import { FilesInputDirectory } from './validate-and-get-inputs-directory-path';

interface Measurements {
  information: InformationMeasurements;
  results: string;
}

interface InformationMeasurements {
  userUid: string;
  cabinetUid: string;
  driverUid: string;
}

interface MappedMeasurements {
  userUid: string;
  cabinetUid: string;
  driverUid: string;
  measurements: string;
}

export class ValidateAndReadMeasurements {
  constructor(private readonly inputsDirectoryPath: FilesInputDirectory) {
    this.inputsDirectoryPath = inputsDirectoryPath;
  }

  validateAndReadMeasurements(): MappedMeasurements {
    const filesPath = [this.inputsDirectoryPath.jsonFilePath, this.inputsDirectoryPath.txtFilePath];
    this.validateFiles(filesPath);
    const measurements: Measurements = this.readFiles(filesPath);
    return this.mapMeasurements(measurements);
  }

  validateFiles(filesPath: string[]): void {
    for (const filePath of filesPath) {
      this.validateFileProprieties(filePath);
    }
  }

  validateFileProprieties(filePath: string): void {
    const fileProprieties = fs.statSync(filePath);
    if (fileProprieties.size === 0) throw new Error(`One file is empty`);
  }
  readFiles(filesPath: string[]): Measurements {
    const information = JSON.parse(this.readFile(filesPath[0])) as InformationMeasurements;
    const results: string = this.readFile(filesPath[1]);
    return { information, results };
  }

  readFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf8');
  }

  mapMeasurements(measurements: Measurements): MappedMeasurements {
    const { information, results } = measurements;
    return {
      userUid: this.validateValue('userUid', information.userUid),
      cabinetUid: this.validateValue('cabinetUid', information.cabinetUid),
      driverUid: this.validateValue('driverUid', information.driverUid),
      measurements: this.validateValue('measurements', results),
    };
  }

  validateValue(key: string, value: string): string {
    if (!value) throw new Error(`Missing ${key}`);
    if (typeof value !== 'string') throw new Error(`Wrong data type from ${key}`);
    return value;
  }
}
