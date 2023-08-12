import { useEffect, useState } from 'react';

import { getUserToken } from '@utils/login';
import { setSessionStorage } from '@utils/storage';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import LogoIcon from '@ui/Svg/LogoIcon';

import { SESSION_KEY_USER_TOKEN } from '@constants/storageKeys';

const GoogleLogin = () => {
  const [loginError, setLoginError] = useState<Error>(null);
  const homePageUrl = window.location.href.split('google')[0];

  useEffect(() => {
    const code = window.location.search.split('&')[0].replace('?code=', '');

    getUserToken(code, 'google')
      .then((token) => {
        setSessionStorage(SESSION_KEY_USER_TOKEN, token);

        window.location.href = homePageUrl;
      })
      .catch(() => {
        setLoginError(new Error('로그인 중에 에러가 발생했습니다!'));
      });
  }, []);

  if (loginError !== null) {
    return (
      <FlexBox
        height="100vh"
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={12}
      >
        <Text variant="h3">로그인 중에 에러가 발생했습니다!</Text>
        <ButtonNext
          onClick={() => {
            window.location.href = homePageUrl;
          }}
        >
          홈으로 돌아가기
        </ButtonNext>
      </FlexBox>
    );
  }

  return (
    <FlexBox height="100vh" direction="column" alignItems="center" justifyContent="center">
      <LogoIcon width={15} />
      <Text variant="h5">로딩중...</Text>
    </FlexBox>
  );
};

export default GoogleLogin;
