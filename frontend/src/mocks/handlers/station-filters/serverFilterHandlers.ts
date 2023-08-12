import { rest } from 'msw';

import { SERVERS } from '@constants';
import { CAPACITIES, CONNECTOR_TYPES, COMPANIES } from '@constants/chargers';

export const serverFilterHandlers = [
  rest.get(`${SERVERS.localhost}/filters`, (_, res, ctx) => {
    CONNECTOR_TYPES;
    COMPANIES;
    CAPACITIES;

    return res(
      ctx.status(200),
      ctx.json({
        connectorTypes: Object.keys(CONNECTOR_TYPES),
        capacities: CAPACITIES.map((capacity) => `${capacity}.00`),
        companies: Object.keys(COMPANIES),
      }),
      ctx.delay(1000)
    );
  }),
];
