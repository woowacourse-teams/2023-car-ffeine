import { getCongestionStatistics } from '@mocks/data';
import { rest } from 'msw';

import { DEVELOP_SERVER_URL } from '@constants/server';

export const statisticsHandlers = [
  rest.get(`${DEVELOP_SERVER_URL}/stations/:stationId/statistics`, (req, res, ctx) => {
    const stationId = req.url.pathname.replace(/\/api\/stations\//, '').replace(/\/statistics/, '');

    const congestionStatistics = getCongestionStatistics(stationId);

    return res(ctx.json(congestionStatistics), ctx.delay(1000), ctx.status(200));
  }),
];
