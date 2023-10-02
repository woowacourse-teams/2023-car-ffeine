import { css } from 'styled-components';

import { useEffect, useRef } from 'react';

import { useStationMarkers } from '@marker/HighZoomMarkerContainer/hooks/useStationMarkers';

import FlexBox from '@common/FlexBox';
import List from '@common/List';
import Text from '@common/Text';

import EmptyStationsNotice from '@ui/StationListWindow/components/EmptyStationsNotice';
import StationListSkeletons from '@ui/StationListWindow/components/StationListSkeletons';
import { cachedStationSummariesActions } from '@ui/StationListWindow/tools/cachedStationSummaries';

import { MOBILE_BREAKPOINT } from '@constants';

import { useInfiniteStationSummaries } from '../hooks/useInfiniteStationSummaries';
import StationSummaryCard from './StationSummaryCard';

const StationList = () => {
  const { data: filteredMarkers } = useStationMarkers();

  const {
    status,
    data,
    isLoading: isStationSummariesLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteStationSummaries(filteredMarkers ?? []);

  const loadMoreElementRef = useRef(null);
  const cachedStationSummaries = cachedStationSummariesActions.get();
  const isStationSummariesEmpty =
    data?.pages[0].stations.length + cachedStationSummaries.length === 0;
  const isEndOfList = data?.pages.length !== 0 && !hasNextPage;
  const isAvailableToFetchNextPage =
    !isStationSummariesLoading && !isFetchingNextPage && hasNextPage;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <List css={searchResultList}>
      {status === 'loading' ? (
        <StationListSkeletons />
      ) : status === 'error' ? (
        <Text variant="caption" align="center">
          Error: {JSON.stringify(error)}
        </Text>
      ) : (
        <>
          {cachedStationSummaries.map((stationSummary) => (
            <StationSummaryCard key={stationSummary.stationId} station={stationSummary} />
          ))}
          {data.pages.map((page) => (
            <div key={JSON.stringify(page.stations.map((station) => station.stationId))}>
              {page.stations.map((stationSummary) => (
                <StationSummaryCard key={stationSummary.stationId} station={stationSummary} />
              ))}
            </div>
          ))}
          {isFetchingNextPage && <StationListSkeletons />}
          {isAvailableToFetchNextPage && <div ref={loadMoreElementRef} />}

          {isStationSummariesEmpty ? ( // 첫 페이지에 아무것도 없을 때
            <EmptyStationsNotice />
          ) : (
            isEndOfList && (
              <FlexBox justifyContent="center" alignItems="center" my={10}>
                <Text>주변의 모든 충전소를 불러왔습니다.</Text>
              </FlexBox>
            )
          )}
        </>
      )}
    </List>
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
