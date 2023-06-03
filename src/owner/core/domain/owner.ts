import { DomainEntity, EntityProps } from '../../../shared/domain/entity';

export interface OwnerProps {
  firstName: string;
  lastName: string;
  ownername: string;
  email: string;
  phoneNumber: string;
  city: string;
  description: string;
}

export class Owner extends DomainEntity {
  readonly firstName: string;
  readonly lastName: string;
  readonly ownername: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly city: string;
  readonly description: string;

  constructor(props: OwnerProps & EntityProps) {
    super(props);

    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.ownername = props.ownername;
    this.email = props.email;
    this.phoneNumber = props.phoneNumber;
    this.city = props.city;
    this.description = props.description;
  }
}
