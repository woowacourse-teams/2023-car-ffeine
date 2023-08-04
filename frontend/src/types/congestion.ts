import type { ENGLISH_DAYS, KOREAN_DAYS } from '@constants/congestion';

import type { StationId } from './index';

export type EnglishDaysType = (typeof ENGLISH_DAYS)[number];
export type KoreanDaysType = (typeof KOREAN_DAYS)[number];

export interface Congestion {
  hour: number;
  ratio: number;
}

export interface CongestionStatistics extends StationId {
  congestion: {
    standard?: Record<EnglishDaysType, Congestion[]>;
    quick?: Record<EnglishDaysType, Congestion[]>;
  };
}
