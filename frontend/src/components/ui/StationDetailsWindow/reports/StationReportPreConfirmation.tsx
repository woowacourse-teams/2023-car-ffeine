import { modalActions } from '@stores/layout/modalStore';

import { useUpdateStationReport } from '@hooks/tanstack-query/station-details/reports/useUpdateStationReport';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import StationInformation from '@ui/StationDetailsWindow/StationInformation';
import StationReportConfirmation from '@ui/StationDetailsWindow/reports/StationReportConfirmation';

import type { StationDetails } from '@type';

interface StationReportPreConfirmationProps {
  station: StationDetails;
}

const StationReportPreConfirmation = ({ station }: StationReportPreConfirmationProps) => {
  const { updateStationReport, isLoading } = useUpdateStationReport();

  const reportCharger = () => {
    updateStationReport({ stationId: station.stationId, differences: [] });
  };

  const handleReportMoreButton = () => {
    modalActions.openModal(<StationReportConfirmation station={station} />);
  };

  const handleCloseModalButton = () => modalActions.closeModal();

  return (
    <>
      <Text variant="title" mb={3}>
        개선할 충전소 정보가 있나요?
      </Text>
      <Box border>
        <StationInformation station={station} />
      </Box>
      <Box my={3}>
        <ButtonNext
          fullWidth
          variant="contained"
          size="md"
          color="primary"
          onClick={handleReportMoreButton}
        >
          데이터를 직접 수정/제안하고 싶어요
        </ButtonNext>
      </Box>
      <FlexBox nowrap>
        <ButtonNext
          fullWidth
          variant="outlined"
          size="sm"
          color="error"
          onClick={handleCloseModalButton}
        >
          닫기
        </ButtonNext>
        <ButtonNext
          disabled={isLoading}
          fullWidth
          variant="outlined"
          size="sm"
          color="success"
          onClick={reportCharger}
        >
          {isLoading ? '처리중...' : '바쁘니깐 알아서 확인해주세요'}
        </ButtonNext>
      </FlexBox>
    </>
  );
};

export default StationReportPreConfirmation;
