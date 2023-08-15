import { css } from 'styled-components';

import Alert from '@common/Alert';
import Box from '@common/Box';

import ChargerList from '@ui/StationDetailsWindow/chargers/ChargerList';
import ChargerReportButton from '@ui/StationDetailsWindow/reports/charger/ChargerReportButton';
import StationReportButton from '@ui/StationDetailsWindow/reports/station/StationReportButton';
import ReviewPreview from '@ui/StationDetailsWindow/reviews/previews/ReviewPreview';
import StationInformation from '@ui/StationDetailsWindow/station/StationInformation';

import type { StationDetails } from '@type';

import CongestionStatistics from './congestion/CongestionStatistics';

export interface StationDetailsViewProps {
  station: StationDetails;
}

const StationDetailsView = ({ station }: StationDetailsViewProps) => {
  const { stationId, chargers, reportCount } = station;

  return (
    <Box p={5} css={stationDetailsViewContainerCss}>
      <Box mt={15}>
        <StationInformation station={station} />
      </Box>
      <StationReportButton station={station} />

      <ChargerList chargers={chargers} />
      <ChargerReportButton stationId={stationId} />

      {reportCount > 0 && (
        <Box my={1}>
          <Alert color={'secondary'} text={`충전 상태 불일치 신고가 ${reportCount}번 접수됐어요`} />
        </Box>
      )}

      <CongestionStatistics stationId={stationId} />
      <ReviewPreview stationId={stationId} />
    </Box>
  );
};

export const stationDetailsViewContainerCss = css`
  width: 34rem;
  height: 100vh;
  background-color: white;
  box-shadow: 1px 1px 2px gray;
  border-left: 0.5px solid #e1e4eb;
  border-right: 0.5px solid #e1e4eb;
  overflow: scroll;
`;

export default StationDetailsView;
