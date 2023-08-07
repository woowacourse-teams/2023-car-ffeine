import type { COMPANY_NAME } from '@constants/chargers';

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

export type StationSummary = Pick<
  Station,
  | 'address'
  | 'availableCount'
  | 'chargers'
  | 'companyName'
  | 'detailLocation'
  | 'isParkingFree'
  | 'isPrivate'
  | 'latitude'
  | 'longitude'
  | 'operatingTime'
  | 'stationId'
  | 'stationName'
  | 'totalCount'
>;

export type StationDetails = Pick<
  Station,
  | 'address'
  | 'chargers'
  | 'companyName'
  | 'contact'
  | 'detailLocation'
  | 'isParkingFree'
  | 'isPrivate'
  | 'latitude'
  | 'longitude'
  | 'operatingTime'
  | 'privateReason'
  | 'reportCount'
  | 'stationId'
  | 'stationName'
  | 'stationState'
>;

export type Coordinates = Pick<Station, 'latitude' | 'longitude'>;

export interface DisplayPosition extends Coordinates {
  longitudeDelta: number;
  latitudeDelta: number;
}

export type CompanyName = (typeof COMPANY_NAME)[keyof typeof COMPANY_NAME];
