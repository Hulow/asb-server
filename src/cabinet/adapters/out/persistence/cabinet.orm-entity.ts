import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Cabinet } from '../../../core/domain/cabinet';
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

  @Column({ name: 'owner_uid', type: 'uuid' })
  ownerUid!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

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
      ownerUid: this.ownerUid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(cabinet: Cabinet): CabinetTypeormEntity {
    const entity = new CabinetTypeormEntity();
    entity.uid = cabinet.uid;
    entity.brandName = cabinet.brandName;
    entity.productName = cabinet.productName;
    entity.enclosureType = cabinet.enclosureType;
    entity.weight = cabinet.weight;
    entity.dimension = cabinet.dimension;
    entity.manufacturingYear = cabinet.manufacturingYear;
    entity.description = cabinet.description;
    entity.ownerUid = cabinet.ownerUid;
    return entity;
  }
}
