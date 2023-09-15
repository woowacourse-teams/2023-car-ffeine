import { store } from '@utils/external-state';

export interface StationMarkerInstance {
  stationId: string;
  markerInstance: google.maps.marker.AdvancedMarkerElement;
}

export const markerInstanceStore = store<StationMarkerInstance[]>([]);
