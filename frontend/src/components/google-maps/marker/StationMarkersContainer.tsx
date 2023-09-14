import { createRoot } from 'react-dom/client';

import { getStoreSnapshot } from '@utils/external-state/tools';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import type { StationMarkerInstance } from '@stores/google-maps/markerInstanceStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import { useStationMarkers } from '@hooks/tanstack-query/station-markers/useStationMarkers';

import CarFfeineMarker from '@ui/CarFfeineMarker';

import type { StationMarker } from '@type';

// TODO: 새로운 영역과 겹치는 영역에 대해서는 마커 인스턴스를 생성하지 않아야 한다.
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

const removeMarkerOutOfBounds = (
  prevMarkers: StationMarkerInstance[],
  currentMarkers: StationMarkerInstance[]
) => {
  const markersOutOfBounds = prevMarkers.filter(
    (prevMarker) =>
      !currentMarkers.some((currentMarker) => currentMarker.stationId === prevMarker.stationId)
  );

  markersOutOfBounds.forEach((marker) => {
    marker.markerInstance.map = null;
  });
};

const StationMarkersContainer = () => {
  const { data: stationMarkers, isSuccess } = useStationMarkers();
  const googleMap = getStoreSnapshot(getGoogleMapStore());

  if (!stationMarkers || !isSuccess) {
    return <></>;
  }

  const markerInstances = createMarkerInstances(stationMarkers);

  // 필터링을 여기서 걸지 말고 위에서 걸어야될지도?
  markerInstances
    .filter(
      (marker) =>
        !markerInstanceStore
          .getState()
          .some((prevMarker) => prevMarker.stationId === marker.stationId)
    )
    .forEach(({ markerInstance }, index) => {
      const container = document.createElement('div');

      markerInstance.content = container;
      markerInstance.map = googleMap;

      createRoot(container).render(<CarFfeineMarker {...stationMarkers[index]} />);
    });

  removeMarkerOutOfBounds(markerInstanceStore.getState(), markerInstances);

  markerInstanceStore.setState(markerInstances);

  return <></>;
};

export default StationMarkersContainer;
