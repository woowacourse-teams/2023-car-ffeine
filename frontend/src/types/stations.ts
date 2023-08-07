import type { CHARGING_SPEED, COMPANY_NAME } from '@constants/chargers';
import type { CHARGER_TYPES } from '@constants/chargers';

import type { Capacity, ChargerMethodType, ChargerStateType } from '@type/chargers';

export interface Charger {
  capacity: Capacity;
  latestUpdateTime: string;
  method: ChargerMethodType;
  price: number;
  state: ChargerStateType;
  type: keyof typeof CHARGER_TYPES;
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
  stationId: string;
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

export interface DisplayPosition extends Pick<Station, 'latitude' | 'longitude'> {
  longitudeDelta: number;
  latitudeDelta: number;
}

export type CompanyName = (typeof COMPANY_NAME)[keyof typeof COMPANY_NAME];

export interface SearchedStation
  extends Pick<Station, 'stationId' | 'stationName' | 'address' | 'latitude' | 'longitude'> {
  speed: keyof typeof CHARGING_SPEED;
}

export type StationPosition = Pick<Station, 'stationId' | 'longitude' | 'latitude'>;

export type StationDetailsWithoutChargers = Omit<StationDetails, 'chargers'>;
