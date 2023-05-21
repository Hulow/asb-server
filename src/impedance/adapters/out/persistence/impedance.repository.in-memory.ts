import { injectable } from 'inversify';

import { ImpedanceRepositoryOutputPort } from '../../../core/application/ports/out/impedance-repository.output-port';
import { Impedance } from '../../../core/domain/impedance';

@injectable()
export class InMemoryImpedanceRepository implements ImpedanceRepositoryOutputPort {
  public readonly impedances: Impedance[] = [];

  save(impedance: Impedance) {
    this.impedances.push(new Impedance({ ...impedance }));
    return Promise.resolve(impedance);
  }
}
