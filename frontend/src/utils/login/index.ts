import { serverStore } from '@stores/config/serverStore';

import { SERVERS } from '@constants';

import type { LoginUriResponse, TokenResponse } from '@type/login';

export const getLoginUri = async (provider: string) => {
  const mode = serverStore.getState();

  const loginUriResponse = await fetch(
    `${SERVERS[mode]}/oauth/${provider}/login-uri?redirect-uri=http://localhost:3000/${provider}`
  ).then<LoginUriResponse>((response) => response.json());

  return loginUriResponse.loginUri.replace(/;/, '');
};

export const getUserToken = async (url: string) => {
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

  return userToken;
};
