import { css } from 'styled-components';

import { useStationDetails } from '@hooks/tanstack-query/station-details/useStationDetails';

import Box from '@common/Box';

import StationDetailsView from '@ui/StationDetailsWindow/StationDetailsView';
import StationDetailsViewSkeleton from '@ui/StationDetailsWindow/StationDetailsViewSkeleton';
import { useNavigationBar } from '@ui/compound/NavigationBar/hooks/useNavigationBar';

import { NAVIGATOR_PANEL_WIDTH } from '@constants';

const StationDetailsWindow = () => {
  const {
    data: selectedStation,
    isLoading: isSelectedStationLoading,
    isError: isSelectedStationError,
    isFetching,
  } = useStationDetails();
  const { handleClosePanel } = useNavigationBar();

  if (!isFetching && selectedStation === undefined) {
    handleClosePanel();
  }

  if (isSelectedStationError || isSelectedStationLoading) {
    return (
      <Box css={stationDetailsWindowCss}>
        <StationDetailsViewSkeleton />
      </Box>
    );
  }

  return (
    <Box css={stationDetailsWindowCss}>
      <StationDetailsView station={selectedStation} />
    </Box>
  );
};

const stationDetailsWindowCss = css`
  width: ${NAVIGATOR_PANEL_WIDTH}rem;
  height: 100vh;
  z-index: 999;
  overflow: scroll;
`;

export default StationDetailsWindow;
