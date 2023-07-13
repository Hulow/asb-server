import { injectable } from 'inversify';

import { DriverRepositoryOutputPort } from '../../../core/application/ports/out/driver-repository.output-port';
import { Driver } from '../../../core/domain/driver';

@injectable()
export class InMemoryDriverRepository implements DriverRepositoryOutputPort {
  public readonly drivers: Driver[] = [];

  save(driver: Driver) {
    this.drivers.push(new Driver({ ...driver }));
    return Promise.resolve(driver);
  }

  async getByProductNameAndCabinetUid(productName: string, cabinetUid: string) {
    this.drivers.filter((driver) => driver.productName === productName && driver.cabinetUid === cabinetUid);
    if (!this.drivers.length) return;
    return Promise.resolve(this.drivers);
  }

  async getByCabinetUid(cabinetUid: string) {
    this.drivers.filter((driver) => driver.cabinetUid === cabinetUid);
    if (!this.drivers.length) return;
    return Promise.resolve(this.drivers);
  }
}
