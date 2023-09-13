import { useEffect, useState } from 'react';

import { fetchStationSummaries } from '@hooks/fetch/fetchStationSummaries';

import type { StationMarker, StationSummary } from '@type';

import { cachedStationSummariesActions } from '../tools/cachedStationSummaries';

const makeStationIdsChunks = (filteredMarkers: StationMarker[]) => {
  return filteredMarkers.reduce((acc: string[][], marker, index) => {
    const REQUEST_CHUNK_SIZE = 10;
    const chunkIndex = Math.floor(index / REQUEST_CHUNK_SIZE);

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }

    acc[chunkIndex].push(marker.stationId);

    return acc;
  }, []);
};

export const useStationSummaries = (markers: StationMarker[]) => {
  const stationIdChunks = makeStationIdsChunks(markers);

  const [page, setPage] = useState(0);
  const [stationSummaries, setStationSummaries] = useState<StationSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPage(0);
    loadStationSummaries(0);
  }, [markers]);

  useEffect(() => {
    loadStationSummaries(page);
  }, [page]);

  const loadStationSummaries = (page: number) => {
    const stationIds = stationIdChunks[page] ?? [];

    if (stationIds.length > 0) {
      setIsLoading(true);
      fetchStationSummaries(stationIds).then((stationSummaries) => {
        cachedStationSummariesActions.add(stationSummaries);
        console.log(cachedStationSummariesActions.getAll());
        setStationSummaries((prev) =>
          page === 0 ? stationSummaries : [...prev, ...stationSummaries]
        );
        setIsLoading(false);
      });
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const hasNextPage = stationIdChunks[page + 1] !== undefined;

  return { isLoading, stationSummaries, loadMore, hasNextPage };
};
