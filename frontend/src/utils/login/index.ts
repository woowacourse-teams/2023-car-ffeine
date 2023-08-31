import { setSessionStorage } from '@utils/storage';

import { serverUrlStore } from '@stores/config/serverUrlStore';
import { toastActions } from '@stores/layout/toastStore';
import { memberInfoAction } from '@stores/login/memberInfoStore';
import { memberTokenActions, memberTokenStore } from '@stores/login/memberTokenStore';
import { serverStationFilterAction } from '@stores/station-filters/serverStationFiltersStore';

import { DEFAULT_TOKEN, EMPTY_MEMBER_TOKEN } from '@constants';
import { SESSION_KEY_MEMBER_INFO, SESSION_KEY_MEMBER_TOKEN } from '@constants/storageKeys';

interface LoginUriResponse {
  loginUri: string;
}

export const redirectToLoginPage = (provider: string) => {
  const { showToast } = toastActions;
  const redirectUri = getRedirectUri();
  const serverUrl = serverUrlStore.getState();

  fetch(`${serverUrl}/oauth/${provider}/login-uri?redirect-uri=${redirectUri}/${provider}`)
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

interface TokenResponse {
  token: string;
}

export const getMemberToken = async (code: string, provider: string) => {
  const serverUrl = serverUrlStore.getState();
  const redirectUri = getRedirectUri();

  const tokenResponse = await fetch(`${serverUrl}/oauth/google/login`, {
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

export const getRedirectUri = () => {
  const isProductionServer = window.location.href.search(/https:\/\/carffe.in/) !== -1;
  const isDevServer = window.location.href.search(/https:\/\/dev.carffe.in/) !== -1;

  if (isProductionServer) {
    return `https://carffe.in`;
  }

  if (isDevServer) {
    return `https://dev.carffe.in`;
  }

  return 'http://localhost:3000';
};

export const logout = () => {
  const { setMemberToken } = memberTokenActions;
  const { resetMemberInfo } = memberInfoAction;
  const { deleteAllServerStationFilters } = serverStationFilterAction;

  setMemberToken(EMPTY_MEMBER_TOKEN);
  resetMemberInfo();
  setSessionStorage(SESSION_KEY_MEMBER_TOKEN, EMPTY_MEMBER_TOKEN);
  setSessionStorage(
    SESSION_KEY_MEMBER_INFO,
    `{
      "memberId": ${DEFAULT_TOKEN},
      "car": null
    }`
  );
  deleteAllServerStationFilters();
};

export const handleInvalidTokenToLogout = () => {
  const isTokenExist = memberTokenStore.getState() !== EMPTY_MEMBER_TOKEN;

  if (isTokenExist) {
    logout();
  }
};
