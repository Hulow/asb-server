import { InMemoryCabinetRepository } from '../../../adapters/out/persistence/cabinet.repository.in-memory';
import { InMemoryOwnerRepository } from '../../../../owner/adapters/out/persistence/owner.repository.in-memory';

import { RegisterCabinetInput } from '../ports/in/register-cabinet.input-port';
import { RegisterCabinetService } from './register-cabinet.service';
import { UUID_V4_REGEX } from '../../../../shared/test/utils';
import { Cabinet } from '../../domain/cabinet';
import { Owner } from '../../../../owner/core/domain/owner';
import { CabinetAlreadyExists } from '../../domain/errors';
import { OwnerDoesNotExist } from '../../../../owner/core/domain/errors';

describe('RegisterCabinetService', () => {
  let cabinetRepoStub: InMemoryCabinetRepository;
  let ownerRepoStub: InMemoryOwnerRepository;
  let registerCabinetService: RegisterCabinetService;

  beforeEach(() => {
    cabinetRepoStub = new InMemoryCabinetRepository();
    ownerRepoStub = new InMemoryOwnerRepository();
    registerCabinetService = new RegisterCabinetService(cabinetRepoStub, ownerRepoStub);
  });
  it('register a cabinet', async () => {
    const existingOwner: Owner = {
      uid: 'uid-1',
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

    const registerCabinetInput: RegisterCabinetInput = {
      brandName: 'Clauz',
      productName: 'die Maschine',
      enclosureType: 'Poccochin',
      weight: 100,
      dimension: 'dimension',
      manufacturingYear: 2023,
      description: 'description',
      ownerUid: 'uid-1',
    };
    const response = await registerCabinetService.handler(registerCabinetInput);
    const expectedResponse = {
      uid: expect.stringMatching(UUID_V4_REGEX) as string,
      createdAt: expect.any(Date) as Date,
      updatedAt: expect.any(Date) as Date,
      brandName: 'Clauz',
      productName: 'die Maschine',
      enclosureType: 'Poccochin',
      weight: 100,
      dimension: 'dimension',
      manufacturingYear: 2023,
      description: 'description',
      ownerUid: 'uid-1',
    };

    expect(response).toEqual(expectedResponse);
  });

  it('does not register a cabinet without owner', async () => {
    const existingOwner: Owner = {
      uid: 'uid-1',
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

    const registerCabinetInput: RegisterCabinetInput = {
      brandName: 'Clauz',
      productName: 'die Maschine',
      enclosureType: 'Poccochin',
      weight: 100,
      dimension: 'dimension',
      manufacturingYear: 2023,
      description: 'description',
      ownerUid: 'uid-2',
    };
    try {
      await registerCabinetService.handler(registerCabinetInput);
    } catch (err) {
      expect(err).toBeInstanceOf(OwnerDoesNotExist);
    }
  });
  it('does not register an existing cabinet', async () => {
    const existingOwner: Owner = {
      uid: 'uid-1',
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
      uid: 'uid-1',
      brandName: 'Clauz',
      productName: 'die Maschine',
      enclosureType: 'Poccochin',
      weight: 100,
      dimension: 'dimension',
      manufacturingYear: 2023,
      description: 'description',
      ownerUid: 'uid-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await cabinetRepoStub.save(existingCabinet);

    const registerCabinetInput: RegisterCabinetInput = {
      brandName: 'Clauz',
      productName: 'die Maschine',
      enclosureType: 'Poccochin',
      weight: 100,
      dimension: 'dimension',
      manufacturingYear: 2023,
      description: 'description',
      ownerUid: 'uid-1',
    };
    try {
      await registerCabinetService.handler(registerCabinetInput);
    } catch (err) {
      expect(err).toBeInstanceOf(CabinetAlreadyExists);
    }
  });
});
