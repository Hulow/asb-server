import { inject, injectable } from 'inversify';

import { Cabinet } from '../../domain/cabinet';
import { Driver } from '../../../../driver/core/domain/driver';
import { OwnerDoesNotExist } from '../../../../owner/core/domain/errors';
import {
  CabinetCollectionOverview,
  CabinetsCollectionOverview,
  CabinetOverview,
  OwnerOverview,
  DriverOverview,
} from '../../domain/cabinet-collection-overview';
import { GetCabinetsCollectionOverviewInputPort } from '../ports/in/get-cabinets-collection-overview.input-port';
import {
  CabinetRepositoryOutputPort,
  CABINET_REPOSITORY_OUTPUT_PORT,
} from '../ports/out/cabinet-repository.output-port';

import {
  OWNER_REPOSITORY_OUTPUT_PORT,
  OwnerRepositoryOutputPort,
} from '../../../../owner/core/application/ports/out/owner-repository.output-port';

import {
  DRIVER_REPOSITORY_OUTPUT_PORT,
  DriverRepositoryOutputPort,
} from '../../../../driver/core/application/ports/out/driver-repository.output-port';
import { CabinetsNotFound } from '../../domain/errors';
import { DriversNotFound } from '../../../../driver/core/domain/errors';

@injectable()
export class GetCabinetsCollectionOverviewService implements GetCabinetsCollectionOverviewInputPort {
  constructor(
    @inject(CABINET_REPOSITORY_OUTPUT_PORT) private readonly _cabinetRepository: CabinetRepositoryOutputPort,
    @inject(OWNER_REPOSITORY_OUTPUT_PORT) private readonly _ownerRepository: OwnerRepositoryOutputPort,
    @inject(DRIVER_REPOSITORY_OUTPUT_PORT) private readonly _driverRepository: DriverRepositoryOutputPort,
  ) {}

  async handler(): Promise<CabinetsCollectionOverview> {
    return await this.mapCabinetsCollectionOverview();
  }

  private async mapCabinetsCollectionOverview(): Promise<CabinetsCollectionOverview> {
    const cabinetsRelationshipOverview: CabinetCollectionOverview[] = [];
    const cabinets = await this._cabinetRepository.getAllCabinets();
    if (!cabinets) throw new CabinetsNotFound();
    for (const cabinet of cabinets) {
      cabinetsRelationshipOverview.push(await this.mapCabinetCollectionOverview(cabinet));
    }
    return {
      cabinetsLength: cabinets.length,
      cabinets: cabinetsRelationshipOverview,
    };
  }

  private async mapCabinetCollectionOverview(cabinet: Cabinet): Promise<CabinetCollectionOverview> {
    const cabinetOverview: CabinetOverview = this.mapCabinetOverview(cabinet);
    const ownerOverview: OwnerOverview = await this.mapOwnerOverview(cabinet.ownerUid);
    const driversOverview: DriverOverview[] = await this.mapDriversOverview(cabinet.uid);
    return {
      cabinet: cabinetOverview,
      owner: ownerOverview,
      drivers: driversOverview,
    };
  }

  private mapCabinetOverview(cabinet: Cabinet): CabinetOverview {
    return {
      cabinetUid: cabinet.uid,
      brandName: cabinet.brandName,
      productName: cabinet.productName,
      enclosureType: cabinet.enclosureType,
    };
  }
  private async mapOwnerOverview(ownerUid: string): Promise<OwnerOverview> {
    const owner = await this._ownerRepository.getById(ownerUid);
    if (!owner) throw new OwnerDoesNotExist(ownerUid);
    return {
      ownerUid: owner.uid,
      ownername: owner.ownername,
    };
  }
  private async mapDriversOverview(cabinetUid: string): Promise<DriverOverview[]> {
    const drivers: DriverOverview[] = [];
    const existingDrivers = await this._driverRepository.getByCabinetUid(cabinetUid);
    if (!existingDrivers) {
      throw new DriversNotFound();
    }
    for (const existingDriver of existingDrivers) {
      const driverOverview = this.mapDriverOverview(existingDriver);
      drivers.push(driverOverview);
    }
    return drivers;
  }

  private mapDriverOverview(driver: Driver): DriverOverview {
    return {
      driverUid: driver.uid,
      driverType: driver.driverType,
      productName: driver.productName,
      brandName: driver.brandName,
    };
  }
}
