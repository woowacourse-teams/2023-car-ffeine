import { getDisplayPosition } from '@utils/google-maps';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';

import { DELTA_MULTIPLE } from '@constants/googleMaps';

import type { StationSummary } from '@type';

const cachedStationSummaries = new Map<string, StationSummary>();

export const cachedStationSummariesActions = {
  add: (stationSummaries: StationSummary[]) => {
    stationSummaries.forEach((stationSummary) => {
      cachedStationSummaries.set(stationSummary.stationId, stationSummary);
    });
  },
  get: () => {
    const googleMap = getGoogleMapStore().getState();
    const { latitude, latitudeDelta, longitude, longitudeDelta } = getDisplayPosition(googleMap);

    const northEastBoundary = {
      latitude: latitude + latitudeDelta * DELTA_MULTIPLE,
      longitude: longitude + longitudeDelta * DELTA_MULTIPLE,
    };

    const southWestBoundary = {
      latitude: latitude - latitudeDelta * DELTA_MULTIPLE,
      longitude: longitude - longitudeDelta * DELTA_MULTIPLE,
    };

    const isStationLatitudeWithinBounds = (station: StationSummary) => {
      return (
        station.latitude > southWestBoundary.latitude &&
        station.latitude < northEastBoundary.latitude
      );
    };

    const isStationLongitudeWithinBounds = (station: StationSummary) => {
      return (
        station.longitude > southWestBoundary.longitude &&
        station.longitude < northEastBoundary.longitude
      );
    };

    const validStationSummaries = Array.from(cachedStationSummaries.values()).filter(
      (station) => isStationLatitudeWithinBounds(station) && isStationLongitudeWithinBounds(station)
    );

    return validStationSummaries;
  },
  clear: (stationIds: string[]) => {
    stationIds.forEach((stationId) => cachedStationSummaries.delete(stationId));
  },
  has: (stationId: string) => {
    return cachedStationSummaries.has(stationId);
  },
};
