import type { StationSummary } from '@type';

const cachedStationSummaries = new Map<string, StationSummary>();
export const cachedStationSummariesActions = {
  add: (stationSummaries: StationSummary[]) => {
    console.log(`before: ${cachedStationSummaries.size}`);

    stationSummaries.forEach((stationSummary) => {
      cachedStationSummaries.set(stationSummary.stationId, stationSummary);
    });

    console.log(`after: ${cachedStationSummaries.size}`);
  },
  get: () => {
    return Array.from(cachedStationSummaries.values());
  },
  clear: (stationIds: string[]) => {
    stationIds.forEach((stationId) => cachedStationSummaries.delete(stationId));
  },
  has: (stationId: string) => {
    return cachedStationSummaries.has(stationId);
  },
};
