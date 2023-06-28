import { AxiosClient } from '../../src/shared/adapters/in/axios-client';

export interface RegisterMeasurementResponse {
  status: number;
  statusText: string;
  data: object;
}

export class MeasurementClient extends AxiosClient {
  public async registerImpedance(): Promise<RegisterMeasurementResponse> {
    const response = await this.instance.post('/api/impedance/register', 'body');
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data as object,
    };
  }
  public async registerFrequency(): Promise<RegisterMeasurementResponse> {
    const response = await this.instance.post('/api/frequency/register', 'body');
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data as object,
    };
  }
  public async registerImpulse(): Promise<RegisterMeasurementResponse> {
    const response = await this.instance.post('/api/impulse/register', 'body');
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data as object,
    };
  }
}
