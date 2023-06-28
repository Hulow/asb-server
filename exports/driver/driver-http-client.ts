import { AxiosClient } from '../../src/shared/adapters/in/axios-client';
import { Driver } from '../../src/driver/core/domain/driver';
import { RegisterDriverBody } from './export-driver';

export interface RegisterDriverResponse {
  status: number;
  statusText: string;
  data: Driver;
}

export class DriverClient extends AxiosClient {
  public async registerDriver(driverBody: RegisterDriverBody): Promise<RegisterDriverResponse> {
    const response = await this.instance.post('/api/driver/register', driverBody);
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data as Driver,
    };
  }
}
