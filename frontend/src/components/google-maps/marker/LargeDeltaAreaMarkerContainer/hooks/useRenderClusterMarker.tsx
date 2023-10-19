import { createRoot } from 'react-dom/client';

import StyledClusterMarker from '@marker/LargeDeltaAreaMarkerContainer/components/StyledClusterMarker';

import { getStoreSnapshot } from '@utils/external-state/tools';

import { getGoogleMapStore, googleMapActions } from '@stores/google-maps/googleMapStore';
import type { MarkerInstance } from '@stores/google-maps/markerInstanceStore';

import type { ClusterMarker } from '@type';

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

    bindMarkerClickHandler(newMarkerInstances, newMarkers);

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

  const renderClusterMarkers = (markerInstances: MarkerInstance[], markers: ClusterMarker[]) => {
    markerInstances.forEach(({ instance: markerInstance, id }) => {
      const container = document.createElement('div');

      container.style.opacity = '0';
      container.classList.add('marker-animation');
      container.addEventListener('animationend', () => {
        container.classList.remove('marker-animation');
        container.style.opacity = '1';
      });

      markerInstance.content = container;
      markerInstance.map = googleMap;

      const markerInformation = markers.find((clusterMarker) => clusterMarker.id === id);

      createRoot(container).render(<StyledClusterMarker count={markerInformation.count} />);
    });
  };

  const bindMarkerClickHandler = (
    markerInstances: MarkerInstance[],
    newMarkers: ClusterMarker[]
  ) => {
    markerInstances.forEach(({ instance: markerInstance, id: stationId }) => {
      markerInstance.addListener('click', () => {
        const targetMarker = newMarkers.find((marker) => marker.id === stationId);
        const currentZoom = googleMap.getZoom();

        googleMapActions.moveTo(
          { lat: targetMarker.latitude, lng: targetMarker.longitude },
          currentZoom + 1
        );
      });
    });
  };

  return {
    createNewMarkerInstances,
    removeMarkersOutsideBounds,
    getRemainedMarkerInstances,
    renderClusterMarkers,
    removeAllMarkers,
  };
};
