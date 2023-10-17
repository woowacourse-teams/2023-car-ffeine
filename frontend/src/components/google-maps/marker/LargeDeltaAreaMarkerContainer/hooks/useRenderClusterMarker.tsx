import { createRoot } from 'react-dom/client';

import ClusterMarker from '@marker/LargeDeltaAreaMarkerContainer/components/ClusterMarker';

import { getStoreSnapshot } from '@utils/external-state/tools';

import { getGoogleMapStore, googleMapActions } from '@stores/google-maps/googleMapStore';
import type { MarkerInstance } from '@stores/google-maps/markerInstanceStore';

import { INITIAL_ZOOM_LEVEL } from '@constants/googleMaps';

import type { ClusterMarkerType } from '@type';

export const useRenderClusterMarkers = () => {
  const googleMap = getStoreSnapshot(getGoogleMapStore());

  const createNewMarkerInstances = (
    prevMarkerInstances: MarkerInstance[],
    markers: ClusterMarkerType[]
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
    currentMarkers: ClusterMarkerType[]
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
    currentMarkers: ClusterMarkerType[]
  ) => {
    return prevMarkerInstances.filter((markerInstance) =>
      currentMarkers.some((marker) => marker.id === markerInstance.id)
    );
  };

  const renderClusterMarkers = (
    markerInstances: MarkerInstance[],
    markers: ClusterMarkerType[]
  ) => {
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

      createRoot(container).render(<ClusterMarker count={markerInformation.count} />);
    });
  };

  const bindMarkerClickHandler = (
    markerInstances: MarkerInstance[],
    newMarkers: ClusterMarkerType[]
  ) => {
    markerInstances.forEach(({ instance: markerInstance, id: stationId }) => {
      markerInstance.addListener('click', () => {
        const targetMarker = newMarkers.find((marker) => marker.id === stationId);
        googleMapActions.moveTo(
          { lat: targetMarker.latitude, lng: targetMarker.longitude },
          INITIAL_ZOOM_LEVEL
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
