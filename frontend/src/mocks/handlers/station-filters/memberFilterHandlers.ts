import { rest } from 'msw';

import { SERVERS } from '@constants';

export const memberFilterHandlers = [
  rest.post(`${SERVERS.localhost}/members/filters`, async (req, res, ctx) => {
    const userToken = req.headers.get('Authorization');
    const filters = await req.json();

    const connectorTypes = filters.connectorTypes;
    const capacities = filters.capacities;
    const companyNames = filters.companyNames;

    if (userToken === undefined || userToken.replace('Bearer', '') === '') {
      return res(ctx.status(401), ctx.json('unauthorized error'));
    }

    return res(ctx.status(200), ctx.json({ connectorTypes, capacities, companyNames }));
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
          companyNames: [
            { key: 'AM', value: '아마노코리아' },
            { key: 'BA', value: '부안군' },
            { key: 'BG', value: '비긴스' },
            { key: 'BK', value: '비케이에너지' },
          ],
          capacities: [
            {
              capacity: 3.0,
            },
            {
              capacity: 7.0,
            },
          ],
          connectorTypes: [
            {
              key: 'DC_COMBO',
              value: '고속차지',
            },
          ],
        },
      })
    );
  }),
];
