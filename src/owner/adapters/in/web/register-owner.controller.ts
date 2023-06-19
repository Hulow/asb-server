import { Request, Response } from 'express';
import httpErrors from 'http-errors';
import { inject, injectable } from 'inversify';

import { ExpressController } from '../../../../shared/adapters/in/express-web-server';
import {
  RegisterOwnerInputPort,
  REGISTER_OWNER_INPUT_PORT,
  RegisterOwnerInput,
} from '../../../core/application/ports/in/register-owner.input-port';
import { OwnerAlreadyExists } from '../../../core/domain/errors';

@injectable()
export class RegisterOwnerController implements ExpressController {
  readonly route = '/api/owner/register';
  readonly method = 'post';

  constructor(@inject(REGISTER_OWNER_INPUT_PORT) private readonly _registerOwnerService: RegisterOwnerInputPort) {}
  async handler(req: Request<unknown, unknown>, res: Response) {
    const { firstName, lastName, ownername, email, phoneNumber, city, description } = req.body as RegisterOwnerInput;

    if (!firstName) throw new httpErrors.BadRequest('firstName cannot be empty');
    if (!lastName) throw new httpErrors.BadRequest('lastName cannot be empty');
    if (!ownername) throw new httpErrors.BadRequest('ownername cannot be empty');
    if (!email) throw new httpErrors.BadRequest('email cannot be empty');
    if (!phoneNumber) throw new httpErrors.BadRequest('phonNumber cannot be empty');
    if (!city) throw new httpErrors.BadRequest('city cannot be empty');
    if (!description) throw new httpErrors.BadRequest('description cannot be empty');
    try {
      const response = await this._registerOwnerService.handler(req.body as RegisterOwnerInput);
      res.json(response);
    } catch (error) {
      if (error instanceof OwnerAlreadyExists) throw new httpErrors.NotFound(error.message);
      throw error;
    }
  }
}
