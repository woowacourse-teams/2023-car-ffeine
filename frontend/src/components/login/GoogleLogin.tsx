import { useEffect } from 'react';

import { getUserToken } from '@utils/login';
import { setSessionStorage } from '@utils/storage';

import { SESSION_KEY_USER_TOKEN } from '@constants/storageKeys';

const GoogleLogin = () => {
  useEffect(() => {
    const code = window.location.search.split('&')[0].replace('?code=', '');
    const homePageUrl = window.location.href.split('google')[0];

    // TODO: 에러 처리하기
    getUserToken(code, homePageUrl).then((token) => {
      setSessionStorage(SESSION_KEY_USER_TOKEN, token);

      window.location.href = homePageUrl;
    });
  }, []);

  // TODO: 로딩 처리 하기
  return <>loading...</>;
};

export default GoogleLogin;
