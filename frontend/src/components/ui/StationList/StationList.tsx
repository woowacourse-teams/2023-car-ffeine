import { css } from 'styled-components';

import React from 'react';

import { useInfiniteStationSummary } from '@hooks/tanstack-query/station-markers/useInfiniteStationSummary';
import { useStations } from '@hooks/tanstack-query/station-markers/useStations';

import ButtonNext from '@common/ButtonNext';
import List from '@common/List';
import Text from '@common/Text';

import ReviewCard from '@ui/StationDetailsWindow/reviews/reviews/ReviewCard';
import ReviewCardsLoading from '@ui/StationDetailsWindow/reviews/reviews/ReviewCardsLoading';
import EmptyStationsNotice from '@ui/StationList/EmptyStationsNotice';
import StationSummaryCardSkeleton from '@ui/StationList/StationSummaryCardSkeleton';

import StationSummaryCard from './StationSummaryCard';

const StationList = () => {
  // const { data: stations, isSuccess, isLoading } = useStations();
  const { status, data, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteStationSummary();

  if (status === 'loading') {
    return (
      <List css={searchResultList}>
        {Array.from({ length: 10 }, (_, index) => (
          <StationSummaryCardSkeleton key={index} />
        ))}
      </List>
    );
  }
  if (status === 'error') {
    return (
      <Text variant="caption" align="center">
        Error: {JSON.stringify(error)}
      </Text>
    );
  }

  const stations = data.pages.map((page) => page.stations).flatMap((foo) => foo);

  return (
    <>
      <List css={searchResultList}>
        {stations.length > 0 ? (
          <>
            {stations.map((station, index) => (
              <StationSummaryCard key={station.stationId + index} station={station} />
            ))}
            <ButtonNext
              size="xs"
              variant="contained"
              onClick={() => fetchNextPage({ pageParam: stations[stations.length - 1].stationId })}
              color="secondary"
              disabled={!hasNextPage || isFetchingNextPage}
              fullWidth
            >
              {isFetchingNextPage
                ? '로딩중...'
                : hasNextPage
                ? '후기 더 보기'
                : '더 이상 후기가 없습니다.'}
              (무한스크롤로 제거 예정)
            </ButtonNext>
          </>
        ) : (
          <EmptyStationsNotice />
        )}
      </List>
    </>
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
`;

export default StationList;
