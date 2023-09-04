import { css } from 'styled-components';

import { useStationMarkers } from '@hooks/tanstack-query/station-markers/useStationMarkers';
import { useStationSummaries } from '@hooks/tanstack-query/station-markers/useStationSummaries';

import List from '@common/List';

import EmptyStationsNotice from '@ui/StationList/EmptyStationsNotice';
import StationSummaryCardSkeleton from '@ui/StationList/StationSummaryCardSkeleton';

import { MOBILE_BREAKPOINT } from '@constants';

import StationSummaryCard from './StationSummaryCard';

const StationList = () => {
  const {
    data: filteredMarkers,
    isSuccess: isFilteredMarkersSuccess,
    isLoading: isFilteredMarkersLoading,
  } = useStationMarkers();

  const {
    data: stationSummaries,
    isSuccess,
    isLoading,
  } = useStationSummaries(filteredMarkers ?? []);

  if (isFilteredMarkersLoading || isLoading) {
    return (
      <List css={searchResultList}>
        {Array.from({ length: 10 }, (_, index) => (
          <StationSummaryCardSkeleton key={index} />
        ))}
      </List>
    );
  }

  return (
    isSuccess &&
    isFilteredMarkersSuccess && (
      <List css={searchResultList}>
        {stationSummaries.length > 0 ? (
          stationSummaries.map((stationSummary) => (
            <StationSummaryCard key={stationSummary.stationId} station={stationSummary} />
          ))
        ) : (
          <EmptyStationsNotice />
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
