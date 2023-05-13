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
}
