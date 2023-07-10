import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Impulse, ImpulseResponse } from '../../../core/domain/impulse';

@Entity({ name: 'impulse' })
export class ImpulseTypeormEntity {
  @PrimaryColumn({ name: 'impulse_uid', type: 'uuid', update: false })
  uid!: string;

  @Column({ name: 'measured_by', type: 'varchar' })
  measuredBy!: string;

  @Column({ name: 'note', type: 'varchar' })
  note!: string;

  @Column({ name: 'source', type: 'varchar' })
  source!: string;

  @Column({ name: 'measured_at', type: 'varchar' })
  measuredAt!: string;

  @Column({ name: 'sweep_length', type: 'varchar' })
  sweepLength!: string;

  @Column({ name: 'response_window', type: 'varchar' })
  responseWindow!: string;

  @Column({ name: 'sample_interval', type: 'varchar' })
  sampleInterval!: string;

  @Column({ name: 'measurements', type: 'jsonb' })
  measurements!: ImpulseResponse[];

  @Column({ name: 'cabinet_uid', type: 'uuid' })
  cabinetUid!: string;

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
      cabinetUid: this.cabinetUid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(impulse: Impulse): ImpulseTypeormEntity {
    const entity = new ImpulseTypeormEntity();
    entity.uid = impulse.uid;
    entity.measuredBy = impulse.measuredBy;
    entity.note = impulse.note;
    entity.source = impulse.source;
    entity.measuredAt = impulse.measuredAt;
    entity.sweepLength = impulse.sweepLength;
    entity.responseWindow = impulse.responseWindow;
    entity.sampleInterval = impulse.sampleInterval;
    entity.measurements = impulse.measurements;
    entity.cabinetUid = impulse.cabinetUid;
    return entity;
  }
}
