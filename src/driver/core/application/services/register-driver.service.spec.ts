import { InMemoryCabinetRepository } from '../../../../cabinet/adapters/out/persistence/cabinet.repository.in-memory';
import { InMemoryOwnerRepository } from '../../../../owner/adapters/out/persistence/owner.repository.in-memory';
import { InMemoryDriverRepository } from '../../../adapters/out/persistence/driver.repository.in-memory';

import { RegisterDriverInput } from '../ports/in/register-driver.input-port';
import { RegisterDriverService } from './register-driver.service';
import { UUID_V4_REGEX } from '../../../../shared/test/utils';
import { Cabinet } from '../../../../cabinet/core/domain/cabinet';
import { Owner } from '../../../../owner/core/domain/owner';
import { Driver } from '../../domain/driver';
import { DriverAlreadyExists } from '../../domain/errors';

import { CabinetDoesNotExist } from '../../../../cabinet/core/domain/errors';
import { OwnerDoesNotExist } from '../../../../owner/core/domain/errors';

describe('RegisterDriverService', () => {
  let cabinetRepoStub: InMemoryCabinetRepository;
  let ownerRepoStub: InMemoryOwnerRepository;
  let driverRepoStub: InMemoryDriverRepository;
  let registerDriverService: RegisterDriverService;

  beforeEach(() => {
    cabinetRepoStub = new InMemoryCabinetRepository();
    ownerRepoStub = new InMemoryOwnerRepository();
    driverRepoStub = new InMemoryDriverRepository();
    registerDriverService = new RegisterDriverService(driverRepoStub, cabinetRepoStub, ownerRepoStub);
  });
  it('register a driver', async () => {
    const existingOwner: Owner = {
      uid: 'owner-1',
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
    await ownerRepoStub.save(existingOwner);

    const existingCabinet: Cabinet = {
      uid: 'cabinet-1',
      brandName: 'Clauz',
      productName: 'die Maschine',
      enclosureType: 'Poccochin',
      weight: 100,
      dimension: 'dimension',
      manufacturingYear: 2023,
      description: 'description',
      ownerUid: 'owner-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await cabinetRepoStub.save(existingCabinet);
    const registerDriverInput: RegisterDriverInput = {
      brandName: 'B&C',
      productName: '12PE32',
      driverType: 'Woofer',
      manufacturingYear: 2015,
      nominalDiameter: 12,
      nominalImpedance: 8,
      continuousPowerHandling: 500,
      cabinetUid: 'cabinet-1',
      ownerUid: 'owner-1',
    };
    const response = await registerDriverService.handler(registerDriverInput);
    const expectedResponse = {
      uid: expect.stringMatching(UUID_V4_REGEX) as string,
      createdAt: expect.any(Date) as Date,
      updatedAt: expect.any(Date) as Date,
      brandName: 'B&C',
      productName: '12PE32',
      driverType: 'Woofer',
      manufacturingYear: 2015,
      nominalDiameter: 12,
      nominalImpedance: 8,
      continuousPowerHandling: 500,
      cabinetUid: 'cabinet-1',
    };
    expect(response).toEqual(expectedResponse);
  });
  it('does not register a driver if owner does not exist', async () => {
    const registerDriverInput: RegisterDriverInput = {
      brandName: 'B&C',
      productName: '12PE32',
      driverType: 'Woofer',
      manufacturingYear: 2015,
      nominalDiameter: 12,
      nominalImpedance: 8,
      continuousPowerHandling: 500,
      cabinetUid: 'cabinet-1',
      ownerUid: 'owner-1',
    };
    try {
      await registerDriverService.handler(registerDriverInput);
    } catch (err) {
      expect(err).toBeInstanceOf(OwnerDoesNotExist);
    }
  });
  it('does not register a driver if cabinet does not exist', async () => {
    const existingOwner: Owner = {
      uid: 'owner-1',
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
    await ownerRepoStub.save(existingOwner);

    const existingCabinet: Cabinet = {
      uid: 'cabinet-2',
      brandName: 'Clauz',
      productName: 'die Maschine',
      enclosureType: 'Poccochin',
      weight: 100,
      dimension: 'dimension',
      manufacturingYear: 2023,
      description: 'description',
      ownerUid: 'owner-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await cabinetRepoStub.save(existingCabinet);
    const registerDriverInput: RegisterDriverInput = {
      brandName: 'B&C',
      productName: '12PE32',
      driverType: 'Woofer',
      manufacturingYear: 2015,
      nominalDiameter: 12,
      nominalImpedance: 8,
      continuousPowerHandling: 500,
      cabinetUid: 'cabinet-1',
      ownerUid: 'owner-1',
    };
    try {
      await registerDriverService.handler(registerDriverInput);
    } catch (err) {
      expect(err).toBeInstanceOf(CabinetDoesNotExist);
    }
  });
  it('does not register an existing driver', async () => {
    const existingOwner: Owner = {
      uid: 'owner-1',
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
    await ownerRepoStub.save(existingOwner);

    const existingCabinet: Cabinet = {
      uid: 'cabinet-1',
      brandName: 'Clauz',
      productName: 'die Maschine',
      enclosureType: 'Poccochin',
      weight: 100,
      dimension: 'dimension',
      manufacturingYear: 2023,
      description: 'description',
      ownerUid: 'owner-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await cabinetRepoStub.save(existingCabinet);

    const existingDriver: Driver = {
      uid: 'driver-1',
      brandName: 'B&C',
      productName: '12PE32',
      driverType: 'Woofer',
      manufacturingYear: 2015,
      nominalDiameter: 12,
      nominalImpedance: 8,
      continuousPowerHandling: 500,
      cabinetUid: 'cabinet-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await driverRepoStub.save(existingDriver);

    const registerDriverInput: RegisterDriverInput = {
      brandName: 'B&C',
      productName: '12PE32',
      driverType: 'Woofer',
      manufacturingYear: 2015,
      nominalDiameter: 12,
      nominalImpedance: 8,
      continuousPowerHandling: 500,
      cabinetUid: 'cabinet-1',
      ownerUid: 'owner-1',
    };
    try {
      await registerDriverService.handler(registerDriverInput);
    } catch (err) {
      expect(err).toBeInstanceOf(DriverAlreadyExists);
    }
  });
});
