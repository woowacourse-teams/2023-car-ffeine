import { store } from '@utils/external-state';

export const toastOpenStore = store<boolean>(false);

export const toastActions = {
  openToast: () => {
    toastOpenStore.setState(true);
  },

  closeToast: () => {
    toastOpenStore.setState(false);
  },
};
