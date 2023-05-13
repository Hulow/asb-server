import { injectable } from 'inversify';

import { TestInputPort } from '../ports/in/test.port';

@injectable()
export class TestService implements TestInputPort {
  handle() {
    return 'Test response';
  }
}
