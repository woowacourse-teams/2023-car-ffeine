import { setSessionStorage } from '@utils/storage';

import { toastActions } from '@stores/layout/toastStore';
import { memberInfoAction } from '@stores/login/memberInfoStore';
import { memberTokenActions, memberTokenStore } from '@stores/login/memberTokenStore';
import { serverStationFilterAction } from '@stores/station-filters/serverStationFiltersStore';

import { DEFAULT_TOKEN, SERVERS } from '@constants';
import { SESSION_KEY_MEMBER_INFO, SESSION_KEY_MEMBER_TOKEN } from '@constants/storageKeys';

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

export const getAPIEndPoint = () => {
  const isProductionServer = window.location.href.search(/https:\/\/carffe.in/) !== -1;
  const isDevServer = window.location.href.search(/https:\/\/dev.carffe.in/) !== -1;

  if (isProductionServer) {
    return SERVERS['production'];
  }

  if (isDevServer) {
    return SERVERS['dain'];
  }

  return SERVERS['localhost'];
};

export const logout = () => {
  const { setMemberToken } = memberTokenActions;
  const { resetMemberInfo } = memberInfoAction;
  const { deleteAllServerStationFilters } = serverStationFilterAction;

  setMemberToken('');
  resetMemberInfo();
  setSessionStorage(SESSION_KEY_MEMBER_TOKEN, '');
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
  const isTokenExist = memberTokenStore.getState() !== '';

  if (isTokenExist) {
    logout();
  }
};
