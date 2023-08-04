import type { CAPACITIES, CHARGER_TYPES, CHARGING_SPEED, COMPANY_NAME } from '@constants/chargers';

import type { ChargerDetails, ChargerSummary } from './chargers';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface StationId {
  stationId: number;
}

export interface Station extends Coordinates, StationKeyInfo {
  companyName: string;
  isParkingFree: boolean;
  operatingTime: string | null;
  detailLocation: string | null;
  isPrivate: boolean;
}

export interface StationKeyInfo extends StationId {
  stationName: string;
  address: string;
}

export interface ChargerCount {
  totalCount: number;
  availableCount: number;
}

export interface StationSummary extends Station, ChargerCount {
  chargers: ChargerSummary[];
}

export interface StationDetails extends Station {
  contact: string | null;
  chargers: ChargerDetails[];
  stationState: string | null;
  privateReason: string | null;
  reportCount: number;
}

export interface MockStation extends StationDetails, ChargerCount {}

export interface DisplayPosition extends Coordinates {
  longitudeDelta: number;
  latitudeDelta: number;
}

export type ChargerType = keyof typeof CHARGER_TYPES;
export type CompanyName = (typeof COMPANY_NAME)[keyof typeof COMPANY_NAME];
export type Capacity = (typeof CAPACITIES)[number];

export interface SearchedStation extends StationKeyInfo, Coordinates {
  speed: keyof typeof CHARGING_SPEED;
}

export interface StationPosition extends Coordinates, StationId {}

export interface SearchedStationResponse {
  stations: SearchedStation[];
}
