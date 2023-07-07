import { inject, injectable } from 'inversify';

import { Impedance } from '../../domain/impedance';
import { RegisterImpedanceInput, RegisterImpedanceInputPort } from '../ports/in/register-impedance.input-port';
import {
  ImpedanceRepositoryOutputPort,
  IMPEDANCE_REPOSITORY_OUTPUT_PORT,
} from '../ports/out/impedance-repository.output-port';

@injectable()
export class RegisterImpedanceService implements RegisterImpedanceInputPort {
  constructor(
    @inject(IMPEDANCE_REPOSITORY_OUTPUT_PORT) private readonly impedanceRepository: ImpedanceRepositoryOutputPort,
  ) {}

  async handler(input: RegisterImpedanceInput): Promise<Impedance> {
    console.log(input);
    const impedance = new Impedance({
      pistonDiameter: 1,
      resonanceFrequency: 1,
      dcResistance: 1,
      acResistance: 1,
      mechanicalDamping: 1,
      electricalDamping: 1,
      totalDamping: 1,
      equivalenceCompliance: 1,
      voiceCoilInductance: 1,
      efficiency: 1,
      sensitivity: 1,
      coneMass: 1,
      suspensionCompliance: 1,
      forceFactor: 1,
      kR: 1,
      xR: 1,
      kI: 1,
      xI: 1,
    });
    await this.impedanceRepository.save(impedance);
    return impedance;
  }
}
