import { css } from 'styled-components';

import { useStationChargerReport } from '@hooks/tanstack-query/station-details/reports/useStationChargerReport';

import ChargerReportConfirmation from '@ui/StationDetailsWindow/reports/charger/ChargerReportConfirmation';

import ReportButton from '../ReportButton';

interface ChargerReportButtonProps {
  stationId: string;
}

const ChargerReportButton = ({ stationId }: ChargerReportButtonProps) => {
  const { data: isStationChargerReported, isLoading: isStationChargerReportedLoading } =
    useStationChargerReport(stationId);

  return (
    <ReportButton
      modalContent={<ChargerReportConfirmation stationId={stationId} />}
      disabled={isStationChargerReported}
      isLoading={isStationChargerReportedLoading}
      css={reportButtonCss}
    >
      {isStationChargerReported ? '이미 신고한 충전소' : '고장 신고'}
    </ReportButton>
  );
};

const reportButtonCss = css`
  width: fit-content;
  min-width: 8rem;
  margin: 0;
  background: #666;
  outline: 1.6px solid #666;
  &:hover {
    background: #666;
  }
  &:hover:enabled {
    background: #555;
  }

  & > div {
    color: #fff;
  }
`;

export default ChargerReportButton;
