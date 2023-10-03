const ERROR_PREFIX = '[error]';

export const ERROR_MESSAGES = {
  NO_STATION_FOUND: `${ERROR_PREFIX} 해당 충전소가 존재하지 않습니다.`,
  STATION_DETAILS_FETCH_ERROR: `${ERROR_PREFIX} 충전소 세부 정보를 불러올 수 없습니다.`,
  STATION_STATISTICS_FETCH_ERROR: `${ERROR_PREFIX} 충전소 혼잡도 통계를 불러올 수 없습니다.`,
  NO_SEARCH_RESULT: `${ERROR_PREFIX} 검색 결과가 없습니다.`,
} as const;
