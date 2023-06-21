import { Cabinet } from '../../../domain/cabinet';
import { Owner } from '../../../../../owner/core/domain/owner';

export interface CabinetRepositoryOutputPort {
  save: (cabinet: Cabinet, OwnerUid: Owner) => Promise<Cabinet>;
  getByProductNameAndOwnerUid: (productName: string, ownerUid: string) => Promise<Cabinet | undefined>;
}

export const CABINET_REPOSITORY_OUTPUT_PORT = Symbol.for('CabinetRepositoryOutputPort');
