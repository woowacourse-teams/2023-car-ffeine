import type { CHARGING_SPEED } from '@constants/chargers';

import type { Coordinates } from '@type/stations';

import type { ChargerDetails, ChargerSummary } from './chargers';

export interface MockStation extends StationDetails, ChargerCount {}

export interface StationDetails extends Station {
  contact: string | null;
  chargers: ChargerDetails[];
  stationState: string | null;
  privateReason: string | null;
  reportCount: number;
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

export interface SearchedStation extends StationKeyInfo, Coordinates {
  speed: keyof typeof CHARGING_SPEED;
}

export interface StationPosition extends Coordinates, StationId {}

export type StationDetailsWithoutChargers = Omit<StationDetails, 'chargers'>;
