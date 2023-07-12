export interface CabinetsRelationshipOverview {
  cabinetsLength: number;
  cabinets: CabinetRelationshipOverview[];
}

export interface CabinetRelationshipOverview {
  cabinet: CabinetOverview;
  owner: OwnerOverview;
  drivers: DriverOverview[];
}

export interface CabinetOverview {
  cabinetUid: string;
  brandName: string;
  productName: string;
  enclosureType: string;
}

export interface OwnerOverview {
  ownerUid: string;
  ownername: string;
}

export interface DriverOverview {
  driverUid: string;
  brandName: string;
  productName: string;
  driverType: string;
}
