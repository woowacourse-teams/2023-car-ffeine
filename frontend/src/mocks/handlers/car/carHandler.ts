import { generateCars, generateCarFilters } from '@mocks/data';
import { rest } from 'msw';

import { DEVELOP_SERVER_URL } from '@constants/server';

export const carHandler = [
  rest.get(`${DEVELOP_SERVER_URL}/cars`, (_, res, ctx) => {
    const cars = generateCars();

    return res(ctx.json({ cars }), ctx.delay(200), ctx.status(200));
  }),

  rest.get(`${DEVELOP_SERVER_URL}/cars/:carId/filters`, (_, res, ctx) => {
    const carFilters = generateCarFilters();

    return res(ctx.json(carFilters), ctx.delay(200), ctx.status(200));
  }),
];
