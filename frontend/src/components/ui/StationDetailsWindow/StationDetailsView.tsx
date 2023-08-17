import { css } from 'styled-components';

import Alert from '@common/Alert';
import Box from '@common/Box';

import ChargerList from '@ui/StationDetailsWindow/chargers/ChargerList';
import StationReportButton from '@ui/StationDetailsWindow/reports/station/StationReportButton';
import ReviewPreview from '@ui/StationDetailsWindow/reviews/previews/ReviewPreview';
import StationInformation from '@ui/StationDetailsWindow/station/StationInformation';

import { NAVIGATOR_PANEL_WIDTH } from '@constants';

import type { StationDetails } from '@type';

import CongestionStatistics from './congestion/CongestionStatistics';

export interface StationDetailsViewProps {
  station: StationDetails;
}

const StationDetailsView = ({ station }: StationDetailsViewProps) => {
  const { stationId, chargers, reportCount } = station;

  return (
    <Box p={5} css={stationDetailsViewContainerCss}>
      <Box mt={4}>
        <StationInformation station={station} />
      </Box>
      <StationReportButton station={station} />

      <ChargerList chargers={chargers} stationId={stationId} reportCount={reportCount} />

      <CongestionStatistics stationId={stationId} />
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
`;

export default StationDetailsView;
