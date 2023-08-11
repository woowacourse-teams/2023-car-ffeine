import { rest } from 'msw';

import { getSessionStorage, setSessionStorage } from '@utils/storage';

import { SERVERS } from '@constants';
import { SESSION_KEY_REPORTED_STATIONS } from '@constants/storageKeys';

export const stationReportHandlers = [
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
];
