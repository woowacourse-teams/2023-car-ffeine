import { MARKER_COLORS } from '@marker/components/SmallMediumDeltaAreaMarkerContainer/components/CarFfeineMarker/CarFfeineMarker.style';
import { DEFAULT_MARKER_SIZE_RATIO } from '@marker/components/SmallMediumDeltaAreaMarkerContainer/constants';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

const animateMarkers = (marker: HTMLElement) => {
  marker.style.opacity = '0';
  marker.classList.add('marker-animation');

  marker.addEventListener('animationend', () => {
    marker.classList.remove('marker-animation');
    marker.style.opacity = '1';
  });
};

export const getDefaultMarkerDesign = (isAvailable: boolean) => {
  const markerColor = isAvailable ? MARKER_COLORS.available : MARKER_COLORS.noAvailable;

  const defaultMarkerDesign = new google.maps.marker.PinElement({
    scale: DEFAULT_MARKER_SIZE_RATIO,
    background: markerColor.background,
    borderColor: markerColor.border,
    glyph: '',
  });

  animateMarkers(defaultMarkerDesign.element);

  return defaultMarkerDesign;
};

export const createMarkerDomElement = () => {
  const container = document.createElement('div');

  animateMarkers(container);

  return container;
};

export const createMarkerInstance = (latitude: number, longitude: number) => {
  const markerInstance = new google.maps.marker.AdvancedMarkerElement({
    position: new google.maps.LatLng(latitude, longitude),
    map: getGoogleMapStore().getState(),
  });

  return markerInstance;
};

export const addMarkerInstanceToExternalStore = (
  instance: google.maps.marker.AdvancedMarkerElement,
  id: string
) => {
  markerInstanceStore.setState((prev) => [...prev, { id, instance }]);
};

export const removeMarkerInstanceFromExternalStore = (id: string) => {
  markerInstanceStore.setState((prev) => prev.filter((markerInstance) => markerInstance.id !== id));
};
