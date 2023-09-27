import { store } from '@utils/external-state';

import { ZOOM_BREAKPOINTS } from '../../constants/googleMaps';

export type ZoomState = keyof typeof ZOOM_BREAKPOINTS;

export interface ZoomStoreState {
  level: number;
  state: ZoomState;
}

export const zoomStore = store<ZoomStoreState>({
  level: ZOOM_BREAKPOINTS.town,
  state: 'town',
});

export const getZoomState = (newZoom: number): ZoomState => {
  if (newZoom < ZOOM_BREAKPOINTS.city) {
    return 'country';
  }
  if (newZoom < ZOOM_BREAKPOINTS.town) {
    return 'city';
  }
  return 'town';
};

export const markerModeActions = {
  setZoom: (newZoom: number) => {
    zoomStore.setState({ level: newZoom, state: getZoomState(newZoom) });
  },
};
