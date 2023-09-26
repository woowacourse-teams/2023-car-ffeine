import { store } from '@utils/external-state';

import { ZOOM_BREAK_POINTS, ZOOM_STATE } from '../../constants/googleMaps';

export interface MarkerModeState {
  zoom: number;
  state: (typeof ZOOM_STATE)[keyof typeof ZOOM_STATE];
}

export const markerModeStore = store<MarkerModeState>({
  zoom: ZOOM_BREAK_POINTS.town,
  state: ZOOM_STATE.town,
});

export const getZoomState = (newZoom: number) => {
  if (newZoom < ZOOM_BREAK_POINTS.city) {
    return ZOOM_STATE.country;
  }
  if (newZoom < ZOOM_BREAK_POINTS.town) {
    return ZOOM_STATE.city;
  }
  return ZOOM_STATE.town;
};

export const markerModeActions = {
  setZoom: (newZoom: number) => {
    markerModeStore.setState({ zoom: newZoom, state: getZoomState(newZoom) });
  },
};
