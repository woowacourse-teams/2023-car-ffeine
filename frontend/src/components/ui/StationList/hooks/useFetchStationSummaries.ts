import { useEffect, useState } from 'react';

import { fetchStationSummaries } from '@hooks/fetch/fetchStationSummaries';

import type { StationMarker } from '@type';

import { cachedStationSummariesActions } from '../tools/cachedStationSummaries';

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
  const stationIdChunks = makeStationIdsChunks(markers);

  const [page, setPage] = useState(0);
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
    const uncachedStationSummaryIds = stationIds.filter(
      (stationId) => !cachedStationSummariesActions.has(stationId)
    );

    if (uncachedStationSummaryIds.length > 0) {
      setIsLoading(true);
      fetchStationSummaries(uncachedStationSummaryIds).then((stationSummaries) => {
        cachedStationSummariesActions.add(stationSummaries);
        console.log(cachedStationSummariesActions.get());
        setIsLoading(false);
      });
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const unknownMarkers = markers.filter(
    (marker) => !cachedStationSummariesActions.has(marker.stationId)
  );
  const hasNextPage = unknownMarkers.length > 0;

  return { isLoading, loadMore, hasNextPage };
};
