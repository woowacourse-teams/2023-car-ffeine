export const KOREAN_DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'] as const;
export const ENGLISH_DAYS_OF_WEEK_SHORT_NAME = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
] as const;
export const ENGLISH_DAYS_OF_WEEK_FULL_NAME = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;
export const ENGLISH_DAYS_TO_KOREAN_DAYS = Object.fromEntries(
  ENGLISH_DAYS_OF_WEEK_SHORT_NAME.map((day, index) => [day, KOREAN_DAYS_OF_WEEK[index]])
);
export const ENGLISH_DAYS_OF_WEEK_SHORT_TO_LONG = Object.fromEntries(
  ENGLISH_DAYS_OF_WEEK_SHORT_NAME.map((day, index) => [day, ENGLISH_DAYS_OF_WEEK_FULL_NAME[index]])
);

/**
 * 혼잡도 정보(RATIO)가 DB에 존재하지 않을 경우
 */
export const NO_RATIO = -1;
