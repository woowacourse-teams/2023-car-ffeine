import { css } from 'styled-components';

import { modalActions } from '@stores/layout/modalStore';

import { useStationChargerReport } from '@hooks/tanstack-query/station-details/reports/useStationChargerReport';

import Alert from '@common/Alert';
import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';
import Text from '@common/Text';

import ChargerCard from '@ui/StationDetailsWindow/ChargerCard';
import StationInformation from '@ui/StationDetailsWindow/StationInformation';
import ChargerReportConfirmation from '@ui/StationDetailsWindow/reports/ChargerReportConfirmation';
import StationReportPreConfirmation from '@ui/StationDetailsWindow/reports/StationReportPreConfirmation';
import ReviewView from '@ui/StationDetailsWindow/reviews/ReviewView';

import type { StationDetails } from '@type';

import CongestionStatistics from './congestion/CongestionStatistics';

export interface StationDetailsViewProps {
  station: StationDetails;
}

const StationDetailsView = ({ station }: StationDetailsViewProps) => {
  const { stationId, chargers, reportCount } = station;

  const { data: isStationChargerReported, isLoading: isStationChargerReportedLoading } =
    useStationChargerReport(stationId);

  return (
    <Box px={2} py={10} css={stationDetailsViewContainerCss}>
      <StationInformation station={station} />
      <Box my={2}>
        <ButtonNext
          fullWidth
          variant="outlined"
          size="sm"
          color="dark"
          onClick={() => {
            modalActions.openModal(<StationReportPreConfirmation station={station} />);
          }}
        >
          📝 충전소 정보 수정 제안하기
        </ButtonNext>
      </Box>

      <FlexBox>
        {chargers.map((charger, index) => (
          <ChargerCard key={index} charger={charger} />
        ))}
      </FlexBox>

      <Box my={3}>
        {isStationChargerReportedLoading ? (
          <Skeleton height="3rem" />
        ) : (
          <ButtonNext
            fullWidth
            variant="outlined"
            size="sm"
            color="dark"
            onClick={() => {
              modalActions.openModal(<ChargerReportConfirmation stationId={stationId} />);
            }}
            disabled={isStationChargerReported}
          >
            {isStationChargerReported ? '이미 신고한 충전소입니다.' : '🚨 충전기 고장 신고 '}
          </ButtonNext>
        )}
      </Box>
      {reportCount > 0 && (
        <Box my={1}>
          <Alert color={'secondary'} text={`충전 상태 불일치 신고가 ${reportCount}번 접수됐어요`} />
        </Box>
      )}
      <Box my={5}>
        <Text variant="title">충전소 사용통계</Text>
      </Box>
      <Box my={3}>
        <CongestionStatistics />
      </Box>
      <Box my={5}>
        <Text variant="title">충전소 후기</Text>
      </Box>
      <ReviewView />
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
