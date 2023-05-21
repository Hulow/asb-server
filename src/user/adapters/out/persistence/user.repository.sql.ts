import { injectable } from 'inversify';
import { container } from '../../../../di-container';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';

import { UserRepositoryOutputPort } from '../../../core/application/ports/out/user-repository.output-port';
import { User } from '../../../core/domain/user';
import { UserTypeormEntity } from './user.orm-entity';

@injectable()
export class SqlUserRepository implements UserRepositoryOutputPort {
  constructor(private readonly _repository = container.get(PostgresDataSource).getRepository(UserTypeormEntity)) {}

  async save(user: User) {
    const entity = await this._repository.save(UserTypeormEntity.fromDomain(user));
    return entity.toDomain();
  }
}
