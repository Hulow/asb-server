import { AxiosClient } from '../../src/shared/adapters/in/axios-client';
import { Owner } from '../../src/owner/core/domain/owner';
import { RegisterOwnerBody } from './export-owner';

export interface RegisterOwnerResponse {
  status: number;
  statusText: string;
  data: Owner;
}

export class OwnerClient extends AxiosClient {
  public async registerOwner(ownerBody: RegisterOwnerBody): Promise<RegisterOwnerResponse> {
    const response = await this.instance.post('/api/owner/register', ownerBody);
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data as Owner,
    };
  }
}
