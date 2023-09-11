import { store } from '@utils/external-state';

import type { ToastProps } from '@common/Toast/Toast';

import type { Color, ToastPosition } from '@type/style';

export const toastListStore = store<ToastProps[]>([]);

type PositionedToast = `${ToastPosition['column']}-${ToastPosition['row']}`;

export const toastActions = {
  /**
   * @param message 토스트로 보여줄 문구
   * @param color 토스트 색상, [기본값] primary
   * @param position 토스트가 튀어나오는 곳, [기본값] bottom-center
   */
  showToast: (
    message: string,
    color: Color = 'primary',
    position: PositionedToast = 'bottom-center'
  ) => {
    const newToast = { toastId: Date.now(), message, position, color };

    toastListStore.setState((prev) => [...prev, newToast]);
  },

  deleteToast: (toastId: number) => {
    toastListStore.setState((prev) => prev.filter((toast) => toast.toastId !== toastId));
  },
};
