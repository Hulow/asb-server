import { InMemoryCabinetRepository } from '../../../adapters/out/persistence/cabinet.repository.in-memory';
import { InMemoryOwnerRepository } from '../../../../owner/adapters/out/persistence/owner.repository.in-memory';
import { InMemoryDriverRepository } from '../../../../driver/adapters/out/persistence/driver.repository.in-memory';

import { CabinetsCollectionOverview } from '../../domain/cabinet-collection-overview';
import { GetCabinetsCollectionOverviewService } from './get-cabinets-collection-overview.service';
import { Cabinet } from '../../domain/cabinet';
import { CabinetOverview, OwnerOverview, DriverOverview } from '../../domain/cabinet-collection-overview';
import { Owner } from '../../../../owner/core/domain/owner';
import { OwnerDoesNotExist } from '../../../../owner/core/domain/errors';

import { Driver } from '../../../../driver/core/domain/driver';
import { DriversNotFound } from '../../../../driver/core/domain/errors';

import { CabinetsNotFound } from '../../domain/errors';

function createOwner(ownerUid: number): Owner {
  return {
    uid: `owner-${ownerUid}`,
    firstName: 'firstName',
    lastName: 'lastName',
    ownername: 'ownername',
    email: 'email',
    phoneNumber: 'phoneNumber',
    city: 'city',
    description: 'description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function createCabinet(cabinetUid: number, ownerUid: number): Cabinet {
  return {
    uid: `cabinet-${cabinetUid}`,
    brandName: 'Clauz',
    productName: 'die Maschine',
    enclosureType: 'Poccochin',
    weight: 100,
    dimension: 'dimension',
    manufacturingYear: 2023,
    description: 'description',
    ownerUid: `owner-${ownerUid}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function createDriver(driverUid: number, cabinetUid: number): Driver {
  return {
    uid: `driver-${driverUid}`,
    brandName: 'B&C',
    productName: '12PE32',
    driverType: 'Woofer',
    manufacturingYear: 2015,
    nominalDiameter: 12,
    nominalImpedance: 8,
    continuousPowerHandling: 500,
    cabinetUid: `cabinet-${cabinetUid}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function createCabinetOverview(cabinetUid: number): CabinetOverview {
  return {
    cabinetUid: `cabinet-${cabinetUid}`,
    brandName: 'Clauz',
    productName: 'die Maschine',
    enclosureType: 'Poccochin',
  };
}

function createOwnerOverview(ownerUid: number): OwnerOverview {
  return {
    ownerUid: `owner-${ownerUid}`,
    ownername: 'ownername',
  };
}

function createDriverOverview(driverUid: number): DriverOverview {
  return {
    driverUid: `driver-${driverUid}`,
    brandName: 'B&C',
    productName: '12PE32',
    driverType: 'Woofer',
  };
}

describe('GetCabinetsCollectionOverviewService', () => {
  let cabinetRepoStub: InMemoryCabinetRepository;
  let ownerRepoStub: InMemoryOwnerRepository;
  let driverRepoStub: InMemoryDriverRepository;
  let getCabinetsCollectionOverviewService: GetCabinetsCollectionOverviewService;

  beforeEach(() => {
    cabinetRepoStub = new InMemoryCabinetRepository();
    ownerRepoStub = new InMemoryOwnerRepository();
    driverRepoStub = new InMemoryDriverRepository();
    getCabinetsCollectionOverviewService = new GetCabinetsCollectionOverviewService(
      cabinetRepoStub,
      ownerRepoStub,
      driverRepoStub,
    );
  });
  it('get an overview of one cabinet mounted on one driver', async () => {
    const existingOwner: Owner = createOwner(1);
    await ownerRepoStub.save(existingOwner);

    const existingCabinet: Cabinet = createCabinet(1, 1);
    await cabinetRepoStub.save(existingCabinet);

    const existingDriver: Driver = createDriver(1, 1);
    await driverRepoStub.save(existingDriver);

    const response = await getCabinetsCollectionOverviewService.handler();
    const expectedResponse: CabinetsCollectionOverview = {
      cabinetsLength: 1,
      cabinets: [
        {
          cabinet: createCabinetOverview(1),
          owner: createOwnerOverview(1),
          drivers: [createDriverOverview(1)],
        },
      ],
    };
    expect(response).toEqual(expectedResponse);
  });
  it('get an overview of one cabinet mounted on 2 drivers', async () => {
    const firstOwner: Owner = createOwner(1);
    await ownerRepoStub.save(firstOwner);

    const firstCabinet: Cabinet = createCabinet(1, 1);
    await cabinetRepoStub.save(firstCabinet);

    const firstDriver: Driver = createDriver(1, 1);
    const secondDriver: Driver = createDriver(2, 1);
    for (const existingDriver of [firstDriver, secondDriver]) {
      await driverRepoStub.save(existingDriver);
    }

    const response = await getCabinetsCollectionOverviewService.handler();
    const expectedResponse: CabinetsCollectionOverview = {
      cabinetsLength: 1,
      cabinets: [
        {
          cabinet: createCabinetOverview(1),
          owner: createOwnerOverview(1),
          drivers: [createDriverOverview(1), createDriverOverview(2)],
        },
      ],
    };
    expect(response).toEqual(expectedResponse);
  });
  it('get an overview of 2 cabinets each mounted with 2 drivers from 1 owner', async () => {
    const firstOwner: Owner = createOwner(1);
    await ownerRepoStub.save(firstOwner);

    const firstCabinet: Cabinet = createCabinet(1, 1);
    const secondCabinet: Cabinet = createCabinet(2, 1);
    for (const existingCabinet of [firstCabinet, secondCabinet]) {
      await cabinetRepoStub.save(existingCabinet);
    }

    const firstDriver: Driver = createDriver(1, 1);
    const secondDriver: Driver = createDriver(2, 1);
    for (const existingDriver of [firstDriver, secondDriver]) {
      await driverRepoStub.save(existingDriver);
    }

    const response = await getCabinetsCollectionOverviewService.handler();
    const expectedResponse: CabinetsCollectionOverview = {
      cabinetsLength: 2,
      cabinets: [
        {
          cabinet: createCabinetOverview(1),
          owner: createOwnerOverview(1),
          drivers: [createDriverOverview(1), createDriverOverview(2)],
        },
        {
          cabinet: createCabinetOverview(2),
          owner: createOwnerOverview(1),
          drivers: [createDriverOverview(1), createDriverOverview(2)],
        },
      ],
    };
    expect(response).toEqual(expectedResponse);
  });
  it('get an overview of 2 cabinets each mounted with 2 drivers from 2 owner', async () => {
    const firstOwner: Owner = createOwner(1);
    const secondOwner: Owner = createOwner(2);
    for (const existingOwner of [firstOwner, secondOwner]) {
      await ownerRepoStub.save(existingOwner);
    }

    const firstCabinet: Cabinet = createCabinet(1, 1);
    const secondCabinet: Cabinet = createCabinet(2, 2);
    for (const existingCabinet of [firstCabinet, secondCabinet]) {
      await cabinetRepoStub.save(existingCabinet);
    }

    const firstDriver: Driver = createDriver(1, 1);
    const secondDriver: Driver = createDriver(2, 1);
    for (const existingDriver of [firstDriver, secondDriver]) {
      await driverRepoStub.save(existingDriver);
    }

    const response = await getCabinetsCollectionOverviewService.handler();
    const expectedResponse: CabinetsCollectionOverview = {
      cabinetsLength: 2,
      cabinets: [
        {
          cabinet: createCabinetOverview(1),
          owner: createOwnerOverview(1),
          drivers: [createDriverOverview(1), createDriverOverview(2)],
        },
        {
          cabinet: createCabinetOverview(2),
          owner: createOwnerOverview(2),
          drivers: [createDriverOverview(1), createDriverOverview(2)],
        },
      ],
    };
    expect(response).toEqual(expectedResponse);
  });
  it('throws error if cabinets are not found', async () => {
    try {
      await getCabinetsCollectionOverviewService.handler();
    } catch (err) {
      expect(err).toBeInstanceOf(CabinetsNotFound);
    }
  });
  it('throws error if owner does not exist', async () => {
    const existingCabinet: Cabinet = createCabinet(1, 1);
    await cabinetRepoStub.save(existingCabinet);
    try {
      await getCabinetsCollectionOverviewService.handler();
    } catch (err) {
      expect(err).toBeInstanceOf(OwnerDoesNotExist);
    }
  });
  it('throws error if driver does not exist', async () => {
    const existingOwner: Owner = createOwner(1);
    await ownerRepoStub.save(existingOwner);

    const existingCabinet: Cabinet = createCabinet(1, 1);
    await cabinetRepoStub.save(existingCabinet);
    try {
      await getCabinetsCollectionOverviewService.handler();
    } catch (err) {
      expect(err).toBeInstanceOf(DriversNotFound);
    }
  });
});
