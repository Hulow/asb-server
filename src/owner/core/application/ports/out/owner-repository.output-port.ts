import { Owner } from '../../../domain/owner';

export interface OwnerRepositoryOutputPort {
  save: (owner: Owner) => Promise<Owner>;
}

export const OWNER_REPOSITORY_OUTPUT_PORT = Symbol.for('OwnerRepositoryOutputPort');
