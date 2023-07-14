import { store } from '../utils/external-state';

export interface StationMarker {
  stationId: number;
  markerInstance: google.maps.Marker;
}

export const markerInstanceStore = store<StationMarker[]>([]);
