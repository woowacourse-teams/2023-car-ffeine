export type CapacityType = 3 | 7 | 50 | 100 | 200;
export type ChargerStateType =
  | 'AVAILABLE'
  | 'COMMUNICATION_ERROR'
  | 'STANDBY'
  | 'CHARGING_IN_PROGRESS'
  | 'OPERATION_SUSPENDED'
  | 'UNDER_INSPECTION'
  | 'STATUS_UNKNOWN';
export type ChargerMethodType = '단독' | '동시' | null;

export interface ChargerSummary {
  type: string;
  price: number;
  capacity: CapacityType;
}

export interface ChargerDetails extends ChargerSummary {
  latestUpdateTime: Date | null;
  state: ChargerStateType;
  method: ChargerMethodType;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Station extends Coordinates {
  stationId: number;
  stationName: string;
  companyName: string;
  isParkingFree: boolean;
  operatingTime: string | null;
  detailLocation: string | null;
  address: string;
  isPrivate: boolean;
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
}

export interface MockStation extends StationDetails, ChargerCount {}

export interface DisplayPosition extends Coordinates {
  longitudeDelta: number;
  latitudeDelta: number;
}
