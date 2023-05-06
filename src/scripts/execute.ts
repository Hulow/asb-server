import { ValidateAndGetInputsDirectory } from './validate-and-get-inputs-directory';

const INPUTS_DIRECTORY = 'inputs';

export enum InputFileName {
  ImpulseResponse = 'impulse_response',
  FrequencyResponse = 'frequency_response',
  ImpedanceResponse = 'impedance_response',
}

// execute().catch((err) => console.log(err));
async function execute() {
  try {
    await new ValidateAndGetInputsDirectory(
      INPUTS_DIRECTORY,
      InputFileName.ImpulseResponse,
    ).validateAndGetInputsDirectory();
  } catch (error) {
    console.log(error);
  }
}
