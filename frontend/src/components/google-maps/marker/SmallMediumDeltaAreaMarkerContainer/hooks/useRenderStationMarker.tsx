import { createRoot } from 'react-dom/client';

import { getStoreSnapshot } from '@utils/external-state/tools';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import type { MarkerInstance } from '@stores/google-maps/markerInstanceStore';

import { useStationInfoWindow } from '@hooks/google-maps/useStationInfoWindow';
import useMediaQueries from '@hooks/useMediaQueries';

import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';
import StationDetailsWindow from '@ui/StationDetailsWindow';

import type { StationDetails, StationMarker, StationSummary } from '@type';

import CarFfeineMarker from '../components/CarFfeineMarker';
import { MARKER_COLORS } from '../components/CarFfeineMarker/CarFfeineMarker.style';
import { DEFAULT_MARKER_SIZE_RATIO } from '../constants';

export const useRenderStationMarker = () => {
  const googleMap = getStoreSnapshot(getGoogleMapStore());

  const { openStationInfoWindow } = useStationInfoWindow();
  const { openLastPanel } = useNavigationBar();
  const screen = useMediaQueries();
  const intersectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('drop');
        intersectionObserver.unobserve(entry.target);
      }
    }
  });

  const createNewMarkerInstance = (marker: StationDetails) => {
    const { latitude: lat, longitude: lng, stationName, stationId } = marker;

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat, lng },
      title: stationName,
    });

    bindMarkerClickHandler([{ id: stationId, instance: markerInstance }]);

    return markerInstance;
  };

  const createNewMarkerInstances = (
    prevMarkerInstances: MarkerInstance[],
    markers: StationMarker[]
  ) => {
    const newMarkers = markers.filter((marker) =>
      prevMarkerInstances.every((prevMarker) => prevMarker.id !== marker.stationId)
    );

    const newMarkerInstances = newMarkers.map((marker) => {
      const { latitude: lat, longitude: lng, stationName, stationId: id } = marker;

      const markerInstance = new google.maps.marker.AdvancedMarkerElement({
        position: { lat, lng },
        title: stationName,
      });

      return {
        id,
        instance: markerInstance,
      };
    });

    bindMarkerClickHandler(newMarkerInstances);

    return newMarkerInstances;
  };

  const removeMarkersOutsideBounds = (
    prevMarkerInstances: MarkerInstance[],
    currentMarkers: StationMarker[]
  ) => {
    const markersOutOfBounds = prevMarkerInstances.filter((prevMarker) =>
      currentMarkers.every((currentMarker) => currentMarker.stationId !== prevMarker.id)
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
    currentMarkers: StationMarker[]
  ) => {
    return prevMarkerInstances.filter((markerInstance) =>
      currentMarkers.some((marker) => marker.stationId === markerInstance.id)
    );
  };

  const renderDefaultMarkers = (
    markerInstances: MarkerInstance[],
    markers: StationMarker[] | StationSummary[]
  ) => {
    markers.forEach((marker) => {
      const markerInstance = markerInstances.find(
        (markerInstance) => markerInstance.id === marker.stationId
      )?.instance;

      const markerColor =
        marker.availableCount > 0 ? MARKER_COLORS.available : MARKER_COLORS.noAvailable;

      if (markerInstance) {
        const defaultMarkerDesign = new google.maps.marker.PinElement({
          scale: DEFAULT_MARKER_SIZE_RATIO,
          background: markerColor.background,
          borderColor: markerColor.border,
          glyph: '',
        });

        markerInstance.map = googleMap;
        defaultMarkerDesign.element.style.opacity = '0';
        defaultMarkerDesign.element.addEventListener('animationend', (event) => {
          defaultMarkerDesign.element.classList.remove('drop');
          defaultMarkerDesign.element.style.opacity = '1';
        });
        intersectionObserver.observe(defaultMarkerDesign.element);
        markerInstance.content = defaultMarkerDesign.element;
      }
    });
  };

  const renderCarffeineMarkers = (
    markerInstances: MarkerInstance[],
    markers: StationMarker[] | StationSummary[]
  ) => {
    markerInstances.forEach(({ instance: markerInstance, id: stationId }) => {
      const container = document.createElement('div');

      markerInstance.content = container;
      markerInstance.map = googleMap;

      const markerInformation = markers.find(
        (stationMarker) => stationMarker.stationId === stationId
      );

      createRoot(container).render(<CarFfeineMarker {...markerInformation} />);
    });
  };

  const bindMarkerClickHandler = (markerInstances: MarkerInstance[]) => {
    markerInstances.forEach(({ instance: markerInstance, id: stationId }) => {
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
