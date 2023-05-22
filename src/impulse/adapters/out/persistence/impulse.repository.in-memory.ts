import { injectable } from 'inversify';

import { ImpulseRepositoryOutputPort } from '../../../core/application/ports/out/impulse-repository.output-port';
import { Impulse } from '../../../core/domain/impulse';

@injectable()
export class InMemoryImpulseRepository implements ImpulseRepositoryOutputPort {
  public readonly impulses: Impulse[] = [];

  save(impulse: Impulse) {
    this.impulses.push(new Impulse({ ...impulse }));
    return Promise.resolve(impulse);
  }
}
