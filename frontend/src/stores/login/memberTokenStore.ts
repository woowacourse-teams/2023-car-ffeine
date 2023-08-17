import { store } from '@utils/external-state';
import { getSessionStorage } from '@utils/storage';

import { SESSION_KEY_MEMBER_TOKEN } from '@constants/storageKeys';

import { toastActions } from '../layout/toastStore';

export const memberTokenStore = store('');

export const memberTokenActions = {
  /**
   * 발급 받은 토큰을 저장해 "로그인 되었습니다" 혹은 "로그아웃 되었습니다" 메세지를 토스트로 띄워줄 때 사용하는 메서드
   *
   * @param memberToken 발급받은 토큰
   */
  setMemberToken: async (memberToken: string, isInitial?: boolean) => {
    memberTokenStore.setState(memberToken);

    if (memberToken === '' && isInitial !== true) {
      toastActions.showToast('로그아웃 되었습니다');
    }

    if (memberToken !== '') {
      toastActions.showToast('로그인 되었습니다');
    }
  },
  /**
   * 로그아웃을 시키는 메서드지만 "로그아웃 되었습니다" 메세지를 토스트로 띄우고 싶지 않을 때 사용하는 메서드
   */
  resetMemberToken() {
    memberTokenStore.setState('');
  },
};

memberTokenActions.setMemberToken(getSessionStorage(SESSION_KEY_MEMBER_TOKEN, ''), true);
