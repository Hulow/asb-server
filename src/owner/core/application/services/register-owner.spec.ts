import { InMemoryOwnerRepository } from '../../../adapters/out/persistence/owner.repository.in-memory';
import { RegisterOwnerInput } from '../ports/in/register-owner.input-port';
import { RegisterOwnerService } from './register-owner.service';
import { UUID_V4_REGEX } from '../../../../shared/test/utils';
import { Owner } from '../../domain/owner';
import { OwnerAlreadyExists } from '../../domain/errors';

describe('RegisterOwnerService', () => {
  let repoStub: InMemoryOwnerRepository;
  let registerOwnerService: RegisterOwnerService;

  beforeEach(() => {
    repoStub = new InMemoryOwnerRepository();
    registerOwnerService = new RegisterOwnerService(repoStub);
  });

  it('register an owner', async () => {
    const registerOwnerInput: RegisterOwnerInput = {
      firstName: 'Clauz',
      lastName: 'die Maschine',
      ownername: 'Poccochin',
      email: 'clauz.poccochin@example.com',
      phoneNumber: 'XXX',
      city: 'Berlin',
      description: 'description',
    };
    const response = await registerOwnerService.handler(registerOwnerInput);
    const expectedResponse = {
      uid: expect.stringMatching(UUID_V4_REGEX) as string,
      createdAt: expect.any(Date) as Date,
      updatedAt: expect.any(Date) as Date,
      firstName: 'Clauz',
      lastName: 'die Maschine',
      ownername: 'Poccochin',
      email: 'clauz.poccochin@example.com',
      phoneNumber: 'XXX',
      city: 'Berlin',
      description: 'description',
    };

    expect(response).toEqual(expectedResponse);
  });

  it('does not register an existing owner', async () => {
    const registerOwnerInput: RegisterOwnerInput = {
      firstName: 'Clauz',
      lastName: 'die Maschine',
      ownername: 'Poccochin',
      email: 'clauz.poccochin@example.com',
      phoneNumber: 'XXX',
      city: 'Berlin',
      description: 'description',
    };
    const newOwner = new Owner({ ...registerOwnerInput });
    await repoStub.save(newOwner);
    try {
      await registerOwnerService.handler(registerOwnerInput);
    } catch (err) {
      expect(err).toBeInstanceOf(OwnerAlreadyExists);
    }
  });
});
