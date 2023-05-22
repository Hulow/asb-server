import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Impulse } from '../../../core/domain/impulse';

@Entity({ name: 'impulse' })
export class ImpulseTypeormEntity {
  @PrimaryColumn({ name: 'uid', type: 'uuid', update: false })
  uid!: string;

  @Column({ name: 'measured_by', type: 'varchar' })
  measuredBy!: string;

  @Column({ name: 'note', type: 'varchar' })
  note!: string;

  @Column({ name: 'source', type: 'varchar' })
  source!: string;

  @Column({ name: 'measured_at', type: 'timestamp with time zone' })
  measuredAt!: Date;

  @Column({ name: 'sweep_length', type: 'varchar' })
  sweepLength!: string;

  @Column({ name: 'response_window', type: 'varchar' })
  responseWindow!: string;

  @Column({ name: 'sample_interval', type: 'varchar' })
  sampleInterval!: string;

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

  toDomain(): Impulse {
    return new Impulse({
      uid: this.uid,
      measuredBy: this.measuredBy,
      note: this.note,
      source: this.source,
      measuredAt: this.measuredAt,
      sweepLength: this.sweepLength,
      responseWindow: this.responseWindow,
      sampleInterval: this.sampleInterval,
      measurements: this.measurements,
      userId: this.userId,
      driverId: this.driverId,
      cabinetId: this.cabinetId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(frequency: Impulse): ImpulseTypeormEntity {
    const entity = new ImpulseTypeormEntity();
    entity.measuredBy = frequency.measuredBy;
    entity.note = frequency.note;
    entity.source = frequency.source;
    entity.measuredAt = frequency.measuredAt;
    entity.sweepLength = frequency.sweepLength;
    entity.responseWindow = frequency.responseWindow;
    entity.sampleInterval = frequency.sampleInterval;
    entity.measurements = frequency.measurements;
    entity.userId = frequency.userId;
    entity.driverId = frequency.driverId;
    entity.cabinetId = frequency.cabinetId;

    return entity;
  }
}
