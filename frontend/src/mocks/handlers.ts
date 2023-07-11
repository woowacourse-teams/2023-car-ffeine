import { rest } from 'msw';

import type { Station } from '../types';
import { stations } from './data';

export const handlers = [
  rest.post('/stations', async (req, res, ctx) => {
    const body = await req.json();
    const { latitude, longitude, latitudeDelta, longitudeDelta } = body;

    const northEastBoundary = {
      latitude: latitude + latitudeDelta,
      longitude: longitude + longitudeDelta,
    };

    const southWestBoundary = {
      latitude: latitude - latitudeDelta,
      longitude: longitude - longitudeDelta,
    };

    const isStationLatitudeWithinBounds = (station: Station) => {
      return (
        station.latitude > southWestBoundary.latitude &&
        station.latitude < northEastBoundary.latitude
      );
    };

    const isStationLongitudeWithinBounds = (station: Station) => {
      return (
        station.longitude > southWestBoundary.longitude &&
        station.longitude < northEastBoundary.longitude
      );
    };

    const foundStations: Station[] = stations.filter(
      (station) => isStationLatitudeWithinBounds(station) && isStationLongitudeWithinBounds(station)
    );

    return res(ctx.status(200), ctx.json(foundStations));
  }),
];
