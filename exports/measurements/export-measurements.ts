import { ValidateAndGetInputsDirectoryPath } from './validate-and-get-inputs-directory-path';
import { ValidateAndReadMeasurements } from './validate-and-read-measurements';

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
    new ValidateAndReadMeasurements(inputsDirectoryPath).validateAndReadMeasurements();
  } catch (error) {
    console.log(error);
  }
}
