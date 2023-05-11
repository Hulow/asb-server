import { ValidateAndGetPathInputsDirectory } from './validate-and-get-path-inputs-directory';

const INPUTS_DIRECTORY = 'inputs';

export enum InputFileName {
  ImpulseResponse = 'impulse_response',
  FrequencyResponse = 'frequency_response',
  ImpedanceResponse = 'impedance_response',
}

// execute().catch((err) => console.log(err));
async function execute() {
  try {
    await new ValidateAndGetPathInputsDirectory(
      INPUTS_DIRECTORY,
      InputFileName.ImpulseResponse,
    ).validateAndGetPathInputsDirectory();
  } catch (error) {
    console.log(error);
  }
}
