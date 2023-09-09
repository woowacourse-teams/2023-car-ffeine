import type { CAPACITIES, CONNECTOR_TYPES } from '@constants/chargers';
import type { CHARGER_STATES } from '@constants/chargers';

import type { ConnectorTypeKey } from './serverStationFilter';

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
  state: keyof typeof CHARGER_STATES;
  method: ChargerMethodType;
}
