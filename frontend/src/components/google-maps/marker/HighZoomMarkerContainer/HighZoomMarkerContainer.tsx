import { useStationMarkers } from '@marker/HighZoomMarkerContainer/hooks/useStationMarkers';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import { ZOOM_BREAKPOINT_DEFAULT_TO_CARFFEINE_MARKER } from './constants';
import { useRenderStationMarker } from './hooks/useRenderStationMarker';

const HighZoomMarkerContainer = () => {
  const { data: stationMarkers, isSuccess } = useStationMarkers();
  const {
    createNewMarkerInstances,
    getRemainedMarkerInstances,
    removeMarkersOutsideBounds,
    renderDefaultMarkers,
    renderCarffeineMarkers,
  } = useRenderStationMarker();

  if (stationMarkers === undefined || !isSuccess) {
    return <></>;
  }

  const newMarkerInstances = createNewMarkerInstances(
    markerInstanceStore.getState(),
    stationMarkers
  );

  const remainedMarkerInstances = getRemainedMarkerInstances(
    markerInstanceStore.getState(),
    stationMarkers
  );

  removeMarkersOutsideBounds(markerInstanceStore.getState(), stationMarkers);

  if (getGoogleMapStore().getState().getZoom() >= ZOOM_BREAKPOINT_DEFAULT_TO_CARFFEINE_MARKER) {
    renderCarffeineMarkers(newMarkerInstances, stationMarkers);
  } else {
    renderDefaultMarkers(newMarkerInstances, stationMarkers);
  }

  markerInstanceStore.setState([...remainedMarkerInstances, ...newMarkerInstances]);

  return <></>;
};

export default HighZoomMarkerContainer;
