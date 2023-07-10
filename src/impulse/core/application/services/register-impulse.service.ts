import { inject, injectable } from 'inversify';

import { Impulse } from '../../domain/impulse';
import { RegisterImpulseInput, RegisterImpulseInputPort } from '../ports/in/register-impulse.input-port';
import {
  ImpulseRepositoryOutputPort,
  IMPULSE_REPOSITORY_OUTPUT_PORT,
} from '../ports/out/impulse-repository.output-port';
import {
  CabinetRepositoryOutputPort,
  CABINET_REPOSITORY_OUTPUT_PORT,
} from '../../../../cabinet/core/application/ports/out/cabinet-repository.output-port';
import { ImpulseAlreadyExists } from '../../domain/errors';
import { CabinetDoesNotExist } from '../../../../cabinet/core/domain/errors';

@injectable()
export class RegisterImpulseService implements RegisterImpulseInputPort {
  constructor(
    @inject(IMPULSE_REPOSITORY_OUTPUT_PORT) private readonly impulseRepository: ImpulseRepositoryOutputPort,
    @inject(CABINET_REPOSITORY_OUTPUT_PORT) private readonly cabinetRepository: CabinetRepositoryOutputPort,
  ) {}

  async handler(input: RegisterImpulseInput): Promise<Impulse> {
    const existingCabinet = await this.cabinetRepository.getById(input.cabinetUid);
    if (!existingCabinet) {
      throw new CabinetDoesNotExist(input.cabinetUid);
    }

    const existingImpulse = await this.impulseRepository.getByCabinetUid(input.cabinetUid);
    if (existingImpulse) {
      throw new ImpulseAlreadyExists(input.cabinetUid);
    }
    return await this.impulseRepository.save(
      new Impulse({
        measuredBy: 'string',
        note: 'string',
        source: 'string',
        measuredAt: 'string',
        sweepLength: 'string',
        responseWindow: 'string',
        sampleInterval: 'string',
        measurements: [{ response: 1, time: 1 }],
        cabinetUid: input.cabinetUid,
      }),
    );
  }
}
