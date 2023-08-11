import type { ReactNode } from 'react';

import { store } from '@utils/external-state';

export const modalSecondaryOpenStore = store<boolean>(false);
export const modalSecondaryContentStore = store<ReactNode>(null);

export const modalSecondaryActions = {
  openModal: (component: ReactNode) => {
    modalSecondaryOpenStore.setState(true);
    modalSecondaryContentStore.setState(component);
  },
  closeModal: () => {
    modalSecondaryOpenStore.setState(false);
    modalSecondaryContentStore.setState(null);
  },
};
