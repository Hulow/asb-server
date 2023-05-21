import { DomainEntity, EntityProps } from '../../../shared/domain/entity';

export interface UserProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  city: string;
  description: string;
}

export class User extends DomainEntity {
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly city: string;
  readonly description: string;

  constructor(props: UserProps & EntityProps) {
    super(props);

    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.username = props.username;
    this.email = props.email;
    this.phoneNumber = props.phoneNumber;
    this.city = props.city;
    this.description = props.description;
  }
}
