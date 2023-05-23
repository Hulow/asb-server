import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Driver } from '../../../core/domain/driver';
import { CabinetTypeormEntity } from '../../../../cabinet/adapters/out/persistence/cabinet.orm-entity';

@Entity({ name: 'driver' })
export class DriverTypeormEntity {
  @PrimaryColumn({ name: 'driver_uid', type: 'uuid', update: false })
  uid!: string;

  @Column({ name: 'brand_name', type: 'varchar' })
  brandName!: string;

  @Column({ name: 'product_name', type: 'varchar' })
  productName!: string;

  @Column({ name: 'driver_type', type: 'varchar' })
  driverType!: string;

  @Column({ name: 'manufacturing_year', type: 'integer' })
  manufacturingYear!: number;

  @Column({ name: 'nominal_diameter', type: 'float' })
  nominalDiameter!: number;

  @Column({ name: 'nominal_impedance', type: 'float' })
  nominalImpedance!: number;

  @Column({ name: 'continuous_power_handling', type: 'float' })
  continuousPowerHandling!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  @ManyToOne(() => CabinetTypeormEntity, (cabinet) => cabinet.drivers)
  @JoinColumn({ name: 'cabinet_uid' })
  cabinet!: CabinetTypeormEntity;

  toDomain(): Driver {
    return new Driver({
      uid: this.uid,
      brandName: this.brandName,
      productName: this.productName,
      driverType: this.driverType,
      manufacturingYear: this.manufacturingYear,
      nominalDiameter: this.nominalDiameter,
      nominalImpedance: this.nominalImpedance,
      continuousPowerHandling: this.continuousPowerHandling,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(driver: Driver): DriverTypeormEntity {
    const entity = new DriverTypeormEntity();
    entity.brandName = driver.brandName;
    entity.productName = driver.driverType;
    entity.driverType = driver.driverType;
    entity.manufacturingYear = driver.manufacturingYear;
    entity.nominalDiameter = driver.nominalDiameter;
    entity.nominalImpedance = driver.nominalImpedance;
    entity.continuousPowerHandling = driver.continuousPowerHandling;
    return entity;
  }
}
