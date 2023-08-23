import { rest } from 'msw';

import { getSessionStorage, setSessionStorage } from '@utils/storage';

import { DEVELOP_SERVER_URL } from '@constants/server';
import { SESSION_KEY_REPORTED_STATIONS } from '@constants/storageKeys';

export const stationReportHandlers = [
  rest.post(`${DEVELOP_SERVER_URL}/stations/:stationId/reports`, (req, res, ctx) => {
    const stationId = req.params.stationId as string;
    const prevReportedStations = getSessionStorage<string[]>(SESSION_KEY_REPORTED_STATIONS, []);

    setSessionStorage<string[]>(SESSION_KEY_REPORTED_STATIONS, [
      ...new Set([...prevReportedStations, stationId]),
    ]);

    return res(ctx.delay(200), ctx.status(204));
  }),

  rest.get(`${DEVELOP_SERVER_URL}/stations/:stationId/reports/me`, (req, res, ctx) => {
    console.log(req.headers.get('Authorization')); // TODO: 이후에 비로그인 기능도 구현할 때 활용해야함
    const stationId = req.params.stationId as string;
    const reportedStations = getSessionStorage<string[]>(SESSION_KEY_REPORTED_STATIONS, []);

    return res(
      ctx.delay(200),
      ctx.status(200),
      ctx.json({ isReported: reportedStations.includes(stationId) })
    );
  }),

  rest.post(
    `${DEVELOP_SERVER_URL}/stations/:stationId/misinformation-reports`,
    async (req, res, ctx) => {
      const body = await req.json();
      console.log(JSON.stringify(body.stationDetailsToUpdate));

      return res(ctx.delay(200), ctx.status(204));
    }
  ),
];
