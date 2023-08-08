import { useEffect } from 'react';

import { setSessionStorage } from '@utils/storage';

import { SESSION_KEY_USER_TOKEN } from '@constants/storageKeys';

import type { TokenResponse } from '@type/login';

// TODO: 에러 처리 하기
const login = async (url: string) => {
  const tokenResponse = await fetch(`https://dain.carffe.in/api/oauth/google/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      code: url.split('&')[0].replace('?code=', ''),
      redirectUri: 'http://localhost:3000/google',
    }),
  }).then<TokenResponse>((response) => response.json());

  const userToken = tokenResponse.token;
  setSessionStorage(SESSION_KEY_USER_TOKEN, userToken);

  window.location.href = 'http://localhost:3000/';
};

const GoogleLogin = () => {
  useEffect(() => {
    const url = window.location.search.split('&')[0].replace('?code=', '');

    login(url);
  }, []);

  // TODO: 로딩 처리 하기
  return <>loading...</>;
};

export default GoogleLogin;
