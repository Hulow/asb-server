import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Impedance } from '../../../core/domain/impedance';
import { CabinetTypeormEntity } from '../../../../cabinet/adapters/out/persistence/cabinet.orm-entity';

@Entity({ name: 'impedance' })
export class ImpedanceTypeormEntity {
  @PrimaryColumn({ name: 'impedance_uid', type: 'uuid', update: false })
  uid!: string;

  @Column({ name: 'piston_diameter', type: 'float' })
  pistonDiameter!: number;

  @Column({ name: 'resonance_frequency', type: 'float' })
  resonanceFrequency!: number;

  @Column({ name: 'dc_resistance', type: 'float' })
  dcResistance!: number;

  @Column({ name: 'ac_resistance', type: 'float' })
  acResistance!: number;

  @Column({ name: 'mechanical_damping', type: 'float' })
  mechanicalDamping!: number;

  @Column({ name: 'electrical_damping', type: 'float' })
  electricalDamping!: number;

  @Column({ name: 'total_damping', type: 'float' })
  totalDamping!: number;

  @Column({ name: 'equivalence_compliance', type: 'float' })
  equivalenceCompliance!: number;

  @Column({ name: 'voice_coil_inductance', type: 'float' })
  voiceCoilInductance!: number;

  @Column({ name: 'efficiency', type: 'float' })
  efficiency!: number;

  @Column({ name: 'sensitivity', type: 'float' })
  sensitivity!: number;

  @Column({ name: 'cone_mass', type: 'float' })
  coneMass!: number;

  @Column({ name: 'suspension_compliance', type: 'float' })
  suspensionCompliance!: number;

  @Column({ name: 'force_factor', type: 'float' })
  forceFactor!: number;

  @Column({ name: 'kr', type: 'float' })
  kR!: number;

  @Column({ name: 'xr', type: 'float' })
  xR!: number;

  @Column({ name: 'ki', type: 'float' })
  kI!: number;

  @Column({ name: 'xi', type: 'float' })
  xI!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  @OneToOne(() => CabinetTypeormEntity, (cabinet) => cabinet.impedance)
  @JoinColumn()
  cabinet!: CabinetTypeormEntity;

  toDomain(): Impedance {
    return new Impedance({
      uid: this.uid,
      pistonDiameter: this.pistonDiameter,
      resonanceFrequency: this.resonanceFrequency,
      dcResistance: this.dcResistance,
      acResistance: this.acResistance,
      mechanicalDamping: this.mechanicalDamping,
      electricalDamping: this.electricalDamping,
      totalDamping: this.totalDamping,
      equivalenceCompliance: this.equivalenceCompliance,
      voiceCoilInductance: this.voiceCoilInductance,
      efficiency: this.efficiency,
      sensitivity: this.sensitivity,
      coneMass: this.coneMass,
      suspensionCompliance: this.suspensionCompliance,
      forceFactor: this.forceFactor,
      kR: this.kR,
      xR: this.xR,
      kI: this.kI,
      xI: this.xI,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  static fromDomain(impedance: Impedance): ImpedanceTypeormEntity {
    const entity = new ImpedanceTypeormEntity();
    entity.pistonDiameter = impedance.pistonDiameter;
    entity.resonanceFrequency = impedance.resonanceFrequency;
    entity.dcResistance = impedance.dcResistance;
    entity.acResistance = impedance.acResistance;
    entity.mechanicalDamping = impedance.mechanicalDamping;
    entity.electricalDamping = impedance.electricalDamping;
    entity.totalDamping = impedance.totalDamping;
    entity.equivalenceCompliance = impedance.equivalenceCompliance;
    entity.voiceCoilInductance = impedance.voiceCoilInductance;
    entity.efficiency = impedance.efficiency;
    entity.sensitivity = impedance.sensitivity;
    entity.coneMass = impedance.coneMass;
    entity.suspensionCompliance = impedance.suspensionCompliance;
    entity.forceFactor = impedance.forceFactor;
    entity.kR = impedance.kR;
    entity.xR = impedance.xR;
    entity.kI = impedance.kI;
    entity.xI = impedance.xI;
    return entity;
  }
}
