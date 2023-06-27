import { inject, injectable } from 'inversify';

import { Cabinet } from '../../domain/cabinet';
import { RegisterCabinetInput, RegisterCabinetInputPort } from '../ports/in/register-cabinet.input-port';
import {
  CabinetRepositoryOutputPort,
  CABINET_REPOSITORY_OUTPUT_PORT,
} from '../ports/out/cabinet-repository.output-port';

import {
  OWNER_REPOSITORY_OUTPUT_PORT,
  OwnerRepositoryOutputPort,
} from '../../../../owner/core/application/ports/out/owner-repository.output-port';
import { CabinetAlreadyExists } from '../../domain/errors';
import { OwnerDoesNotExist } from '../../../../owner/core/domain/errors';

@injectable()
export class RegisterCabinetService implements RegisterCabinetInputPort {
  constructor(
    @inject(CABINET_REPOSITORY_OUTPUT_PORT) private readonly _cabinetRepository: CabinetRepositoryOutputPort,
    @inject(OWNER_REPOSITORY_OUTPUT_PORT) private readonly _ownerRepository: OwnerRepositoryOutputPort,
  ) {}

  async handler(input: RegisterCabinetInput): Promise<Cabinet> {
    const cabinet = new Cabinet({ ...input });
    const existingOwner = await this._ownerRepository.getById(input.ownerUid);
    if (!existingOwner) {
      throw new OwnerDoesNotExist(input.ownerUid);
    }
    const existingCabinet = await this._cabinetRepository.getByProductNameAndOwnerUid(
      input.productName,
      input.ownerUid,
    );
    if (existingCabinet) {
      throw new CabinetAlreadyExists(existingCabinet.productName, input.ownerUid);
    }
    console.log('cabinet service, about to save new cabinet');
    const saved = await this._cabinetRepository.save(cabinet, existingOwner);
    console.log('cabinet service, here is the new cabinet to domain');
    console.log(saved);
    return saved;
  }
}
