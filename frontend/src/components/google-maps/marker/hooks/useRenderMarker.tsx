import { createRoot } from 'react-dom/client';

import CarFfeineMarker from '@marker/SmallMediumDeltaAreaMarkerContainer/components/CarFfeineMarker';
import { MARKER_COLORS } from '@marker/SmallMediumDeltaAreaMarkerContainer/components/CarFfeineMarker/CarFfeineMarker.style';
import { DEFAULT_MARKER_SIZE_RATIO } from '@marker/SmallMediumDeltaAreaMarkerContainer/constants';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';

import type { Station } from '@type';

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

const getMarkerInstance = (latitude: number, longitude: number) => {
  const markerInstance = new google.maps.marker.AdvancedMarkerElement({
    position: new google.maps.LatLng(latitude, longitude),
    map: getGoogleMapStore().getState(),
  });

  return markerInstance;
};

export const useMarker = () => {
  const renderDefaultMarker = (station: Station) => {
    const { latitude, longitude } = station;

    const defaultMarkerDesign = getMarkerDesign(station.availableCount > 0);
    const markerInstance = getMarkerInstance(latitude, longitude);

    markerInstance.content = defaultMarkerDesign.element;

    return () => {
      markerInstance.map = null;
    };
  };

  const renderCarffeineMarker = (station: Station) => {
    const { latitude, longitude } = station;
    const markerInstance = getMarkerInstance(latitude, longitude);

    const container = document.createElement('div');
    container.style.opacity = '0';
    container.classList.add('marker-animation');
    container.addEventListener('animationend', () => {
      container.classList.remove('marker-animation');
      container.style.opacity = '1';
    });

    markerInstance.content = container;

    createRoot(container).render(<CarFfeineMarker {...station} />);

    return () => {
      markerInstance.map = null;
    };
  };

  return {
    renderDefaultMarker,
    renderCarffeineMarker,
  };
};
