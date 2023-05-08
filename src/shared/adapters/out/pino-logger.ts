import { injectable } from 'inversify';
import { BaseLogger, pino } from 'pino';

import { LoggerConfig, LoggerOutputPort } from '../../ports/out/logger.output-port';

@injectable()
export class PinoLogger implements LoggerOutputPort {
  private _pino: BaseLogger;

  constructor(readonly config: LoggerConfig) {
    this._pino = pino({
      level: config.level,
    });
  }

  public debug(msg: unknown, meta?: object) {
    if (!meta) return this._pino.debug(msg);
    return this._pino.debug(meta, msg as string);
  }

  public info(msg: unknown, meta?: object) {
    if (!meta) return this._pino.info(msg);
    return this._pino.info(meta, msg as string);
  }

  public warn(msg: unknown, meta?: object) {
    if (!meta) return this._pino.warn(msg);
    return this._pino.warn(meta, msg as string);
  }

  public error(msg: unknown, meta?: object) {
    if (!meta) return this._pino.error(msg);
    return this._pino.error(meta, msg as string);
  }
}
