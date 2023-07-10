import { DomainError } from '../../../shared/domain/error';

export class ImpulseAlreadyExists extends DomainError {
  constructor(cabinetUid: string) {
    super(`Impulse from cabinet ${cabinetUid} already exists`);
  }
}

export class ImpulseParameterNotFound extends DomainError {
  constructor(parameter: string) {
    super(`${parameter} parameter from Impulse not found`);
  }
}
