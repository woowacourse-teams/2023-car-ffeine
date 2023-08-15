import { generateCars, generateCarFilters } from '@mocks/data';
import { rest } from 'msw';

import { SERVERS } from '@constants';

export const carHandler = [
  rest.get(`${SERVERS.localhost}/cars`, (_, res, ctx) => {
    const cars = generateCars();

    return res(ctx.json({ cars }), ctx.delay(200), ctx.status(200));
  }),

  rest.get(`${SERVERS.localhost}/cars/:carId/filters`, (_, res, ctx) => {
    const carFilters = generateCarFilters();

    return res(ctx.json(carFilters), ctx.delay(200), ctx.status(200));
  }),
];
