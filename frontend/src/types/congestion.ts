import type {
  ENGLISH_DAYS_OF_WEEK,
  SHORT_ENGLISH_DAYS_OF_WEEK,
  SHORT_KOREAN_DAYS_OF_WEEK,
} from '@constants/congestion';

export type ShortEnglishDaysOfWeek = (typeof SHORT_ENGLISH_DAYS_OF_WEEK)[number];
export type LongEnglishDaysOfWeek = (typeof ENGLISH_DAYS_OF_WEEK)[number];
export type KoreanDaysOfWeek = (typeof SHORT_KOREAN_DAYS_OF_WEEK)[number];

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
