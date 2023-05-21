import { DomainEntity, EntityProps } from '../../../shared/domain/entity';

export interface FrequencyProps {
  measuredBy: string;
  measuredFrom: string;
  sampling: string;
  measuredAt: Date;
  frequencyWeightings: string;
  targetLevel: number;
  measurementNote: string;
  smoothing: string;
  measurements: object;
  userId: number;
  driverId: number;
  cabinetId: number;
}

export class Frequency extends DomainEntity {
  readonly measuredBy: string;
  readonly measuredFrom: string;
  readonly sampling: string;
  readonly measuredAt: Date;
  readonly frequencyWeightings: string;
  readonly targetLevel: number;
  readonly measurementNote: string;
  readonly smoothing: string;
  readonly measurements: object;
  readonly userId: number;
  readonly driverId: number;
  readonly cabinetId: number;

  constructor(props: FrequencyProps & EntityProps) {
    super(props);

    this.measuredBy = props.measuredBy;
    this.measuredFrom = props.measuredFrom;
    this.sampling = props.sampling;
    this.measuredAt = props.measuredAt;
    this.frequencyWeightings = props.frequencyWeightings;
    this.targetLevel = props.targetLevel;
    this.measurementNote = props.measurementNote;
    this.smoothing = props.smoothing;
    this.measurements = props.measurements;
    this.userId = props.userId;
    this.driverId = props.driverId;
    this.cabinetId = props.cabinetId;
  }
}
