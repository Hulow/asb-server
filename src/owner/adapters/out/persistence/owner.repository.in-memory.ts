import { injectable } from 'inversify';

import { OwnerRepositoryOutputPort } from '../../../core/application/ports/out/owner-repository.output-port';
import { Owner } from '../../../core/domain/owner';

@injectable()
export class InMemoryOwnerRepository implements OwnerRepositoryOutputPort {
  public readonly owners: Owner[] = [];

  save(owner: Owner) {
    this.owners.push(new Owner({ ...owner }));
    return Promise.resolve(owner);
  }

  async getByOwnername(ownername: string) {
    const _owner = this.owners.find((owner) => owner.ownername === ownername);
    if (!_owner) return undefined;

    const user = new Owner({ ..._owner });
    return Promise.resolve(user);
  }
}
