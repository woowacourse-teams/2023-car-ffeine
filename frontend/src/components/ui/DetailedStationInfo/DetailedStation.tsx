import { css } from 'styled-components';

import { modalActions } from '@stores/modalStore';

import { useStationChargerReport } from '@hooks/useStationChargerReport';

import Alert from '@common/Alert';
import Box from '@common/Box';
import Button from '@common/Button';
import FlexBox from '@common/FlexBox';

import ChargerCard from '@ui/DetailedStationInfo/ChargerCard';
import ChargerReportConfirmation from '@ui/DetailedStationInfo/ChargerReportConfirmation';
import StationInformation from '@ui/DetailedStationInfo/StationInformation';
import StationReportConfirmation from '@ui/DetailedStationInfo/StationReportConfirmation';

import type { StationDetails } from '../../../types';
import CongestionStatistics from './CongestionStatistics';

export interface DetailedStationProps {
  station: StationDetails;
}

const DetailedStation = ({ station }: DetailedStationProps) => {
  const { stationId, chargers, reportCount } = station;

  const { data: isStationChargerReported, isLoading: isStationChargerReportedLoading } =
    useStationChargerReport(stationId);

  return (
    <Box px={2} py={10} css={containerCss}>
      <StationInformation station={station} />
      <FlexBox justifyContent="center">
        <Button
          size="sm"
          onClick={() => {
            modalActions.openModal(<StationReportConfirmation station={station} />);
          }}
        >
          📝 충전소 정보 수정 제안하기
        </Button>
      </FlexBox>

      <hr />

      <FlexBox>
        {chargers.map((charger, index) => (
          <ChargerCard key={index} charger={charger} />
        ))}
      </FlexBox>

      <FlexBox justifyContent="center">
        {isStationChargerReportedLoading ? (
          '⌛️'
        ) : (
          <Button
            size="sm"
            onClick={() => {
              modalActions.openModal(<ChargerReportConfirmation stationId={stationId} />);
            }}
            disabled={isStationChargerReported}
          >
            {isStationChargerReported ? '이미 신고한 충전소입니다.' : '🚨 충전기 고장 신고 '}
          </Button>
        )}
      </FlexBox>
      {reportCount > 0 && (
        <Box my={1}>
          <Alert color={'secondary'} text={`충전 상태 불일치 신고가 ${reportCount}번 접수됐어요`} />
        </Box>
      )}
      <CongestionStatistics />
    </Box>
  );
};

const containerCss = css`
  width: 34rem;
  height: 100vh;
  background-color: white;
  box-shadow: 1px 1px 2px gray;
  border-left: 0.5px solid #e1e4eb;
  border-right: 0.5px solid #e1e4eb;
  overflow: scroll;
`;

export default DetailedStation;
