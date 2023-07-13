import { DomainError } from '../../../shared/domain/error';

export class DriversAlreadyExists extends DomainError {
  constructor(driverQuantity: number, productName: string, cabinetUid: string) {
    super(`Already ${driverQuantity} ${productName} drivers are mounted on cabinet ${cabinetUid} `);
  }
}

export class DriversNotFound extends DomainError {
  constructor() {
    super(`Unable to find any driver`);
  }
}
