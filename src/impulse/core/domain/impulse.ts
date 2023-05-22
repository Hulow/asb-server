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
  userId: number;
  driverId: number;
  cabinetId: number;
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
  readonly userId: number;
  readonly driverId: number;
  readonly cabinetId: number;
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
    this.userId = props.userId;
    this.driverId = props.driverId;
    this.cabinetId = props.cabinetId;
  }
}
