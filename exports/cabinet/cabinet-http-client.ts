import { AxiosClient } from '../../src/shared/adapters/in/axios-client';
import { Cabinet } from '../../src/cabinet/core/domain/cabinet';
import { RegisterCabinetBody } from './export-cabinet';

export interface RegisterCabinetResponse {
  status: number;
  statusText: string;
  data: Cabinet;
}

export class CabinetClient extends AxiosClient {
  public async registerCabinet(cabinetBody: RegisterCabinetBody): Promise<RegisterCabinetResponse> {
    const response = await this.instance.post('/api/cabinet/register', cabinetBody);
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data as Cabinet,
    };
  }
}
