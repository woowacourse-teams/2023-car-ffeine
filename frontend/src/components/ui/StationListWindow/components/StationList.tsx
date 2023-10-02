import { css } from 'styled-components';

import { useEffect, useRef } from 'react';

import { useStationMarkers } from '@marker/HighZoomMarkerContainer/hooks/useStationMarkers';

import { debounce } from '@utils/debounce';

import FlexBox from '@common/FlexBox';
import List from '@common/List';
import Loader from '@common/Loader';
import Text from '@common/Text';

import EmptyStationsNotice from '@ui/StationListWindow/components/EmptyStationsNotice';
import StationSummaryCardSkeleton from '@ui/StationListWindow/components/StationSummaryCardSkeleton';

import { MOBILE_BREAKPOINT } from '@constants';

import { useFetchStationSummaries } from '../hooks/useFetchStationSummaries';
import { cachedStationSummariesActions } from '../tools/cachedStationSummaries';
import StationSummaryCard from './StationSummaryCard';

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

  if (
    filteredMarkers === undefined &&
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
        {cachedStationSummaries.length === 0 && isStationSummariesLoading && (
          <>
            {Array.from({ length: 10 }, (_, index) => (
              <StationSummaryCardSkeleton key={index} />
            ))}
          </>
        )}
        {!isStationSummariesLoading && hasNextPage && (
          <div ref={loadMoreElementRef}>
            <FlexBox justifyContent="center" alignItems="center" my={10}>
              <Loader size="xxl" />
            </FlexBox>
          </div>
        )}
        {!hasNextPage && (
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
