import { Container } from 'inversify';

import { config } from './config';
import { PostgresDataSource } from './shared/adapters/out/postgres-datasource';
import { PinoLogger } from './shared/adapters/out/pino-logger';
import { LoggerOutputPort, LOGGER_OUTPUT_PORT } from './shared/ports/out/logger.output-port';
import { SqlDriverRepository } from './driver/adapters/out/persistence/driver.repository.sql';
import {
  DriverRepositoryOutputPort,
  DRIVER_REPOSITORY_OUTPUT_PORT,
} from './driver/core/application/ports/out/driver-repository.output-port';
import { ExpressWebServer } from './shared/adapters/in/express-web-server';
import { TestController } from './dats/adapters/in/test.controller';
import { TestInputPort, TEST_INPUT_PORT } from './dats/core/ports/in/test.port';
import { TestService } from './dats/core/services/test.service';

export const container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
  skipBaseClassChecks: true,
});

/**
 *  input/driving/primary adapters
 */
container.bind(ExpressWebServer).toDynamicValue(() => {
  const controllers = [container.get(TestController)];
  return new ExpressWebServer(config.express, container.get(LOGGER_OUTPUT_PORT), controllers);
});

/**
 *  application services
 */
container.bind<TestInputPort>(TEST_INPUT_PORT).to(TestService);

/**
 *  output/driven/secondary adapters
 */
container.bind<LoggerOutputPort>(LOGGER_OUTPUT_PORT).toDynamicValue(() => new PinoLogger(config.logger));
container
  .bind(PostgresDataSource)
  .toDynamicValue(() => new PostgresDataSource(config.postgres, container.get(LOGGER_OUTPUT_PORT)));
container.bind<DriverRepositoryOutputPort>(DRIVER_REPOSITORY_OUTPUT_PORT).to(SqlDriverRepository);
