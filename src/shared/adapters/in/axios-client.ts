import axios, { AxiosInstance } from 'axios';

import { LoggerOutputPort } from '../../ports/out/logger.output-port';

export interface AxiosConfig {
  readonly asbBaseUrl: string;
  readonly asbKeyUrl: string;
  readonly contentType: string;
}

export class AxiosClient {
  protected readonly instance: AxiosInstance;
  constructor(private readonly _config: AxiosConfig, private _logger: LoggerOutputPort) {
    this.instance = axios.create({
      baseURL: _config.asbBaseUrl,
      headers: {
        Authorization: _config.asbKeyUrl,
        'content-type': _config.contentType,
      },
    });
  }
}
