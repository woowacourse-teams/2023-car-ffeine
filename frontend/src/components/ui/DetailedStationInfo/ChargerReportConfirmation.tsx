import { modalActions } from '@stores/modalStore';

import { useUpdateStationChargerReport } from '@hooks/useUpdateStationChargerReport';

import Alert from '@common/Alert';
import Box from '@common/Box';
import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

interface ChargerReportConfirmationProps {
  stationId: number;
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
      <FlexBox justifyContent="between">
        <Button size="md" onClick={() => modalActions.closeModal()}>
          생각해보니 문제가 없는 것 같아요
        </Button>
        <Button size="md" onClick={() => reportCharger()}>
          제보하기
        </Button>
      </FlexBox>
    </Box>
  );
};

export default ChargerReportConfirmation;
