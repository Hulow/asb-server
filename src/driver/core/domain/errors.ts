import { DomainError } from '../../../shared/domain/error';

export class DriverAlreadyExists extends DomainError {
  constructor(productName: string) {
    super(`Driver ${productName} already exists`);
  }
}

export class DriversNotFound extends DomainError {
  constructor() {
    super(`Unable to find any driver`);
  }
}
