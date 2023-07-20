import { rest } from 'msw';

import { stations } from './data';

import type { StationSummary } from 'types';

export const handlers = [
  rest.get('/stations', async (req, res, ctx) => {
    const { searchParams } = req.url;

    const latitude = Number(searchParams.get('latitude'));
    const longitude = Number(searchParams.get('longitude'));
    const latitudeDelta = Number(searchParams.get('latitudeDelta'));
    const longitudeDelta = Number(searchParams.get('longitudeDelta'));

    const northEastBoundary = {
      latitude: latitude + latitudeDelta,
      longitude: longitude + longitudeDelta,
    };

    const southWestBoundary = {
      latitude: latitude - latitudeDelta,
      longitude: longitude - longitudeDelta,
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

    const foundStations: StationSummary[] = stations.filter(
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
