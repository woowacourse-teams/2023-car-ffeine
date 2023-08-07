import { modalActions } from '@stores/modalStore';

import { useUpdateStationChargerReport } from '@hooks/tanstack-query/station-details/reports/useUpdateStationChargerReport';

import Alert from '@common/Alert';
import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

interface ChargerReportConfirmationProps {
  stationId: string;
}

const ChargerReportConfirmation = ({ stationId }: ChargerReportConfirmationProps) => {
  const { updateStationChargerReport } = useUpdateStationChargerReport();
  const reportCharger = async () => {
    updateStationChargerReport(stationId);
  };

  return (
    <Box p={2}>
      <Text variant="title" mb={3}>
        표시된 정보가 실제 충전기 상태와 다를 수 있습니다.
      </Text>
      <Alert color="primary" text="충전기가 고장나있다면 신고해주세요." />
      <FlexBox justifyContent="between" nowrap>
        <ButtonNext
          variant="outlined"
          color="error"
          size="md"
          fullWidth
          onClick={() => modalActions.closeModal()}
        >
          생각해보니 문제가 없는 것 같아요
        </ButtonNext>
        <ButtonNext
          variant="contained"
          color="success"
          size="md"
          fullWidth
          onClick={() => reportCharger()}
        >
          제보하기
        </ButtonNext>
      </FlexBox>
    </Box>
  );
};

export default ChargerReportConfirmation;
