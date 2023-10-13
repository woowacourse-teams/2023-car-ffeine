import { XMarkIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { navigationBarPanelStore } from '@stores/layout/navigationBarPanelStore';

import Box from '@common/Box';
import Button from '@common/Button';

import ChargerList from '@ui/StationDetailsWindow/chargers/ChargerList';
import StationReportButton from '@ui/StationDetailsWindow/reports/station/StationReportButton';
import ReviewPreview from '@ui/StationDetailsWindow/reviews/previews/ReviewPreview';
import StationInformation from '@ui/StationDetailsWindow/station/StationInformation';

import { MOBILE_BREAKPOINT, NAVIGATOR_PANEL_WIDTH } from '@constants';

import type { StationDetails } from '@type';

import CongestionStatistics from './congestion/CongestionStatistics';

export interface StationDetailsViewProps {
  station: StationDetails;
}

const StationDetailsView = ({ station }: StationDetailsViewProps) => {
  const { stationId, chargers, reportCount } = station;

  const handleCloseDetail = () => {
    navigationBarPanelStore.setState((panels) => ({
      ...panels,
      lastPanel: null,
    }));
  };

  return (
    <Box
      px={5}
      pt={6}
      width={NAVIGATOR_PANEL_WIDTH}
      height="100vh"
      bgColor="#fff"
      border="x"
      borderWidth="0.5px"
      borderColor="#e1e4eb"
      css={stationDetailsViewContainerCss}
    >
      <Button noRadius="all" css={xIconCss} onClick={handleCloseDetail}>
        <XMarkIcon width={32} />
      </Button>

      <StationInformation station={station} />

      <StationReportButton station={station} />

      <ChargerList chargers={chargers} stationId={stationId} reportCount={reportCount} />
      <CongestionStatistics stationId={stationId} />
      <ReviewPreview stationId={stationId} />
    </Box>
  );
};

export const stationDetailsViewContainerCss = css`
  box-shadow: 1px 1px 2px gray;
  overflow: scroll;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100vw;
    padding-bottom: 10rem;
  }
`;

const xIconCss = css`
  display: none;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    display: block;
    position: absolute;
    right: 0.8rem;
    top: 0;

    padding: 0.8rem 0.6rem;
    background: rgba(255, 255, 255, 0.8);
  }
`;

export default StationDetailsView;
