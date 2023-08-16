import { store } from '@utils/external-state';
import { getSessionStorage } from '@utils/storage';

import { SESSION_KEY_MEMBER_TOKEN } from '@constants/storageKeys';

import { toastActions } from '../layout/toastStore';

export const memberTokenStore = store(getSessionStorage(SESSION_KEY_MEMBER_TOKEN, ''));

export const memberTokenActions = {
  setMemberToken: async (memberToken: string) => {
    memberTokenStore.setState(memberToken);

    if (memberToken === '') {
      toastActions.showToast('로그아웃 되었습니다');
    }

    if (memberToken !== '') {
      toastActions.showToast('로그인 되었습니다');
    }
  },
  resetMemberToken() {
    memberTokenActions.setMemberToken('');
  },
};
