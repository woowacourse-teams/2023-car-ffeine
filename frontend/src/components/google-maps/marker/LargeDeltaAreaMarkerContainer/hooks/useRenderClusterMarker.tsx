import { createRoot } from 'react-dom/client';

import { getStoreSnapshot } from '@utils/external-state/tools';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import type { MarkerInstance } from '@stores/google-maps/markerInstanceStore';

import type { ClusterMarker } from '@type';

import FooMarker from '../components/FooMarker';

export const useRenderClusterMarkers = () => {
  const googleMap = getStoreSnapshot(getGoogleMapStore());

  const createNewMarkerInstances = (
    prevMarkerInstances: MarkerInstance[],
    markers: ClusterMarker[]
  ) => {
    const newMarkers = markers.filter((marker) =>
      prevMarkerInstances.every((prevMarker) => prevMarker.id !== marker.id)
    );

    const newMarkerInstances = newMarkers.map((marker) => {
      const { latitude: lat, longitude: lng, id, count } = marker;

      const markerInstance = new google.maps.marker.AdvancedMarkerElement({
        position: { lat, lng },
        title: `영역 내 충전소 개수: ${count}`,
      });

      return {
        id,
        instance: markerInstance,
      };
    });

    // TODO: 구현하면 주석 풀기
    // bindMarkerClickHandler(newMarkerInstances);

    return newMarkerInstances;
  };

  const removeMarkersOutsideBounds = (
    prevMarkerInstances: MarkerInstance[],
    currentMarkers: ClusterMarker[]
  ) => {
    const markersOutOfBounds = prevMarkerInstances.filter((prevMarker) =>
      currentMarkers.every((currentMarker) => currentMarker.id !== prevMarker.id)
    );

    markersOutOfBounds.forEach((marker) => {
      marker.instance.map = null;
    });
  };

  const removeAllMarkers = (prevMarkerInstances: MarkerInstance[]) => {
    prevMarkerInstances.forEach((marker) => {
      marker.instance.map = null;
    });
  };

  const getRemainedMarkerInstances = (
    prevMarkerInstances: MarkerInstance[],
    currentMarkers: ClusterMarker[]
  ) => {
    return prevMarkerInstances.filter((markerInstance) =>
      currentMarkers.some((marker) => marker.id === markerInstance.id)
    );
  };

  const renderFooMarkers = (markerInstances: MarkerInstance[], markers: ClusterMarker[]) => {
    markerInstances.forEach(({ instance: markerInstance, id }) => {
      const container = document.createElement('div');

      markerInstance.content = container;
      markerInstance.map = googleMap;

      const markerInformation = markers.find((clusterMarker) => clusterMarker.id === id);

      createRoot(container).render(<FooMarker count={markerInformation.count} />);
    });
  };

  const bindMarkerClickHandler = (markerInstances: MarkerInstance[]) => {
    // TODO: 클릭시 발생할 이벤트 구현
    console.log('아직 클릭 이벤트는 뭘 할지 정하지 않았어요!');
  };

  return {
    createNewMarkerInstances,
    removeMarkersOutsideBounds,
    getRemainedMarkerInstances,
    renderFooMarkers,
    removeAllMarkers,
  };
};
