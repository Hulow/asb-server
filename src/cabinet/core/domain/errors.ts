import { DomainError } from '../../../shared/domain/error';

export class CabinetAlreadyExists extends DomainError {
  constructor(productName: string, ownerUid: string) {
    super(`Cabinet ${productName} from ${ownerUid} already exists`);
  }
}

export class CabinetDoesNotExist extends DomainError {
  constructor(cabinetUid: string) {
    super(`Cabinet ${cabinetUid} does not exist`);
  }
}
