import { ValidateAndGetInputsDirectoryPath } from './validate-and-get-inputs-directory-path';
import { ValidateAndReadMeasurement } from './validate-and-read-measurement';
import { FilesInputDirectory } from './validate-and-get-inputs-directory-path';
import { MeasurementClient } from './measurement-http-client';

const INPUTS_DIRECTORY = 'inputs';

export enum InputFileName {
  ImpulseResponse = 'impulse_response',
  FrequencyResponse = 'frequency_response',
  ImpedanceResponse = 'impedance_response',
}

// exportMeasurement(InputFileName.ImpedanceResponse).catch((err) => console.log(err));
async function exportMeasurement(inputFileName: InputFileName) {
  let inputsDirectoryPath: FilesInputDirectory;
  try {
    switch (inputFileName) {
      case InputFileName.FrequencyResponse:
        inputsDirectoryPath = await new ValidateAndGetInputsDirectoryPath(
          INPUTS_DIRECTORY,
          InputFileName.FrequencyResponse,
        ).validateAndGetInputsDirectoryPath();
        await new ValidateAndReadMeasurement(inputsDirectoryPath).validateAndReadMeasurement();
        await new MeasurementClient().registerFrequency();
        break;

      case InputFileName.ImpedanceResponse:
        inputsDirectoryPath = await new ValidateAndGetInputsDirectoryPath(
          INPUTS_DIRECTORY,
          InputFileName.ImpedanceResponse,
        ).validateAndGetInputsDirectoryPath();
        await new ValidateAndReadMeasurement(inputsDirectoryPath).validateAndReadMeasurement();
        await new MeasurementClient().registerImpedance();
        break;

      case InputFileName.ImpulseResponse:
        inputsDirectoryPath = await new ValidateAndGetInputsDirectoryPath(
          INPUTS_DIRECTORY,
          InputFileName.ImpulseResponse,
        ).validateAndGetInputsDirectoryPath();
        await new ValidateAndReadMeasurement(inputsDirectoryPath).validateAndReadMeasurement();
        await new MeasurementClient().registerImpulse();
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
