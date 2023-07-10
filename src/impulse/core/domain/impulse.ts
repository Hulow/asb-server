import { DomainEntity, EntityProps } from '../../../shared/domain/entity';

export interface ImpulseProps {
  measuredBy: string;
  note: string;
  source: string;
  measuredAt: string;
  sweepLength: string;
  responseWindow: string;
  sampleInterval: string;
  measurements: ImpulseResponse[];
  cabinetUid: string;
}

export interface ImpulseResponse {
  response: number;
  time: number;
}
export class Impulse extends DomainEntity {
  readonly measuredBy: string;
  readonly note: string;
  readonly source: string;
  readonly measuredAt: string;
  readonly sweepLength: string;
  readonly responseWindow: string;
  readonly sampleInterval: string;
  readonly measurements: ImpulseResponse[];
  readonly cabinetUid: string;
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
    this.cabinetUid = props.cabinetUid;
  }
}
