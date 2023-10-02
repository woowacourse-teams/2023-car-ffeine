import { useEffect } from 'react';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { fetchStationSummaries } from '@hooks/fetch/fetchStationSummaries';

import { cachedStationSummariesActions } from '@ui/StationListWindow/tools/cachedStationSummaries';

import type { StationMarker, StationSummary } from '@type';

interface StationSummaryResponse {
  stations: StationSummary[];
  nextPage: number;
}

const makeStationIdsChunks = (markers: StationMarker[]) => {
  return markers.reduce((acc: string[][], marker, index) => {
    const REQUEST_CHUNK_SIZE = 10;
    const chunkIndex = Math.floor(index / REQUEST_CHUNK_SIZE);

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }

    acc[chunkIndex].push(marker.stationId);

    return acc;
  }, []);
};

export const useFetchStationSummaries = (markers: StationMarker[]) => {
  const queryClient = useQueryClient();
  const stationIdChunks = makeStationIdsChunks(markers);

  useEffect(() => {
    console.log(markers.length);
    queryClient.removeQueries(['stationSummaries']);
  }, [markers]);

  return useInfiniteQuery<StationSummaryResponse>(
    ['stationSummaries'],
    async ({ pageParam = 0 }) => {
      const stationIds = stationIdChunks[pageParam] ?? [];
      const uncachedStationSummaryIds = stationIds.filter(
        (stationId) => !cachedStationSummariesActions.has(stationId)
      );

      if (uncachedStationSummaryIds.length > 0) {
        const stationSummaries = await fetchStationSummaries(uncachedStationSummaryIds);
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
