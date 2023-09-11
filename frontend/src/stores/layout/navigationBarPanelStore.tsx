import type { ReactElement } from 'react';

import { store } from '@utils/external-state';

export interface Panels {
  basePanel: ReactElement | null;
  lastPanel: ReactElement | null;
}

export const navigationBarPanelStore = store<Panels>({
  basePanel: null,
  lastPanel: null,
});
