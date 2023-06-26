import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Frequency } from '../../../core/domain/frequency';

@Entity({ name: 'frequency' })
export class FrequencyTypeormEntity {
  @PrimaryColumn({ name: 'driver_uid', type: 'uuid', update: false })
  uid!: string;

  @Column({ name: 'measured_by', type: 'varchar' })
  measuredBy!: string;

  @Column({ name: 'measured_from', type: 'varchar' })
  measuredFrom!: string;

  @Column({ name: 'sweep_length', type: 'varchar' })
  sweepLength!: string;

  @Column({ name: 'measured_at', type: 'timestamp with time zone' })
  measuredAt!: Date;

  @Column({ name: 'frequency_weightings', type: 'varchar' })
  frequencyWeightings!: string;

  @Column({ name: 'target_level', type: 'float' })
  targetLevel!: number;

  @Column({ name: 'note', type: 'varchar' })
  note!: string;

  @Column({ name: 'smoothing', type: 'varchar' })
  smoothing!: string;

  @Column({ name: 'measurements', type: 'jsonb' })
  measurements!: object;

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
      sweepLength: this.sweepLength,
      measuredAt: this.measuredAt,
      frequencyWeightings: this.frequencyWeightings,
      targetLevel: this.targetLevel,
      note: this.note,
      smoothing: this.smoothing,
      measurements: this.measurements,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(frequency: Frequency): FrequencyTypeormEntity {
    const entity = new FrequencyTypeormEntity();
    entity.measuredBy = frequency.measuredBy;
    entity.measuredFrom = frequency.measuredFrom;
    entity.sweepLength = frequency.sweepLength;
    entity.measuredAt = frequency.measuredAt;
    entity.frequencyWeightings = frequency.frequencyWeightings;
    entity.targetLevel = frequency.targetLevel;
    entity.note = frequency.note;
    entity.smoothing = frequency.smoothing;
    entity.measurements = frequency.measurements;

    return entity;
  }
}
