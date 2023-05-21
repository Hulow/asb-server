import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../../core/domain/user';

@Entity({ name: 'user' })
export class UserTypeormEntity {
  @PrimaryColumn({ name: 'uid', type: 'uuid', update: false })
  uid!: string;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName!: string;

  @Column({ name: 'username', type: 'varchar' })
  username!: string;

  @Column({ name: 'email', type: 'varchar' })
  email!: string;

  @Column({ name: 'phone_number', type: 'varchar' })
  phoneNumber!: string;

  @Column({ name: 'city', type: 'varchar' })
  city!: string;

  @Column({ name: 'description', type: 'varchar' })
  description!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  toDomain(): User {
    return new User({
      uid: this.uid,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber,
      city: this.city,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(user: User): UserTypeormEntity {
    const entity = new UserTypeormEntity();
    entity.firstName = user.firstName;
    entity.lastName = user.lastName;
    entity.username = user.username;
    entity.email = user.email;
    entity.phoneNumber = user.phoneNumber;
    entity.city = user.city;
    entity.description = user.description;
    return entity;
  }
}
