import { useEffect, useState } from 'react';

import { fetchUtils } from '@utils/fetch';
import { getMemberToken } from '@utils/login';
import { getAPIEndPoint } from '@utils/login/index';
import { setSessionStorage } from '@utils/storage';

import { memberTokenStore } from '@stores/login/memberTokenStore';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Loading from '@common/Loading';
import Text from '@common/Text';

import LogoIcon from '@ui/Svg/LogoIcon';

import { SESSION_KEY_MEMBER_INFO, SESSION_KEY_MEMBER_TOKEN } from '@constants/storageKeys';

const GoogleLogin = () => {
  const [loginError, setLoginError] = useState<Error>(null);
  const homePageUrl = window.location.href.split('google')[0];

  useEffect(() => {
    const code = window.location.search.split('&')[0].replace('?code=', '');
    const APIEndPoint = getAPIEndPoint();

    getMemberToken(code, 'google')
      .then(async (token) => {
        memberTokenStore.setState(token);

        const memberInfo = await fetchUtils.get(`${APIEndPoint}/members/me`);

        setSessionStorage(SESSION_KEY_MEMBER_TOKEN, token);
        setSessionStorage(SESSION_KEY_MEMBER_INFO, JSON.stringify(memberInfo));

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

  return <Loading />;
};

export default GoogleLogin;
