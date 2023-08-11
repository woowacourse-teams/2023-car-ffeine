import { setSessionStorage } from '@utils/storage';

import { serverStore } from '@stores/config/serverStore';
import { toastActions } from '@stores/layout/toastStore';
import { userTokenActions } from '@stores/userTokenStore';

import { SERVERS } from '@constants';
import { SESSION_KEY_USER_TOKEN } from '@constants/storageKeys';

interface TokenResponse {
  token: string;
}

export const getUserToken = async (code: string, homePageUrl: string) => {
  const mode = serverStore.getState();

  const tokenResponse = await fetch(`${SERVERS[mode]}/oauth/google/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      code,
      redirectUri: `${homePageUrl}/google`,
    }),
  }).then<TokenResponse>((response) => response.json());

  const userToken = tokenResponse.token;

  return userToken;
};

interface LoginUriResponse {
  loginUri: string;
}

export const redirectToLoginPage = (provider: string) => {
  const mode = serverStore.getState();
  const { showToast } = toastActions;

  fetch(`${SERVERS[mode]}/oauth/${provider}/login-uri?redirect-uri=${SERVERS[mode]}/${provider}`)
    .then<LoginUriResponse>((response) => response.json())
    .then((data) => {
      const loginUri = data.loginUri;

      if (loginUri !== undefined) {
        window.location.href = loginUri.replace(/;/, '');
      }
    })
    .catch(() => {
      showToast('로그인에 실패했습니다', 'error');
    });
};

export const logout = () => {
  const { setUserToken } = userTokenActions;

  setUserToken('');
  setSessionStorage(SESSION_KEY_USER_TOKEN, '');
};
