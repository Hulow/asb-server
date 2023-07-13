import { Request, Response } from 'express';
import httpErrors from 'http-errors';
import { inject, injectable } from 'inversify';

import { ExpressController } from '../../../../shared/adapters/in/express-web-server';
import {
  RegisterDriverInputPort,
  REGISTER_DRIVER_INPUT_PORT,
  RegisterDriverInput,
} from '../../../core/application/ports/in/register-driver.input-port';
import { DriversAlreadyExists } from '../../../core/domain/errors';
import { OwnerDoesNotExist } from '../../../../owner/core/domain/errors';
import { CabinetDoesNotExist } from '../../../../cabinet/core/domain/errors';
@injectable()
export class RegisterDriverController implements ExpressController {
  readonly route = '/api/driver/register';
  readonly method = 'post';

  constructor(@inject(REGISTER_DRIVER_INPUT_PORT) private readonly _registerDriverService: RegisterDriverInputPort) {}
  async handler(req: Request<unknown, unknown>, res: Response) {
    const {
      brandName,
      productName,
      driverType,
      manufacturingYear,
      nominalDiameter,
      nominalImpedance,
      continuousPowerHandling,
      ownerUid,
      cabinetUid,
    } = req.body as RegisterDriverInput;

    if (!brandName) throw new httpErrors.BadRequest('brandName cannot be empty');
    if (!productName) throw new httpErrors.BadRequest('productName cannot be empty');
    if (!driverType) throw new httpErrors.BadRequest('driverType cannot be empty');
    if (!manufacturingYear) throw new httpErrors.BadRequest('manufacturingYear cannot be empty');
    if (!nominalDiameter) throw new httpErrors.BadRequest('nominalDiameter cannot be empty');
    if (!nominalImpedance) throw new httpErrors.BadRequest('nominalImpedance cannot be empty');
    if (!continuousPowerHandling) throw new httpErrors.BadRequest('continuousPowerHandling cannot be empty');
    if (!ownerUid) throw new httpErrors.BadRequest('ownerUid cannot be empty');
    if (!cabinetUid) throw new httpErrors.BadRequest('cabinetUid cannot be empty');
    try {
      const response = await this._registerDriverService.handler(req.body as RegisterDriverInput);
      res.json(response);
    } catch (error) {
      if (error instanceof DriversAlreadyExists) throw new httpErrors.NotFound(error.message);
      if (error instanceof CabinetDoesNotExist) throw new httpErrors.NotFound(error.message);
      if (error instanceof OwnerDoesNotExist) throw new httpErrors.NotFound(error.message);
      throw error;
    }
  }
}
