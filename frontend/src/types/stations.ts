import type { CHARGING_SPEED, COMPANIES } from '@constants/chargers';
import type { CONNECTOR_TYPES } from '@constants/chargers';

import type { Capacity, ChargerMethodType, ChargerStateType } from '@type/chargers';

import type { CapaCityBigDecimal, CompanyKey, ConnectorTypeKey } from './serverStationFilter';

export interface Charger {
  capacity: Capacity;
  latestUpdateTime: string;
  method: ChargerMethodType;
  price: number;
  state: ChargerStateType;
  type: keyof typeof CONNECTOR_TYPES;
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

export type CompanyName = (typeof COMPANIES)[CompanyKey];

export interface SearchedStation
  extends Pick<Station, 'stationId' | 'stationName' | 'address' | 'latitude' | 'longitude'> {
  speed: keyof typeof CHARGING_SPEED;
}

export type StationPosition = Pick<Station, 'stationId' | 'longitude' | 'latitude'>;

export type StationDetailsWithoutChargers = Omit<StationDetails, 'chargers'>;

export interface StationRatings {
  totalRatings: number;
  totalCount: number;
}

export interface Review {
  reviewId: number;
  memberId: number;
  latestUpdateDate: string;
  ratings: number;
  content: string;
  isUpdated: boolean;
  isDeleted: boolean;
  replies: Reply[];
}

export interface Reply {
  replyId: number;
  userId: number;
  latestUpdateDate: string;
  content: string;
  isUpdated: boolean;
  isDeleted: boolean;
}

export interface StationFilters {
  companies: CompanyKey[];
  connectorTypes: ConnectorTypeKey[];
  capacities: CapaCityBigDecimal[];
}
