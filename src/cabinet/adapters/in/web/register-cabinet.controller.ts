import { Request, Response } from 'express';
import httpErrors from 'http-errors';
import { inject, injectable } from 'inversify';

import { ExpressController } from '../../../../shared/adapters/in/express-web-server';
import {
  RegisterCabinetInputPort,
  REGISTER_CABINET_INPUT_PORT,
  RegisterCabinetInput,
} from '../../../core/application/ports/in/register-cabinet.input-port';
import { CabinetAlreadyExists } from '../../../core/domain/errors';
import { OwnerDoesNotExist } from '../../../../owner/core/domain/errors';

@injectable()
export class RegisterCabinetController implements ExpressController {
  readonly route = '/api/cabinet/register';
  readonly method = 'post';

  constructor(
    @inject(REGISTER_CABINET_INPUT_PORT) private readonly _registerCabinetService: RegisterCabinetInputPort,
  ) {}
  async handler(req: Request<unknown, unknown>, res: Response) {
    const { brandName, productName, enclosureType, weight, dimension, manufacturingYear, description, ownerUid } =
      req.body as RegisterCabinetInput;

    if (!brandName) throw new httpErrors.BadRequest('brandName cannot be empty');
    if (!productName) throw new httpErrors.BadRequest('productName cannot be empty');
    if (!enclosureType) throw new httpErrors.BadRequest('enclosureType cannot be empty');
    if (!weight) throw new httpErrors.BadRequest('weight cannot be empty');
    if (!dimension) throw new httpErrors.BadRequest('dimension cannot be empty');
    if (!manufacturingYear) throw new httpErrors.BadRequest('manufacturingYear cannot be empty');
    if (!description) throw new httpErrors.BadRequest('description cannot be empty');
    if (!ownerUid) throw new httpErrors.BadRequest('ownerUid cannot be empty');
    try {
      const response = await this._registerCabinetService.handler(req.body as RegisterCabinetInput);
      res.json(response);
    } catch (error) {
      if (error instanceof OwnerDoesNotExist) throw new httpErrors.NotFound(error.message);
      if (error instanceof CabinetAlreadyExists) throw new httpErrors.NotFound(error.message);
      throw error;
    }
  }
}
