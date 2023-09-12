import type {
  LONG_ENGLISH_DAYS_OF_WEEK,
  SHORT_ENGLISH_DAYS_OF_WEEK,
  KOREAN_DAYS_OF_WEEK,
} from '@constants/congestion';

export type EnglishDaysOfWeekShortName = (typeof SHORT_ENGLISH_DAYS_OF_WEEK)[number];
export type EnglishDaysOfWeekLongName = (typeof LONG_ENGLISH_DAYS_OF_WEEK)[number];
export type KoreanDaysOfWeek = (typeof KOREAN_DAYS_OF_WEEK)[number];

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
