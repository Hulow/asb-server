import { injectable } from 'inversify';
import { container } from '../../../../di-container';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';

import { CabinetRepositoryOutputPort } from '../../../core/application/ports/out/cabinet-repository.output-port';
import { Cabinet } from '../../../core/domain/cabinet';
import { CabinetTypeormEntity } from './cabinet.orm-entity';

@injectable()
export class SqlCabinetRepository implements CabinetRepositoryOutputPort {
  constructor(private readonly _repository = container.get(PostgresDataSource).getRepository(CabinetTypeormEntity)) {}

  async save(cabinet: Cabinet) {
    const entity = await this._repository.save(CabinetTypeormEntity.fromDomain(cabinet));
    return entity.toDomain();
  }

  async getByProductNameAndOwnerUid(productName: string, ownerUid: string) {
    const cabinetEntity = await this._repository.findOne({
      where: {
        productName,
        ownerUid,
      },
    });
    if (!cabinetEntity) return;
    return cabinetEntity.toDomain();
  }

  async getById(cabinetUid: string) {
    const cabinetEntity = await this._repository.findOne({ where: { uid: cabinetUid } });
    if (!cabinetEntity) return;
    return cabinetEntity.toDomain();
  }
}

