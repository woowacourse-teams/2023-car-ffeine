import { store } from '@utils/external-state';

import type { CAPACITIES, CHARGER_TYPES, COMPANY_NAME } from '@constants/chargers';

export const selectedCompaniesFilterStore = store<Set<keyof typeof COMPANY_NAME>>(new Set([]));
export const selectedChargerTypesFilterStore = store<Set<keyof typeof CHARGER_TYPES>>(new Set([]));
export const selectedCapacitiesFilterStore = store<Set<`${(typeof CAPACITIES)[number]}.00`>>(
  new Set([])
);
