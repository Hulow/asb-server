import * as fs from 'fs';
import * as path from 'path';

import { InMemoryFrequencyRepository } from '../../../../adapters/out/persistence/frequency.repository.in-memory';
import { InMemoryCabinetRepository } from '../../../../../cabinet/adapters/out/persistence/cabinet.repository.in-memory';

import { RegisterFrequencyInput } from '../../ports/in/register-frequency.input-port';
import { RegisterFrequencyService } from '../register-frequency.service';
import { UUID_V4_REGEX } from '../../../../../shared/test/utils';
import { Frequency } from '../../../domain/frequency';
import { Cabinet } from '../../../../../cabinet/core/domain/cabinet';
import { FrequencyAlreadyExists, FrequencyParameterNotFound } from '../../../domain/errors';
import { CabinetDoesNotExist } from '../../../../../cabinet/core/domain/errors';

describe('RegisterFrequencyService', () => {
  let cabinetRepoStub: InMemoryCabinetRepository;
  let frequencyRepoStub: InMemoryFrequencyRepository;
  let registerfrequencyService: RegisterFrequencyService;

  beforeEach(() => {
    cabinetRepoStub = new InMemoryCabinetRepository();
    frequencyRepoStub = new InMemoryFrequencyRepository();
    registerfrequencyService = new RegisterFrequencyService(frequencyRepoStub, cabinetRepoStub);
  });
  it('register a frequency', async () => {
    const measurementFile = fs.readFileSync(path.join(__dirname, './inputs/frequency_response.txt'), 'utf8');
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
    const registerFrequencyInput: RegisterFrequencyInput = {
      ownerUid: 'owner-uid',
      cabinetUid: 'cabinet-uid',
      driverUid: 'driver-uid',
      measurements: measurementFile,
    };
    const response = await registerfrequencyService.handler(registerFrequencyInput);
    const expectedResponse: Frequency = {
      uid: expect.stringMatching(UUID_V4_REGEX) as string,
      createdAt: expect.any(Date) as Date,
      updatedAt: expect.any(Date) as Date,
      measuredBy: 'REW V5.20.13',
      source: 'Scarlett 2i2 USB',
      sweepLength: '512k Log Swept Sine',
      measuredAt: 'Mar 22, 2023 2:53:43 PM',
      frequencyWeightings: 'C-weighting',
      targetLevel: '75.0 dB',
      note: 'second measurement Mic is at 1m and almost align with tweeter',
      smoothing: '1/3 octave',
      measurements: [{ frequency: 15.140533, spl: 44.493, phase: 86.8478 }],
      cabinetUid: 'cabinet-uid',
    };
    expect(response).toEqual(expectedResponse);
  });

  it('Does not register a frequency because of unexisting cabinet', async () => {
    const measurementFile = fs.readFileSync(path.join(__dirname, './inputs/frequency_response.txt'), 'utf8');
    const registerFrequencyInput: RegisterFrequencyInput = {
      ownerUid: 'owner-uid',
      cabinetUid: 'cabinet-uid',
      driverUid: 'driver-uid',
      measurements: measurementFile,
    };
    try {
      await registerfrequencyService.handler(registerFrequencyInput);
    } catch (err) {
      expect(err).toBeInstanceOf(CabinetDoesNotExist);
    }
  });

  it('Does not register a frequency because of missing parameters in frequency response txt file', async () => {
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
    const wrongMeasurementFile = fs.readFileSync(path.join(__dirname, './inputs/wrong_frequency_response.txt'), 'utf8');
    const registerFrequencyInput: RegisterFrequencyInput = {
      ownerUid: 'owner-uid',
      cabinetUid: 'cabinet-uid',
      driverUid: 'driver-uid',
      measurements: wrongMeasurementFile,
    };
    try {
      await registerfrequencyService.handler(registerFrequencyInput);
    } catch (err) {
      expect(err).toBeInstanceOf(FrequencyParameterNotFound);
    }
  });

  it('Does not register a frequency because it already exists', async () => {
    const existingFrequency: Frequency = {
      uid: 'frequency-uid',
      measuredBy: 'REW V5.20.13',
      source: 'Scarlett 2i2 USB',
      sweepLength: '512k Log Swept Sine',
      measuredAt: 'Mar 22, 2023 2:53:43 PM',
      frequencyWeightings: '*  C-weighting',
      targetLevel: '75.0 dB',
      note: 'second measurement Mic is at 1m and almost align with tweeter',
      smoothing: '1/3 octave',
      measurements: [{ frequency: 15.140533, spl: 44.493, phase: 86.8478 }],
      updatedAt: new Date(),
      createdAt: new Date(),
      cabinetUid: 'cabinet-uid',
    };
    await frequencyRepoStub.save(existingFrequency);
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
    const measurementFile = fs.readFileSync(path.join(__dirname, './inputs/frequency_response.txt'), 'utf8');
    const registerFrequencyInput: RegisterFrequencyInput = {
      ownerUid: 'owner-uid',
      cabinetUid: 'cabinet-uid',
      driverUid: 'driver-uid',
      measurements: measurementFile,
    };
    try {
      await registerfrequencyService.handler(registerFrequencyInput);
    } catch (err) {
      expect(err).toBeInstanceOf(FrequencyAlreadyExists);
    }
  });
});
