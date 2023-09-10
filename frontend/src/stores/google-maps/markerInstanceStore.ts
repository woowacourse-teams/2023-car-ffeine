import { store } from '@utils/external-state';

interface StationMarkerInstance {
  stationId: string;
  markerInstance: google.maps.marker.AdvancedMarkerElement;
}

export const markerInstanceStore = store<StationMarkerInstance[]>([]);
