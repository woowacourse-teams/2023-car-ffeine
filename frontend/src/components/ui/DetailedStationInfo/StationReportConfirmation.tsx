import { modalActions } from '@stores/modalStore';

import Box from '@common/Box';
import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import StationInformation from '@ui/DetailedStationInfo/StationInformation';

import type { StationDetails } from '../../../types';

interface StationReportConfirmationProps {
  station: StationDetails;
}

const StationReportConfirmation = ({ station }: StationReportConfirmationProps) => {
  const reportCharger = async () => {
    alert(`report this station's information: ${station.stationId}`);
  };

  return (
    <Box p={2}>
      <Text variant="title" mb={3}>
        개선할 충전소 정보가 있나요?
      </Text>
      <Box border>
        <StationInformation station={station} />
      </Box>

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
