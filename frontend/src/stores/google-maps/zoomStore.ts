import { store } from '@utils/external-state';

import { ZOOM_BREAK_POINTS, ZOOM_STATE } from '@constants/googleMaps';

export const zoomStore = store({
  level: ZOOM_BREAK_POINTS.town,
  state: ZOOM_STATE.town,
});
export const zoomActions = {
  setZoom: (newZoom: number) => {
    if (newZoom < ZOOM_BREAK_POINTS.country) {
      zoomStore.setState({ level: newZoom, state: ZOOM_STATE.country });
      return;
    }
    if (newZoom < ZOOM_BREAK_POINTS.city) {
      zoomStore.setState({ level: newZoom, state: ZOOM_STATE.city });
      return;
    }
    zoomStore.setState({ level: newZoom, state: ZOOM_STATE.town });
  },
};
