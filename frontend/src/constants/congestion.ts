export const KOREAN_DAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;
export const ENGLISH_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;
export const ENGLISH_DAYS_TO_KOREAN_DAYS = Object.fromEntries(
  ENGLISH_DAYS.map((day, index) => [day, KOREAN_DAYS[index]])
);

/**
 * 혼잡도 정보(RATIO)가 DB에 존재하지 않을 경우
 */
export const NO_RATIO = -1;
