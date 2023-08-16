import { modalActions } from '@stores/layout/modalStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import { useStationChargerReport } from '@hooks/tanstack-query/station-details/reports/useStationChargerReport';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import Skeleton from '@common/Skeleton';

import ChargerReportConfirmation from '@ui/StationDetailsWindow/reports/charger/ChargerReportConfirmation';

import { DEFAULT_TOKEN } from '@constants';

interface ChargerReportButtonProps {
  stationId: string;
}

const ChargerReportButton = ({ stationId }: ChargerReportButtonProps) => {
  const { data: isStationChargerReported, isLoading: isStationChargerReportedLoading } =
    useStationChargerReport(stationId);
  const memberId = memberInfoStore.getState()?.memberId;

  return (
    <>
      <Box my={5}>
        {isStationChargerReportedLoading ? (
          <Skeleton height="3rem" />
        ) : (
          <ButtonNext
            fullWidth
            variant="outlined"
            size="sm"
            color="secondary"
            onClick={() => {
              if (memberId === DEFAULT_TOKEN) {
                alert('로그인이 필요한 메뉴입니다.');
              } else {
                modalActions.openModal(<ChargerReportConfirmation stationId={stationId} />);
              }
            }}
            disabled={memberId === DEFAULT_TOKEN || isStationChargerReported}
          >
            {memberId === DEFAULT_TOKEN
              ? '로그인이 필요한 메뉴입니다.'
              : isStationChargerReported
              ? '이미 신고한 충전소입니다.'
              : '🚨 충전기 고장 신고 '}
          </ButtonNext>
        )}
      </Box>
    </>
  );
};

export default ChargerReportButton;
