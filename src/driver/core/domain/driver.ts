import { DomainEntity, EntityProps } from '../../../shared/domain/entity';

export interface DriverProps {
  brandName: string;
  productName: string;
  driverType: string;
  manufacturingYear: number;
  nominalDiameter: number;
  nominalImpedance: number;
  continuousPowerHandling: number;
}

export class Driver extends DomainEntity {
  readonly brandName: string;
  readonly productName: string;
  readonly driverType: string;
  readonly manufacturingYear: number;
  readonly nominalDiameter: number;
  readonly nominalImpedance: number;
  readonly continuousPowerHandling: number;

  constructor(props: DriverProps & EntityProps) {
    super(props);

    this.brandName = props.brandName;
    this.productName = props.driverType;
    this.driverType = props.driverType;
    this.manufacturingYear = props.manufacturingYear;
    this.nominalDiameter = props.nominalDiameter;
    this.nominalImpedance = props.nominalImpedance;
    this.continuousPowerHandling = props.continuousPowerHandling;
  }
}
