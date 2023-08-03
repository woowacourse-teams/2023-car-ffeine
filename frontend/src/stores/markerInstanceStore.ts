import { store } from '@utils/external-state';

export interface StationMarker {
  stationId: number;
  markerInstance: google.maps.marker.AdvancedMarkerElement;
}

export const markerInstanceStore = store<StationMarker[]>([]);
