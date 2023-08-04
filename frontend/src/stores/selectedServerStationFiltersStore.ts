import { store } from '@utils/external-state';

import type { CAPACITIES, CHARGER_TYPES, COMPANY_NAME } from '@constants/chargers';

export const selectedCompanyNamesFilterStore = store<
  (typeof COMPANY_NAME)[keyof typeof COMPANY_NAME][]
>([]);
export const selectedChargerTypesFilterStore = store<(keyof typeof CHARGER_TYPES)[]>([]);
export const selectedCapacitiesFilterStore = store<(typeof CAPACITIES)[number][]>([]);
