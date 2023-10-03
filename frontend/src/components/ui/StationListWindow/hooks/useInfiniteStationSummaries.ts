import { useEffect } from 'react';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { fetchStationSummaries } from '@hooks/fetch/fetchStationSummaries';

import { cachedStationSummariesActions } from '@ui/StationListWindow/tools/cachedStationSummaries';

import { QUERY_KEY_STATION_SUMMARIES } from '@constants/queryKeys';

import type { StationMarker, StationSummary } from '@type';

export interface StationSummaryResponse {
  stations: StationSummary[];
  nextPage: number;
}

const makeStationIdsChunks = (markers: StationMarker[]) => {
  return markers
    .filter((marker) => !cachedStationSummariesActions.has(marker.stationId))
    .reduce((acc: string[][], marker, index) => {
      const REQUEST_CHUNK_SIZE = 10;
      const chunkIndex = Math.floor(index / REQUEST_CHUNK_SIZE);

      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }

      acc[chunkIndex].push(marker.stationId);

      return acc;
    }, []);
};

export const useInfiniteStationSummaries = (markers: StationMarker[]) => {
  const queryClient = useQueryClient();
  const stationIdChunks = makeStationIdsChunks(markers);

  useEffect(() => {
    queryClient.removeQueries([QUERY_KEY_STATION_SUMMARIES]);
  }, [markers]);

  return useInfiniteQuery<StationSummaryResponse>(
    [QUERY_KEY_STATION_SUMMARIES],
    async ({ pageParam = 0 }) => {
      const stationIds = stationIdChunks[pageParam] ?? [];

      if (stationIds.length > 0) {
        const stationSummaries = await fetchStationSummaries(stationIds);
        cachedStationSummariesActions.add(stationSummaries);
        return { stations: stationSummaries, nextPage: pageParam + 1 };
      } else {
        return { stations: [], nextPage: -1 };
      }
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage > 0 ? lastPage.nextPage : undefined;
      },
      refetchOnWindowFocus: false,
    }
  );
};
