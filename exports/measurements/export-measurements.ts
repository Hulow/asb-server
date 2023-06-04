import { ValidateAndGetInputsDirectoryPath } from './validate-and-get-inputs-directory-path';
import { ValidateAndReadMeasurement } from './validate-and-read-measurement';

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
    await new ValidateAndReadMeasurement(inputsDirectoryPath).validateAndReadMeasurement();

  } catch (error) {
    console.log(error);
  }
}
