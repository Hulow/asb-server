import { injectable } from 'inversify';

import { CabinetRepositoryOutputPort } from '../../../core/application/ports/out/cabinet-repository.output-port';
import { Cabinet } from '../../../core/domain/cabinet';

@injectable()
export class InMemoryDriverRepository implements CabinetRepositoryOutputPort {
  public readonly cabinets: Cabinet[] = [];

  save(cabinet: Cabinet) {
    this.cabinets.push(new Cabinet({ ...cabinet }));
    return Promise.resolve(cabinet);
  }
}
