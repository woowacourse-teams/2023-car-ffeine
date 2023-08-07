import type { Capacity, ChargerMethodType, ChargerStateType } from '@type/chargers';

export interface Charger {
  capacity: Capacity;
  latestUpdateTime: string;
  method: ChargerMethodType;
  price: number;
  state: ChargerStateType;
  type: ChargerMethodType;
}

export interface Station {
  address: string;
  availableCount: number;
  chargers: Charger[];
  companyName: string;
  contact: string;
  detailLocation: string;
  isParkingFree: boolean;
  isPrivate: boolean;
  latitude: number;
  longitude: number;
  operatingTime: string;
  privateReason: string;
  reportCount: number;
  stationId: number;
  stationName: string;
  stationState: string;
  totalCount: number;
}
