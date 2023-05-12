import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Driver } from '../../../core/domain/driver';

@Entity({ name: 'driver' })
export class DriverTypeormEntity {
  @PrimaryColumn({ name: 'uid', type: 'uuid', update: false })
  uid!: string;

  @Column({ name: 'brand_name', type: 'varchar' })
  brandName!: string;

  @Column({ name: 'product_name', type: 'varchar' })
  productName!: string;

  @Column({ name: 'driver_type', type: 'varchar' })
  driverType!: string;

  @Column({ name: 'nominal_diameter', type: 'float' })
  nominalDiameter!: number;

  @Column({ name: 'nominal_impedance', type: 'float' })
  nominalImpedance!: number;

  @Column({ name: 'continuous_power_handling', type: 'float' })
  continuousPowerHandling!: number;

  @Column({ name: 'user_id', type: 'integer' })
  userId!: number;

  @Column({ name: 'cabinet_id', type: 'integer' })
  cabinetId!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  toDomain(): Driver {
    return new Driver({
      uid: this.uid,
      brandName: this.brandName,
      productName: this.productName,
      driverType: this.driverType,
      nominalDiameter: this.nominalDiameter,
      nominalImpedance: this.nominalImpedance,
      continuousPowerHandling: this.continuousPowerHandling,
      userId: this.userId,
      cabinetId: this.cabinetId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(driver: Driver): DriverTypeormEntity {
    const entity = new DriverTypeormEntity();
    entity.brandName = driver.brandName;
    entity.productName = driver.driverType;
    entity.driverType = driver.driverType;
    entity.nominalDiameter = driver.nominalDiameter;
    entity.nominalImpedance = driver.nominalImpedance;
    entity.continuousPowerHandling = driver.continuousPowerHandling;
    entity.userId = driver.userId;
    entity.cabinetId = driver.cabinetId;
    return entity;
  }
}
