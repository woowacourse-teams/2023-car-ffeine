import { rest } from 'msw';

import { SERVERS } from '@constants';

export const memberFilterHandlers = [
  rest.post(`${SERVERS.localhost}/members/filters`, async (req, res, ctx) => {
    const userToken = req.headers.get('Authorization');
    const filters = await req.json();

    const connectorTypes = filters.connectorTypes;
    const capacities = filters.capacities;
    const companies = filters.companies;

    if (userToken === undefined || userToken.replace('Bearer', '') === '') {
      return res(ctx.status(401), ctx.json('unauthorized error'));
    }

    return res(ctx.status(200), ctx.json({ connectorTypes, capacities, companies }));
  }),

  rest.get(`${SERVERS.localhost}/members/filters`, (req, res, ctx) => {
    const userToken = req.headers.get('Authorization');

    if (userToken === undefined || userToken.replace('Bearer', '') === '') {
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
