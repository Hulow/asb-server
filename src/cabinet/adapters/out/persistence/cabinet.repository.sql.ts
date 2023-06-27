import { injectable } from 'inversify';
import { container } from '../../../../di-container';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';

import { CabinetRepositoryOutputPort } from '../../../core/application/ports/out/cabinet-repository.output-port';
import { Cabinet } from '../../../core/domain/cabinet';
import { CabinetTypeormEntity } from './cabinet.orm-entity';
import { Owner } from '../../../../owner/core/domain/owner';
import { OwnerTypeormEntity } from '../../../../owner/adapters/out/persistence/owner.orm-entity';

@injectable()
export class SqlCabinetRepository implements CabinetRepositoryOutputPort {
  constructor(private readonly _repository = container.get(PostgresDataSource).getRepository(CabinetTypeormEntity)) {}

  async save(cabinet: Cabinet, owner: Owner) {
    const ownerEntity = OwnerTypeormEntity.fromDomain(owner);
    const entity = await this._repository.save(CabinetTypeormEntity.fromDomain(cabinet, ownerEntity));
    return entity.toDomain();
  }
  async getByProductNameAndOwnerUid(productName: string, ownerUid: string) {
    const cabinetEntity = await this._repository.findOne({
      relations: {
        owner: true,
      },
      where: {
        productName,
        owner: {
          uid: ownerUid,
        },
      },
    });
    if (!cabinetEntity) return;
    return cabinetEntity.toDomain();
  }
}
