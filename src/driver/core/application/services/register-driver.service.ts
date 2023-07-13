import { inject, injectable } from 'inversify';

import { Driver } from '../../domain/driver';
import { RegisterDriverInput, RegisterDriverInputPort } from '../ports/in/register-driver.input-port';
import { DriverRepositoryOutputPort, DRIVER_REPOSITORY_OUTPUT_PORT } from '../ports/out/driver-repository.output-port';
import {
  CabinetRepositoryOutputPort,
  CABINET_REPOSITORY_OUTPUT_PORT,
} from '../../../../cabinet/core/application/ports/out/cabinet-repository.output-port';
import {
  OWNER_REPOSITORY_OUTPUT_PORT,
  OwnerRepositoryOutputPort,
} from '../../../../owner/core/application/ports/out/owner-repository.output-port';
import { DriversAlreadyExists } from '../../domain/errors';
import { OwnerDoesNotExist } from '../../../../owner/core/domain/errors';
import { CabinetDoesNotExist } from '../../../../cabinet/core/domain/errors';

@injectable()
export class RegisterDriverService implements RegisterDriverInputPort {
  constructor(
    @inject(DRIVER_REPOSITORY_OUTPUT_PORT) private readonly _driverRepository: DriverRepositoryOutputPort,
    @inject(CABINET_REPOSITORY_OUTPUT_PORT) private readonly _cabinetRepository: CabinetRepositoryOutputPort,
    @inject(OWNER_REPOSITORY_OUTPUT_PORT) private readonly _ownerRepository: OwnerRepositoryOutputPort,
  ) {}

  async handler(input: RegisterDriverInput): Promise<Driver> {
    const driver = new Driver({ ...input });

    const existingOwner = await this._ownerRepository.getById(input.ownerUid);
    if (!existingOwner) {
      throw new OwnerDoesNotExist(input.ownerUid);
    }
    const existingCabinet = await this._cabinetRepository.getById(input.cabinetUid);
    if (!existingCabinet) {
      throw new CabinetDoesNotExist(input.cabinetUid);
    }
    const existingDrivers = await this._driverRepository.getByProductNameAndCabinetUid(
      input.productName,
      input.cabinetUid,
    );
    if (existingDrivers && existingDrivers.length > 2) {
      throw new DriversAlreadyExists(
        existingDrivers.length,
        existingDrivers[0].productName,
        existingDrivers[0].cabinetUid,
      );
    }

    return await this._driverRepository.save(driver);
  }
}
