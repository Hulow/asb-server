import { DomainEntity, EntityProps } from '../../../shared/domain/entity';

export interface ImpulseProps {
  measuredBy: string;
  note: string;
  source: string;
  measuredAt: Date;
  sweepLength: string;
  responseWindow: string;
  sampleInterval: string;
  measurements: object;
}

export class Impulse extends DomainEntity {
  readonly measuredBy: string;
  readonly note: string;
  readonly source: string;
  readonly measuredAt: Date;
  readonly sweepLength: string;
  readonly responseWindow: string;
  readonly sampleInterval: string;
  readonly measurements: object;
  constructor(props: ImpulseProps & EntityProps) {
    super(props);

    this.measuredBy = props.measuredBy;
    this.note = props.note;
    this.source = props.source;
    this.measuredAt = props.measuredAt;
    this.sweepLength = props.sweepLength;
    this.responseWindow = props.responseWindow;
    this.sampleInterval = props.sampleInterval;
    this.measurements = props.measurements;
  }
}
