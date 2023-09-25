import { css } from 'styled-components';

import { lazy, Suspense } from 'react';

import { useStationDetails } from '@hooks/tanstack-query/station-details/useStationDetails';

import Box from '@common/Box';

import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';
import StationDetailsViewSkeleton from '@ui/StationDetailsWindow/StationDetailsViewSkeleton';

import { MOBILE_BREAKPOINT, NAVIGATOR_PANEL_WIDTH } from '@constants';

export interface Props {
  stationId: string;
}

const StationDetailsView = lazy(() => import('@ui/StationDetailsWindow/StationDetailsView'));

const StationDetailSWindowSkeleton = () => (
  <Box css={stationDetailsWindowCss}>
    <StationDetailsViewSkeleton />
  </Box>
);

const StationDetailsWindow = ({ stationId }: Props) => {
  const {
    data: selectedStation,
    isLoading: isSelectedStationLoading,
    isError: isSelectedStationError,
    isFetching,
  } = useStationDetails(stationId);
  const { handleClosePanel } = useNavigationBar();

  if (stationId === null || (!isFetching && selectedStation === null)) {
    handleClosePanel();
  }

  if (isSelectedStationError || isSelectedStationLoading) {
    return <StationDetailSWindowSkeleton />;
  }

  return (
    <Box css={stationDetailsWindowCss}>
      <Suspense fallback={<StationDetailSWindowSkeleton />}>
        <StationDetailsView station={selectedStation} />
      </Suspense>
    </Box>
  );
};

const stationDetailsWindowCss = css`
  width: ${NAVIGATOR_PANEL_WIDTH}rem;
  height: 100vh;
  z-index: 99;
  overflow: scroll;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100vw;
  }
`;

export default StationDetailsWindow;
