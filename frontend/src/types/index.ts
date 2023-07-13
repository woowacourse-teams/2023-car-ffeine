export type ChargerType = '완속' | '급속';
export type CapacityType = 3 | 7 | 50 | 100 | 200;

export interface Charger {
  type: ChargerType;
  price: number;
  capacity: CapacityType;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Station extends Coordinates {
  stationId: number;
  stationName: string;
  companyName: string;
  chargers: Charger[];
  isParkingFree: boolean;
  operatingTime: string;
  detailLocation: string;
  isPrivate: boolean;
  totalCount: number;
  availableCount: number;
}

export interface DisplayPosition extends Coordinates {
  longitudeDelta: number;
  latitudeDelta: number;
}
