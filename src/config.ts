import dotenv from 'dotenv';

import { ExpressConfig } from './shared/adapters/in/express-web-server';
import { LoggerConfig, LogLevel } from './shared/ports/out/logger.output-port';

dotenv.config();

interface Config {
  readonly logger: LoggerConfig;
  readonly express: ExpressConfig;
}

export const config: Config = {
  logger: {
    level: (process.env.LOG_LEVEL ?? LogLevel.Info) as LogLevel,
  },
  express: {
    port: +(process.env.EXPRESS_SERVER_PORT ?? 3000),
    corsOrigin: process.env.EXPRESS_SERVER_CORS_ORIGIN ?? '*',
    hostname: process.env.EXPRESS_SERVER_HOSTNAME ?? 'localhost',
  },
};
