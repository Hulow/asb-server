import { DomainError } from '../../../shared/domain/error';

export class FrequencyAlreadyExists extends DomainError {
  constructor(cabinetUid: string) {
    super(`Frequency from cabinet ${cabinetUid} already exists`);
  }
}

export class FrequencyParameterNotFound extends DomainError {
  constructor(parameter: string) {
    super(`${parameter} parameter from Frequency not found`);
  }
}
