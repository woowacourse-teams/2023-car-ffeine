import { createRoot } from 'react-dom/client';

import { getStoreSnapshot } from '@utils/external-state/tools';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import type { StationMarkerInstance } from '@stores/google-maps/markerInstanceStore';

import { useStationInfoWindow } from '@hooks/google-maps/useStationInfoWindow';
import useMediaQueries from '@hooks/useMediaQueries';

import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';
import StationDetailsWindow from '@ui/StationDetailsWindow';

import type { StationDetails, StationMarker, StationSummary } from '@type';

import CarFfeineMarker from '../components/CarFfeineMarker';
import { DEFAULT_MARKER_SIZE_RATIO } from '../constants';

export const useRenderStationMarker = () => {
  const googleMap = getStoreSnapshot(getGoogleMapStore());

  const { openStationInfoWindow } = useStationInfoWindow();
  const { openLastPanel } = useNavigationBar();
  const screen = useMediaQueries();

  const createNewMarkerInstance = (marker: StationDetails) => {
    const { latitude: lat, longitude: lng, stationName, stationId } = marker;

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat, lng },
      title: stationName,
    });

    bindMarkerClickHandler([{ stationId, markerInstance }]);

    return markerInstance;
  };

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

    bindMarkerClickHandler(newMarkerInstances);

    return newMarkerInstances;
  };

  const removeMarkersOutsideBounds = (
    prevMarkerInstances: StationMarkerInstance[],
    currentMarkers: StationMarker[]
  ) => {
    const markersOutOfBounds = prevMarkerInstances.filter((prevMarker) =>
      currentMarkers.every((currentMarker) => currentMarker.stationId !== prevMarker.stationId)
    );

    markersOutOfBounds.forEach((marker) => {
      marker.markerInstance.map = null;
    });
  };

  const removeAllMarkers = (prevMarkerInstances: StationMarkerInstance[]) => {
    prevMarkerInstances.forEach((marker) => {
      marker.markerInstance.map = null;
    });
  };

  const getRemainedMarkerInstances = (
    prevMarkerInstances: StationMarkerInstance[],
    currentMarkers: StationMarker[]
  ) => {
    return prevMarkerInstances.filter((markerInstance) =>
      currentMarkers.some((marker) => marker.stationId === markerInstance.stationId)
    );
  };

  const renderDefaultMarkers = (
    markerInstances: StationMarkerInstance[],
    markers: StationMarker[] | StationSummary[]
  ) => {
    markers.forEach((marker) => {
      const markerInstance = markerInstances.find(
        (markerInstance) => markerInstance.stationId === marker.stationId
      )?.markerInstance;

      if (markerInstance) {
        const defaultMarkerDesign = new google.maps.marker.PinElement({
          scale: DEFAULT_MARKER_SIZE_RATIO,
          background: marker.availableCount > 0 ? '#3373DC' : '#EA4335',
          borderColor: marker.availableCount > 0 ? '#324F8E' : '#B8312F',
          glyph: '',
        });

        markerInstance.map = googleMap;
        markerInstance.content = defaultMarkerDesign.element;
      }
    });
  };

  const renderCarffeineMarkers = (
    markerInstances: StationMarkerInstance[],
    markers: StationMarker[] | StationSummary[]
  ) => {
    markerInstances.forEach(({ markerInstance, stationId }) => {
      const container = document.createElement('div');

      markerInstance.content = container;
      markerInstance.map = googleMap;

      const markerInformation = markers.find(
        (stationMarker) => stationMarker.stationId === stationId
      );

      createRoot(container).render(<CarFfeineMarker {...markerInformation} />);
    });
  };

  const bindMarkerClickHandler = (markerInstances: StationMarkerInstance[]) => {
    markerInstances.forEach(({ markerInstance, stationId }) => {
      markerInstance.addListener('click', () => {
        openStationInfoWindow(stationId, markerInstance);

        if (!screen.get('isMobile')) {
          openLastPanel(<StationDetailsWindow stationId={stationId} />);
        }
      });
    });
  };

  return {
    createNewMarkerInstance,
    createNewMarkerInstances,
    removeMarkersOutsideBounds,
    getRemainedMarkerInstances,
    renderDefaultMarkers,
    renderCarffeineMarkers,
    removeAllMarkers,
  };
};
