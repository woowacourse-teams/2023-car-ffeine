import type { CSSProp } from 'styled-components';
import { styled } from 'styled-components';
import { css } from 'styled-components';

import type { ReactNode } from 'react';

import { modalActions } from '@stores/layout/modalStore';
import { toastActions } from '@stores/layout/toastStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import ButtonNext from '@common/ButtonNext';
import Skeleton from '@common/Skeleton';

import { EMPTY_MEMBER_TOKEN } from '@constants';

interface Props {
  modalContent: JSX.Element;
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  css?: CSSProp;
}

function ReportButton({ modalContent, disabled, isLoading, children, css }: Props) {
  const memberToken = memberTokenStore.getState();
  const { showToast } = toastActions;
  const { openModal } = modalActions;

  const handleOpenStationReportForm = () => {
    if (memberToken === EMPTY_MEMBER_TOKEN) {
      showToast('로그인이 필요한 메뉴입니다.');
    } else {
      openModal(modalContent);
    }
  };

  if (isLoading) {
    return <Skeleton height="2.8rem" width="8rem" />;
  }

  return (
    <ButtonNext
      type="button"
      fullWidth
      variant="outlined"
      size="sm"
      color="secondary"
      my={3}
      css={[buttonCss, css]}
      onClick={handleOpenStationReportForm}
      disabled={disabled}
    >
      <FlexContainer>{children}</FlexContainer>
    </ButtonNext>
  );
}

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
  margin-top: 1rem;

  &:hover:enabled {
    font-weight: 500;
    outline: 1.6px solid #555;
    transform: translateY(-2px);
  }

  &:hover {
    background: inherit;
  }
`;

export default ReportButton;
