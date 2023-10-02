import type { MarkerClusterer } from '@googlemaps/markerclusterer';

import { store } from '@utils/external-state';

export interface StationMarkerInstance {
  stationId: string;
  markerInstance: google.maps.marker.AdvancedMarkerElement;
}

export const markerInstanceStore = store<StationMarkerInstance[]>([]);
export const markerClusterStore = store<MarkerClusterer>(null);
