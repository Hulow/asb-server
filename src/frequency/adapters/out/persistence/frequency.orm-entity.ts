import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Frequency } from '../../../core/domain/frequency';

@Entity({ name: 'frequency' })
export class FrequencyTypeormEntity {
  @PrimaryColumn({ name: 'uid', type: 'uuid', update: false })
  uid!: string;

  @Column({ name: 'measured_by', type: 'varchar' })
  measuredBy!: string;

  @Column({ name: 'measured_from', type: 'varchar' })
  measuredFrom!: string;

  @Column({ name: 'sampling', type: 'varchar' })
  sampling!: string;

  @Column({ name: 'measured_at', type: 'timestamp with time zone' })
  measuredAt!: Date;

  @Column({ name: 'frequency_weightings', type: 'varchar' })
  frequencyWeightings!: string;

  @Column({ name: 'target_level', type: 'float' })
  targetLevel!: number;

  @Column({ name: 'measurement_note', type: 'varchar' })
  measurementNote!: string;

  @Column({ name: 'smoothing', type: 'varchar' })
  smoothing!: string;

  @Column({ name: 'measurements', type: 'jsonb' })
  measurements!: object;

  @Column({ name: 'user_id', type: 'float' })
  userId!: number;

  @Column({ name: 'driver_id', type: 'float' })
  driverId!: number;

  @Column({ name: 'cabinet_id', type: 'float' })
  cabinetId!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  toDomain(): Frequency {
    return new Frequency({
      uid: this.uid,
      measuredBy: this.measuredBy,
      measuredFrom: this.measuredFrom,
      sampling: this.sampling,
      measuredAt: this.measuredAt,
      frequencyWeightings: this.frequencyWeightings,
      targetLevel: this.targetLevel,
      measurementNote: this.measurementNote,
      smoothing: this.smoothing,
      measurements: this.measurements,
      userId: this.userId,
      driverId: this.driverId,
      cabinetId: this.cabinetId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(frequency: Frequency): FrequencyTypeormEntity {
    const entity = new FrequencyTypeormEntity();
    entity.measuredBy = frequency.measuredBy;
    entity.measuredFrom = frequency.measuredFrom;
    entity.sampling = frequency.sampling;
    entity.measuredAt = frequency.measuredAt;
    entity.frequencyWeightings = frequency.frequencyWeightings;
    entity.targetLevel = frequency.targetLevel;
    entity.measurementNote = frequency.measurementNote;
    entity.smoothing = frequency.smoothing;
    entity.measurements = frequency.measurements;
    entity.userId = frequency.userId;
    entity.driverId = frequency.driverId;
    entity.cabinetId = frequency.cabinetId;

    return entity;
  }
}
