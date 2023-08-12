import { rest } from 'msw';

import { SERVERS } from '@constants';
import { CAPACITIES, CHARGER_TYPES, COMPANY_NAME } from '@constants/chargers';

export const serverFilterHandlers = [
  rest.get(`${SERVERS.localhost}/filters`, (_, res, ctx) => {
    CHARGER_TYPES;
    COMPANY_NAME;
    CAPACITIES;

    return res(
      ctx.status(200),
      ctx.json({
        connectorTypes: Object.keys(CHARGER_TYPES),
        capacities: CAPACITIES.map((capacity) => `${capacity}.00`),
        companies: Object.keys(COMPANY_NAME),
      }),
      ctx.delay(1000)
    );
  }),
];
