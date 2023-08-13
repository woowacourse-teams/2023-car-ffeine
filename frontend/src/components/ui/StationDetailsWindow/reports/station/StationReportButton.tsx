import { modalActions } from '@stores/layout/modalStore';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';

import StationReportPreConfirmation from '@ui/StationDetailsWindow/reports/station/StationReportPreConfirmation';

import type { StationDetails } from '@type';

interface StationReportButtonProps {
  station: StationDetails;
}

const StationReportButton = ({ station }: StationReportButtonProps) => {
  return (
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
  );
};

export default StationReportButton;
