import { Frequency } from '../../../domain/frequency';

export interface FrequencyRepositoryOutputPort {
  save: (frequency: Frequency) => Promise<Frequency>;
}

export const FREQUENCY_REPOSITORY_OUTPUT_PORT = Symbol.for('FrequencyRepositoryOutputPort');
