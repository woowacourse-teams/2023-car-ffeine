import { handleInvalidTokenToLogout } from '@utils/login';

import { memberTokenStore } from '@stores/login/memberTokenStore';

import { EMPTY_MEMBER_TOKEN } from '@constants';

export const fetchUtils = {
  /**
   * @param url request url
   * @param errorMessage 에러 발생시 보여줄 에러 메세지
   * @returns T
   */
  async get<T>(url: string, errorMessage?: string) {
    const isMemberTokenExist = memberTokenStore.getState() !== EMPTY_MEMBER_TOKEN;

    return await fetch(url, {
      method: 'GET',
      headers: isMemberTokenExist
        ? {
            Authorization: `Bearer ${memberTokenStore.getState()}`,
          }
        : undefined,
    }).then<T>((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          handleInvalidTokenToLogout();

          throw new Error('로그인이 필요합니다');
        }

        throw new Error(errorMessage ?? '에러가 발생했습니다');
      }

      return response.json();
    });
  },
  /**
   * @param url 요청을 발생시킬 url
   * @param body request body
   * @param errorMessage 에러 발생시 보여줄 에러 메세지
   * @returns T
   */
  async post<T, U extends object>(url: string, body: U, errorMessage?: string) {
    const isMemberTokenExist = memberTokenStore.getState() !== EMPTY_MEMBER_TOKEN;

    return await fetch(url, {
      method: 'POST',
      headers: isMemberTokenExist
        ? {
            Authorization: `Bearer ${memberTokenStore.getState()}`,
            'Content-Type': 'application/json',
          }
        : { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then<T>((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          handleInvalidTokenToLogout();

          throw new Error('로그인이 필요합니다');
        }

        throw new Error(errorMessage ?? '에러가 발생했습니다');
      }

      return response.json();
    });
  },
};
