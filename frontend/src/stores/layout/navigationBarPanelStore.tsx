import type { ReactElement } from 'react';

import { store } from '@utils/external-state';

import StationSearchWindow from '@ui/StationSearchWindow';

export interface Panels {
  basePanel: ReactElement | null;
  lastPanel: ReactElement | null;
}

export const navigationBarPanelStore = store<Panels>({
  basePanel: <StationSearchWindow />,
  lastPanel: null,
});
