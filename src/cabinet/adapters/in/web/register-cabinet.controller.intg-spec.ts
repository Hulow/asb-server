import request from 'supertest';

import { config } from '../../../../config';
import { container } from '../../../../di-container';
import { ExpressWebServer } from '../../../../shared/adapters/in/express-web-server';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';
import {
  CabinetRepositoryOutputPort,
  CABINET_REPOSITORY_OUTPUT_PORT,
} from '../../../core/application/ports/out/cabinet-repository.output-port';
import {
  OwnerRepositoryOutputPort,
  OWNER_REPOSITORY_OUTPUT_PORT,
} from '../../../../owner/core/application/ports/out/owner-repository.output-port';
import { UUID_V4_REGEX } from '../../../../shared/test/utils';

const expressApp = container.get(ExpressWebServer).app;
const database = container.get(PostgresDataSource);
const cabinetRepository = container.get<CabinetRepositoryOutputPort>(CABINET_REPOSITORY_OUTPUT_PORT);
const ownerRepository = container.get<OwnerRepositoryOutputPort>(OWNER_REPOSITORY_OUTPUT_PORT);

describe(`/api/cabinet/register`, () => {
  beforeAll(async () => {
    await database.start();
  });

  afterEach(async () => {
    await database.clear();
  });

  afterAll(async () => {
    await database.stop();
  });

  it(`register a cabinet`, async () => {
    const existingOwner = {
      uid: '4343b2ab-a22e-4d12-ac13-6bb399d4e512',
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
    await ownerRepository.save(existingOwner);
    const registerCabinetInput = {
      brandName: 'Clauz',
      productName: 'die Maschine',
      enclosureType: 'Poccochin',
      weight: 100,
      dimension: 'dimension',
      manufacturingYear: 2023,
      description: 'description',
      ownerUid: '4343b2ab-a22e-4d12-ac13-6bb399d4e512',
    };

    const res: { body: { productName: string; ownerUid: string } } = await request(expressApp)
      .post('/api/cabinet/register')
      .send(registerCabinetInput)
      .set({ Authorization: config.express.asbKeyUrl, Accept: 'application/json' })
      .expect(200);
    const expectedResponse = {
      brandName: 'Clauz',
      productName: 'die Maschine',
      enclosureType: 'Poccochin',
      weight: 100,
      dimension: 'dimension',
      manufacturingYear: 2023,
      description: 'description',
      ownerUid: '4343b2ab-a22e-4d12-ac13-6bb399d4e512',
      uid: expect.stringMatching(UUID_V4_REGEX) as string,
      createdAt: expect.any(Date) as Date,
      updatedAt: expect.any(Date) as Date,
    };
    expect(await cabinetRepository.getByProductNameAndOwnerUid(res.body.productName, res.body.ownerUid)).toEqual(
      expectedResponse,
    );
  });
  it(`does not register a cabinet without owner`, async () => {
    const existingOwner = {
      uid: '4343b2ab-a22e-4d12-ac13-6bb399d4e513',
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
    await ownerRepository.save(existingOwner);
    const registerCabinetInput = {
      brandName: 'Clauz',
      productName: 'die Maschine',
      enclosureType: 'Poccochin',
      weight: 100,
      dimension: 'dimension',
      manufacturingYear: 2023,
      description: 'description',
      ownerUid: '4343b2ab-a22e-4d12-ac13-6bb399d4e512',
    };

    await request(expressApp)
      .post('/api/cabinet/register')
      .send(registerCabinetInput)
      .set({ Authorization: config.express.asbKeyUrl, Accept: 'application/json' })
      .expect(500);
  });
});
