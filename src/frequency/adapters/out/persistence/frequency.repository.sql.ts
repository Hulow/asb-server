import { injectable } from 'inversify';
import { container } from '../../../../di-container';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';

import { FrequencyRepositoryOutputPort } from '../../../core/application/ports/out/frequency-repository.output-port';
import { Frequency } from '../../../core/domain/frequency';
import { FrequencyTypeormEntity } from './frequency.orm-entity';

@injectable()
export class SqlFrequencyRepository implements FrequencyRepositoryOutputPort {
  constructor(private readonly _repository = container.get(PostgresDataSource).getRepository(FrequencyTypeormEntity)) {}

  async save(frequency: Frequency) {
    const entity = await this._repository.save(FrequencyTypeormEntity.fromDomain(frequency));
    return entity.toDomain();
  }

  async getByCabinetUid(cabinetUid: string) {
    const frequencyEntity = await this._repository.findOne({ where: { cabinetUid } });
    if (!frequencyEntity) return;
    return frequencyEntity.toDomain();
  }
}
