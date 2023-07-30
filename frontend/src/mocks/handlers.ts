import { rest } from 'msw';

import { getSessionStorage, setSessionStorage } from '@utils/storage';

import { DEVELOP_URL, ERROR_MESSAGES, SESSION_KEY_REPORTED_STATIONS } from '@constants';

import { stations } from './data';

import type { StationSummary } from 'types';

export const handlers = [
  rest.get(`${DEVELOP_URL}/stations`, async (req, res, ctx) => {
    const { searchParams } = req.url;

    const latitude = Number(searchParams.get('latitude'));
    const longitude = Number(searchParams.get('longitude'));
    const latitudeDelta = Number(searchParams.get('latitudeDelta'));
    const longitudeDelta = Number(searchParams.get('longitudeDelta'));

    const isChargerTypeFilterSelected = searchParams.get('chargerTypes') !== null;
    const isCapacityFilterSelected = searchParams.get('capacities') !== null;
    const isCompanyNameFilterSelected = searchParams.get('companyNames') !== null;

    const selectedChargerTypes = searchParams.get('chargerTypes')?.split(',');
    const selectedCapacities = searchParams.get('capacities')?.split(',')?.map(Number);
    const selectedCompanyNames = searchParams.get('companyNames')?.split(',');

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

    const foundStations: StationSummary[] = stations
      .filter(
        (station) =>
          isStationLatitudeWithinBounds(station) && isStationLongitudeWithinBounds(station)
      )
      .filter((station) => {
        const isChargerTypeFilterInvalid =
          isChargerTypeFilterSelected &&
          !station.chargers.some((charger) => selectedChargerTypes.includes(charger.type));
        const isCapacityFilterInvalid =
          isCapacityFilterSelected &&
          !station.chargers.some((charger) => selectedCapacities.includes(charger.capacity));
        const isCompanyNameFilterInvalid =
          isCompanyNameFilterSelected && !selectedCompanyNames.includes(station.companyName);

        if (isChargerTypeFilterInvalid || isCapacityFilterInvalid || isCompanyNameFilterInvalid)
          return false;
        return true;
      });

    console.log('찾은 충전소 갯수: ' + foundStations.length);

    return res(
      ctx.delay(200),
      ctx.status(200),
      ctx.json({
        stations: foundStations,
      })
    );
  }),

  rest.get(`${DEVELOP_URL}/stations/:id`, async (req, res, ctx) => {
    const stationId = Number(req.params.id);
    const selectedStation = stations.find((station) => station.stationId === stationId);

    if (!selectedStation) {
      return res(ctx.status(404), ctx.json({ message: ERROR_MESSAGES.NO_STATION_FOUND }));
    }

    return res(ctx.delay(200), ctx.status(200), ctx.json(selectedStation));
  }),

  rest.post(`${DEVELOP_URL}/stations/:stationId/reports`, (req, res, ctx) => {
    // console.log(req.headers.get('Authorization'));
    const stationId = Number(req.params.stationId);
    const prevReportedStations = getSessionStorage<number[]>(SESSION_KEY_REPORTED_STATIONS, []);

    setSessionStorage<number[]>(SESSION_KEY_REPORTED_STATIONS, [
      ...new Set([...prevReportedStations, stationId]),
    ]);

    return res(ctx.delay(200), ctx.status(204));
  }),
];
