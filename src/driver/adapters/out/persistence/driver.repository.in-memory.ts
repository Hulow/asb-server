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

  async getByProductName(productName: string) {
    const _driver = this.drivers.find((driver) => driver.productName === productName);
    if (!_driver) return undefined;
    const driver = new Driver({ ..._driver });
    return Promise.resolve(driver);
  }
}
