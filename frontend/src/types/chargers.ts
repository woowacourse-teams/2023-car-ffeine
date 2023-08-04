import type { CAPACITIES, CHARGER_TYPES } from '@constants/chargers';

export type CapacityType = 3 | 7 | 50 | 100 | 200;
export type ChargerStateType =
  | 'COMMUNICATION_ERROR'
  | 'STANDBY'
  | 'CHARGING_IN_PROGRESS'
  | 'OPERATION_SUSPENDED'
  | 'UNDER_INSPECTION'
  | 'STATUS_UNKNOWN';

export type ChargerMethodType = '단독' | '동시' | null;
export type ChargerType = keyof typeof CHARGER_TYPES;
export type Capacity = (typeof CAPACITIES)[number];

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
