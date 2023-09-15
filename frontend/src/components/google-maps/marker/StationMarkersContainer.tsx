import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import { useStationMarkers } from '@hooks/tanstack-query/station-markers/useStationMarkers';

import { useRenderStationMarker } from './hooks/useRenderStationMarker';

const StationMarkersContainer = () => {
  const { data: stationMarkers, isSuccess } = useStationMarkers();
  const {
    createNewMarkerInstances,
    getRemainMarkerInstances,
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

  const remainMarkerInstances = getRemainMarkerInstances(
    markerInstanceStore.getState(),
    stationMarkers
  );

  removeMarkersOutsideBounds(markerInstanceStore.getState(), stationMarkers);
  renderMarkerInstances(newMarkerInstances, stationMarkers);

  markerInstanceStore.setState([...remainMarkerInstances, ...newMarkerInstances]);

  return <></>;
};

export default StationMarkersContainer;
