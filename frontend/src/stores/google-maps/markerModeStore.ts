import { store } from '@utils/external-state';

import { ZOOM_BREAK_POINTS, ZOOM_STATE } from '@constants/googleMaps';

export interface MarkerModeState {
  zoom: number;
  state: (typeof ZOOM_STATE)[keyof typeof ZOOM_STATE];
}

export const markerModeStore = store<MarkerModeState>({
  zoom: ZOOM_BREAK_POINTS.town,
  state: ZOOM_STATE.town,
});

export const markerModeActions = {
  setZoom: (newZoom: number) => {
    if (newZoom < ZOOM_BREAK_POINTS.country) {
      markerModeStore.setState({ zoom: newZoom, state: ZOOM_STATE.country });
      return;
    }
    if (newZoom < ZOOM_BREAK_POINTS.city) {
      markerModeStore.setState({ zoom: newZoom, state: ZOOM_STATE.city });
      return;
    }
    markerModeStore.setState({ zoom: newZoom, state: ZOOM_STATE.town });
  },
};
