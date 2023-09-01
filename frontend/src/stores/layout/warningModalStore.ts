import type { ReactNode } from 'react';

import { store } from '@utils/external-state';

export const warningModalOpenStore = store<boolean>(false);
export const warningModalContentStore = store<ReactNode>(null);

export const warningModalActions = {
  openModal: (component: ReactNode) => {
    warningModalOpenStore.setState(true);
    warningModalContentStore.setState(component);
  },
  closeModal: () => {
    warningModalOpenStore.setState(false);
    warningModalContentStore.setState(null);
  },
};
