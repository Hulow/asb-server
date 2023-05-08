export enum LogLevel {
  Debug = 'debug',
  Error = 'error',
  Info = 'info',
  Warn = 'warn',
}

export interface LogMethod {
  (msg: string, meta: object): void;
  (obj: unknown): void;
}

export interface LoggerConfig {
  readonly level: LogLevel;
}

export const LOGGER_OUTPUT_PORT = Symbol.for('LoggerOutputPort');

export interface LoggerOutputPort {
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
}
