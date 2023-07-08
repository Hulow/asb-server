import { inject, injectable } from 'inversify';

import { Frequency, FrequencyResponse, FrequencyProps } from '../../domain/frequency';
import { RegisterFrequencyInput, RegisterFrequencyInputPort } from '../ports/in/register-frequency.input-port';
import {
  FrequencyRepositoryOutputPort,
  FREQUENCY_REPOSITORY_OUTPUT_PORT,
} from '../ports/out/frequency-repository.output-port';
import {
  CabinetRepositoryOutputPort,
  CABINET_REPOSITORY_OUTPUT_PORT,
} from '../../../../cabinet/core/application/ports/out/cabinet-repository.output-port';
import { FrequencyAlreadyExists, FrequencyParameterNotFound } from '../../domain/errors';
import { CabinetDoesNotExist } from '../../../../cabinet/core/domain/errors';

const PATTERN = '*\n';

const FrequencyparameterPatterns = {
  measuredBy: /(?<=measured by ).*/,
  source: /(?<=Source: ).*USB/,
  sweepLength: /(?<=Format: ).*Sine/,
  measuredAt: /(?<=Dated: ).*/,
  frequencyWeightings: / .*-weighting/,
  targetLevel: /(?<=Target level: ).*/,
  note: /(?<=Note: ).*/,
  smoothing: /(?<=Smoothing: ).*/,
};

enum FrequencyParametersName {
  MeasuredBy = 'measuredBy',
  Source = 'source',
  SweepLength = 'sweepLength',
  MeasuredAt = 'measuredAt',
  FrequencyWeightings = 'frequencyWeightings',
  TargetLevel = 'targetLevel',
  Note = 'note',
  Smoothing = 'smoothing',
}
interface ParametersAndPattern {
  name: FrequencyParametersName;
  pattern: RegExp;
}
const PARAMETERS_AND_PATTERNS: ParametersAndPattern[] = [
  { name: FrequencyParametersName.MeasuredBy, pattern: FrequencyparameterPatterns.measuredBy },
  { name: FrequencyParametersName.Source, pattern: FrequencyparameterPatterns.source },
  { name: FrequencyParametersName.SweepLength, pattern: FrequencyparameterPatterns.sweepLength },
  { name: FrequencyParametersName.MeasuredAt, pattern: FrequencyparameterPatterns.measuredAt },
  {
    name: FrequencyParametersName.FrequencyWeightings,
    pattern: FrequencyparameterPatterns.frequencyWeightings,
  },
  { name: FrequencyParametersName.TargetLevel, pattern: FrequencyparameterPatterns.targetLevel },
  { name: FrequencyParametersName.Note, pattern: FrequencyparameterPatterns.note },
  { name: FrequencyParametersName.Smoothing, pattern: FrequencyparameterPatterns.smoothing },
];
@injectable()
export class RegisterFrequencyService implements RegisterFrequencyInputPort {
  constructor(
    @inject(FREQUENCY_REPOSITORY_OUTPUT_PORT) private readonly frequencyRepository: FrequencyRepositoryOutputPort,
    @inject(CABINET_REPOSITORY_OUTPUT_PORT) private readonly cabinetRepository: CabinetRepositoryOutputPort,
  ) {}

  async handler(input: RegisterFrequencyInput): Promise<Frequency> {
    const existingCabinet = await this.cabinetRepository.getById(input.cabinetUid);
    if (!existingCabinet) {
      throw new CabinetDoesNotExist(input.cabinetUid);
    }
    const existingFrequency = await this.frequencyRepository.getByCabinetUid(input.cabinetUid);
    if (existingFrequency) {
      throw new FrequencyAlreadyExists(input.cabinetUid);
    }
    const newFrequency = this.mapFrequency(input);
    return await this.frequencyRepository.save(new Frequency({ ...newFrequency }));
  }

  private mapFrequency(input: RegisterFrequencyInput): FrequencyProps {
    const { measurements } = input;
    const parametersAndMeasurements = measurements.split(PATTERN);
    const parameters = parametersAndMeasurements[0].split('\n');
    const measurementData = parametersAndMeasurements[1].split('\n');
    measurementData.shift();
    const mappedParameters: FrequencyProps = this.mapParameters(parameters);
    const frequencyResponse: FrequencyResponse[] = this.mapFrequencyResponse(measurementData);
    return this.mapFrequencyObject(input.cabinetUid, mappedParameters, frequencyResponse);
  }

  private mapParameters(parameters: string[]): FrequencyProps {
    const mappedParameters: Partial<FrequencyProps> = {};
    for (const parameterNameAndPattern of PARAMETERS_AND_PATTERNS) {
      const parameter = this.mapSingleParameter(parameterNameAndPattern, parameters);
      mappedParameters[`${parameter.name}`] = parameter.value;
    }
    return mappedParameters as FrequencyProps;
  }

  private mapSingleParameter(
    parameterNameAndPattern: ParametersAndPattern,
    parameters: string[],
  ): {
    name: FrequencyParametersName;
    value: string;
  } {
    for (const parameter of parameters) {
      const matchedParameter = this.matchParameter(parameter, parameterNameAndPattern.pattern);
      if (matchedParameter) {
        return { name: parameterNameAndPattern.name, value: matchedParameter.trim() };
      }
    }
    throw new FrequencyParameterNotFound(parameterNameAndPattern.name);
  }

  private matchParameter(parameter: string, parameterPattern: RegExp): string | undefined {
    const match = parameter.match(parameterPattern);
    if (match?.length) return match[0];
    return undefined;
  }

  private mapFrequencyResponse(measurements: string[]): FrequencyResponse[] {
    const frequencyResponse: FrequencyResponse[] = [];
    for (const measurement of measurements) {
      const frequencyAndSoundPressureAndPhase = measurement.split(' ');
      if (frequencyAndSoundPressureAndPhase.length === 3)
        frequencyResponse.push(this.mapFrequencyAndSoundPressureAndPhase(frequencyAndSoundPressureAndPhase));
    }
    return frequencyResponse;
  }

  private mapFrequencyAndSoundPressureAndPhase(frequencyAndSoundPressureAndPhase: string[]): FrequencyResponse {
    return {
      frequency: Number(frequencyAndSoundPressureAndPhase[0]),
      spl: Number(frequencyAndSoundPressureAndPhase[1]),
      phase: Number(frequencyAndSoundPressureAndPhase[2]),
    };
  }

  private mapFrequencyObject(
    cabinetUid: string,
    mappedParameters: FrequencyProps,
    frequencyResponse: FrequencyResponse[],
  ): FrequencyProps {
    return {
      measuredBy: mappedParameters.measuredBy,
      source: mappedParameters.source,
      sweepLength: mappedParameters.sweepLength,
      measuredAt: mappedParameters.measuredAt,
      frequencyWeightings: mappedParameters.frequencyWeightings,
      targetLevel: mappedParameters.targetLevel,
      note: mappedParameters.note,
      smoothing: mappedParameters.smoothing,
      measurements: frequencyResponse,
      cabinetUid: cabinetUid,
    };
  }
}
