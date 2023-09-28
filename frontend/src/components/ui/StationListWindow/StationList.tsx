import { css } from 'styled-components';

import { useEffect, useRef } from 'react';

import { useStationMarkers } from '@marker/StationMarkersContainer/hooks/useStationMarkers';

import { debounce } from '@utils/debounce';

import FlexBox from '@common/FlexBox';
import List from '@common/List';
import Text from '@common/Text';

import EmptyStationsNotice from '@ui/StationListWindow/EmptyStationsNotice';
import StationSummaryCardSkeleton from '@ui/StationListWindow/StationSummaryCardSkeleton';

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

  const loadMoreElementRef = useRef(null);
  const debouncedLoadMore = debounce(loadMore, 500);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          debouncedLoadMore();
        }
      });
    });

    if (loadMoreElementRef.current) {
      observer.observe(loadMoreElementRef.current);
    }

    return () => {
      if (loadMoreElementRef.current) {
        observer.unobserve(loadMoreElementRef.current);
      }
    };
  }, [loadMore, hasNextPage]);

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
        {hasNextPage ? (
          <div ref={loadMoreElementRef} />
        ) : (
          <FlexBox justifyContent="center" alignItems="center" my={3}>
            <Text>주변의 모든 충전소를 불러왔습니다.</Text>
          </FlexBox>
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
