import { Frequency } from '../../../domain/frequency';

export interface FrequencyRepositoryOutputPort {
  save: (frequency: Frequency) => Promise<Frequency>;
  getByCabinetUid: (cabinetUid: string) => Promise<Frequency | undefined>;
}

export const FREQUENCY_REPOSITORY_OUTPUT_PORT = Symbol.for('FrequencyRepositoryOutputPort');
