import { ValidateAndGetInputsDirectoryPath } from './validate-and-get-inputs-directory-path';
import { ValidateAndReadMeasurement, MappedMeasurement } from './validate-and-read-measurement';
import { CompressAndEncryptData } from '../compress-and-encrypt-data';

const INPUTS_DIRECTORY = 'inputs';

export enum InputFileName {
  ImpulseResponse = 'impulse_response',
  FrequencyResponse = 'frequency_response',
  ImpedanceResponse = 'impedance_response',
}

//exportMeasurement().catch((err) => console.log(err));
async function exportMeasurement() {
  try {
    const inputsDirectoryPath = await new ValidateAndGetInputsDirectoryPath(
      INPUTS_DIRECTORY,
      InputFileName.ImpedanceResponse,
    ).validateAndGetInputsDirectoryPath();
    const measurement: MappedMeasurement = await new ValidateAndReadMeasurement(inputsDirectoryPath).validateAndReadMeasurement();
    new CompressAndEncryptData(measurement).compressAndEncryptData()

  } catch (error) {
    console.log(error);
  }
}
