import { store } from '@utils/external-state';

export interface MarkerInstance {
  id: string;
  instance: google.maps.marker.AdvancedMarkerElement;
}

export const markerInstanceStore = store<MarkerInstance[]>([]);
