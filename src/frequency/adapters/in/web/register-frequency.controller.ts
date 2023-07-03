import { Request, Response } from 'express';
import httpErrors from 'http-errors';
import { inject, injectable } from 'inversify';

import { ExpressController } from '../../../../shared/adapters/in/express-web-server';
import {
  RegisterFrequencyInputPort,
  REGISTER_FREQUENCY_INPUT_PORT,
  RegisterFrequencyInput,
} from '../../../core/application/ports/in/register-frequency.input-port';
import { FrequencyAlreadyExists } from '../../../core/domain/errors';

@injectable()
export class RegisterFrequencyController implements ExpressController {
  readonly route = '/api/frequency/register';
  readonly method = 'post';

  constructor(
    @inject(REGISTER_FREQUENCY_INPUT_PORT) private readonly _registerFrequencyService: RegisterFrequencyInputPort,
  ) {}
  async handler(req: Request<unknown, unknown>, res: Response) {
    const { ownerUid, cabinetUid, driverUid, measurements } = req.body as RegisterFrequencyInput;

    if (!ownerUid) throw new httpErrors.BadRequest('ownerUid cannot be empty');
    if (!cabinetUid) throw new httpErrors.BadRequest('cabinetUid cannot be empty');
    if (!driverUid) throw new httpErrors.BadRequest('driverUid cannot be empty');
    if (!measurements) throw new httpErrors.BadRequest('measurements cannot be empty');
    try {
      const response = await this._registerFrequencyService.handler(req.body as RegisterFrequencyInput);
      res.json(response);
    } catch (error) {
      if (error instanceof FrequencyAlreadyExists) throw new httpErrors.NotFound(error.message);
      throw error;
    }
  }
}
