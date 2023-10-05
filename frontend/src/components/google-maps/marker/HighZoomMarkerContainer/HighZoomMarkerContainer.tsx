import { useStationMarkers } from '@marker/HighZoomMarkerContainer/hooks/useStationMarkers';

import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import { useRenderStationMarker } from './hooks/useRenderStationMarker';

const HighZoomMarkerContainer = () => {
  const { data: stationMarkers, isSuccess } = useStationMarkers();
  const {
    createNewMarkerInstances,
    getRemainedMarkerInstances,
    removeMarkersOutsideBounds,
    renderDefaultMarkers,
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
  renderDefaultMarkers(newMarkerInstances, stationMarkers);

  markerInstanceStore.setState([...remainedMarkerInstances, ...newMarkerInstances]);

  return <></>;
};

export default HighZoomMarkerContainer;
