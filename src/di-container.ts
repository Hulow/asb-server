import { Container } from 'inversify';

import { config } from './config';
import { PostgresDataSource } from './shared/adapters/out/postgres-datasource';
import { PinoLogger } from './shared/adapters/out/pino-logger';
import { LoggerOutputPort, LOGGER_OUTPUT_PORT } from './shared/ports/out/logger.output-port';
import { SqlCabinetRepository } from './cabinet/adapters/out/persistence/cabinet.repository.sql';
import { SqlDriverRepository } from './driver/adapters/out/persistence/driver.repository.sql';
import { SqlFrequencyRepository } from './frequency/adapters/out/persistence/frequency.repository.sql';
import { SqlImpulseRepository } from './impulse/adapters/out/persistence/impulse.repository.sql';

import { SqlUserRepository } from './user/adapters/out/persistence/user.repository.sql';
import { SqlImpedanceRepository } from './impedance/adapters/out/persistence/impedance.repository.sql';
import {
  CabinetRepositoryOutputPort,
  CABINET_REPOSITORY_OUTPUT_PORT,
} from './cabinet/core/application/ports/out/cabinet-repository.output-port';
import {
  DriverRepositoryOutputPort,
  DRIVER_REPOSITORY_OUTPUT_PORT,
} from './driver/core/application/ports/out/driver-repository.output-port';
import {
  FrequencyRepositoryOutputPort,
  FREQUENCY_REPOSITORY_OUTPUT_PORT,
} from './frequency/core/application/ports/out/frequency-repository.output-port';
import {
  ImpulseRepositoryOutputPort,
  IMPULSE_REPOSITORY_OUTPUT_PORT,
} from './impulse/core/application/ports/out/impulse-repository.output-port';
import {
  UserRepositoryOutputPort,
  USER_REPOSITORY_OUTPUT_PORT,
} from './user/core/application/ports/out/user-repository.output-port';
import {
  ImpedanceRepositoryOutputPort,
  IMPEDANCE_REPOSITORY_OUTPUT_PORT,
} from './impedance/core/application/ports/out/impedance-repository.output-port';
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
container.bind<CabinetRepositoryOutputPort>(CABINET_REPOSITORY_OUTPUT_PORT).to(SqlCabinetRepository);
container.bind<DriverRepositoryOutputPort>(DRIVER_REPOSITORY_OUTPUT_PORT).to(SqlDriverRepository);
container.bind<FrequencyRepositoryOutputPort>(FREQUENCY_REPOSITORY_OUTPUT_PORT).to(SqlFrequencyRepository);
container.bind<ImpulseRepositoryOutputPort>(IMPULSE_REPOSITORY_OUTPUT_PORT).to(SqlImpulseRepository);

container.bind<UserRepositoryOutputPort>(USER_REPOSITORY_OUTPUT_PORT).to(SqlUserRepository);
container.bind<ImpedanceRepositoryOutputPort>(IMPEDANCE_REPOSITORY_OUTPUT_PORT).to(SqlImpedanceRepository);
