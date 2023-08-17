import { css, styled } from 'styled-components';

import { redirectToLoginPage } from '@utils/login';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import LogoIcon from '@ui/Svg/LogoIcon';

import GoogleLogo from '@assets/google-logo.svg';

const LoginModal = () => {
  const handleLogin = () => {
    redirectToLoginPage('google');
  };

  return (
    <FlexBox
      tag="article"
      direction="column"
      justifyContent="center"
      alignItems="center"
      css={containerCss}
    >
      <LogoIcon width={8} />
      <Text tag="h2" variant="h4" mt={4} mb={2} color="#333">
        카페인
      </Text>
      <Text tag="h3">편리한 전기차 충전소 지도</Text>
      <GoogleLogin onClick={handleLogin}>
        <GoogleLogo width="24" />
        <p>구글 로그인</p>
      </GoogleLogin>
    </FlexBox>
  );
};

const containerCss = css`
  padding: 4.6rem 4.8rem 6.4rem;
`;

const GoogleLogin = styled.button`
  display: flex;
  align-items: center;
  column-gap: 6.6rem;

  width: 29.2rem;
  height: 4rem;
  margin: 3.6rem auto -1rem;
  padding: 0 1.8rem;

  font-size: 1.5rem;
  font-weight: 600;
  color: #333;

  border-radius: 24px;
  box-shadow: 1px 1px 5px 2px #e7e7e7;

  &:hover {
    box-shadow: 0.8px 1px 5px 2px #e2e2e2;
  }

  & > p {
    margin: 0.9rem 2.4rem 1.2rem 0;
  }
`;

export default LoginModal;
