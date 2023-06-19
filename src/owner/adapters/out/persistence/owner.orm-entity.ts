import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CabinetTypeormEntity } from '../../../../cabinet/adapters/out/persistence/cabinet.orm-entity';

import { Owner } from '../../../core/domain/owner';

@Entity({ name: 'owner' })
export class OwnerTypeormEntity {
  @PrimaryColumn({ name: 'owner_uid', type: 'uuid', update: false })
  uid!: string;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName!: string;

  @Column({ name: 'ownername', type: 'varchar' })
  ownername!: string;

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

  @OneToMany(() => CabinetTypeormEntity, (cabinet) => cabinet.owner)
  cabinets?: CabinetTypeormEntity[];

  toDomain(): Owner {
    return new Owner({
      uid: this.uid,
      firstName: this.firstName,
      lastName: this.lastName,
      ownername: this.ownername,
      email: this.email,
      phoneNumber: this.phoneNumber,
      city: this.city,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(owner: Owner): OwnerTypeormEntity {
    const entity = new OwnerTypeormEntity();
    entity.uid = owner.uid;
    entity.firstName = owner.firstName;
    entity.lastName = owner.lastName;
    entity.ownername = owner.ownername;
    entity.email = owner.email;
    entity.phoneNumber = owner.phoneNumber;
    entity.city = owner.city;
    entity.description = owner.description;
    return entity;
  }
}
