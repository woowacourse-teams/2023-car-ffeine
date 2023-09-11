import { css } from 'styled-components';

import { useStationMarkers } from '@hooks/tanstack-query/station-markers/useStationMarkers';

import List from '@common/List';

import EmptyStationsNotice from '@ui/StationList/EmptyStationsNotice';
import StationSummaryCardSkeleton from '@ui/StationList/StationSummaryCardSkeleton';

import { MOBILE_BREAKPOINT } from '@constants';

import StationSummaryCard from './StationSummaryCard';
import { useStationSummaries } from './hooks/useStationSummaries';

const StationList = () => {
  const {
    data: filteredMarkers,
    isSuccess: isFilteredMarkersSuccess,
    isLoading: isFilteredMarkersLoading,
  } = useStationMarkers();

  const { isLoading, stationSummaries } = useStationSummaries(filteredMarkers);

  if (
    isFilteredMarkersLoading
    // || isLoading
  ) {
    return (
      <List css={searchResultList}>
        {Array.from({ length: 10 }, (_, index) => (
          <StationSummaryCardSkeleton key={index} />
        ))}
      </List>
    );
  }

  return (
    // isSuccess &&
    isFilteredMarkersSuccess && (
      <List css={searchResultList}>
        {/* 
          캐싱된 값을 먼저 보여주기
            - 10개 제한 없고, 그냥 알고 있는거 다 보여주기
            - 화면 영역 내에 있는 것만 보여주기
            - useSyncExternalStore 사용 금지 (상태로 취급 ㄴㄴ)
            - 
        */}

        {/* 새로 수신한 데이터를 보여주기 */}
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
