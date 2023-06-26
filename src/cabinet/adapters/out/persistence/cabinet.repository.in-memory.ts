import { injectable } from 'inversify';

import { CabinetRepositoryOutputPort } from '../../../core/application/ports/out/cabinet-repository.output-port';
import { Cabinet } from '../../../core/domain/cabinet';

@injectable()
export class InMemoryCabinetRepository implements CabinetRepositoryOutputPort {
  public readonly cabinets: Cabinet[] = [];

  async save(cabinet: Cabinet) {
    this.cabinets.push(new Cabinet({ ...cabinet }));
    return Promise.resolve(cabinet);
  }
  async getByProductNameAndOwnerUid(productName: string, ownerUid: string) {
    const _cabinet = this.cabinets.find(
      (cabinet) => cabinet.productName === productName && cabinet.ownerUid === ownerUid,
    );
    if (!_cabinet) return undefined;
    const cabinet = new Cabinet({ ..._cabinet });
    return Promise.resolve(cabinet);
  }
}
