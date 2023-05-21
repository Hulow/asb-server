import { Cabinet } from '../../../domain/cabinet';

export interface CabinetRepositoryOutputPort {
  save: (driver: Cabinet) => Promise<Cabinet>;
}

export const CABINET_REPOSITORY_OUTPUT_PORT = Symbol.for('CabinetRepositoryOutputPort');
