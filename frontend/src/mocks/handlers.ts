import { rest } from 'msw';

import { getSessionStorage, setSessionStorage } from '@utils/storage';

import { SERVERS } from '@constants';
import { ERROR_MESSAGES } from '@constants/errorMessages';
import { SESSION_KEY_REPORTED_STATIONS } from '@constants/storageKeys';

import type { StationSummary } from '@type';

import { getCongestionStatistics, getSearchedStations, stations } from './data';

export const handlers = [
  rest.get(`${SERVERS.localhost}/stations`, async (req, res, ctx) => {
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

  rest.get(`${SERVERS.localhost}/stations/search`, async (req, res, ctx) => {
    const searchWord = req.url.searchParams.get('q');

    if (!stations.length) {
      return res(ctx.status(404), ctx.json({ message: ERROR_MESSAGES.NO_SEARCH_RESULT }));
    }

    const searchResult = {
      stations: getSearchedStations(searchWord),
    };

    return res(ctx.delay(200), ctx.status(200), ctx.json(searchResult));
  }),

  rest.get(`${SERVERS.localhost}/stations/:id`, async (req, res, ctx) => {
    const stationId = req.params.id;
    const selectedStation = stations.find((station) => station.stationId === stationId);

    if (!selectedStation) {
      return res(ctx.status(404), ctx.json({ message: ERROR_MESSAGES.NO_STATION_FOUND }));
    }

    return res(ctx.delay(200), ctx.status(200), ctx.json(selectedStation));
  }),

  rest.post(`${SERVERS.localhost}/stations/:stationId/reports`, (req, res, ctx) => {
    const stationId = Number(req.params.stationId);
    const prevReportedStations = getSessionStorage<number[]>(SESSION_KEY_REPORTED_STATIONS, []);

    setSessionStorage<number[]>(SESSION_KEY_REPORTED_STATIONS, [
      ...new Set([...prevReportedStations, stationId]),
    ]);

    return res(ctx.delay(200), ctx.status(204));
  }),

  rest.get(`${SERVERS.localhost}/stations/:stationId/reports/me`, (req, res, ctx) => {
    console.log(req.headers.get('Authorization')); // TODO: 이후에 비로그인 기능도 구현할 때 활용해야함
    const stationId = Number(req.params.stationId);
    const reportedStations = getSessionStorage<number[]>(SESSION_KEY_REPORTED_STATIONS, []);

    return res(
      ctx.delay(200),
      ctx.status(200),
      ctx.json({ isReported: reportedStations.includes(stationId) })
    );
  }),

  rest.post(
    `${SERVERS.localhost}/stations/:stationId/misinformation-reports`,
    async (req, res, ctx) => {
      const body = await req.json();
      console.log(JSON.stringify(body.stationDetailsToUpdate));

      return res(ctx.delay(200), ctx.status(204));
    }
  ),

  rest.get(`${SERVERS.localhost}/stations/:stationId/statistics`, (req, res, ctx) => {
    const stationId = req.url.pathname.replace(/\/api\/stations\//, '').replace(/\/statistics/, '');

    const congestionStatistics = getCongestionStatistics(stationId);

    return res(ctx.json(congestionStatistics), ctx.delay(1000), ctx.status(200));
  }),

  rest.get(`${SERVERS.localhost}/api/stations/:stationId/total-ratings`, (req, res, ctx) => {
    return res(ctx.json({ totalRatings: 5 }), ctx.delay(1000), ctx.status(204));
  })
];
