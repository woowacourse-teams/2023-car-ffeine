import { createRoot } from 'react-dom/client';

import { getStoreSnapshot, useSetExternalState } from '@utils/external-state/tools';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import { useStationMarkers } from '@hooks/tanstack-query/station-markers/useStationMarkers';

import CarFfeineMarker from '@ui/CarFfeineMarker';

import type { StationMarker } from '@type';

const createMarkerInstances = (markers: StationMarker[]) => {
  return markers.map((marker) => {
    const { latitude: lat, longitude: lng, stationName, stationId } = marker;

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat, lng },
      title: stationName,
    });

    return {
      stationId,
      markerInstance,
    };
  });
};

const StationMarkersContainer = () => {
  const { data: stationMarkers, isSuccess } = useStationMarkers();
  const googleMap = getStoreSnapshot(getGoogleMapStore());
  const setMarkerInstances = useSetExternalState(markerInstanceStore);

  if (!stationMarkers || !isSuccess) {
    return <></>;
  }

  const markerInstances = createMarkerInstances(stationMarkers);

  markerInstances.forEach(({ markerInstance }, index) => {
    const container = document.createElement('div');

    markerInstance.content = container;
    markerInstance.map = googleMap;

    createRoot(container).render(<CarFfeineMarker {...stationMarkers[index]} />);
  });

  setMarkerInstances(markerInstances);
};

export default StationMarkersContainer;
