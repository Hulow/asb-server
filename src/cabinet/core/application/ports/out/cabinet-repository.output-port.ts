import { Cabinet } from '../../../domain/cabinet';

export interface CabinetRepositoryOutputPort {
  save: (cabinet: Cabinet) => Promise<Cabinet>;
  getByProductNameAndOwnerUid: (productName: string, ownerUid: string) => Promise<Cabinet | undefined>;
  getById: (cabinetUid: string) => Promise<Cabinet | undefined>;
  getAllCabinets: () => Promise<Cabinet[] | undefined>;
}

export const CABINET_REPOSITORY_OUTPUT_PORT = Symbol.for('CabinetRepositoryOutputPort');
