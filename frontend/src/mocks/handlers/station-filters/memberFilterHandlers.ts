import { rest } from 'msw';

import { SERVERS } from '@constants';

export const memberFilterHandlers = [
  rest.post(`${SERVERS.localhost}/members/:memberId/filters`, async (req, res, ctx) => {
    const memberToken = req.headers.get('Authorization');
    const filters = await req.json();

    const connectorTypes = filters.connectorTypes;
    const capacities = filters.capacities;
    const companies = filters.companies;

    if (memberToken === undefined || memberToken.replace('Bearer', '') === '') {
      return res(ctx.status(401), ctx.json('unauthorized error'));
    }

    return res(ctx.status(200), ctx.json({ connectorTypes, capacities, companies }));
  }),

  rest.get(`${SERVERS.localhost}/members/:memberId/filters`, (req, res, ctx) => {
    const memberToken = req.headers.get('Authorization');

    if (memberToken === undefined || memberToken.replace('Bearer', '') === '') {
      return res(ctx.status(401), ctx.json('unauthorized error'));
    }

    return res(
      ctx.status(200),
      ctx.json({
        selectedFilters: {
          companies: ['AM', 'BA', 'BG', 'BK'],
          capacities: ['3.00', '7.00'],
          connectorTypes: ['DC_COMBO'],
        },
      })
    );
  }),
];
