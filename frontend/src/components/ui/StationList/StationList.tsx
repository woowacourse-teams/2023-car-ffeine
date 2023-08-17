import { css } from 'styled-components';

import { useStations } from '@hooks/tanstack-query/station-markers/useStations';

import List from '@common/List';

import EmptyStationsNotice from '@ui/StationList/EmptyStationsNotice';
import StationSummaryCardSkeleton from '@ui/StationList/StationSummaryCardSkeleton';

import { MOBILE_BREAKPOINT } from '@constants';

import StationSummaryCard from './StationSummaryCard';

const StationList = () => {
  const { data: stations, isSuccess, isLoading } = useStations();

  if (isLoading) {
    return (
      <List css={searchResultList}>
        {Array.from({ length: 10 }, (_, index) => (
          <StationSummaryCardSkeleton key={index} />
        ))}
      </List>
    );
  }

  return (
    isSuccess && (
      <List css={searchResultList}>
        {stations.length > 0 ? (
          stations.map((station) => (
            <StationSummaryCard key={station.stationId} station={station} />
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
  height: calc(100vh - 15rem);
  border-top: 1.2rem solid var(--lighter-color);
  border-bottom: 3.6rem solid var(--lighter-color);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: var(--lighter-color);
  overflow: auto;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: calc(100vw - 6rem);
  }
`;

export default StationList;
