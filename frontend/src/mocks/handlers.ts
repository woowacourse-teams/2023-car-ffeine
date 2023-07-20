import { rest } from 'msw';

import { stations } from './data';

import type { DisplayPosition, Station } from 'types';

export const handlers = [
  rest.post('/stations', async (req, res, ctx) => {
    const body = await req.json();
    const { latitude, longitude, latitudeDelta, longitudeDelta }: DisplayPosition = body;

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

    console.log('찾은 충전소 갯수: ' + foundStations.length);

    return res(ctx.delay(200), ctx.status(200), ctx.json(foundStations));
  }),

  rest.get('/stations/:id', async (req, res, ctx) => {
    const stationId = Number(req.params.id);
    const selectedStation = stations.find((station) => station.stationId === stationId);

    if (!selectedStation) {
      return res(ctx.status(404), ctx.json({ message: '해당 충전소가 존재하지 않습니다.' }));
    }

    return res(ctx.delay(200), ctx.status(200), ctx.json(selectedStation));
  }),
];
