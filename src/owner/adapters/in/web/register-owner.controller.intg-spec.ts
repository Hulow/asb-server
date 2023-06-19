import request from 'supertest';

import { config } from '../../../../config';
import { container } from '../../../../di-container';
import { ExpressWebServer } from '../../../../shared/adapters/in/express-web-server';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';
import {
  OwnerRepositoryOutputPort,
  OWNER_REPOSITORY_OUTPUT_PORT,
} from '../../../core/application/ports/out/owner-repository.output-port';
import { UUID_V4_REGEX } from '../../../../shared/test/utils';

const expressApp = container.get(ExpressWebServer).app;
const database = container.get(PostgresDataSource);
const ownerRepository = container.get<OwnerRepositoryOutputPort>(OWNER_REPOSITORY_OUTPUT_PORT);

describe(`/api/owner/register`, () => {
  beforeAll(async () => {
    await database.start();
  });

  afterEach(async () => {
    await database.clear();
  });

  afterAll(async () => {
    await database.stop();
  });

  it(`register owner`, async () => {
    const registerOwnerInput = {
      firstName: 'Clauz',
      lastName: 'die Maschine',
      ownername: 'Poccochin',
      email: 'clauz.poccochin@example.com',
      phoneNumber: 'XXX',
      city: 'Berlin',
      description: 'description',
    };

    // when
    const res: { body: { ownername: string } } = await request(expressApp)
      .post('/api/owner/register')
      .send(registerOwnerInput)
      .set({ Authorization: config.express.asbKeyUrl, Accept: 'application/json' })
      .expect(200);
    const expectedResponse = {
      city: 'Berlin',
      createdAt: expect.any(Date) as Date,
      description: 'description',
      email: 'clauz.poccochin@example.com',
      firstName: 'Clauz',
      lastName: 'die Maschine',
      ownername: 'Poccochin',
      phoneNumber: 'XXX',
      uid: expect.stringMatching(UUID_V4_REGEX) as string,
      updatedAt: expect.any(Date) as Date,
    };
    expect(await ownerRepository.getByOwnername(res.body.ownername)).toEqual(expectedResponse);
  });
});
