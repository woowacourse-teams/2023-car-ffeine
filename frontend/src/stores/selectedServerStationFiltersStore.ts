import { store } from '@utils/external-state';

import type { CHARGER_TYPES, CAPACITIES, COMPANY_NAME } from '@constants';

export const selectedCompanyNamesFilterStore = store<
  (typeof COMPANY_NAME)[keyof typeof COMPANY_NAME][]
>([]);
export const selectedChargerTypesFilterStore = store<(keyof typeof CHARGER_TYPES)[]>([]);
export const selectedCapacitiesFilterStore = store<(typeof CAPACITIES)[number][]>([]);
