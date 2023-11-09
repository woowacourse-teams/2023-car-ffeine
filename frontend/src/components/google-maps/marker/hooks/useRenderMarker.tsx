import { createRoot } from 'react-dom/client';

import StyledClusterMarker from '@marker/LargeDeltaAreaMarkerContainer/components/StyledClusterMarker';
import CarFfeineMarker from '@marker/SmallMediumDeltaAreaMarkerContainer/components/CarFfeineMarker';
import { MARKER_COLORS } from '@marker/SmallMediumDeltaAreaMarkerContainer/components/CarFfeineMarker/CarFfeineMarker.style';
import { DEFAULT_MARKER_SIZE_RATIO } from '@marker/SmallMediumDeltaAreaMarkerContainer/constants';

import { getGoogleMapStore, googleMapActions } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

import { useStationInfoWindow } from '@hooks/google-maps/useStationInfoWindow';
import useMediaQueries from '@hooks/useMediaQueries';

import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';
import StationDetailsWindow from '@ui/StationDetailsWindow';

import type { ClusterMarker, StationMarker } from '@type';

export const useMarker = () => {
  const screen = useMediaQueries();
  const { openLastPanel } = useNavigationBar();
  const { openStationInfoWindow } = useStationInfoWindow();

  const renderDefaultMarker = (station: StationMarker) => {
    const { latitude, longitude, stationId } = station;

    const defaultMarkerDesign = getMarkerDesign(station.availableCount > 0);
    const markerInstance = createMarkerInstance(latitude, longitude);

    markerInstance.content = defaultMarkerDesign.element;

    bindStationMarkerClickEvent(markerInstance, stationId);
    addMarkerInstanceToExternalStore(markerInstance, stationId);

    return () => {
      markerInstance.map = null;
      removeMarkerInstanceFromExternalStore(stationId);
    };
  };

  const renderCarffeineMarker = (station: StationMarker) => {
    const { latitude, longitude, stationId } = station;
    const markerInstance = createMarkerInstance(latitude, longitude);
    const container = createMarkerDomElement();

    markerInstance.content = container;

    bindStationMarkerClickEvent(markerInstance, stationId);
    addMarkerInstanceToExternalStore(markerInstance, stationId);

    createRoot(container).render(<CarFfeineMarker {...station} />);

    return () => {
      markerInstance.map = null;
      removeMarkerInstanceFromExternalStore(stationId);
    };
  };

  const renderClusterMarker = (cluster: ClusterMarker) => {
    const { latitude, longitude, count } = cluster;

    const markerInstance = createMarkerInstance(latitude, longitude);
    const container = createMarkerDomElement();

    markerInstance.content = container;

    bindClusterMarkerClickEvent(markerInstance, cluster);
    createRoot(container).render(<StyledClusterMarker count={count} />);

    return () => {
      markerInstance.map = null;
    };
  };

  const bindStationMarkerClickEvent = (
    markerInstance: google.maps.marker.AdvancedMarkerElement,
    stationId: string
  ) => {
    markerInstance.addListener('click', () => {
      openStationInfoWindow(stationId, markerInstance);

      if (!screen.get('isMobile')) {
        openLastPanel(<StationDetailsWindow stationId={stationId} />);
      }
    });
  };

  const bindClusterMarkerClickEvent = (
    markerInstance: google.maps.marker.AdvancedMarkerElement,
    cluster: ClusterMarker
  ) => {
    const { latitude, longitude } = cluster;

    markerInstance.addListener('click', () => {
      const currentZoom = getGoogleMapStore().getState().getZoom();

      googleMapActions.moveTo({ lat: latitude, lng: longitude }, currentZoom + 1);
    });
  };

  return {
    renderDefaultMarker,
    renderCarffeineMarker,
    renderClusterMarker,
  };
};

const getMarkerDesign = (isAvailable: boolean) => {
  const markerColor = isAvailable ? MARKER_COLORS.available : MARKER_COLORS.noAvailable;

  const defaultMarkerDesign = new google.maps.marker.PinElement({
    scale: DEFAULT_MARKER_SIZE_RATIO,
    background: markerColor.background,
    borderColor: markerColor.border,
    glyph: '',
  });

  defaultMarkerDesign.element.style.opacity = '0';
  defaultMarkerDesign.element.classList.add('marker-animation');
  defaultMarkerDesign.element.addEventListener('animationend', () => {
    defaultMarkerDesign.element.classList.remove('marker-animation');
    defaultMarkerDesign.element.style.opacity = '1';
  });

  return defaultMarkerDesign;
};

const createMarkerDomElement = () => {
  const container = document.createElement('div');

  container.style.opacity = '0';
  container.classList.add('marker-animation');
  container.addEventListener('animationend', () => {
    container.classList.remove('marker-animation');
    container.style.opacity = '1';
  });

  return container;
};

const createMarkerInstance = (latitude: number, longitude: number) => {
  const markerInstance = new google.maps.marker.AdvancedMarkerElement({
    position: new google.maps.LatLng(latitude, longitude),
    map: getGoogleMapStore().getState(),
  });

  return markerInstance;
};

const addMarkerInstanceToExternalStore = (
  instance: google.maps.marker.AdvancedMarkerElement,
  id: string
) => {
  markerInstanceStore.setState((prev) => [...prev, { id, instance }]);
};

const removeMarkerInstanceFromExternalStore = (id: string) => {
  markerInstanceStore.setState((prev) => prev.filter((markerInstance) => markerInstance.id !== id));
};
