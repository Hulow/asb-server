import { injectable } from 'inversify';
import { container } from '../../../../di-container';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';

import { OwnerRepositoryOutputPort } from '../../../core/application/ports/out/owner-repository.output-port';
import { Owner } from '../../../core/domain/owner';
import { OwnerTypeormEntity } from './owner.orm-entity';

@injectable()
export class SqlOwnerRepository implements OwnerRepositoryOutputPort {
  constructor(private readonly _repository = container.get(PostgresDataSource).getRepository(OwnerTypeormEntity)) {}

  async save(owner: Owner) {
    const entity = await this._repository.save(OwnerTypeormEntity.fromDomain(owner));
    return entity.toDomain();
  }

  async getByOwnername(ownername: string) {
    const ownerEntity = await this._repository.findOne({ where: { ownername } });
    if (!ownerEntity) return;
    return ownerEntity.toDomain();
  }

  async getById(ownerUid: string) {
    const ownerEntity = await this._repository.findOne({ where: { uid: ownerUid } });
    if (!ownerEntity) return;
    return ownerEntity.toDomain();
  }
}
