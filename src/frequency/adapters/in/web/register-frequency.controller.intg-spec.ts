import request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';

import { config } from '../../../../config';
import { container } from '../../../../di-container';
import { ExpressWebServer } from '../../../../shared/adapters/in/express-web-server';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';
import {
  FrequencyRepositoryOutputPort,
  FREQUENCY_REPOSITORY_OUTPUT_PORT,
} from '../../../core/application/ports/out/frequency-repository.output-port';
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
const frequencyRepository = container.get<FrequencyRepositoryOutputPort>(FREQUENCY_REPOSITORY_OUTPUT_PORT);
const cabinetRepository = container.get<CabinetRepositoryOutputPort>(CABINET_REPOSITORY_OUTPUT_PORT);
const ownerRepository = container.get<OwnerRepositoryOutputPort>(OWNER_REPOSITORY_OUTPUT_PORT);

describe(`/api/frequency/register`, () => {
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

  it(`register frequency`, async () => {
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
      path.join(__dirname, '../../../core/application/services/__tests__/inputs/frequency_response.txt'),
      'utf8',
    );
    const registerFrequencyInput = {
      ownerUid: existingOwner.uid,
      cabinetUid: existingCabinet.uid,
      driverUid: 'driver-uid',
      measurements: measurementFile,
    };
    const expectedResponse = {
      uid: expect.stringMatching(UUID_V4_REGEX) as string,
      measuredBy: 'REW V5.20.13',
      source: 'Scarlett 2i2 USB',
      sweepLength: '512k Log Swept Sine',
      measuredAt: 'Mar 22, 2023 2:53:43 PM',
      frequencyWeightings: 'C-weighting',
      targetLevel: '75.0 dB',
      note: 'second measurement Mic is at 1m and almost align with tweeter',
      smoothing: '1/3 octave',
      measurements: [{ frequency: 15.140533, spl: 44.493, phase: 86.8478 }],
      updatedAt: expect.any(Date) as Date,
      createdAt: expect.any(Date) as Date,
      cabinetUid: existingCabinet.uid,
    };
    const response: { body: { cabinetUid: string } } = await request(expressApp)
      .post('/api/frequency/register')
      .send(registerFrequencyInput)
      .set({ Authorization: config.express.asbKeyUrl, Accept: 'application/json' })
      .expect(200);
    expect(await frequencyRepository.getByCabinetUid(response.body.cabinetUid)).toEqual(expectedResponse);
  });
  it(`Does not register frequency`, async () => {
    const registerFrequencyInput = {
      ownerUid: 'uid',
      cabinetUid: '4343b2ab-a22e-4d12-ac13-6bb399d4e512',
      driverUid: 'uid',
      measurements: 'measurementFile',
    };
    await request(expressApp)
      .post('/api/frequency/register')
      .send(registerFrequencyInput)
      .set({ Authorization: config.express.asbKeyUrl, Accept: 'application/json' })
      .expect(500);
  });
});
