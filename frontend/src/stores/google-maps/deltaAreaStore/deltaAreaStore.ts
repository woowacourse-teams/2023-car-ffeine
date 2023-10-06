import { store } from '@utils/external-state';

import type { DeltaAreaState } from '@stores/google-maps/deltaAreaStore/types';

import { DELTA_AREA_BREAKPOINTS } from '../../../constants/googleMaps';

export const deltaAreaStore = store<DeltaAreaState>('medium');

export const getDeltaAreaState = (newDeltaArea: number): DeltaAreaState => {
  if (newDeltaArea >= DELTA_AREA_BREAKPOINTS.large) {
    return 'max';
  }
  if (newDeltaArea >= DELTA_AREA_BREAKPOINTS.medium) {
    return 'large';
  }
  if (newDeltaArea >= DELTA_AREA_BREAKPOINTS.small) {
    return 'medium';
  }

  return 'small';
};

/** TODO: deltaAreaActions로 이름 변경?
 * setZoom
 */
export const deltaAreaActions = {
  setDeltaAreaState: (newDeltaArea: number) => {
    const newDeltaAreaState = getDeltaAreaState(newDeltaArea);
    if (newDeltaAreaState !== deltaAreaStore.getState()) {
      deltaAreaStore.setState(newDeltaAreaState);
    }
  },
};
