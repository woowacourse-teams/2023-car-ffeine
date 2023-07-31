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
        충전기의 상태가 실제와 다른가요?
      </Text>
      <Alert color="primary" text="앱에 표시된 정보가 실제와 차이가 나는 경우가 있습니다." />
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
