import { useStationMarkers } from '@marker/HighZoomMarkerContainer/hooks/useStationMarkers';

import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import { useRenderStationMarker } from './hooks/useRenderStationMarker';

const HighZoomMarkerContainer = () => {
  const { data: stationMarkers, isSuccess } = useStationMarkers();
  const {
    createNewMarkerInstances,
    getRemainedMarkerInstances,
    removeMarkersOutsideBounds,
    renderMarkerInstances,
  } = useRenderStationMarker();

  if (!stationMarkers || !isSuccess) {
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
  renderMarkerInstances(newMarkerInstances, stationMarkers);

  markerInstanceStore.setState([...remainedMarkerInstances, ...newMarkerInstances]);

  return <></>;
};

export default HighZoomMarkerContainer;