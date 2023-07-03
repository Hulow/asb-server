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
      source: 'string',
      sweepLength: 'string',
      measuredAt: new Date(),
      frequencyWeightings: 'string',
      targetLevel: 500,
      note: 'string',
      smoothing: 'string',
      measurements: {},
      cabinetUid: 'a174f23b-7c9f-4102-b0b6-201746d48198',
    });
    return await this.frequencyRepository.save(frequency);
  }
}
