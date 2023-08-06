import { modalActions } from '@stores/modalStore';

import { useUpdateStationChargerReport } from '@hooks/tanstack-query/station-details/reports/useUpdateStationReport';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import StationInformation from '@ui/StationDetailsWindow/StationInformation';
import StationReportConfirmation from '@ui/StationDetailsWindow/reports/StationReportConfirmation';

import type { StationDetails } from '../../../../types';

interface StationReportPreConfirmationProps {
  station: StationDetails;
}

const StationReportPreConfirmation = ({ station }: StationReportPreConfirmationProps) => {
  const { updateStationReport } = useUpdateStationChargerReport();
  const reportCharger = () => {
    updateStationReport({ stationId: station.stationId, differences: [] });
  };
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
          onClick={() => {
            modalActions.openModal(<StationReportConfirmation station={station} />);
          }}
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
          onClick={() => modalActions.closeModal()}
        >
          닫기
        </ButtonNext>
        <ButtonNext
          fullWidth
          variant="outlined"
          size="sm"
          color="success"
          onClick={() => reportCharger()}
        >
          바쁘니깐
          <br />
          알아서 확인해주세요
        </ButtonNext>
      </FlexBox>
    </>
  );
};

export default StationReportPreConfirmation;
