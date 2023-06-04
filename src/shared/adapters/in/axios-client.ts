import axios, { AxiosInstance } from 'axios';
import zlib from 'zlib';

import { LoggerOutputPort } from '../../ports/out/logger.output-port';

export interface AxiosConfig {
  readonly asbBaseUrl: string;
  readonly asbKeyUrl: string;
}

export class AxiosClient {
  protected readonly instance: AxiosInstance;
  constructor(private readonly _config: AxiosConfig, private _logger: LoggerOutputPort) {
    this.instance = axios.create({
      baseURL: this._config.asbBaseUrl,
      headers: {
        Authorization: this._config.asbKeyUrl,
        'content-type': 'application/zlib',
      },
      transformRequest: [
        (data: object) => {
          return this.encryptData(this.compressData(data));
        },
      ],
      withCredentials: true,
      responseType: 'json',
      timeout: 1000,
    });
  }

  private compressData(data: object) {
    return zlib.gzipSync(JSON.stringify(data));
  }

  private encryptData(data: Buffer) {
    return data.toString('base64');
  }
}
