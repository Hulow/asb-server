import * as fs from 'fs';
import * as path from 'path';
import { InputFileName } from './execute';

export enum fileExtension {
  txt = '.txt',
  json = '.json',
}

interface FileInputs {
  txtFile: string;
  jsonFile: string;
}

export interface filesInputDirectory {
  inputsDirectory: string;
  fileInputs: FileInputs;
}

export class ValidateAndGetInputsDirectory {
  constructor(private readonly inputsDirectory: string, private readonly inputFileName: InputFileName) {
    this.inputsDirectory = path.join(__dirname, inputsDirectory);
  }

  async validateAndGetInputs(): Promise<filesInputDirectory> {
    await this.validateDirectory();
    await this.validateContentDirectory();
    const files = await this.validateAndGetFiles();
    const { txtFile, jsonFile } = files;
    return {
      inputsDirectory: this.inputsDirectory,
      fileInputs: {
        txtFile: txtFile,
        jsonFile: jsonFile,
      },
    };
  }

  private async validateDirectory(): Promise<void> {
    if (!fs.existsSync(this.inputsDirectory)) throw new Error(`Unable to find path directory`);
    const directory = await fs.promises.lstat(this.inputsDirectory);
    if (!directory.isDirectory()) throw new Error(`Expected path is not a directory`);
  }

  private async validateContentDirectory(): Promise<void> {
    const files = await this.readFilesFromDirectory();
    if (files.length === 0) throw new Error('Directory is empty');
    if (files.length === 1) throw new Error('Unable to process only one file');
    if (files.length > 2) throw Error('Unable to process more than two files');
  }

  private async readFilesFromDirectory(): Promise<string[]> {
    return await fs.promises.readdir(this.inputsDirectory);
  }

  private async validateAndGetFiles(): Promise<FileInputs> {
    const files = await this.readFilesFromDirectory();
    const textFiles = files.filter((file) => fileExtension.txt === this.getExtensionFile(file));
    const jsonFiles = files.filter((file) => fileExtension.json === this.getExtensionFile(file));
    if (textFiles.length !== 1 || jsonFiles.length !== 1) throw new Error('Files under wrong extension');
    this.validateFileName(textFiles[0]);
    this.validateFileName(jsonFiles[0]);
    return {
      txtFile: textFiles[0],
      jsonFile: jsonFiles[0],
    };
  }

  private getExtensionFile(file: string): fileExtension {
    return path.extname(file) as fileExtension;
  }

  private validateFileName(file: string) {
    if (!path.parse(file).name.includes(this.inputFileName)) throw new Error('Files under wrong naming');
  }
}
