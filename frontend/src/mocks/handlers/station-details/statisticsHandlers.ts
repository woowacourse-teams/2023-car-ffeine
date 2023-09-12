import { getCongestionStatistics } from '@mocks/data';
import { rest } from 'msw';

import {
  ENGLISH_DAYS_OF_WEEK_FULL_NAME,
  ENGLISH_DAYS_OF_WEEK_SHORT_NAME,
} from '@constants/congestion';
import { DEVELOP_SERVER_URL } from '@constants/server';

const ENGLISH_DAYS_OF_WEEK_LONG_TO_SHORT = Object.fromEntries(
  ENGLISH_DAYS_OF_WEEK_FULL_NAME.map((day, index) => [day, ENGLISH_DAYS_OF_WEEK_SHORT_NAME[index]])
);

export const statisticsHandlers = [
  rest.get(`${DEVELOP_SERVER_URL}/stations/:stationId/statistics`, (req, res, ctx) => {
    const stationId = req.url.pathname
      .split('?')[0]
      .replace(/\/api\/stations\//, '')
      .replace(/\/statistics/, '');
    const dayOfWeek = req.url.searchParams.get(
      'dayOfWeek'
    ) as (typeof ENGLISH_DAYS_OF_WEEK_SHORT_NAME)[number];

    const fullCongestionStatistics = getCongestionStatistics(stationId);
    const congestionStatistics = {
      ...fullCongestionStatistics,
      congestion: {
        standard: [
          ...fullCongestionStatistics['congestion']['standard'][
            ENGLISH_DAYS_OF_WEEK_LONG_TO_SHORT[dayOfWeek]
          ],
        ],
        quick: [
          ...fullCongestionStatistics['congestion']['quick'][
            ENGLISH_DAYS_OF_WEEK_LONG_TO_SHORT[dayOfWeek]
          ],
        ],
      },
    };

    return res(ctx.json(congestionStatistics), ctx.delay(1000), ctx.status(200));
  }),
];
