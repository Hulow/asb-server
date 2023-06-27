import { Driver } from '../../../domain/driver';
import { Cabinet } from '../../../../../cabinet/core/domain/cabinet';
import { Owner } from '../../../../../owner/core/domain/owner';

export interface DriverRepositoryOutputPort {
  save: (driver: Driver, cabinet: Cabinet, owner: Owner) => Promise<Driver>;
  getByProductName: (productName: string) => Promise<Driver | undefined>;
}

export const DRIVER_REPOSITORY_OUTPUT_PORT = Symbol.for('DriverRepositoryOutputPort');
