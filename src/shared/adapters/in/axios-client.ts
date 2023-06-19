import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { config } from '../../../config';
export interface AxiosConfig {
  readonly asbBaseUrl: string;
  readonly asbKeyUrl: string;
}
export interface MappedAxiosErrorResponse {
  status: number;
  statusText: string;
  message: string;
}

interface AxiosErrorResponse {
  status: number;
  statusText: string;
  data: AxiosErrorData;
}

interface AxiosErrorData {
  error: string;
}

export class AxiosClient {
  protected readonly instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: config.axios.asbBaseUrl,
      headers: {
        Authorization: config.axios.asbKeyUrl,
        'content-type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
      timeout: 1000,
    });
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError);
  };

  private _handleResponse = (response: AxiosResponse) => response;

  protected _handleError = (error: AxiosError) =>
    Promise.reject(this._mapErrorMessage(error.response as AxiosErrorResponse));

  protected _mapErrorMessage = (error: AxiosErrorResponse): MappedAxiosErrorResponse => {
    return {
      status: error.status,
      statusText: error.statusText,
      message: error.data.error,
    };
  };
}
