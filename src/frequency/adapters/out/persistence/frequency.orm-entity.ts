import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Frequency, FrequencyResponse } from '../../../core/domain/frequency';

@Entity({ name: 'frequency' })
export class FrequencyTypeormEntity {
  @PrimaryColumn({ name: 'frequency_uid', type: 'uuid', update: false })
  uid!: string;

  @Column({ name: 'measured_by', type: 'varchar' })
  measuredBy!: string;

  @Column({ name: 'source', type: 'varchar' })
  source!: string;

  @Column({ name: 'sweep_length', type: 'varchar' })
  sweepLength!: string;

  @Column({ name: 'measured_at', type: 'varchar' })
  measuredAt!: string;

  @Column({ name: 'frequency_weightings', type: 'varchar' })
  frequencyWeightings!: string;

  @Column({ name: 'target_level', type: 'varchar' })
  targetLevel!: string;

  @Column({ name: 'note', type: 'varchar' })
  note!: string;

  @Column({ name: 'smoothing', type: 'varchar' })
  smoothing!: string;

  @Column({ name: 'measurements', type: 'jsonb' })
  measurements!: FrequencyResponse[];

  @Column({ name: 'cabinet_uid', type: 'uuid' })
  cabinetUid!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  toDomain(): Frequency {
    return new Frequency({
      uid: this.uid,
      measuredBy: this.measuredBy,
      source: this.source,
      sweepLength: this.sweepLength,
      measuredAt: this.measuredAt,
      frequencyWeightings: this.frequencyWeightings,
      targetLevel: this.targetLevel,
      note: this.note,
      smoothing: this.smoothing,
      measurements: this.measurements,
      cabinetUid: this.cabinetUid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(frequency: Frequency): FrequencyTypeormEntity {
    const entity = new FrequencyTypeormEntity();
    entity.uid = frequency.uid;
    entity.measuredBy = frequency.measuredBy;
    entity.source = frequency.source;
    entity.sweepLength = frequency.sweepLength;
    entity.measuredAt = frequency.measuredAt;
    entity.frequencyWeightings = frequency.frequencyWeightings;
    entity.targetLevel = frequency.targetLevel;
    entity.note = frequency.note;
    entity.smoothing = frequency.smoothing;
    entity.measurements = frequency.measurements;
    entity.cabinetUid = frequency.cabinetUid;

    return entity;
  }
}
