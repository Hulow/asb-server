import { inject, injectable } from 'inversify';

import { Owner } from '../../domain/owner';
import { RegisterOwnerInput, RegisterOwnerInputPort } from '../ports/in/register-owner.input-port';
import { OwnerRepositoryOutputPort, OWNER_REPOSITORY_OUTPUT_PORT } from '../ports/out/owner-repository.output-port';
import { OwnerAlreadyExists } from '../../domain/errors';

@injectable()
export class RegisterOwnerService implements RegisterOwnerInputPort {
  constructor(@inject(OWNER_REPOSITORY_OUTPUT_PORT) private readonly _ownerRepository: OwnerRepositoryOutputPort) {}

  async handler(input: RegisterOwnerInput): Promise<Owner> {
    const owner = new Owner({ ...input });

    try {
      const existingOwner = await this._ownerRepository.getByOwnername(input.ownername);
      if (existingOwner) {
        throw new OwnerAlreadyExists(existingOwner.ownername);
      }
      return await this._ownerRepository.save(owner);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
