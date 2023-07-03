import { ValidateAndGetInputsDirectoryPath } from './validate-and-get-inputs-directory-path';
import { ValidateAndReadMeasurement } from './validate-and-read-measurement';
import { FilesInputDirectory } from './validate-and-get-inputs-directory-path';
import { MeasurementClient } from './measurement-http-client';
import { RegisterFrequencyInput } from '../../src/frequency/core/application/ports/in/register-frequency.input-port';

const INPUTS_DIRECTORY = 'inputs';

export enum InputFileName {
  ImpulseResponse = 'impulse_response',
  FrequencyResponse = 'frequency_response',
  ImpedanceResponse = 'impedance_response',
}

export enum MeasurementEndPoint {
  frequency = '/api/frequency/register',
  impulse = '/api/impulse/register',
  Impedance = '/api/impedance/register',
}

export type RegisterMeasurementBody = RegisterFrequencyInput;

// exportMeasurement(InputFileName.ImpedanceResponse).catch((err) => console.log(err));
async function exportMeasurement(inputFileName: InputFileName) {
  let inputsDirectoryPath: FilesInputDirectory;
  let measurement: RegisterMeasurementBody;
  try {
    switch (inputFileName) {
      case InputFileName.FrequencyResponse:
        inputsDirectoryPath = await new ValidateAndGetInputsDirectoryPath(
          INPUTS_DIRECTORY,
          InputFileName.FrequencyResponse,
        ).validateAndGetInputsDirectoryPath();
        measurement = await new ValidateAndReadMeasurement(inputsDirectoryPath).validateAndReadMeasurement();
        await new MeasurementClient().registerMeasurement(measurement, MeasurementEndPoint.frequency);
        break;

      case InputFileName.ImpedanceResponse:
        inputsDirectoryPath = await new ValidateAndGetInputsDirectoryPath(
          INPUTS_DIRECTORY,
          InputFileName.ImpedanceResponse,
        ).validateAndGetInputsDirectoryPath();
        measurement = await new ValidateAndReadMeasurement(inputsDirectoryPath).validateAndReadMeasurement();
        await new MeasurementClient().registerMeasurement(measurement, MeasurementEndPoint.Impedance);
        break;

      case InputFileName.ImpulseResponse:
        inputsDirectoryPath = await new ValidateAndGetInputsDirectoryPath(
          INPUTS_DIRECTORY,
          InputFileName.ImpulseResponse,
        ).validateAndGetInputsDirectoryPath();
        measurement = await new ValidateAndReadMeasurement(inputsDirectoryPath).validateAndReadMeasurement();
        await new MeasurementClient().registerMeasurement(measurement, MeasurementEndPoint.impulse);
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
