import { store } from '@utils/external-state';

import { toastActions } from '../layout/toastStore';
import { memberInfoStore } from './memberInfoStore';

export const memberTokenStore = store('');

export const memberTokenActions = {
  setMemberToken: async (memberToken: string) => {
    memberTokenStore.setState(memberToken);

    if (memberToken === '') {
      memberInfoStore.setState(null);

      toastActions.showToast('로그아웃 되었습니다');
    }

    if (memberToken !== '') {
      toastActions.showToast('로그인 되었습니다');
    }
  },
};
