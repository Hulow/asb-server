import { injectable } from 'inversify';
import { container } from '../../../../di-container';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';

import { ImpulseRepositoryOutputPort } from '../../../core/application/ports/out/impulse-repository.output-port';
import { Impulse } from '../../../core/domain/impulse';
import { ImpulseTypeormEntity } from './impulse.orm-entity';

@injectable()
export class SqlImpulseRepository implements ImpulseRepositoryOutputPort {
  constructor(private readonly _repository = container.get(PostgresDataSource).getRepository(ImpulseTypeormEntity)) {}

  async save(impulse: Impulse) {
    const entity = await this._repository.save(ImpulseTypeormEntity.fromDomain(impulse));
    return entity.toDomain();
  }
}
