import { DomainEntity, EntityProps } from '../../../shared/domain/entity';

export interface ImpedanceProps {
  pistonDiameter: number;
  resonanceFrequency: number;
  dcResistance: number;
  acResistance: number;
  mechanicalDamping: number;
  electricalDamping: number;
  totalDamping: number;
  equivalenceCompliance: number;
  voiceCoilInductance: number;
  efficiency: number;
  sensitivity: number;
  coneMass: number;
  suspensionCompliance: number;
  forceFactor: number;
  kR: number;
  xR: number;
  kI: number;
  xI: number;
  userId: number;
  driverId: number;
  cabinetId: number;
}

export class Impedance extends DomainEntity {
  readonly pistonDiameter: number;
  readonly resonanceFrequency: number;
  readonly dcResistance: number;
  readonly acResistance: number;
  readonly mechanicalDamping: number;
  readonly electricalDamping: number;
  readonly totalDamping: number;
  readonly equivalenceCompliance: number;
  readonly voiceCoilInductance: number;
  readonly efficiency: number;
  readonly sensitivity: number;
  readonly coneMass: number;
  readonly suspensionCompliance: number;
  readonly forceFactor: number;
  readonly kR: number;
  readonly xR: number;
  readonly kI: number;
  readonly xI: number;
  readonly userId: number;
  readonly driverId: number;
  readonly cabinetId: number;

  constructor(props: ImpedanceProps & EntityProps) {
    super(props);

    this.pistonDiameter = props.pistonDiameter;
    this.resonanceFrequency = props.resonanceFrequency;
    this.dcResistance = props.dcResistance;
    this.acResistance = props.acResistance;
    this.mechanicalDamping = props.mechanicalDamping;
    this.electricalDamping = props.electricalDamping;
    this.totalDamping = props.totalDamping;
    this.equivalenceCompliance = props.equivalenceCompliance;
    this.voiceCoilInductance = props.voiceCoilInductance;
    this.efficiency = props.efficiency;
    this.sensitivity = props.sensitivity;
    this.coneMass = props.coneMass;
    this.suspensionCompliance = props.suspensionCompliance;
    this.forceFactor = props.forceFactor;
    this.kR = props.kR;
    this.xR = props.xR;
    this.kI = props.kI;
    this.xI = props.xI;
    this.userId = props.userId;
    this.driverId = props.driverId;
    this.cabinetId = props.cabinetId;
  }
}
