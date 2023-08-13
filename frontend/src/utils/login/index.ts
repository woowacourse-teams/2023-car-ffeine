import { setSessionStorage } from '@utils/storage';

import { serverStore } from '@stores/config/serverStore';
import { toastActions } from '@stores/layout/toastStore';
import { memberTokenActions } from '@stores/login/memberTokenStore';

import { SERVERS } from '@constants';
import { SESSION_KEY_MEMBER_TOKEN } from '@constants/storageKeys';

interface TokenResponse {
  token: string;
}

export const getMemberToken = async (code: string, provider: string) => {
  const APIEndPoint = getAPIEndPoint();
  const redirectUri = getRedirectUri();

  const tokenResponse = await fetch(`${APIEndPoint}/oauth/google/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      code,
      redirectUri: `${redirectUri}/${provider}`,
    }),
  }).then<TokenResponse>((response) => response.json());

  const memberToken = tokenResponse.token;

  return memberToken;
};

interface LoginUriResponse {
  loginUri: string;
}

export const redirectToLoginPage = (provider: string) => {
  const { showToast } = toastActions;
  const APIEndPoint = getAPIEndPoint();
  const redirectUri = getRedirectUri();

  fetch(`${APIEndPoint}/oauth/${provider}/login-uri?redirect-uri=${redirectUri}/${provider}`)
    .then<LoginUriResponse>((response) => response.json())
    .then((data) => {
      const loginUri = data.loginUri;

      if (loginUri !== undefined) {
        window.location.href = loginUri;
      }
    })
    .catch(() => {
      showToast('로그인에 실패했습니다', 'error');
    });
};

export const logout = () => {
  const { setMemberToken } = memberTokenActions;

  setMemberToken('');
  setSessionStorage(SESSION_KEY_MEMBER_TOKEN, '');
};

export const getRedirectUri = () => {
  const isDevServer = window.location.href.match(/dev.carffe.in/) !== null;

  const redirectUri =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : isDevServer
      ? `https://dev.carffe.in`
      : `https://carffe.in`;

  return redirectUri;
};

export const getAPIEndPoint = () => {
  const mode = serverStore.getState();

  if (process.env.NODE_ENV === 'production') {
    return SERVERS['production'];
  }

  return SERVERS[mode];
};
