import request from 'supertest';

import { config } from '../../../../config';
import { container } from '../../../../di-container';
import { ExpressWebServer } from '../../../../shared/adapters/in/express-web-server';
import { PostgresDataSource } from '../../../../shared/adapters/out/postgres-datasource';
import {
  CabinetRepositoryOutputPort,
  CABINET_REPOSITORY_OUTPUT_PORT,
} from '../../../../cabinet/core/application/ports/out/cabinet-repository.output-port';
import {
  OwnerRepositoryOutputPort,
  OWNER_REPOSITORY_OUTPUT_PORT,
} from '../../../../owner/core/application/ports/out/owner-repository.output-port';
import {
  DriverRepositoryOutputPort,
  DRIVER_REPOSITORY_OUTPUT_PORT,
} from '../../../core/application/ports/out/driver-repository.output-port';
import { UUID_V4_REGEX } from '../../../../shared/test/utils';

const expressApp = container.get(ExpressWebServer).app;
const database = container.get(PostgresDataSource);
const cabinetRepository = container.get<CabinetRepositoryOutputPort>(CABINET_REPOSITORY_OUTPUT_PORT);
const ownerRepository = container.get<OwnerRepositoryOutputPort>(OWNER_REPOSITORY_OUTPUT_PORT);
const driverRepository = container.get<DriverRepositoryOutputPort>(DRIVER_REPOSITORY_OUTPUT_PORT);

function createOwner(ownerUid: string) {
  return {
    uid: ownerUid,
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

function createCabinet(cabinetUid: string, ownerUid: string) {
  return {
    uid: cabinetUid,
    brandName: 'Clauz',
    productName: 'die Maschine',
    enclosureType: 'Poccochin',
    weight: 100,
    dimension: 'dimension',
    manufacturingYear: 2023,
    description: 'description',
    ownerUid: ownerUid,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function createDriver(driverUid: string, cabinetUid: string) {
  return {
    uid: driverUid,
    brandName: 'B&C',
    productName: '12PE32',
    driverType: 'Woofer',
    manufacturingYear: 2015,
    nominalDiameter: 12,
    nominalImpedance: 8,
    continuousPowerHandling: 500,
    cabinetUid: cabinetUid,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

describe(`/api/driver/register`, () => {
  beforeAll(async () => {
    await database.start();
  });

  afterEach(async () => {
    await database.clear();
  });

  afterAll(async () => {
    await database.stop();
  });

  it(`register a driver`, async () => {
    const existingOwner = createOwner('4343b2ab-a22e-4d12-ac13-6bb399d4e512');
    await ownerRepository.save(existingOwner);
    const existingCabinet = createCabinet(
      '4343b2ab-a22e-4d12-ac13-6bb399d4e513',
      '4343b2ab-a22e-4d12-ac13-6bb399d4e512',
    );
    await cabinetRepository.save(existingCabinet);

    const registerDriverInput = {
      brandName: 'B&C',
      productName: '12PE32',
      driverType: 'Woofer',
      manufacturingYear: 2015,
      nominalDiameter: 12,
      nominalImpedance: 8,
      continuousPowerHandling: 500,
      cabinetUid: '4343b2ab-a22e-4d12-ac13-6bb399d4e513',
      ownerUid: '4343b2ab-a22e-4d12-ac13-6bb399d4e512',
    };

    const expectedResponse = [
      {
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
        cabinetUid: '4343b2ab-a22e-4d12-ac13-6bb399d4e513',
      },
    ];

    const response: { body: { cabinetUid: string; productName: string } } = await request(expressApp)
      .post('/api/driver/register')
      .send(registerDriverInput)
      .set({ Authorization: config.express.asbKeyUrl, Accept: 'application/json' })
      .expect(200);
    expect(
      await driverRepository.getByProductNameAndCabinetUid(response.body.productName, response.body.cabinetUid),
    ).toEqual(expectedResponse);
  });
  it(`does not register a driver without owner`, async () => {
    const existingOwner = createOwner('4343b2ab-a22e-4d12-ac13-6bb399d4e512');
    await ownerRepository.save(existingOwner);
    const existingCabinet = createCabinet(
      '4343b2ab-a22e-4d12-ac13-6bb399d4e513',
      '4343b2ab-a22e-4d12-ac13-6bb399d4e512',
    );
    await cabinetRepository.save(existingCabinet);

    const registerDriverInput = {
      brandName: 'B&C',
      productName: '12PE32',
      driverType: 'Woofer',
      manufacturingYear: 2015,
      nominalDiameter: 12,
      nominalImpedance: 8,
      continuousPowerHandling: 500,
      cabinetUid: '4343b2ab-a22e-4d12-ac13-6bb399d4e513',
      ownerUid: '4343b2ab-a22e-4d12-ac13-6bb399d4e514',
    };

    await request(expressApp)
      .post('/api/driver/register')
      .send(registerDriverInput)
      .set({ Authorization: config.express.asbKeyUrl, Accept: 'application/json' })
      .expect(500);
  });
  it(`does not register a driver already mounted 2 times on a box`, async () => {
    const existingOwner = createOwner('4343b2ab-a22e-4d12-ac13-6bb399d4e512');
    await ownerRepository.save(existingOwner);
    const existingCabinet = createCabinet(
      '4343b2ab-a22e-4d12-ac13-6bb399d4e513',
      '4343b2ab-a22e-4d12-ac13-6bb399d4e512',
    );
    await cabinetRepository.save(existingCabinet);

    const firstDriver = createDriver('4343b2ab-a22e-4d12-ac13-6bb399d4e515', '4343b2ab-a22e-4d12-ac13-6bb399d4e513');
    const secondDriver = createDriver('4343b2ab-a22e-4d12-ac13-6bb399d4e516', '4343b2ab-a22e-4d12-ac13-6bb399d4e513');
    const thirdDriver = createDriver('4343b2ab-a22e-4d12-ac13-6bb399d4e517', '4343b2ab-a22e-4d12-ac13-6bb399d4e513');
    for (const driver of [firstDriver, secondDriver, thirdDriver]) {
      await driverRepository.save(driver);
    }

    const registerDriverInput = {
      brandName: 'B&C',
      productName: '12PE32',
      driverType: 'Woofer',
      manufacturingYear: 2015,
      nominalDiameter: 12,
      nominalImpedance: 8,
      continuousPowerHandling: 500,
      cabinetUid: '4343b2ab-a22e-4d12-ac13-6bb399d4e513',
      ownerUid: '4343b2ab-a22e-4d12-ac13-6bb399d4e512',
    };

    await request(expressApp)
      .post('/api/driver/register')
      .send(registerDriverInput)
      .set({ Authorization: config.express.asbKeyUrl, Accept: 'application/json' })
      .expect(500);
  });
});
