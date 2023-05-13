import { v4 as uuid } from 'uuid';

export interface EntityProps {
  createdAt?: Date;
  updatedAt?: Date;
  uid?: string;
}

export abstract class DomainEntity {
  readonly uid: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  protected constructor(props: EntityProps) {
    this.uid = props.uid ?? uuid();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
