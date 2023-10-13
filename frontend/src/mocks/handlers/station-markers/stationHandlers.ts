import { stations } from '@mocks/data/stations';
import { rest } from 'msw';

import { DELIMITER } from '@constants';
import { DEVELOP_SERVER_URL } from '@constants/server';

import type { StationSummary } from '@type';

export const stationHandlers = [
  rest.get(`${DEVELOP_SERVER_URL}/stations/summary`, async (req, res, ctx) => {
    const { searchParams } = req.url;
    // ?stationIds=PE123456,PE123457,PE123465 ==> 대략 10개, 검사는 안함
    const stationIdsParam = searchParams.get('stationIds');
    if (stationIdsParam === undefined) {
      return res(ctx.delay(1000), ctx.status(200), ctx.json([]));
    }
    const stationIds = stationIdsParam.split(DELIMITER);
    const foundStations = stations.filter((station) => stationIds.includes(station.stationId));
    const stationSummaries: StationSummary[] = foundStations.map((station) => {
      const {
        address,
        availableCount,
        companyName,
        detailLocation,
        isParkingFree,
        isPrivate,
        latitude,
        longitude,
        operatingTime,
        stationId,
        stationName,
        totalCount,
        quickChargerCount,
      }: StationSummary = station;

      return {
        address,
        availableCount,
        companyName,
        detailLocation,
        isParkingFree,
        isPrivate,
        latitude,
        longitude,
        operatingTime,
        stationId,
        stationName,
        totalCount,
        quickChargerCount,
      };
    });
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        stations: stationSummaries,
      })
    );
  }),
];
