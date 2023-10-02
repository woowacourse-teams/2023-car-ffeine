import { MarkerClusterer } from '@googlemaps/markerclusterer';

import { useStationMarkers } from '@marker/HighZoomMarkerContainer/hooks/useStationMarkers';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { markerClusterStore, markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import { useRenderStationMarker } from './hooks/useRenderStationMarker';

const HighZoomMarkerContainer = () => {
  const { data: stationMarkers, isSuccess } = useStationMarkers();
  const {
    createNewMarkerInstances,
    getRemainedMarkerInstances,
    removeMarkersOutsideBounds,
    renderMarkerInstances,
  } = useRenderStationMarker();

  console.log(stationMarkers);

  if (stationMarkers === undefined || stationMarkers.length === 0 || !isSuccess) {
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

  const markerCluster = new MarkerClusterer({
    map: getGoogleMapStore().getState(),
    markers: markerInstanceStore.getState().map(({ markerInstance }) => markerInstance),
  });

  // 이전 마커 클러스터를 지도에서 제거
  markerClusterStore.getState()?.setMap(null);
  markerClusterStore.setState(markerCluster);

  return <></>;
};

export default HighZoomMarkerContainer;
