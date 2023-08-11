import { rest } from 'msw';

import { getTypedObjectEntries } from '@utils/getTypedObjectEntries';

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
        connectorTypes: getTypedObjectEntries(CHARGER_TYPES).map(([key, value]) => ({
          key,
          value,
        })),
        capacities: CAPACITIES.map((capacity) => ({ capacity })),
        companyNames: getTypedObjectEntries(COMPANY_NAME).map(([key, value]) => ({
          key,
          value,
        })),
      }),
      ctx.delay(1000)
    );
  }),
];
