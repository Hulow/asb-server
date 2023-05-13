import { Request, Response } from 'express';
import httpErrors from 'http-errors';
import { inject, injectable } from 'inversify';

import { ExpressController } from '../../../shared/adapters/in/express-web-server';
import { TestInputPort, TEST_INPUT_PORT } from '../../core/ports/in/test.port';

interface TestIdBody {
  testId: string;
}

@injectable()
export class TestController implements ExpressController {
  readonly route = '/test';
  readonly method = 'post';

  constructor(@inject(TEST_INPUT_PORT) private readonly testService: TestInputPort) {}

  handler(req: Request<unknown, unknown, TestIdBody>, res: Response) {
    const { testId } = req.body;

    if (!testId) throw new httpErrors.BadRequest('Unable to find testId');

    const testResponse = this.testService.handle();
    res.json({ response: testResponse });
  }
}
