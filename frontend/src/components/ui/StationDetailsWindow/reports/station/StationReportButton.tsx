import { MegaphoneIcon } from '@heroicons/react/24/outline';
import { css, styled } from 'styled-components';

import { modalActions } from '@stores/layout/modalStore';
import { toastActions } from '@stores/layout/toastStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import ButtonNext from '@common/ButtonNext';

import StationReportPreConfirmation from '@ui/StationDetailsWindow/reports/station/StationReportPreConfirmation';

import type { StationDetails } from '@type';

interface StationReportButtonProps {
  station: StationDetails;
}

const StationReportButton = ({ station }: StationReportButtonProps) => {
  const memberToken = memberTokenStore.getState();
  const { showToast } = toastActions;

  return (
    <ButtonNext
      fullWidth
      variant="outlined"
      size="sm"
      color="secondary"
      my={3}
      css={buttonCss}
      onClick={() => {
        if (memberToken === '') {
          showToast('로그인이 필요한 메뉴입니다.');
        } else {
          modalActions.openModal(<StationReportPreConfirmation station={station} />);
        }
      }}
    >
      <FlexContainer>
        <MegaphoneIcon width={20} stroke="#666" />
        잘못된 충전소 정보 제보
      </FlexContainer>
    </ButtonNext>
  );
};

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  font-size: 1.4rem;
  color: #555;
`;

const buttonCss = css`
  border: 0;
  outline: 1.6px solid #888;
  margin: 1rem 0 4rem;

  &:hover {
    background: #f9f9f9;
    outline: 1.6px solid #555;
    transform: translateY(-2px);
  }
`;

export default StationReportButton;
