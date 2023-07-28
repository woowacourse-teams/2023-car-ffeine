import { store } from '@utils/external-state';

import type { Congestion, EnglishDaysType } from 'types';

export const congestionStatisticsStore = store<Record<EnglishDaysType, Congestion[]>>(null);
export const selectedDayStore = store<EnglishDaysType>('MON');
