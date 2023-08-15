import { modalActions } from '@stores/layout/modalStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import ButtonNext from '@common/ButtonNext';

import StationReportPreConfirmation from '@ui/StationDetailsWindow/reports/station/StationReportPreConfirmation';

import type { StationDetails } from '@type';

interface StationReportButtonProps {
  station: StationDetails;
}

const StationReportButton = ({ station }: StationReportButtonProps) => {
  const memberToken = memberTokenStore.getState();

  return (
    <ButtonNext
      fullWidth
      variant="outlined"
      size="sm"
      color="secondary"
      my={3}
      onClick={() => {
        if (memberToken === '') {
          alert('로그인이 필요한 메뉴입니다.');
        } else {
          modalActions.openModal(<StationReportPreConfirmation station={station} />);
        }
      }}
    >
      📝 충전소 정보 수정 제안하기
    </ButtonNext>
  );
};

export default StationReportButton;
