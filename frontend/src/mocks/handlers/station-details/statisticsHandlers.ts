import { getCongestionStatistics } from '@mocks/data';
import { rest } from 'msw';

import { SERVERS } from '@constants';

export const statisticsHandlers = [
  rest.get(`${SERVERS.localhost}/stations/:stationId/statistics`, (req, res, ctx) => {
    const stationId = req.url.pathname.replace(/\/api\/stations\//, '').replace(/\/statistics/, '');

    const congestionStatistics = getCongestionStatistics(stationId);

    return res(ctx.json(congestionStatistics), ctx.delay(1000), ctx.status(200));
  }),
];
