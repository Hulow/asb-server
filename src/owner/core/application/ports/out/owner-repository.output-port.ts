import { Owner } from '../../../domain/owner';

export interface OwnerRepositoryOutputPort {
  save: (owner: Owner) => Promise<Owner>;
  getByOwnername: (ownername: string) => Promise<Owner | undefined>;
  getById: (ownerUid: string) => Promise<Owner | undefined>;
}

export const OWNER_REPOSITORY_OUTPUT_PORT = Symbol.for('OwnerRepositoryOutputPort');
