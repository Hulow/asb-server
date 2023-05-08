import dotenv from 'dotenv';

import { LoggerConfig, LogLevel } from './shared/ports/out/logger.output-port';

dotenv.config();

interface Config {
  readonly logger: LoggerConfig;
}

export const config: Config = {
  logger: {
    level: (process.env.LOG_LEVEL ?? LogLevel.Info) as LogLevel,
  },
};
