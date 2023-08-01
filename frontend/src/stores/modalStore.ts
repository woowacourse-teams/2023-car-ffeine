import type { ReactNode } from 'react';

import { store } from '@utils/external-state';

export const modalOpenStore = store<boolean>(false);
export const modalContentStore = store<ReactNode>(null);

export const modalActions = {
  openModal: (component: ReactNode) => {
    modalOpenStore.setState(true);
    modalContentStore.setState(component);
  },
  closeModal: () => {
    modalOpenStore.setState(false);
    modalContentStore.setState(null);
  },
};
