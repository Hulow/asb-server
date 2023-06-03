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
}
