import { DomainEntity, EntityProps } from '../../../shared/domain/entity';

export interface ImpulseProps {
  measuredBy: string;
  note: string;
  source: string;
  measuredAt: string;
  sweepLength: string;
  responseWindow: string;
  measurements: ImpulseGraph[];
  peakValueBeforeInitialization: string;
  peakIndex: string;
  responseLength: string;
  sampleInterval: string;
  startTime: string;
  cabinetUid: string;
}

export interface ImpulseGraph {
  dbfs: number;
  time: number;
}
export class Impulse extends DomainEntity {
  readonly measuredBy: string;
  readonly note: string;
  readonly source: string;
  readonly measuredAt: string;
  readonly sweepLength: string;
  readonly responseWindow: string;
  readonly measurements: ImpulseGraph[];
  readonly peakValueBeforeInitialization: string;
  readonly peakIndex: string;
  readonly responseLength: string;
  readonly sampleInterval: string;
  readonly startTime: string;
  readonly cabinetUid: string;
  constructor(props: ImpulseProps & EntityProps) {
    super(props);

    this.measuredBy = props.measuredBy;
    this.note = props.note;
    this.source = props.source;
    this.measuredAt = props.measuredAt;
    this.sweepLength = props.sweepLength;
    this.responseWindow = props.responseWindow;
    this.measurements = props.measurements;
    this.cabinetUid = props.cabinetUid;
    this.peakValueBeforeInitialization = props.peakValueBeforeInitialization;
    this.peakIndex = props.peakIndex;
    this.responseLength = props.responseLength;
    this.sampleInterval = props.sampleInterval;
    this.startTime = props.startTime;
  }
}
