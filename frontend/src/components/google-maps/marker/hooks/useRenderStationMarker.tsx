import { createRoot } from 'react-dom/client';

import { getStoreSnapshot } from '@utils/external-state/tools';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import type { StationMarkerInstance } from '@stores/google-maps/markerInstanceStore';

import type { StationMarker } from '@type';

import CarFfeineMarker from '../../../ui/CarFfeineMarker/index';

export const useRenderStationMarker = () => {
  const createNewMarkerInstances = (
    prevMarkerInstances: StationMarkerInstance[],
    markers: StationMarker[]
  ) => {
    const newMarkers = markers.filter((marker) =>
      prevMarkerInstances.every((prevMarker) => prevMarker.stationId !== marker.stationId)
    );

    const newMarkerInstances = newMarkers.map((marker) => {
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

    return newMarkerInstances;
  };

  const removeMarkersOutsideBounds = (
    prevMarkerInstances: StationMarkerInstance[],
    currentMarkers: StationMarker[]
  ) => {
    const markersOutOfBounds = prevMarkerInstances.filter(
      (prevMarker) =>
        !currentMarkers.some((currentMarker) => currentMarker.stationId === prevMarker.stationId)
    );

    markersOutOfBounds.forEach((marker) => {
      marker.markerInstance.map = null;
    });
  };

  const getRemainMarkerInstances = (
    prevMarkerInstances: StationMarkerInstance[],
    currentMarkers: StationMarker[]
  ) => {
    return prevMarkerInstances.filter((markerInstance) =>
      currentMarkers.some((marker) => marker.stationId === markerInstance.stationId)
    );
  };

  const renderMarkerInstances = (
    newMarkerInstances: StationMarkerInstance[],
    markers: StationMarker[]
  ) => {
    newMarkerInstances.forEach(({ markerInstance, stationId }) => {
      const container = document.createElement('div');

      markerInstance.content = container;
      markerInstance.map = getStoreSnapshot(getGoogleMapStore());

      const markerInformation = markers.find(
        (stationMarker) => stationMarker.stationId === stationId
      );
      createRoot(container).render(<CarFfeineMarker {...markerInformation} />);
    });
  };

  return {
    createNewMarkerInstances,
    removeMarkersOutsideBounds,
    getRemainMarkerInstances,
    renderMarkerInstances,
  };
};
