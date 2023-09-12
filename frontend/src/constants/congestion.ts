export const KOREAN_DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'] as const;
export const SHORT_ENGLISH_DAYS_OF_WEEK = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
] as const;
export const LONG_ENGLISH_DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;
export const ENGLISH_DAYS_TO_KOREAN_DAYS = Object.fromEntries(
  SHORT_ENGLISH_DAYS_OF_WEEK.map((day, index) => [day, KOREAN_DAYS_OF_WEEK[index]])
);
export const ENGLISH_DAYS_OF_WEEK_SHORT_TO_LONG = Object.fromEntries(
  SHORT_ENGLISH_DAYS_OF_WEEK.map((day, index) => [day, LONG_ENGLISH_DAYS_OF_WEEK[index]])
);

/**
 * 혼잡도 정보(RATIO)가 DB에 존재하지 않을 경우
 */
export const NO_RATIO = -1;
