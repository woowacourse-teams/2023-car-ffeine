import { UserCircleIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { redirectToLoginPage } from '@utils/login';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import GoogleLoginButton from '@assets/google-login-button.svg';

const LoginModal = () => {
  return (
    <FlexBox width="100%" justifyContent="center" alignItems="center" css={containerCss}>
      <FlexBox justifyContent="center" alignItems="center" css={loginButtonContainerCss}>
        <FlexBox width={7} height={7} justifyContent="center" alignItems="center" css={iconCss}>
          <UserCircleIcon width="7rem" stroke="lightgrey" />
        </FlexBox>
        <FlexBox direction="column" alignItems="center" gap={5}>
          <Text variant="h4" color="#333">
            간편 로그인
          </Text>
          <ButtonNext noTheme onClick={() => redirectToLoginPage('google')}>
            <img width="80%" src={GoogleLoginButton} alt="구글 로그인 버튼 이미지" />
          </ButtonNext>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

const containerCss = css`
  padding: 5rem 0;
`;

const loginButtonContainerCss = css`
  width: 80%;
  height: 25rem;

  border: 1px solid lightgrey;
  border-radius: 1rem;

  position: relative;
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
