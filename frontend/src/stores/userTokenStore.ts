import { store } from '@utils/external-state';

import { toastActions } from './layout/toastStore';

export const userTokenStore = store('');

export const userTokenActions = {
  setUserToken: (userToken: string) => {
    userTokenStore.setState(userToken);

    if (userToken === '') {
      toastActions.showToast('로그아웃 되었습니다');
    }

    if (userToken !== '') {
      toastActions.showToast('로그인 되었습니다');
    }
  },
};
