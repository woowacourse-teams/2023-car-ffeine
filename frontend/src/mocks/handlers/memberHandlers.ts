import { rest } from 'msw';

import { SERVERS } from '@constants';

export const memberHandlers = [
  rest.get(`${SERVERS.localhost}/members/me`, (req, res, ctx) => {
    const memberToken = req.headers.get('Authorization');

    if (memberToken === undefined || memberToken.replace('Bearer', '') === '') {
      return res(ctx.status(401), ctx.json('unauthorized error'));
    }

    return res(
      ctx.status(200),
      ctx.json({
        memberId: Math.random(),
        car: {
          name: '포르쉐 타이칸',
          year: '2022',
        },
      })
    );
  }),
];
