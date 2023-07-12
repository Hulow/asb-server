import { CabinetsRelationshipOverview } from '../../../domain/cabinet-relationship-overview';

export const GET_CABINETS_RELATIONSHIP_OVERVIEW_INPUT_PORT = Symbol.for('GetCabinetsRelationshipOverviewInputPort');

export interface GetCabinetsRelationshipOverviewInputPort {
  handler: () => Promise<CabinetsRelationshipOverview>;
}
