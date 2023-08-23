import { rest } from 'msw';

import { DEVELOP_SERVER_URL } from '@constants/server';

export const memberHandlers = [
  rest.get(`${DEVELOP_SERVER_URL}/members/me`, (req, res, ctx) => {
    const memberToken = req.headers.get('Authorization');

    if (memberToken === undefined || memberToken.replace('Bearer', '') === '') {
      return res(ctx.status(401), ctx.json('unauthorized error'));
    }

    return res(
      ctx.status(200),
      ctx.json({
        memberId: Math.random(),
        car: {
          carId: Math.random(),
          name: '포르쉐 타이칸',
          year: '2022',
        },
      })
    );
  }),

  rest.post(`${DEVELOP_SERVER_URL}/members/:memberId/cars`, async (req, res, ctx) => {
    const memberToken = req.headers.get('Authorization');

    if (memberToken === undefined || memberToken.replace('Bearer', '') === '') {
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
