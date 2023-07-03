import { AxiosClient } from '../../src/shared/adapters/in/axios-client';
import { MeasurementEndPoint } from './export-measurement';

import { RegisterMeasurementBody } from './export-measurement';
export interface RegisterMeasurementResponse {
  status: number;
  statusText: string;
  data: object;
}

export class MeasurementClient extends AxiosClient {
  public async registerMeasurement(
    body: RegisterMeasurementBody,
    endpoint: MeasurementEndPoint,
  ): Promise<RegisterMeasurementResponse> {
    const response = await this.instance.post(endpoint, body);
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data as object,
    };
  }
}
