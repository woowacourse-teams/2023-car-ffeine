export type ChargerType = '완속' | '급속';
export type CapacityType = 3 | 7 | 50 | 100 | 200;

export interface Charger {
  type: ChargerType;
  price: number;
  capacity: CapacityType;
}

export interface Station {
  stationId: number;
  stationName: string;
  companyName: string;
  chargers: Charger[];
  isParkingFree: boolean;
  operatingTime: string;
  detailLocation: string;
  latitude: number;
  longitude: number;
  isPrivate: boolean;
  totalCount: number;
  availableCount: number;
}

export interface DisplayPosition {
  longitude: number;
  latitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
}
