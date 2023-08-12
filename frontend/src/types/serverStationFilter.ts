import type { CAPACITIES, COMPANIES } from '@constants/chargers';

import type { CONNECTOR_TYPES } from './../constants/chargers';

export type CompanyKey = keyof typeof COMPANIES;
export type CapaCityBigDecimal = `${(typeof CAPACITIES)[number]}.00`;
export type ConnectorTypeKey = keyof typeof CONNECTOR_TYPES;
