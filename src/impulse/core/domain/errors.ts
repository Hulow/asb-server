import { DomainError } from '../../../shared/domain/error';

export class ImpulseAlreadyExists extends DomainError {
  constructor(cabinetUid: string) {
    super(`Impulse from cabinet ${cabinetUid} already exists`);
  }
}

export class ImpulseSettingNotFound extends DomainError {
  constructor(setting: string) {
    super(`${setting} setting from Impulse not found`);
  }
}

export class MissingImpulseGraphDataFound extends DomainError {
  constructor(responseLength: string, impulseGraphLength: number) {
    super(`expecting ${responseLength} entries from Impulse graph Response, only found ${impulseGraphLength}`);
  }
}
