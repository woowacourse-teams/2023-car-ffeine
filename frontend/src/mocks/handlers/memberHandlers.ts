import { rest } from 'msw';

import { EMPTY_MEMBER_TOKEN } from '@constants';
import { DEVELOP_SERVER_URL } from '@constants/server';

export const memberHandlers = [
  rest.get(`${DEVELOP_SERVER_URL}/members/me`, (req, res, ctx) => {
    const memberToken = req.headers.get('Authorization');

    if (memberToken === undefined || memberToken.replace('Bearer', '') === EMPTY_MEMBER_TOKEN) {
      return res(ctx.status(401), ctx.json('unauthorized error'));
    }

    return res(
      ctx.status(200),
      ctx.json({
        memberId: Math.random(),
        car: {
          carId: Math.random(),
          name: '아이오닉3',
          vintage: '2019',
        },
      })
    );
  }),

  rest.post(`${DEVELOP_SERVER_URL}/members/:memberId/cars`, async (req, res, ctx) => {
    const memberToken = req.headers.get('Authorization');

    if (memberToken === undefined || memberToken.replace('Bearer', '') === EMPTY_MEMBER_TOKEN) {
      return res(ctx.status(401), ctx.json('unauthorized error'));
    }

    const carInfo = await req.json();
    const name = carInfo.name;
    const vintage = carInfo.vintage;

    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json({
        carId: 1,
        name,
        vintage,
      })
    );
  }),
];
