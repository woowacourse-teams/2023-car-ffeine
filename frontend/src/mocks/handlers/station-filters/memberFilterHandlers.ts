import { rest } from 'msw';

import { EMPTY_MEMBER_TOKEN } from '@constants';
import { DEVELOP_SERVER_URL } from '@constants/server';

export const memberFilterHandlers = [
  rest.post(`${DEVELOP_SERVER_URL}/members/:memberId/filters`, async (req, res, ctx) => {
    const memberToken = req.headers.get('Authorization');
    const requestBody = await req.json();

    const connectorTypes = requestBody.filters
      .filter(
        (filterOption: { type: string; name: string }) => filterOption.type === 'connectorType'
      )
      .map((filterOption: { type: string; name: string }) => filterOption.name);
    const capacities = requestBody.filters
      .filter((filterOption: { type: string; name: string }) => filterOption.type === 'capacity')
      .map((filterOption: { type: string; name: string }) => filterOption.name);
    const companies = requestBody.filters
      .filter((filterOption: { type: string; name: string }) => filterOption.type === 'company')
      .map((filterOption: { type: string; name: string }) => filterOption.name);

    if (memberToken === undefined || memberToken.replace('Bearer', '') === EMPTY_MEMBER_TOKEN) {
      return res(ctx.status(401), ctx.json('unauthorized error'));
    }

    return res(ctx.status(200), ctx.json({ connectorTypes, capacities, companies }));
  }),

  rest.get(`${DEVELOP_SERVER_URL}/members/:memberId/filters`, (req, res, ctx) => {
    const memberToken = req.headers.get('Authorization');

    if (memberToken === undefined || memberToken.replace('Bearer', '') === EMPTY_MEMBER_TOKEN) {
      return res(ctx.status(401), ctx.json('unauthorized error'));
    }

    return res(
      ctx.status(200),
      ctx.json({
        companies: ['AM', 'BA', 'BG', 'BK'],
        capacities: ['3.00', '7.00'],
        connectorTypes: ['DC_COMBO'],
      })
    );
  }),
];
