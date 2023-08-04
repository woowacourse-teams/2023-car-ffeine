import type { CAPACITIES, CHARGER_TYPES, CHARGING_SPEED, COMPANY_NAME } from '@constants/chargers';
import type { ENGLISH_DAYS, KOREAN_DAYS } from '@constants/congestion';

export type CapacityType = 3 | 7 | 50 | 100 | 200;
export type ChargerStateType =
  | 'COMMUNICATION_ERROR'
  | 'STANDBY'
  | 'CHARGING_IN_PROGRESS'
  | 'OPERATION_SUSPENDED'
  | 'UNDER_INSPECTION'
  | 'STATUS_UNKNOWN';
export type ChargerMethodType = '단독' | '동시' | null;

export interface ChargerSummary {
  type: ChargerType;
  price: number;
  capacity: CapacityType;
}

export interface ChargerDetails extends ChargerSummary {
  latestUpdateTime: string | null;
  state: ChargerStateType;
  method: ChargerMethodType;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface StationId {
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

export type EnglishDaysType = (typeof ENGLISH_DAYS)[number];
export type KoreanDaysType = (typeof KOREAN_DAYS)[number];

export interface Congestion {
  hour: number;
  ratio: number;
}

export interface CongestionStatistics extends StationId {
  congestion: {
    standard?: Record<EnglishDaysType, Congestion[]>;
    quick?: Record<EnglishDaysType, Congestion[]>;
  };
}

export interface SearchedStation extends StationKeyInfo, Coordinates {
  speed: keyof typeof CHARGING_SPEED;
}

export interface StationPosition extends Coordinates, StationId {}

export interface SearchedStationResponse {
  stations: SearchedStation[];
}
