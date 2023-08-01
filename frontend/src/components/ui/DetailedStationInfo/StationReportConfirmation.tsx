import { modalActions } from '@stores/modalStore';

import { useUpdateStationChargerReport } from '@hooks/useUpdateStationChargerReport';

import Alert from '@common/Alert';
import Box from '@common/Box';
import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

interface StationReportConfirmationProps {
  stationId: number;
}

const StationReportConfirmation = ({ stationId }: StationReportConfirmationProps) => {
  const reportCharger = async () => {
    alert(`report this station's information: ${stationId}`);
  };

  return (
    <Box p={2}>
      <Text variant="title" mb={3}>
        개선할 충전소 정보가 있나요?
      </Text>
      <FlexBox justifyContent="between">
        <Button size="md" onClick={() => modalActions.closeModal()}>
          저장하지 않고 닫을래요
        </Button>
        <Button size="md" onClick={() => reportCharger()}>
          제안하기
        </Button>
      </FlexBox>
    </Box>
  );
};

export default StationReportConfirmation;
