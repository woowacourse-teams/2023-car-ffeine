import { css } from 'styled-components';

import { useStationMarkers } from '@hooks/tanstack-query/station-markers/useStationMarkers';

import ButtonNext from '@common/ButtonNext';
import List from '@common/List';

import EmptyStationsNotice from '@ui/StationList/EmptyStationsNotice';
import StationSummaryCardSkeleton from '@ui/StationList/StationSummaryCardSkeleton';

import { MOBILE_BREAKPOINT } from '@constants';

import StationSummaryCard from './StationSummaryCard';
import { useFetchStationSummaries } from './hooks/useFetchStationSummaries';
import { cachedStationSummariesActions } from './tools/cachedStationSummaries';

const StationList = () => {
  const {
    data: filteredMarkers,
    isSuccess: isFilteredMarkersSuccess,
    isLoading: isFilteredMarkersLoading,
  } = useStationMarkers();

  const {
    isLoading: isStationSummariesLoading,
    loadMore,
    hasNextPage,
  } = useFetchStationSummaries(filteredMarkers ?? []);

  const cachedStationSummaries = cachedStationSummariesActions.get();

  if (isFilteredMarkersLoading) {
    return (
      <List css={searchResultList}>
        {Array.from({ length: 10 }, (_, index) => (
          <StationSummaryCardSkeleton key={index} />
        ))}
      </List>
    );
  }

  // TODO: 초기에 텅 안보이게 하기
  if (
    isStationSummariesLoading === false &&
    isFilteredMarkersSuccess &&
    cachedStationSummaries.length === 0
  ) {
    return <EmptyStationsNotice />;
  }

  return (
    isFilteredMarkersSuccess && (
      <List css={searchResultList}>
        {cachedStationSummaries.map((stationSummary) => (
          <StationSummaryCard key={stationSummary.stationId} station={stationSummary} />
        ))}
        {isStationSummariesLoading && (
          <>
            {Array.from({ length: 10 }, (_, index) => (
              <StationSummaryCardSkeleton key={index} />
            ))}
          </>
        )}
        {hasNextPage && (
          <ButtonNext onClick={loadMore} fullWidth>
            더 보 기
          </ButtonNext>
        )}
      </List>
    )
  );
};

const searchResultList = css`
  width: 34rem;
  height: calc(100vh - 14.133rem);
  border-top: 1.2rem solid var(--lighter-color);
  border-bottom: 3.6rem solid var(--lighter-color);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: var(--lighter-color);
  overflow: auto;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100%;
    height: 100vh;
  }
`;

export default StationList;
