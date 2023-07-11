import { Request, Response } from 'express';
import httpErrors from 'http-errors';
import { inject, injectable } from 'inversify';

import { ExpressController } from '../../../../shared/adapters/in/express-web-server';
import {
  RegisterImpulseInputPort,
  REGISTER_IMPULSE_INPUT_PORT,
  RegisterImpulseInput,
} from '../../../core/application/ports/in/register-impulse.input-port';
import {
  ImpulseAlreadyExists,
  ImpulseSettingNotFound,
  MissingImpulseGraphDataFound,
} from '../../../core/domain/errors';
import { CabinetDoesNotExist } from '../../../../cabinet/core/domain/errors';

@injectable()
export class RegisterImpulseController implements ExpressController {
  readonly route = '/api/impulse/register';
  readonly method = 'post';

  constructor(
    @inject(REGISTER_IMPULSE_INPUT_PORT) private readonly _registerImpulseService: RegisterImpulseInputPort,
  ) {}
  async handler(req: Request<unknown, unknown>, res: Response) {
    const { ownerUid, cabinetUid, driverUid, measurements } = req.body as RegisterImpulseInput;

    if (!ownerUid) throw new httpErrors.BadRequest('ownerUid cannot be empty');
    if (!cabinetUid) throw new httpErrors.BadRequest('cabinetUid cannot be empty');
    if (!driverUid) throw new httpErrors.BadRequest('driverUid cannot be empty');
    if (!measurements) throw new httpErrors.BadRequest('measurements cannot be empty');
    try {
      const response = await this._registerImpulseService.handler(req.body as RegisterImpulseInput);
      res.json(response);
    } catch (error) {
      if (error instanceof ImpulseAlreadyExists) throw new httpErrors.NotFound(error.message);
      if (error instanceof ImpulseSettingNotFound) throw new httpErrors.NotFound(error.message);
      if (error instanceof CabinetDoesNotExist) throw new httpErrors.NotFound(error.message);
      if (error instanceof MissingImpulseGraphDataFound) throw new httpErrors.NotFound(error.message);
    }
  }
}
