import { Request, Response } from 'express';
import httpErrors from 'http-errors';
import { inject, injectable } from 'inversify';

import { ExpressController } from '../../../../shared/adapters/in/express-web-server';
import {
  RegisterImpedanceInputPort,
  REGISTER_IMPEDANCE_INPUT_PORT,
  RegisterImpedanceInput
} from '../../../core/application/ports/in/register-impedance.input-port';
import { ImpedanceAlreadyExists } from '../../../core/domain/errors';

@injectable()
export class RegisterImpedanceController implements ExpressController {
  readonly route = '/api/impedance/register';
  readonly method = 'post';

  constructor(
    @inject(REGISTER_IMPEDANCE_INPUT_PORT) private readonly _registerImpedanceService: RegisterImpedanceInputPort,
  ) {}
  async handler(req: Request<unknown, unknown>, res: Response) {
    const { ownerUid, cabinetUid, driverUid, measurements } = req.body as RegisterImpedanceInput;

    if (!ownerUid) throw new httpErrors.BadRequest('ownerUid cannot be empty');
    if (!cabinetUid) throw new httpErrors.BadRequest('cabinetUid cannot be empty');
    if (!driverUid) throw new httpErrors.BadRequest('driverUid cannot be empty');
    if (!measurements) throw new httpErrors.BadRequest('measurements cannot be empty');
    try {
      const response = await this._registerImpedanceService.handler(req.body as RegisterImpedanceInput);
      res.json(response);
    } catch (error) {
      if (error instanceof ImpedanceAlreadyExists) throw new httpErrors.NotFound(error.message);
      throw error;
    }
  }
}
