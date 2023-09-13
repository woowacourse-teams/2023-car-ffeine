import type { StationSummary } from '@type';

const cachedStationSummaries = new Map<string, StationSummary>();
export const cachedStationSummariesActions = {
  add: (stationSummaries: StationSummary[]) => {
    stationSummaries.forEach((stationSummary) => {
      cachedStationSummaries.set(stationSummary.stationId, stationSummary);
    });
  },
  get: (stationIds: string[]) => {
    return stationIds.map((stationId) => cachedStationSummaries.get(stationId));
  },
  clear: (stationIds: string[]) => {
    stationIds.forEach((stationId) => cachedStationSummaries.delete(stationId));
  },
  has: (stationId: string) => {
    return cachedStationSummaries.has(stationId);
  },
  getAll: () => {
    return cachedStationSummaries;
  }
};
