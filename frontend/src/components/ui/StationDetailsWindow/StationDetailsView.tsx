import { XMarkIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { useState } from 'react';

import { navigationBarPanelStore } from '@stores/layout/navigationBarPanelStore';

import Box from '@common/Box';
import Button from '@common/Button';
import ButtonNext from '@common/ButtonNext';

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
  const [isCongestionStatisticsOpen, setIsCongestionStatisticsOpen] = useState(false); // 임시

  const handleCloseDetail = () => {
    navigationBarPanelStore.setState((panels) => ({
      ...panels,
      lastPanel: null,
    }));
  };

  return (
    <Box p={5} css={stationDetailsViewContainerCss}>
      <Button css={xIconCss} onClick={handleCloseDetail}>
        <XMarkIcon width={32} />
      </Button>
      <Box mt={4}>
        <StationInformation station={station} />
      </Box>
      <StationReportButton station={station} />

      <ChargerList chargers={chargers} stationId={stationId} reportCount={reportCount} />

      {isCongestionStatisticsOpen ? (
        <CongestionStatistics stationId={stationId} />
      ) : (
        <ButtonNext onClick={() => setIsCongestionStatisticsOpen(true)} fullWidth>
          충전소 사용 통계 확인하기 (BETA)
        </ButtonNext>
      )}

      <ReviewPreview stationId={stationId} />
    </Box>
  );
};

export const stationDetailsViewContainerCss = css`
  width: ${NAVIGATOR_PANEL_WIDTH}rem;
  height: 100vh;
  background-color: white;
  box-shadow: 1px 1px 2px gray;
  border-left: 0.5px solid #e1e4eb;
  border-right: 0.5px solid #e1e4eb;
  overflow: scroll;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100vw;
    padding-bottom: 10rem;
  }
`;

const xIconCss = css`
  @media screen and (min-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
`;

export default StationDetailsView;
