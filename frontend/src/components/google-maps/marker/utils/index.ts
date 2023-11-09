import { MARKER_COLORS } from '@marker/components/SmallMediumDeltaAreaMarkerContainer/components/CarFfeineMarker/CarFfeineMarker.style';
import { DEFAULT_MARKER_SIZE_RATIO } from '@marker/components/SmallMediumDeltaAreaMarkerContainer/constants';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';

export const getDefaultMarkerDesign = (isAvailable: boolean) => {
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

export const createMarkerDomElement = () => {
  const container = document.createElement('div');

  container.style.opacity = '0';
  container.classList.add('marker-animation');
  container.addEventListener('animationend', () => {
    container.classList.remove('marker-animation');
    container.style.opacity = '1';
  });

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
