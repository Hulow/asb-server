import { Impedance } from '../../../domain/impedance';

export interface ImpedanceRepositoryOutputPort {
  save: (impedance: Impedance) => Promise<Impedance>;
}

export const IMPEDANCE_REPOSITORY_OUTPUT_PORT = Symbol.for('ImpedanceRepositoryOutputPort');
