/* eslint-disable */

import * as fs from 'fs';
import { FilesInputDirectory } from './validate-and-get-inputs-directory-path';
import { RegisterMeasurementBody } from './export-measurement';

interface Measurement {
  metadata: MeasurementMetadata;
  data: string;
}

interface MeasurementMetadata {
  ownerUid: string;
  cabinetUid: string;
  driverUid: string;
}

export class ValidateAndReadMeasurement {
  constructor(private readonly inputsDirectoryPath: FilesInputDirectory) {
    this.inputsDirectoryPath = inputsDirectoryPath;
  }

  async validateAndReadMeasurement(): Promise<RegisterMeasurementBody> {
    const filesPath: string[] = [this.inputsDirectoryPath.jsonFilePath, this.inputsDirectoryPath.txtFilePath];
    this.validateFiles(filesPath);
    const measurement: Measurement = this.readFiles(filesPath);
    return this.mapMeasurements(measurement);
  }

  private validateFiles(filesPath: string[]): void {
    for (const path of filesPath) {
      this.validateFile(path);
    }
  }

  private validateFile(filePath: string): void {
    const proprieties = fs.statSync(filePath);
    if (proprieties.size <= 2) throw new Error(`File is empty`);
  }
  private readFiles(paths: string[]): Measurement {
    const metadata = JSON.parse(this.readFile(paths[0])) as MeasurementMetadata;
    const data: string = this.readFile(paths[1]);
    return { metadata, data };
  }

  private readFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf8');
  }

  private mapMeasurements(measurements: Measurement): RegisterMeasurementBody {
    const { metadata, data } = measurements;
    return {
      ownerUid: this.validateValue('ownerUid', metadata.ownerUid),
      cabinetUid: this.validateValue('cabinetUid', metadata.cabinetUid),
      driverUid: this.validateValue('driverUid', metadata.driverUid),
      measurements: this.validateValue('measurements', data),
    };
  }

  private validateValue(key: string, value: string): string {
    if (!value) throw new Error(`Missing ${key}`);
    if (typeof value !== 'string') throw new Error(`Wrong data type from ${key}`);
    return value;
  }
}
