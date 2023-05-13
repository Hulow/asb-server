import { Driver } from '../../../domain/driver';

export interface DriverRepositoryOutputPort {
  save: (driver: Driver) => Promise<Driver>;
}

export const DRIVER_REPOSITORY_OUTPUT_PORT = Symbol.for('DriverRepositoryOutputPort');
