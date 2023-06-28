import { inject, injectable } from 'inversify';

import { Frequency } from '../../domain/frequency';
import { RegisterFrequencyInput, RegisterFrequencyInputPort } from '../ports/in/register-frequency.input-port';
import {
  FrequencyRepositoryOutputPort,
  FREQUENCY_REPOSITORY_OUTPUT_PORT,
} from '../ports/out/frequency-repository.output-port';

@injectable()
export class RegisterFrequencyService implements RegisterFrequencyInputPort {
  constructor(
    @inject(FREQUENCY_REPOSITORY_OUTPUT_PORT) private readonly frequencyRepository: FrequencyRepositoryOutputPort,
  ) {}

  async handler(input: RegisterFrequencyInput): Promise<Frequency> {
    console.log(input);
    const frequency = new Frequency({
      measuredBy: 'string',
      measuredFrom: 'string',
      sweepLength: 'string',
      measuredAt: new Date(),
      frequencyWeightings: 'string',
      targetLevel: 500,
      note: 'string',
      smoothing: 'string',
      measurements: {},
    });
    return await this.frequencyRepository.save(frequency);
  }
}
