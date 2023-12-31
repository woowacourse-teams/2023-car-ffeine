import { css } from 'styled-components';

import { useEffect, useRef } from 'react';

import { useStationMarkersQuery } from '@marker/components/SmallMediumDeltaAreaMarkerContainer/hooks/useStationMarkersQuery';

import List from '@common/List';
import Text from '@common/Text';

import StationSummaryCard from '@ui/StationListWindow/StationSummaryCard';

import { MOBILE_BREAKPOINT } from '@constants';

import StationSummaryCardList from './StationSummaryCardList';
import EmptyStationsNotice from './fallbacks/EmptyStationsNotice';
import StationListSkeletons from './fallbacks/StationListSkeletons';
import { useInfiniteStationSummaries } from './hooks/useInfiniteStationSummaries';
import { cachedStationSummariesActions } from './tools/cachedStationSummaries';

const StationList = () => {
  const { data: filteredMarkers } = useStationMarkersQuery();

  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage, error } =
    useInfiniteStationSummaries(filteredMarkers ?? []);

  const loadMoreElementRef = useRef(null);
  const cachedStationSummaries = cachedStationSummariesActions.get();
  const isStationSummaryListEmpty =
    data?.pages[0].stations.length + cachedStationSummaries.length === 0;
  const isEndOfList = data?.pages.length !== 0 && !hasNextPage;
  const canFetchNextPage = !isLoading && !isFetchingNextPage && hasNextPage;

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

  const renderStationSummaryCards = () => {
    if (isLoading) {
      return <StationListSkeletons />;
    }

    if (isError) {
      // TODO: Error handling 추후에 보완
      return (
        <Text variant="caption" align="center">
          Error: {JSON.stringify(error)}
        </Text>
      );
    }

    return (
      <>
        <StationSummaryCardList data={data} />
        {isFetchingNextPage && <StationListSkeletons />}
        {canFetchNextPage && <div ref={loadMoreElementRef} />}

        {isStationSummaryListEmpty ? (
          <EmptyStationsNotice />
        ) : (
          isEndOfList && (
            <Text align="center" my={10}>
              주변의 모든 충전소를 불러왔습니다.
            </Text>
          )
        )}
      </>
    );
  };

  return (
    <List css={stationListCss}>
      {cachedStationSummaries.map((stationSummary) => (
        <StationSummaryCard key={stationSummary.stationId} station={stationSummary} />
      ))}
      {renderStationSummaryCards()}
    </List>
  );
};

export const stationListCss = css`
  width: 34rem;
  height: calc(100vh - 14.133rem);
  border-top: 2.2rem solid var(--lighter-color);
  border-bottom: 3.6rem solid var(--lighter-color);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: var(--lighter-color);
  overflow: auto;

  & > li:first-of-type {
    padding-top: 0;
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100%;
    height: 100vh;
  }
`;

export default StationList;
