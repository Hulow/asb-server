import { ValidateAndGetInputsDirectoryPath } from './validate-and-get-inputs-directory-path';

const INPUTS_DIRECTORY = 'inputs';

export enum InputFileName {
  ImpulseResponse = 'impulse_response',
  FrequencyResponse = 'frequency_response',
  ImpedanceResponse = 'impedance_response',
}

// execute().catch((err) => console.log(err));
async function execute() {
  try {
    await new ValidateAndGetInputsDirectoryPath(
      INPUTS_DIRECTORY,
      InputFileName.ImpulseResponse,
    ).validateAndGetInputsDirectoryPath();
  } catch (error) {
    console.log(error);
  }
}
