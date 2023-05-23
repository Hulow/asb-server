import { DomainEntity, EntityProps } from '../../../shared/domain/entity';

export interface FrequencyProps {
  measuredBy: string;
  measuredFrom: string;
  sweepLength: string;
  measuredAt: Date;
  frequencyWeightings: string;
  targetLevel: number;
  note: string;
  smoothing: string;
  measurements: object;
}

export class Frequency extends DomainEntity {
  readonly measuredBy: string;
  readonly measuredFrom: string;
  readonly sweepLength: string;
  readonly measuredAt: Date;
  readonly frequencyWeightings: string;
  readonly targetLevel: number;
  readonly note: string;
  readonly smoothing: string;
  readonly measurements: object;

  constructor(props: FrequencyProps & EntityProps) {
    super(props);

    this.measuredBy = props.measuredBy;
    this.measuredFrom = props.measuredFrom;
    this.sweepLength = props.sweepLength;
    this.measuredAt = props.measuredAt;
    this.frequencyWeightings = props.frequencyWeightings;
    this.targetLevel = props.targetLevel;
    this.note = props.note;
    this.smoothing = props.smoothing;
    this.measurements = props.measurements;
  }
}
