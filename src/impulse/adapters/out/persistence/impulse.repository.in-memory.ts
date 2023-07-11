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

  async getByCabinetUid(cabinetUid: string) {
    const _impulse = this.impulses.find((impulse) => impulse.cabinetUid === cabinetUid);
    if (!_impulse) return undefined;
    const impulse = new Impulse({ ..._impulse });
    return Promise.resolve(impulse);
  }
}
