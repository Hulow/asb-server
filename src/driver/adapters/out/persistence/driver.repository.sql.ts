import { injectable } from 'inversify';
import { container } from '../../../../di-container';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';

import { DriverRepositoryOutputPort } from '../../../core/application/ports/out/driver-repository.output-port';
import { Driver } from '../../../core/domain/driver';
import { Cabinet } from '../../../../cabinet/core/domain/cabinet';
import { Owner } from '../../../../owner/core/domain/owner';

import { DriverTypeormEntity } from './driver.orm-entity';
import { CabinetTypeormEntity } from '../../../../cabinet/adapters/out/persistence/cabinet.orm-entity';
import { OwnerTypeormEntity } from '../../../../owner/adapters/out/persistence/owner.orm-entity';
@injectable()
export class SqlDriverRepository implements DriverRepositoryOutputPort {
  constructor(private readonly _repository = container.get(PostgresDataSource).getRepository(DriverTypeormEntity)) {}

  async save(driver: Driver, cabinet: Cabinet, owner: Owner) {
    const ownerEntity = OwnerTypeormEntity.fromDomain(owner);
    const cabinetEntity = CabinetTypeormEntity.fromDomain(cabinet, ownerEntity);
    const entity = await this._repository.save(DriverTypeormEntity.fromDomain(driver, cabinetEntity));
    return entity.toDomain();
  }

  async getByProductName(productName: string) {
    const driverEntity = await this._repository.findOne({ where: { productName } });
    if (!driverEntity) return;
    return driverEntity.toDomain();
  }
}
