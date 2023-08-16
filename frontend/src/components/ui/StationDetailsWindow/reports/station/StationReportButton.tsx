import { modalActions } from '@stores/layout/modalStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import ButtonNext from '@common/ButtonNext';

import StationReportPreConfirmation from '@ui/StationDetailsWindow/reports/station/StationReportPreConfirmation';

import { DEFAULT_TOKEN } from '@constants';

import type { StationDetails } from '@type';

interface StationReportButtonProps {
  station: StationDetails;
}

const StationReportButton = ({ station }: StationReportButtonProps) => {
  const memberId = memberInfoStore.getState().memberId;

  return (
    <ButtonNext
      fullWidth
      variant="outlined"
      size="sm"
      color="secondary"
      my={3}
      disabled={memberId === DEFAULT_TOKEN}
      onClick={() => {
        if (memberId === DEFAULT_TOKEN) {
          alert('로그인이 필요한 메뉴입니다.');
        } else {
          modalActions.openModal(<StationReportPreConfirmation station={station} />);
        }
      }}
    >
      {memberId === DEFAULT_TOKEN ? '로그인이 필요한 메뉴입니다.' : '📝 충전소 정보 수정 제안하기'}
    </ButtonNext>
  );
};

export default StationReportButton;
