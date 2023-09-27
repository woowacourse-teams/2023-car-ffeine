import { store } from '@utils/external-state';

import type { ZoomState } from '@stores/google-maps/zoomStore/types';

import { ZOOM_BREAKPOINTS } from '@constants/googleMaps';

export interface ZoomStoreState {
  level: number;
  state: ZoomState;
}

export const zoomStore = store<ZoomStoreState>({
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
  return 'high';
};

export const markerModeActions = {
  setZoom: (newZoom: number) => {
    zoomStore.setState({ level: newZoom, state: getZoomState(newZoom) });
  },
};
