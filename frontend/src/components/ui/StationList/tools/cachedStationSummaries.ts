import { getDisplayPosition } from '@utils/google-maps';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';

import { DELTA_FACTOR } from '@constants/googleMaps';

import type { StationSummary } from '@type';

const cachedStationSummaries = new Map<string, StationSummary>();

export const cachedStationSummariesActions = {
  add: (stationSummaries: StationSummary[]) => {
    console.log(`before: ${cachedStationSummaries.size}`);

    stationSummaries.forEach((stationSummary) => {
      cachedStationSummaries.set(stationSummary.stationId, stationSummary);
    });

    console.log(`after: ${cachedStationSummaries.size}`);
  },
  get: () => {
    const googleMap = getGoogleMapStore().getState();
    const { latitude, latitudeDelta, longitude, longitudeDelta } = getDisplayPosition(googleMap);

    const northEastBoundary = {
      latitude: latitude + latitudeDelta * DELTA_FACTOR,
      longitude: longitude + longitudeDelta * DELTA_FACTOR,
    };

    const southWestBoundary = {
      latitude: latitude - latitudeDelta * DELTA_FACTOR,
      longitude: longitude - longitudeDelta * DELTA_FACTOR,
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

    const filteredStationSummaries = Array.from(cachedStationSummaries.values()).filter(
      (station) => isStationLatitudeWithinBounds(station) && isStationLongitudeWithinBounds(station)
    );

    console.log(filteredStationSummaries.length);

    return filteredStationSummaries;
  },
  clear: (stationIds: string[]) => {
    stationIds.forEach((stationId) => cachedStationSummaries.delete(stationId));
  },
  has: (stationId: string) => {
    return cachedStationSummaries.has(stationId);
  },
};
