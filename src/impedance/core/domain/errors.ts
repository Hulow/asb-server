import { DomainError } from '../../../shared/domain/error';

export class ImpedanceAlreadyExists extends DomainError {
  constructor(cabinetUid: string) {
    super(`Impedance from cabinet ${cabinetUid} already exists`);
  }
}
