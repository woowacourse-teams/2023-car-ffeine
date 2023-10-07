import { XMarkIcon } from '@heroicons/react/24/outline';
import { styled } from 'styled-components';

import { redirectToLoginPage } from '@utils/login';

import { modalActions } from '@stores/layout/modalStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import GoogleLogo from '@assets/google-logo.svg';
import Logo from '@assets/logo-md.svg';

const LoginModal = () => {
  const handleLogin = () => {
    redirectToLoginPage('google');
  };

  return (
    <FlexBox
      tag="article"
      direction="column"
      justifyContent="center"
      alignItems="start"
      maxWidth={32}
      width="calc(100vw - 4rem)"
      height={24.8}
      px={10}
    >
      <Button mt={-11.5} mr={-5.5} mb={1} ml="auto" onClick={modalActions.closeModal}>
        <XMarkIcon width={28} />
      </Button>
      <FlexBox mt={2} mb={2} columnGap={4} alignItems="center">
        <Logo />
        <Text tag="h2" variant="h4" color="#333">
          카페인
        </Text>
      </FlexBox>
      <Text tag="h3">편리한 전기차 충전소 지도</Text>
      <GoogleLogin onClick={handleLogin}>
        <GoogleLogo width="24" />
        <Text>구글 로그인</Text>
      </GoogleLogin>
    </FlexBox>
  );
};

const GoogleLogin = styled.button`
  display: flex;
  align-items: center;

  width: 100%;
  max-width: 24rem;
  height: 4.4rem;

  margin-top: 3.2rem;
  margin-bottom: -1.6rem;
  padding: 0 1.8rem;

  font-size: 1.5rem;
  font-weight: 500;
  color: #666;

  border-radius: 8px;
  box-shadow: 1px 1px 5px 2px #e7e7e7db;

  &:hover {
    box-shadow: 0.8px 1px 5px 2px #e7e7e7;
  }

  & p {
    width: calc(100% - 40px);
  }
`;

export default LoginModal;
