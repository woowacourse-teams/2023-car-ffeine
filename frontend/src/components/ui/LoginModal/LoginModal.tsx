import { UserCircleIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Modal from '@common/Modal';
import type { ModalProps } from '@common/Modal/Modal';
import Text from '@common/Text';

import GoogleLoginButton from '@assets/google-login-button.svg';

interface Props extends Omit<ModalProps, 'children'> {
  redirectToLoginPage: () => void;
}

const LoginModal = ({ isOpen, onClose, redirectToLoginPage }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FlexBox width="100%" justifyContent="center" alignItems="center" css={containerCss}>
        <FlexBox justifyContent="center" alignItems="center" css={loginButtonContainerCss}>
          <FlexBox width={7} height={7} justifyContent="center" alignItems="center" css={iconCss}>
            <UserCircleIcon width="7rem" stroke="#333" />
          </FlexBox>
          <FlexBox direction="column" alignItems="center" gap={5}>
            <Text variant="h4">간편 로그인</Text>
            <ButtonNext noTheme onClick={redirectToLoginPage}>
              <img width="80%" src={GoogleLoginButton} alt="구글 로그인 버튼 이미지" />
            </ButtonNext>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
};

const containerCss = css`
  padding: 5rem 0;
`;

const loginButtonContainerCss = css`
  width: 80%;
  height: 25rem;

  border-radius: 1rem;

  position: relative;

  background-color: var(--lighter-color);
`;

const iconCss = css`
  border-radius: 50%;

  position: absolute;
  top: -3rem;
  left: 50%;
  transform: translate(-50%);

  padding: 0;

  background-color: #fff;
`;

export default LoginModal;
