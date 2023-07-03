import { DomainError } from '../../../shared/domain/error';

export class FrequencyAlreadyExists extends DomainError {
  constructor(cabinetUid: string) {
    super(`Frequency from cabinet ${cabinetUid} already exists`);
  }
}
