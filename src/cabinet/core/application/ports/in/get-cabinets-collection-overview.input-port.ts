import { CabinetsCollectionOverview } from '../../../domain/cabinet-collection-overview';

export const GET_CABINETS_COLLECTION_OVERVIEW_INPUT_PORT = Symbol.for('GetCabinetsCollectionOverviewInputPort');

export interface GetCabinetsCollectionOverviewInputPort {
  handler: () => Promise<CabinetsCollectionOverview>;
}
