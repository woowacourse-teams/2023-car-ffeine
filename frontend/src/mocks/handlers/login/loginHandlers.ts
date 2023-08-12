import { rest } from 'msw';

import { SERVERS } from '@constants';

export const loginHandlers = [
  rest.get(`${SERVERS.localhost}/oauth/google/login-uri`, (_, res, ctx) => {
    return res(
      ctx.json({
        loginUri: 'http://localhost:3000/google?code=mock-data-code',
      }),
      ctx.delay(1000),
      ctx.status(200)
    );
  }),

  rest.post(`${SERVERS.localhost}/oauth/google/login`, (_, res, ctx) => {
    return res(ctx.json({ token: 'mock-token' }), ctx.delay(1000), ctx.status(200));
  }),
];
