import request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';

import { config } from '../../../../config';
import { container } from '../../../../di-container';
import { ExpressWebServer } from '../../../../shared/adapters/in/express-web-server';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';
import {
  ImpulseRepositoryOutputPort,
  IMPULSE_REPOSITORY_OUTPUT_PORT,
} from '../../../core/application/ports/out/impulse-repository.output-port';
import {
  CabinetRepositoryOutputPort,
  CABINET_REPOSITORY_OUTPUT_PORT,
} from '../../../../cabinet/core/application/ports/out/cabinet-repository.output-port';
import {
  OwnerRepositoryOutputPort,
  OWNER_REPOSITORY_OUTPUT_PORT,
} from '../../../../owner/core/application/ports/out/owner-repository.output-port';
import { UUID_V4_REGEX } from '../../../../shared/test/utils';

const expressApp = container.get(ExpressWebServer).app;
const database = container.get(PostgresDataSource);
const impulseRepository = container.get<ImpulseRepositoryOutputPort>(IMPULSE_REPOSITORY_OUTPUT_PORT);
const cabinetRepository = container.get<CabinetRepositoryOutputPort>(CABINET_REPOSITORY_OUTPUT_PORT);
const ownerRepository = container.get<OwnerRepositoryOutputPort>(OWNER_REPOSITORY_OUTPUT_PORT);

describe(`/api/impulse/register`, () => {
  beforeAll(async () => {
    await database.start();
  });

  afterEach(async () => {
    jest.setTimeout(60000);
    await database.clear();
  });

  afterAll(async () => {
    await database.stop();
  });

  it(`register impulse`, async () => {
    const ownerInput = {
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
    const existingOwner = await ownerRepository.save(ownerInput);
    const cabinetInput = {
      uid: '4343b2ab-a22e-4d12-ac13-6bb399d4e513',
      brandName: 'Clauz',
      productName: 'die Maschine',
      enclosureType: 'Poccochin',
      weight: 100,
      dimension: 'dimension',
      manufacturingYear: 2023,
      description: 'description',
      ownerUid: '4343b2ab-a22e-4d12-ac13-6bb399d4e512',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const existingCabinet = await cabinetRepository.save(cabinetInput);
    const measurementFile = fs.readFileSync(
      path.join(__dirname, '../../../core/application/services/__tests__/inputs/impulse_response.txt'),
      'utf8',
    );
    const registerImpulseInput = {
      ownerUid: existingOwner.uid,
      cabinetUid: existingCabinet.uid,
      driverUid: 'driver-uid',
      measurements: measurementFile,
    };
    const expectedResponse = {
      uid: expect.stringMatching(UUID_V4_REGEX) as string,
      measuredBy: 'REW V5.20.13',
      note: 'impulse_response',
      source: 'Scarlett 2i2 USB',
      measuredAt: 'Mar 22, 2023 2:53:43 PM',
      sweepLength: '512k Log Swept Sine',
      responseWindow: '15.1 to 20,000.0 Hz',
      measurements: [
        { dbfs: 0, time: -0.12501133786848073 },
        { dbfs: 1.1946093e-11, time: -0.12498866213151928 },
        { dbfs: 4.6445597e-11, time: -0.12496598639455783 },
        { dbfs: 1.6116244e-10, time: -0.12494331065759638 },
      ],
      peakValueBeforeInitialization: '0.1058686152100563',
      peakIndex: '5513',
      responseLength: '4',
      sampleInterval: '2.2675736961451248E-5',
      startTime: '-0.12501133786848073',
      cabinetUid: existingCabinet.uid,
      createdAt: expect.any(Date) as Date,
      updatedAt: expect.any(Date) as Date,
    };
    const response: { body: { cabinetUid: string } } = await request(expressApp)
      .post('/api/impulse/register')
      .send(registerImpulseInput)
      .set({ Authorization: config.express.asbKeyUrl, Accept: 'application/json' })
      .expect(200);
    expect(await impulseRepository.getByCabinetUid(response.body.cabinetUid)).toEqual(expectedResponse);
  });
  it(`Does not register impulse`, async () => {
    const registerImpulseInput = {
      ownerUid: 'uid',
      cabinetUid: '4343b2ab-a22e-4d12-ac13-6bb399d4e512',
      driverUid: 'uid',
      measurements: 'measurementFile',
    };
    await request(expressApp)
      .post('/api/frequency/register')
      .send(registerImpulseInput)
      .set({ Authorization: config.express.asbKeyUrl, Accept: 'application/json' })
      .expect(500);
  });
});
