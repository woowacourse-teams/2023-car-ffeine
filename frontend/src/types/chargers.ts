import type { CAPACITIES, CONNECTOR_TYPES } from '@constants/chargers';

import type { ConnectorTypeKey } from './serverStationFilter';

export type ChargerStateType =
  | 'COMMUNICATION_ERROR'
  | 'STANDBY'
  | 'CHARGING_IN_PROGRESS'
  | 'OPERATION_SUSPENDED'
  | 'UNDER_INSPECTION'
  | 'STATUS_UNKNOWN';

export type ChargerMethodType = '단독' | '동시' | null;
export type ConnectorTypeName = (typeof CONNECTOR_TYPES)[ConnectorTypeKey];
export type Capacity = (typeof CAPACITIES)[number];

export interface ChargerSummary {
  type: ConnectorTypeKey;
  price: number;
  capacity: Capacity;
}

export interface ChargerDetails extends ChargerSummary {
  latestUpdateTime: string | null;
  state: ChargerStateType;
  method: ChargerMethodType;
}
