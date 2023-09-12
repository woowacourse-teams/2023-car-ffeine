import type {
  ENGLISH_DAYS_OF_WEEK_LONG_NAME,
  ENGLISH_DAYS_OF_WEEK_SHORT_NAME,
  KOREAN_DAYS_OF_WEEK,
} from '@constants/congestion';

export type EnglishDaysOfWeekShortName = (typeof ENGLISH_DAYS_OF_WEEK_SHORT_NAME)[number];
export type EnglishDaysOfWeekLongName = (typeof ENGLISH_DAYS_OF_WEEK_LONG_NAME)[number];
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
