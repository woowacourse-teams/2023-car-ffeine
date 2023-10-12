import { XMarkIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

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
      tag="section"
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth={32}
      width="calc(100vw - 4rem)"
      height={23.6}
      px={10}
    >
      <Button mt={-11} mr={-6} mb={-1} ml="auto" onClick={modalActions.closeModal}>
        <XMarkIcon width={28} />
      </Button>

      <Logo />
      <Text tag="h2" variant="h5" weight="regular" color="#333" mt={2}>
        카페인
      </Text>

      <FlexBox
        tag="button"
        type="button"
        aria-label="구글 로그인"
        alignItems="center"
        width="100%"
        nowrap
        maxWidth={24}
        height={4.4}
        mt={8}
        mb={-4}
        px={4.5}
        borderRadius={8}
        gap={0}
        css={googleLoginCss}
        onClick={handleLogin}
      >
        <GoogleLogo width="24" />
        <Text variant="label" weight="regular" color="#666" width="calc(100% - 4rem)">
          구글 로그인
        </Text>
      </FlexBox>
    </FlexBox>
  );
};

const googleLoginCss = css`
  box-shadow: 1px 1px 5px 2px #e7e7e7db;

  &:hover {
    box-shadow: 0.8px 1px 5px 2px #e7e7e7;
  }
`;

export default LoginModal;
