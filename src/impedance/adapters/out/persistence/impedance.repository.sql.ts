import { injectable } from 'inversify';
import { container } from '../../../../di-container';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';

import { ImpedanceRepositoryOutputPort } from '../../../core/application/ports/out/impedance-repository.output-port';
import { Impedance } from '../../../core/domain/impedance';
import { ImpedanceTypeormEntity } from './impedance.orm-entity';

@injectable()
export class SqlImpedanceRepository implements ImpedanceRepositoryOutputPort {
  constructor(private readonly _repository = container.get(PostgresDataSource).getRepository(ImpedanceTypeormEntity)) {}

  async save(impedance: Impedance) {
    const entity = await this._repository.save(ImpedanceTypeormEntity.fromDomain(impedance));
    return entity.toDomain();
  }
}
