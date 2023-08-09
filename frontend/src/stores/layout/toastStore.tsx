import { store } from '@utils/external-state';

import type { ToastProps } from '@common/Toast/Toast';

import type { Color, ToastPosition } from '@type/style';

export const toastListStore = store<ToastProps[]>([]);

type Toast = `${ToastPosition['column']}-${ToastPosition['row']}`;

export const toastActions = {
  showToast: (message: string, position: Toast = 'bottom-center', color: Color = 'primary') => {
    const newToast = { toastId: Date.now(), message, position, color };

    toastListStore.setState((prev) => [...prev, newToast]);
  },

  deleteToast: (toastId: number) => {
    toastListStore.setState((prev) => prev.filter((toast) => toast.toastId !== toastId));
  },
};
