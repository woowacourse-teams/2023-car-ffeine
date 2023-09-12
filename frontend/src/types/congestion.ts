import type { ENGLISH_DAYS_OF_WEEK_SHORT_NAME, KOREAN_DAYS_OF_WEEK } from '@constants/congestion';

export type EnglishDaysType = (typeof ENGLISH_DAYS_OF_WEEK_SHORT_NAME)[number];
export type KoreanDaysType = (typeof KOREAN_DAYS_OF_WEEK)[number];

export interface Congestion {
  hour: number;
  ratio: number;
}

export interface CongestionStatistics {
  stationId: string;
  congestion: {
    standard: Congestion[];
    quick: Congestion[];
  };
}
