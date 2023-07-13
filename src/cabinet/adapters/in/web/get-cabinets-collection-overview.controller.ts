import { Request, Response } from 'express';
import httpErrors from 'http-errors';
import { inject, injectable } from 'inversify';

import { ExpressController } from '../../../../shared/adapters/in/express-web-server';
import {
  GetCabinetsCollectionOverviewInputPort,
  GET_CABINETS_COLLECTION_OVERVIEW_INPUT_PORT,
} from '../../../core/application/ports/in/get-cabinets-collection-overview.input-port';

import { CabinetsNotFound } from '../../../core/domain/errors';
import { OwnerDoesNotExist } from '../../../../owner/core/domain/errors';
import { DriversNotFound } from '../../../../driver/core/domain/errors';

@injectable()
export class GetCabinetsCollectionOverviewController implements ExpressController {
  readonly route = '/api/cabinets-collection';
  readonly method = 'get';

  constructor(
    @inject(GET_CABINETS_COLLECTION_OVERVIEW_INPUT_PORT)
    private readonly getCabinetsCollectionOverviewService: GetCabinetsCollectionOverviewInputPort,
  ) {}
  async handler(req: Request<unknown, unknown>, res: Response) {
    try {
      const response = await this.getCabinetsCollectionOverviewService.handler();
      res.json(response);
    } catch (error) {
      if (error instanceof OwnerDoesNotExist) throw new httpErrors.NotFound(error.message);
      if (error instanceof CabinetsNotFound) throw new httpErrors.NotFound(error.message);
      if (error instanceof DriversNotFound) throw new httpErrors.NotFound(error.message);

      throw error;
    }
  }
}
