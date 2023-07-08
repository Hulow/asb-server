import { injectable } from 'inversify';

import { FrequencyRepositoryOutputPort } from '../../../core/application/ports/out/frequency-repository.output-port';
import { Frequency } from '../../../core/domain/frequency';

@injectable()
export class InMemoryFrequencyRepository implements FrequencyRepositoryOutputPort {
  public readonly frequencies: Frequency[] = [];

  save(frequency: Frequency) {
    this.frequencies.push(new Frequency({ ...frequency }));
    return Promise.resolve(frequency);
  }

  async getByCabinetUid(cabinetUid: string) {
    const _frequency = this.frequencies.find((frequency) => frequency.cabinetUid === cabinetUid);
    if (!_frequency) return undefined;
    const frequency = new Frequency({ ..._frequency });
    return Promise.resolve(frequency);
  }
}
