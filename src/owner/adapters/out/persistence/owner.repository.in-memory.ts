import { injectable } from 'inversify';

import { OwnerRepositoryOutputPort } from '../../../core/application/ports/out/owner-repository.output-port';
import { Owner } from '../../../core/domain/owner';

@injectable()
export class InMemoryOwnerRepository implements OwnerRepositoryOutputPort {
  public owners: Owner[] = [];

  async save(owner: Owner) {
    this.owners.push({ ...owner });
    return Promise.resolve(owner);
  }

  async getByOwnername(ownername: string) {
    const _owner = this.owners.find((owner) => owner.ownername === ownername);
    if (!_owner) return undefined;
    const owner = new Owner({ ..._owner });
    return Promise.resolve(owner);
  }

  async getById(ownerUid: string) {
    const _owner = this.owners.find((owner) => owner.uid === ownerUid);
    if (!_owner) return undefined;
    const owner = new Owner({ ..._owner });
    return Promise.resolve(owner);
  }
}
