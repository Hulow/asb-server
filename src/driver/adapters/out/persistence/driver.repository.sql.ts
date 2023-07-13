import { injectable } from 'inversify';

import { container } from '../../../../di-container';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';
import { DriverRepositoryOutputPort } from '../../../core/application/ports/out/driver-repository.output-port';
import { Driver } from '../../../core/domain/driver';
import { DriverTypeormEntity } from './driver.orm-entity';
@injectable()
export class SqlDriverRepository implements DriverRepositoryOutputPort {
  constructor(private readonly _repository = container.get(PostgresDataSource).getRepository(DriverTypeormEntity)) {}

  async save(driver: Driver) {
    const entity = await this._repository.save(DriverTypeormEntity.fromDomain(driver));
    return entity.toDomain();
  }

  async getByProductNameAndCabinetUid(productName: string, cabinetUid: string) {
    const driverEntities = await this._repository.find({ where: { productName, cabinetUid } });
    if (!driverEntities.length) return;
    return driverEntities.map((driver) => driver.toDomain());
  }

  async getByCabinetUid(cabinetUid: string) {
    const driverEntities = await this._repository.find({ where: { cabinetUid } });
    if (!driverEntities.length) return;
    return driverEntities.map((driver) => driver.toDomain());
  }
}
