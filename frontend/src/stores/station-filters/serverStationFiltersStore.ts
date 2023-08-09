import { store } from '@utils/external-state';

import type { CAPACITIES, CHARGER_TYPES, COMPANY_NAME } from '@constants/chargers';

export const selectedCompanyNamesFilterStore = store<(keyof typeof COMPANY_NAME)[]>([]);
export const selectedChargerTypesFilterStore = store<(keyof typeof CHARGER_TYPES)[]>([]);
export const selectedCapacitiesFilterStore = store<`${(typeof CAPACITIES)[number]}.00`[]>([]);
