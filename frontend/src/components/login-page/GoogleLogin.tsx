import Loading from 'components/ui/Loading';

import { useEffect, useState } from 'react';

import { fetchUtils } from '@utils/fetch';
import { getMemberToken } from '@utils/login';
import { setSessionStorage } from '@utils/storage';

import { memberTokenStore } from '@stores/login/memberTokenStore';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { SERVER_URL } from '@constants/server';
import { SESSION_KEY_MEMBER_INFO, SESSION_KEY_MEMBER_TOKEN } from '@constants/storageKeys';

const GoogleLogin = () => {
  const [loginError, setLoginError] = useState<Error>(null);
  const homePageUrl = location.href.split('google')[0];

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code') ?? '';
    const encodedCode = encodeURIComponent(code);

    getMemberToken(encodedCode, 'google')
      .then(async (token) => {
        memberTokenStore.setState(token);

        const memberInfo = await fetchUtils.get(`${SERVER_URL}/members/me`);

        setSessionStorage(SESSION_KEY_MEMBER_TOKEN, token);
        setSessionStorage(SESSION_KEY_MEMBER_INFO, JSON.stringify(memberInfo));

        location.href = homePageUrl;
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
            location.href = homePageUrl;
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
