import { DomainError } from '../../../shared/domain/error';

export class OwnerAlreadyExists extends DomainError {
  constructor(ownername: string) {
    super(`Owner ${ownername} already exists`);
  }
}
