import { modalActions } from '@stores/layout/modalStore';

import { useStationChargerReport } from '@hooks/tanstack-query/station-details/reports/useStationChargerReport';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import Skeleton from '@common/Skeleton';

import ChargerReportConfirmation from '@ui/StationDetailsWindow/reports/charger/ChargerReportConfirmation';

interface ChargerReportButtonProps {
  stationId: string;
}

const ChargerReportButton = ({ stationId }: ChargerReportButtonProps) => {
  const { data: isStationChargerReported, isLoading: isStationChargerReportedLoading } =
    useStationChargerReport(stationId);
  return (
    <>
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
    </>
  );
};

export default ChargerReportButton;
