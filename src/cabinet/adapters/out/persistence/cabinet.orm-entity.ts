import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Cabinet } from '../../../core/domain/cabinet';
import { DriverTypeormEntity } from '../../../../driver/adapters/out/persistence/driver.orm-entity';
import { OwnerTypeormEntity } from '../../../../owner/adapters/out/persistence/owner.orm-entity';
import { ImpulseTypeormEntity } from '../../../../impulse/adapters/out/persistence/impulse.orm-entity';
import { FrequencyTypeormEntity } from '../../../../frequency/adapters/out/persistence/frequency.orm-entity';
import { ImpedanceTypeormEntity } from '../../../../impedance/adapters/out/persistence/impedance.orm-entity';

@Entity({ name: 'cabinet' })
export class CabinetTypeormEntity {
  @PrimaryColumn({ name: 'cabinet_uid', type: 'uuid', update: false })
  uid!: string;

  @Column({ name: 'brand_name', type: 'varchar' })
  brandName!: string;

  @Column({ name: 'product_name', type: 'varchar' })
  productName!: string;

  @Column({ name: 'enclosure_type', type: 'varchar' })
  enclosureType!: string;

  @Column({ name: 'weight', type: 'float' })
  weight!: number;

  @Column({ name: 'dimension', type: 'varchar' })
  dimension!: string;

  @Column({ name: 'manufacturing_year', type: 'integer' })
  manufacturingYear!: number;

  @Column({ name: 'description', type: 'varchar' })
  description!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  @OneToMany(() => DriverTypeormEntity, (driver) => driver.cabinet, { eager: true })
  drivers!: DriverTypeormEntity[];

  @ManyToOne(() => OwnerTypeormEntity, (owner) => owner.cabinets)
  @JoinColumn({ name: 'owner_uid' })
  owner?: OwnerTypeormEntity;

  @OneToOne(() => ImpulseTypeormEntity, (impulse) => impulse.cabinet)
  @JoinColumn({ name: 'impulse_uid' })
  impulse!: ImpulseTypeormEntity;

  @OneToOne(() => FrequencyTypeormEntity, (frequency) => frequency.cabinet)
  @JoinColumn({ name: 'frequency_uid' })
  frequency!: FrequencyTypeormEntity;

  @OneToOne(() => ImpedanceTypeormEntity, (impedance) => impedance.cabinet)
  @JoinColumn({ name: 'impedance_uid' })
  impedance!: ImpedanceTypeormEntity;

  toDomain(): Cabinet {
    return new Cabinet({
      uid: this.uid,
      brandName: this.brandName,
      productName: this.productName,
      enclosureType: this.enclosureType,
      weight: this.weight,
      dimension: this.dimension,
      manufacturingYear: this.manufacturingYear,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(cabinet: Cabinet): CabinetTypeormEntity {
    const entity = new CabinetTypeormEntity();
    entity.brandName = cabinet.brandName;
    entity.productName = cabinet.productName;
    entity.enclosureType = cabinet.enclosureType;
    entity.weight = cabinet.weight;
    entity.dimension = cabinet.dimension;
    entity.manufacturingYear = cabinet.manufacturingYear;
    entity.description = cabinet.description;
    return entity;
  }
}
