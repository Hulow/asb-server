import * as fs from 'fs';
import * as path from 'path';

import { InMemoryImpulseRepository } from '../../../../adapters/out/persistence/impulse.repository.in-memory';
import { InMemoryCabinetRepository } from '../../../../../cabinet/adapters/out/persistence/cabinet.repository.in-memory';

import { RegisterImpulseInput } from '../../ports/in/register-impulse.input-port';
import { RegisterImpulseService } from '../register-impulse.service';
import { UUID_V4_REGEX } from '../../../../../shared/test/utils';
import { Impulse } from '../../../domain/impulse';
import { Cabinet } from '../../../../../cabinet/core/domain/cabinet';
import { ImpulseSettingNotFound, ImpulseAlreadyExists, MissingImpulseGraphDataFound } from '../../../domain/errors';
import { CabinetDoesNotExist } from '../../../../../cabinet/core/domain/errors';

describe('RegisterImpulseService', () => {
  let cabinetRepoStub: InMemoryCabinetRepository;
  let impulseRepoStub: InMemoryImpulseRepository;
  let registerimpulseService: RegisterImpulseService;

  beforeEach(() => {
    cabinetRepoStub = new InMemoryCabinetRepository();
    impulseRepoStub = new InMemoryImpulseRepository();
    registerimpulseService = new RegisterImpulseService(impulseRepoStub, cabinetRepoStub);
  });
  it('register an impulse', async () => {
    const measurementFile = fs.readFileSync(path.join(__dirname, './inputs/impulse_response.txt'), 'utf8');
    const existingcabinet: Cabinet = {
      uid: 'cabinet-uid',
      brandName: 'string',
      productName: 'string',
      enclosureType: 'string',
      weight: 100,
      dimension: 'string',
      manufacturingYear: 2023,
      description: 'string',
      ownerUid: 'd63d862b-d056-4488-b592-96e5ddbafe99',
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    await cabinetRepoStub.save(existingcabinet);
    const registerImpulseInput: RegisterImpulseInput = {
      ownerUid: 'owner-uid',
      cabinetUid: 'cabinet-uid',
      driverUid: 'driver-uid',
      measurements: measurementFile,
    };
    const response = await registerimpulseService.handler(registerImpulseInput);
    const expectedResponse: Impulse = {
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
      cabinetUid: 'cabinet-uid',
      createdAt: expect.any(Date) as Date,
      updatedAt: expect.any(Date) as Date,
    };
    expect(response).toEqual(expectedResponse);
  });
  it('Does not register an Impulse because of unexisting cabinet', async () => {
    const measurementFile = fs.readFileSync(path.join(__dirname, './inputs/impulse_response.txt'), 'utf8');
    const registerImpulseInput: RegisterImpulseInput = {
      ownerUid: 'owner-uid',
      cabinetUid: 'cabinet-uid',
      driverUid: 'driver-uid',
      measurements: measurementFile,
    };
    try {
      await registerimpulseService.handler(registerImpulseInput);
    } catch (err) {
      expect(err).toBeInstanceOf(CabinetDoesNotExist);
    }
  });

  it('Does not register an Impulse because of missing setting in impulse response txt file', async () => {
    const existingcabinet: Cabinet = {
      uid: 'cabinet-uid',
      brandName: 'string',
      productName: 'string',
      enclosureType: 'string',
      weight: 100,
      dimension: 'string',
      manufacturingYear: 2023,
      description: 'string',
      ownerUid: 'd63d862b-d056-4488-b592-96e5ddbafe99',
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    await cabinetRepoStub.save(existingcabinet);
    const wrongMeasurementFile = fs.readFileSync(
      path.join(__dirname, './inputs/impulse_response_with_missing_setting.txt'),
      'utf8',
    );
    const registerImpulseInput: RegisterImpulseInput = {
      ownerUid: 'owner-uid',
      cabinetUid: 'cabinet-uid',
      driverUid: 'driver-uid',
      measurements: wrongMeasurementFile,
    };
    try {
      await registerimpulseService.handler(registerImpulseInput);
    } catch (err) {
      expect(err).toBeInstanceOf(ImpulseSettingNotFound);
    }
  });

  it('Does not register an Impulse because of missing setting in impulse response txt file', async () => {
    const existingcabinet: Cabinet = {
      uid: 'cabinet-uid',
      brandName: 'string',
      productName: 'string',
      enclosureType: 'string',
      weight: 100,
      dimension: 'string',
      manufacturingYear: 2023,
      description: 'string',
      ownerUid: 'd63d862b-d056-4488-b592-96e5ddbafe99',
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    await cabinetRepoStub.save(existingcabinet);
    const wrongMeasurementFile = fs.readFileSync(
      path.join(__dirname, './inputs/impulse_response_with_missing_setting.txt'),
      'utf8',
    );
    const registerImpulseInput: RegisterImpulseInput = {
      ownerUid: 'owner-uid',
      cabinetUid: 'cabinet-uid',
      driverUid: 'driver-uid',
      measurements: wrongMeasurementFile,
    };
    try {
      await registerimpulseService.handler(registerImpulseInput);
    } catch (err) {
      expect(err).toBeInstanceOf(ImpulseSettingNotFound);
    }
  });

  it('Does not register an Impulse because of missing data in impulse response graph data txt file', async () => {
    const existingcabinet: Cabinet = {
      uid: 'cabinet-uid',
      brandName: 'string',
      productName: 'string',
      enclosureType: 'string',
      weight: 100,
      dimension: 'string',
      manufacturingYear: 2023,
      description: 'string',
      ownerUid: 'd63d862b-d056-4488-b592-96e5ddbafe99',
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    await cabinetRepoStub.save(existingcabinet);
    const wrongMeasurementFile = fs.readFileSync(path.join(__dirname, './inputs/wrong_impulse_response.txt'), 'utf8');
    const registerImpulseInput: RegisterImpulseInput = {
      ownerUid: 'owner-uid',
      cabinetUid: 'cabinet-uid',
      driverUid: 'driver-uid',
      measurements: wrongMeasurementFile,
    };
    try {
      await registerimpulseService.handler(registerImpulseInput);
    } catch (err) {
      expect(err).toBeInstanceOf(MissingImpulseGraphDataFound);
    }
  });

  it('Does not register a frequency because it already exists', async () => {
    const existingImpulse: Impulse = {
      uid: 'impulse-uid',
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
      cabinetUid: 'cabinet-uid',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await impulseRepoStub.save(existingImpulse);
    const existingcabinet: Cabinet = {
      uid: 'cabinet-uid',
      brandName: 'string',
      productName: 'string',
      enclosureType: 'string',
      weight: 100,
      dimension: 'string',
      manufacturingYear: 2023,
      description: 'string',
      ownerUid: 'd63d862b-d056-4488-b592-96e5ddbafe99',
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    await cabinetRepoStub.save(existingcabinet);
    const measurementFile = fs.readFileSync(path.join(__dirname, './inputs/impulse_response.txt'), 'utf8');
    const registerImpulseInput: RegisterImpulseInput = {
      ownerUid: 'owner-uid',
      cabinetUid: 'cabinet-uid',
      driverUid: 'driver-uid',
      measurements: measurementFile,
    };
    try {
      await registerimpulseService.handler(registerImpulseInput);
    } catch (err) {
      expect(err).toBeInstanceOf(ImpulseAlreadyExists);
    }
  });
});
