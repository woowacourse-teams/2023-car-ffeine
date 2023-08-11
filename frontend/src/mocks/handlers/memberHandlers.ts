import { rest } from 'msw';

import { SERVERS } from '@constants';

export const memberHandlers = [
  rest.get(`${SERVERS.localhost}/members`, (req, res, ctx) => {
    const userToken = req.headers.get('Authorization');

    if (userToken === undefined || userToken.replace('Bearer', '') === '') {
      return res(ctx.status(401), ctx.json('unauthorized error'));
    }

    return res(
      ctx.status(200),
      ctx.json({
        userId: Math.random(),
        car: {
          name: '포르쉐 타이칸',
          year: '2022',
        },
      })
    );
  }),
];
