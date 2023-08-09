import { setSessionStorage } from '@utils/storage';

import { serverStore } from '@stores/config/serverStore';
import { toastActions } from '@stores/layout/toastStore';

import { MSW_OFF, SERVERS } from '@constants';
import { SESSION_KEY_SERVER_MODE } from '@constants/storageKeys';

interface TokenResponse {
  token: string;
}

export const getUserToken = async (url: string) => {
  const mode = serverStore.getState();

  const tokenResponse = await fetch(`${SERVERS[mode]}/oauth/google/login`, {
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

interface LoginUriResponse {
  loginUri: string;
}

export const redirectToLoginPage = (provider: string) => {
  const mode = serverStore.getState();
  const { showToast } = toastActions;

  fetch(
    `${SERVERS[mode]}/oauth/${provider}/login-uri?redirect-uri=http://localhost:3000/${provider}`
  )
    .then<LoginUriResponse>((response) => response.json())
    .then((data) => {
      const loginUri = data.loginUri;

      if (process.env.NODE_ENV === 'development') {
        // 리다이렉트 진행시 msw가 강제로 켜지는 문제가 있어서 해당 문제를 해결하고자 세션 스토리지를 활용함.
        setSessionStorage(SESSION_KEY_SERVER_MODE, MSW_OFF);
      }

      if (loginUri !== undefined) {
        window.location.href = loginUri.replace(/;/, '');
      }
    })
    .catch(() => {
      showToast('로그인에 실패했습니다', 'error');
    });
};
