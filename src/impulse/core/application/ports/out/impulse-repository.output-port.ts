import { Impulse } from '../../../domain/impulse';

export interface ImpulseRepositoryOutputPort {
  save: (impulse: Impulse) => Promise<Impulse>;
  getByCabinetUid: (cabinetUid: string) => Promise<Impulse | undefined>;
}

export const IMPULSE_REPOSITORY_OUTPUT_PORT = Symbol.for('ImpulseRepositoryOutputPort');
