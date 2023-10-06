import { store } from '@utils/external-state';

import type { ZoomState } from '@stores/google-maps/zoomStore/types';

import { ZOOM_BREAKPOINTS } from '../../../constants/googleMaps';

export interface ZoomStoreState {
  level: number;
  state: ZoomState;
}

export const deltaAreaStore = store<ZoomStoreState>({
  level: ZOOM_BREAKPOINTS.high,
  state: 'high',
});

export const getZoomState = (newZoom: number): ZoomState => {
  if (newZoom < ZOOM_BREAKPOINTS.middle) {
    return 'low';
  }
  if (newZoom < ZOOM_BREAKPOINTS.high) {
    return 'middle';
  }
  if (newZoom < ZOOM_BREAKPOINTS.max) {
    return 'high';
  }
  return 'max';
};

export const zoomActions = {
  setZoom: (newZoom: number) => {
    const newZoomState = getZoomState(newZoom);
    if (newZoomState !== deltaAreaStore.getState().state) {
      deltaAreaStore.setState({ level: newZoom, state: newZoomState });
    }
  },
};
