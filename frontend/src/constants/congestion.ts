import { getTypedObjectFromEntries } from '@utils/getTypedObjectFromEntries';

export const SHORT_KOREAN_DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'] as const;
export const SHORT_ENGLISH_DAYS_OF_WEEK = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
] as const;
export const ENGLISH_DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;
export const ENGLISH_DAYS_TO_KOREAN_DAYS = getTypedObjectFromEntries(
  SHORT_ENGLISH_DAYS_OF_WEEK,
  SHORT_KOREAN_DAYS_OF_WEEK
);
export const ENGLISH_DAYS_OF_WEEK_SHORT_TO_FULL = getTypedObjectFromEntries(
  SHORT_ENGLISH_DAYS_OF_WEEK,
  ENGLISH_DAYS_OF_WEEK
);
export const ENGLISH_DAYS_OF_WEEK_FULL_TO_SHORT = Object.fromEntries(
  ENGLISH_DAYS_OF_WEEK.map((day, index) => [day, SHORT_ENGLISH_DAYS_OF_WEEK[index]])
);

/**
 * 혼잡도 정보(RATIO)가 DB에 존재하지 않을 경우
 */
export const NO_RATIO = -1;
